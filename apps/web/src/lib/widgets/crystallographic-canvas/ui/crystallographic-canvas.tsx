import type { FC } from "react";
import { useMemo, useEffect, useState } from "react";
import * as Atoms from "@effect/atom-react";
import { WebglCanvas } from "@studio-albums/ui/components/webgl-canvas";
import * as Core from "@studio-albums/core/domain";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";

export interface CrystallographicCanvasProps {
	pattern: Core.Patterns.Pattern.Encoded;
}

const patternAtom = Atoms.<Core.Patterns.Pattern | null>(null);

// Convert color string to vec3
function colorToVec3(color: string): string {
	// Simple color name mapping - expand as needed
	const colors: Record<string, string> = {
		black: "vec3(0.0, 0.0, 0.0)",
		white: "vec3(1.0, 1.0, 1.0)",
		red: "vec3(1.0, 0.0, 0.0)",
		green: "vec3(0.0, 1.0, 0.0)",
		blue: "vec3(0.0, 0.0, 1.0)",
		yellow: "vec3(1.0, 1.0, 0.0)",
		cyan: "vec3(0.0, 1.0, 1.0)",
		magenta: "vec3(1.0, 0.0, 1.0)",
	};
	return colors[color.toLowerCase()] || "vec3(0.0, 0.0, 0.0)";
}

// Generate GLSL distance field function for motif
function generateMotifSDF(motif: Core.Motifs.AnyMotif, index: number): string {
	const color = colorToVec3(motif.color);

	switch (motif._tag) {
		case "circle":
			return `
float motif${index}(vec2 p) {
	return length(p) - ${motif.d / 2}.0;
}
vec3 motif${index}Color = ${color};
`;
		case "rectangle":
			return `
float motif${index}(vec2 p) {
	vec2 d = abs(p) - vec2(${motif.a / 2}.0, ${motif.b / 2}.0);
	return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}
vec3 motif${index}Color = ${color};
`;
		case "ellipse":
			return `
float motif${index}(vec2 p) {
	vec2 r = vec2(${motif.rx}, ${motif.ry});
	float k0 = length(p / r);
	float k1 = length(p / (r * r));
	return k0 * (k0 - 1.0) / k1;
}
vec3 motif${index}Color = ${color};
`;
		case "polygon": {
			const sides = motif.sides;
			const r = motif.r;
			return `
float motif${index}(vec2 p) {
	float a = atan(p.y, p.x);
	float b = ${((2.0 * Math.PI) / sides).toFixed(6)};
	return cos(floor(0.5 + a / b) * b - a) * length(p) - ${r}.0;
}
vec3 motif${index}Color = ${color};
`;
		}
		case "star": {
			const points = motif.points;
			const ro = motif.outerRadius;
			const ri = motif.innerRadius;
			return `
float motif${index}(vec2 p) {
	float a = atan(p.y, p.x);
	float b = ${(Math.PI / points).toFixed(6)};
	float d = cos(b) * length(p);
	float s = mod(a, 2.0 * b) - b;
	float t = d - cos(s) * (${ro}.0 * ${ri / ro}.0);
	return max(t, length(p) - ${ro}.0);
}
vec3 motif${index}Color = ${color};
`;
		}
		case "svg":
			// Placeholder - would need texture support
			return `
float motif${index}(vec2 p) {
	return length(p) - 10.0;
}
vec3 motif${index}Color = vec3(0.5);
`;
	}
}

// Generate GLSL fragment shader from Pattern
function generateFragmentShader(pattern: Core.Patterns.Pattern): string {
	// Get lattice vectors
	const latticeVectors = Effect.runSync(pattern.lattice.vectors);
	const a1 = latticeVectors.a1;
	const a2 = latticeVectors.a2;

	// Generate SDF functions for each motif
	const motifSDFs = pattern.motifs
		.map((m, i) => generateMotifSDF(m.motif, i))
		.join("\n");

	// Generate render calls for each motif at its position
	const renderCalls = pattern.motifs
		.map((m, i) => {
			const pos = m.position;
			return `
	// Motif ${i} at position (${pos.a}, ${pos.b})
	vec2 motifOffset${i} = vec2(${pos.a}, ${pos.b});
	vec2 motifPos${i} = cellPos - motifOffset${i};
	float d${i} = motif${i}(motifPos${i});
	if (d${i} < 0.0) {
		color = motif${i}Color;
	}
`;
		})
		.join("\n");

	return `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;

${motifSDFs}

void main() {
	vec2 pixelPos = gl_FragCoord.xy;

	// Lattice vectors
	vec2 a1 = vec2(${a1[0]}, ${a1[1]});
	vec2 a2 = vec2(${a2[0]}, ${a2[1]});

	// Transform to lattice coordinates
	mat2 latticeMatrix = mat2(a1, a2);
	vec2 latticeCoord = inverse(latticeMatrix) * pixelPos;

	// Cell position (fractional part for tiling)
	vec2 cellCoord = fract(latticeCoord);
	vec2 cellPos = cellCoord * mat2(a1, a2);

	vec3 color = vec3(1.0); // background white

${renderCalls}

	gl_FragColor = vec4(color, 1.0);
}
`.trim();
}

const vertexShader = `
attribute vec2 position;
void main() {
	gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const CrystallographicCanvas: FC<CrystallographicCanvasProps> = ({
	pattern: encodedPattern,
}) => {
	const [pattern, setPattern] = useState<Core.Patterns.Pattern | null>(null);

	// Decode pattern
	useEffect(() => {
		const decode = Schema.decodeUnknownSync(Core.Patterns.Pattern);
		Effect.runPromise(decode(pattern)).then(setPattern).catch(console.error);
	}, [encodedPattern]);

	const fragment = useMemo(() => {
		if (!pattern) return "";
		return generateFragmentShader(pattern);
	}, [pattern]);

	if (!pattern || !fragment) {
		return null;
	}

	return <WebglCanvas vertex={vertexShader} fragment={fragment} />;
};

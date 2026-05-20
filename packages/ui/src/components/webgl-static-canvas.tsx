import * as OGL from "ogl";
import type * as React from "react";
import { type FC, useEffect, useRef, useState } from "react";

export type WebglStaticProps = React.ComponentPropsWithoutRef<"canvas"> & {
	vertex: string;
	fragment: string;
	width?: number;
	height?: number;
};

export const WebglStaticCanvas: FC<WebglStaticProps> = ({
	vertex,
	fragment,
	width,
	height,
	...props
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [dataUrl, setDataUrl] = useState<string | null>(null);
	const [dimensions, setDimensions] = useState<{
		width: number;
		height: number;
	} | null>(null);
	const hasRendered = useRef(false);

	// Observe parent size if width/height not provided
	useEffect(() => {
		if (width !== undefined && height !== undefined) {
			setDimensions({ width, height });
			return;
		}

		if (!canvasRef.current) return;

		const parent = canvasRef.current.parentElement;
		if (!parent) return;

		const updateSize = (entries: ResizeObserverEntry[]) => {
			for (const entry of entries) {
				if (entry.target === parent) {
					const rect = entry.contentRect;
					setDimensions({
						width: Math.floor(rect.width),
						height: Math.floor(rect.height),
					});
				}
			}
		};

		const resizeObserver = new ResizeObserver(updateSize);
		resizeObserver.observe(parent);

		const rect = parent.getBoundingClientRect();
		setDimensions({
			width: Math.floor(rect.width),
			height: Math.floor(rect.height),
		});

		return () => resizeObserver.disconnect();
	}, [width, height]);

	useEffect(() => {
		if (!canvasRef.current || hasRendered.current || !dimensions) return;

		const canvas = canvasRef.current;
		const renderer = new OGL.Renderer({
			canvas,
			width: dimensions.width,
			height: dimensions.height,
		});
		const gl = renderer.gl;

		try {
			const geometry = new OGL.Triangle(gl);
			const program = new OGL.Program(gl, {
				vertex,
				fragment,
				uniforms: {
					uTime: { value: 0 },
					uResolution: { value: [dimensions.width, dimensions.height] },
				},
			});

			// Check if program compiled successfully
			if (!program.uniforms) {
				console.error("Shader compilation failed");
				const loseContext = gl.getExtension("WEBGL_lose_context");
				if (loseContext) loseContext.loseContext();
				return;
			}

			const mesh = new OGL.Mesh(gl, { geometry, program });

			// Render single frame
			renderer.render({ scene: mesh });

			// Extract as data URL
			const url = canvas.toDataURL("image/png");
			setDataUrl(url);
			hasRendered.current = true;

			// Cleanup GL context immediately
			const loseContext = gl.getExtension("WEBGL_lose_context");
			if (loseContext) loseContext.loseContext();
		} catch (e) {
			console.error("WebGL render failed:", e);
		}
	}, [vertex, fragment, dimensions]);

	// Show canvas during render, then replace with img
	if (dataUrl && dimensions) {
		return (
			<img
				src={dataUrl}
				width={dimensions.width}
				height={dimensions.height}
				className="w-full h-full"
				{...props}
			/>
		);
	}

	return (
		<canvas
			ref={canvasRef}
			width={dimensions?.width}
			height={dimensions?.height}
			style={{ display: "none" }}
			{...props}
		/>
	);
};

import * as OGL from "ogl";
import type * as React from "react";
import { type FC, useEffect, useRef, useState } from "react";

export type WebglProps = React.ComponentPropsWithoutRef<"canvas"> & {
	vertex: string;
	fragment: string;
	time?: number;
	width?: number;
	height?: number;
};

export const WebglCanvas: FC<WebglProps> = ({
	vertex,
	fragment,
	time,
	width,
	height,
	...props
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const rendererRef = useRef<OGL.Renderer | null>(null);
	const programRef = useRef<OGL.Program | null>(null);
	const meshRef = useRef<OGL.Mesh | null>(null);
	const rafRef = useRef<number | null>(null);
	const startTimeRef = useRef<number>(Date.now());

	const [dimensions, setDimensions] = useState<{
		width: number;
		height: number;
	} | null>(null);

	// Auto-size from parent if width/height not provided
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
					setDimensions({ width: rect.width, height: rect.height });
				}
			}
		};

		const resizeObserver = new ResizeObserver(updateSize);
		resizeObserver.observe(parent);

		// Initial size
		const rect = parent.getBoundingClientRect();
		setDimensions({ width: rect.width, height: rect.height });

		return () => resizeObserver.disconnect();
	}, [width, height]);

	useEffect(() => {
		if (!canvasRef.current || !dimensions) return;

		const renderer = new OGL.Renderer({
			canvas: canvasRef.current,
			width: dimensions.width,
			height: dimensions.height,
		});
		const gl = renderer.gl;

		const geometry = new OGL.Triangle(gl);
		const program = new OGL.Program(gl, {
			vertex,
			fragment,
			uniforms: {
				uTime: { value: 0 },
				uResolution: { value: [dimensions.width, dimensions.height] },
			},
		});
		const mesh = new OGL.Mesh(gl, { geometry, program });

		rendererRef.current = renderer;
		programRef.current = program;
		meshRef.current = mesh;

		return () => {
			rendererRef.current = null;
			programRef.current = null;
			meshRef.current = null;
		};
	}, [vertex, fragment, dimensions]);

	// Controlled mode: update from time prop
	useEffect(() => {
		if (time === undefined) return;
		if (!rendererRef.current || !programRef.current || !meshRef.current) return;

		programRef.current.uniforms.uTime.value = time;
		rendererRef.current.render({ scene: meshRef.current });
	}, [time]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Required
	useEffect(() => {
		if (time !== undefined) return;
		if (!rendererRef.current || !programRef.current || !meshRef.current) return;
		if (!canvasRef.current) return;

		let isVisible = false;

		const observer = new IntersectionObserver(
			(entries) => {
				isVisible = entries[0]?.isIntersecting ?? false;
			},
			{ threshold: 0 },
		);

		observer.observe(canvasRef.current);

		const animate = () => {
			if (!rendererRef.current || !programRef.current || !meshRef.current)
				return;

			if (isVisible) {
				const elapsed = (Date.now() - startTimeRef.current) / 1000;
				programRef.current.uniforms.uTime.value = elapsed;
				rendererRef.current.render({ scene: meshRef.current });
			}

			rafRef.current = requestAnimationFrame(animate);
		};

		rafRef.current = requestAnimationFrame(animate);

		return () => {
			observer.disconnect();
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, [time, dimensions]);

	if (!dimensions) return <canvas ref={canvasRef} {...props} />;

	return (
		<canvas
			ref={canvasRef}
			width={dimensions.width}
			height={dimensions.height}
			{...props}
		/>
	);
};

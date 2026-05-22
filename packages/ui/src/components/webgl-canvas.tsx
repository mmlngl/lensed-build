import * as OGL from "ogl";
import type * as React from "react";
import { type FC, useEffect, useRef } from "react";

export type WebglProps = React.ComponentPropsWithoutRef<"canvas"> & {
	vertex: string;
	fragment: string;
	time?: number;
};

export const WebglCanvas: FC<WebglProps> = ({
	vertex,
	fragment,
	time,
	...props
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const rendererRef = useRef<OGL.Renderer | null>(null);

	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;
		const parent = canvas.parentElement;
		if (!parent) return;

		const renderer = new OGL.Renderer({ canvas, alpha: true });
		rendererRef.current = renderer;

		const gl = renderer.gl;

		const geometry = new OGL.Triangle(gl);

		const program = new OGL.Program(gl, {
			vertex,
			fragment,
			uniforms: {
				uTime: { value: 0 },
				uResolution: { value: [0, 0] },
			},
		});

		const mesh = new OGL.Mesh(gl, { geometry, program });

		let lastTime = 0;
		let elapsedTime = 0;

		function update(t: number) {
			requestAnimationFrame(update);
			const delta = (t - lastTime) * 0.001;
			lastTime = t;
			elapsedTime += delta;
			program.uniforms.uTime.value = elapsedTime;
			renderer.render({ scene: mesh });
		}

		requestAnimationFrame(update);

		function handleResize() {
			if (!parent || !rendererRef.current) return;
			const { clientWidth, clientHeight } = parent;
			rendererRef.current.setSize(clientWidth, clientHeight);
			program.uniforms.uResolution.value = [clientWidth, clientHeight];
		}

		handleResize();
		const observer = new ResizeObserver(handleResize);
		observer.observe(parent);

		return () => {
			observer.disconnect();
		};
	}, []);

	return <canvas ref={canvasRef} {...props} />;
};

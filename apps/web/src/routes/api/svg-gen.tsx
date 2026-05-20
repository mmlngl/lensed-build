import * as Core from "@studio-albums/core/domain";
import * as SvgRenderer from "@studio-albums/renderers/svg";
import { createFileRoute } from "@tanstack/react-router";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Runtime from "~lib/services/runtime.server";

export const Route = createFileRoute("/api/svg-gen")({
	server: {
		handlers: {
			GET: async () => {
				const program = Effect.gen(function* () {
					const renderer = yield* SvgRenderer.SvgRenderer;
					const pattern = Core.Patterns.Pattern.make({
						lattice: Core.Lattice.ObliqueLattice.make({
							a: 20,
							b: 100,
							angle: 13,
						}),
						motifs: [
							{
								motif: Core.Motifs.Circle.make({ d: 10, color: "#3498db" }),
								position: Core.Patterns.LatticePosition.make({
									a: 0.75,
									b: 0.75,
								}),
							},
						],
						canvas: Core.Canvas.Canvas.fromPreset("square500"),
					});
					return yield* renderer.render(pattern);
				});

				const exit = await Runtime.runtime.runPromiseExit(program);
				return Exit.match(exit, {
					onSuccess: (result) =>
						new Response(result, {
							headers: {
								// "Cache-Control": "public, max-age=300",
								// "CDN-Cache-Control": "max-age=3600, stale-while-revalidate=600",
								"Content-Type": "image/svg+xml",
							},
						}),
					onFailure: (cause) => {
						throw new Error(`Failed to requester\n${Cause.pretty(cause)}`);
					},
				});
			},
		},
	},
});

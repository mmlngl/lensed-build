import * as Core from "@studio-albums/core/domain";
import * as SvgRenderer from "@studio-albums/renderers/svg";
import { createFileRoute } from "@tanstack/react-router";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Option from "effect/Option";
import { PosterRepo } from "~lib/services/poster-repo.server";
import * as Runtime from "~lib/services/runtime.server";

export const Route = createFileRoute("/api/svg-gen/$slug")({
	server: {
		handlers: {
			GET: async ({ params: { slug } }) => {
				const program = Effect.gen(function* () {
					const renderer = yield* SvgRenderer.SvgRenderer;
					const repo = yield* PosterRepo;
					const posterOpt = yield* repo.getForSlug(slug);

					const poster = Option.getOrThrowWith(
						posterOpt,
						() => new Error(`No pattern found for slug: ${slug}`),
					);

					const output = yield* Core.Patterns.Pattern.decode(
						poster.pattern,
					).pipe(Effect.andThen((pattern) => renderer.render(pattern)));

					yield* Effect.log(output);

					return output;
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
						return new Response(`Internal error: ${cause}`, { status: 500 });
					},
				});
			},
		},
	},
});

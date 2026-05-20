import { createServerFn } from "@tanstack/react-start";
import { allPosters } from "content-collections";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import type * as Lib from "./lib";

export const loadAll = () => {
	const sortedPosts = allPosters.sort(
		(a, b) => b.publishedOn.getTime() - a.publishedOn.getTime(),
	);

	return Promise.resolve(sortedPosts);
};

export const loadAllServerFn = createServerFn({ method: "GET" }).handler(
	loadAll,
);

export interface PosterRepoTrait {
	all(): Effect.Effect<Lib.PosterModelList>;
	getForSlug(slug: string): Effect.Effect<Option.Option<Lib.PosterModel>>;
}

export class PosterRepo extends Context.Service<PosterRepo, PosterRepoTrait>()(
	"PosterRepo",
) {
	static layer = Layer.succeed(
		PosterRepo,
		PosterRepo.of({
			all: Effect.fn("PosterRepo.all")(function* () {
				const sortedPosts = allPosters.sort(
					(a, b) => b.publishedOn.getTime() - a.publishedOn.getTime(),
				);
				return yield* Effect.succeed(sortedPosts);
			}),

			getForSlug: Effect.fn("PosterRepo.getForSlug")(function* (slug) {
				const found = allPosters.find((poster) => poster.slug === slug);
				return yield* Effect.succeed(Option.fromUndefinedOr(found));
			}),
		}),
	);
}

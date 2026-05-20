import { allPosters, type Poster } from "content-collections";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";

export interface PosterRepoTrait {
	all(): Effect.Effect<ReadonlyArray<Poster>>;
	getForSlug(slug: string): Effect.Effect<Option.Option<Poster>>;
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

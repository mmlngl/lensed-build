import { createFileRoute, Link } from "@tanstack/react-router";
import * as Poster from "~entities/poster/server";
import { PosterPreviewWidget } from "~lib/widgets/poster-preview";

export const Route = createFileRoute("/p/")({
	component: PosterIndex,
	loader: async () => {
		const posters = await Poster.loadAllServerFn();
		return { posters };
	},
});

function PosterIndex() {
	const { posters } = Route.useLoaderData();
	return (
		<div className="p-8">
			<Link to="/" className="mb-8 inline-block">
				Home
			</Link>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5">
				{posters.map((poster) => (
					<PosterPreviewWidget poster={poster} key={poster.slug} />
				))}
			</div>
		</div>
	);
}

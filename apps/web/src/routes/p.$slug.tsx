import { createFileRoute, notFound } from "@tanstack/react-router";
import { allPosters } from "content-collections";
import { PosterWidget } from "~lib/widgets/poster";

export const Route = createFileRoute("/p/$slug")({
	component: PosterDetail,
	loader: async ({ params }) => {
		const poster = allPosters.find((p) => p.slug === params.slug);
		if (!poster) throw notFound();
		return { poster };
	},
});

function PosterDetail() {
	const { poster } = Route.useLoaderData();
	return (
		<div>
			<PosterWidget poster={poster} />
		</div>
	);
}

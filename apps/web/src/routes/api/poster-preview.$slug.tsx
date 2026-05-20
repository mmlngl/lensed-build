import { createFileRoute } from "@tanstack/react-router";
import { allPosters } from "content-collections";

export const Route = createFileRoute("/api/poster-preview/$slug")({
	server: {
		handlers: {
			GET: async ({ params: { slug } }) => {
				const poster = allPosters.find((p) => p.slug === slug);

				if (!poster) {
					return new Response("Poster not found", { status: 404 });
				}

				// TODO: Server-side WebGL render
				// For now, return placeholder or trigger Remotion render

				return new Response("Not implemented yet", {
					status: 501,
					headers: {
						"Content-Type": "text/plain",
					},
				});
			},
		},
	},
});

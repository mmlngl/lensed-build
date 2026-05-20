import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: PublicHome,
});

function PublicHome() {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			<img src="/api/svg-gen" alt="Pattern" />
		</div>
	);
}

import { createFileRoute } from "@tanstack/react-router";
import { CrystallographicCanvas } from "~lib/widgets/crystallographic-canvas";

export const Route = createFileRoute("/crystal")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<CrystallographicCanvas />
		</div>
	);
}

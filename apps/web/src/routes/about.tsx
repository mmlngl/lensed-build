import { T } from "@btrt/ui/components/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<header className="mb-18">
				<T.H1 className="text-balance font-mono text-[6rem] sm:text-[10rem] leading-20 sm:leading-30 uppercase my-12">
					About
				</T.H1>
				<div className="max-w-2xl">
					<T.Lead>
						The circumflex is a diacritic in the Latin and Greek scripts that is
						also used in the written forms of many languages and in various
						romanization and transcription schemes.
					</T.Lead>
				</div>
			</header>

			<div className="flex flex-col gap-8 max-w-md">
				<T.P>Stuff and things</T.P>
			</div>
		</div>
	);
}

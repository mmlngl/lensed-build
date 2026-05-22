import { T } from "@btrt/ui/components/typography";
import { createFileRoute } from "@tanstack/react-router";
import { allSkills, type Skill } from "content-collections";
import { ContentSection } from "~lib/widgets/content-section";
import { SkillList } from "~lib/widgets/skill-list";

export const Route = createFileRoute("/skills/")({
	component: SkillsHome,
	loader: () => {
		const featuredAndGroupedByDiscipline = allSkills.reduce(
			(acc, skill) => {
				acc[skill.discipline] = acc[skill.discipline] || [];
				acc[skill.discipline].push(skill);
				return acc;
			},
			{} as Record<string, Skill[]>,
		);

		return {
			skills: featuredAndGroupedByDiscipline,
		};
	},
});

function SkillsHome() {
	const { skills } = Route.useLoaderData();
	return (
		<div>
			<header className="mb-18">
				<T.H1 className="text-balance font-mono text-[6rem] sm:text-[10rem] leading-20 sm:leading-30 uppercase my-12">
					Skills
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
				{Object.entries(skills).map(([discipline, skillList]) => (
					<ContentSection key={discipline} heading={discipline}>
						<SkillList skills={skillList} />
					</ContentSection>
				))}
			</div>
		</div>
	);
}

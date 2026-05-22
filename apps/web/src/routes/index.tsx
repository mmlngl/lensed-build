import { T } from "@btrt/ui/components/typography";
import { createFileRoute, Link } from "@tanstack/react-router";
import { allSkills, type Skill } from "content-collections";
import { ContentSection } from "~lib/widgets/content-section";
import { SkillList } from "~lib/widgets/skill-list";

export const Route = createFileRoute("/")({
	component: PublicHome,
	loader: () => {
		const featuredAndGroupedByDiscipline = allSkills.reduce(
			(acc, skill) => {
				acc[skill.discipline] = acc[skill.discipline] || [];
				if (skill.isFeatured) acc[skill.discipline].push(skill);
				return acc;
			},
			{} as Record<string, Skill[]>,
		);

		return {
			skills: featuredAndGroupedByDiscipline,
		};
	},
});

function PublicHome() {
	const { skills } = Route.useLoaderData();
	return (
		<div>
			<header>
				<T.H1 className="text-balance font-mono text-[6rem] sm:text-[10rem] leading-20 sm:leading-30 uppercase my-12">
					Build The Right Thing
				</T.H1>
			</header>

			<div className="flex flex-col gap-8 max-w-md">
				{Object.entries(skills).map(([discipline, skillList]) =>
					skillList.length > 0 ? (
						<ContentSection
							key={discipline}
							heading={discipline}
							footer={
								<Link to="/skills" className="hover:text-primary">
									See More ⇝
								</Link>
							}
						>
							<SkillList skills={skillList} />
						</ContentSection>
					) : null,
				)}

				<ContentSection heading="About">
					<T.P>
						Nullam nec ultricies lectus. Aenean elit ante, lacinia fermentum
						hendrerit vel, porttitor et mi. Quisque euismod porttitor ex, nec
						feugiat felis iaculis eget. Cras lacus augue, placerat eget
						hendrerit vel, blandit nec enim. Quisque mattis fringilla eleifend.
						Duis dapibus sagittis diam, vitae ultrices tortor congue sit amet.
						Sed euismod nulla nulla, sit amet pretium lorem tempor in.{" "}
					</T.P>
				</ContentSection>
			</div>
		</div>
	);
}

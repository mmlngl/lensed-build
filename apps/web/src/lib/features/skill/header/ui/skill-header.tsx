import { H1, Lead } from "@btrt/ui/components/typography";
import type { FC } from "react";
import { useSkill } from "~lib/entities/skill";

export const SkillHeader: FC = () => {
	const skill = useSkill();
	return (
		<div className="container">
			<H1 className="text-balance font-mono text-[6rem] sm:text-[10rem] leading-20 sm:leading-30 uppercase my-12">
				{skill.name}
			</H1>
			<div className="max-w-2xl">
				<Lead>{skill.description}</Lead>
			</div>
		</div>
	);
};

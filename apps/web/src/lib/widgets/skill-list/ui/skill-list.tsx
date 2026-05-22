import type { ComponentPropsWithoutRef, FC } from "react";
import type { SkillModel } from "~lib/entities/skill";
import { SkillListItem } from "./skill-list-item";
import { cn } from "@btrt/ui/lib/utils";

export type SkillListProps = ComponentPropsWithoutRef<"ul"> & {
	skills: ReadonlyArray<SkillModel>;
};

export const SkillList: FC<SkillListProps> = ({
	skills,
	className,
	...props
}) => {
	return (
		<ul className={cn("flex flex-col gap-3 my-6", className)} {...props}>
			{skills.map((skill) => (
				<SkillListItem skill={skill} key={skill.slug} />
			))}
		</ul>
	);
};

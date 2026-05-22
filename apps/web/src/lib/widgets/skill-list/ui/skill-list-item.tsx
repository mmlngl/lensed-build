import { T } from "@btrt/ui/components/typography";
import { cn } from "@btrt/ui/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef, FC } from "react";
import type { SkillModel } from "~lib/entities/skill";

export type SkillListItemProps = ComponentPropsWithoutRef<"a"> & {
	skill: SkillModel;
};

export const SkillListItem: FC<SkillListItemProps> = ({
	skill,
	className,
	...props
}) => {
	return (
		<Link
			to="/skills/$slug"
			params={{ slug: skill.slug }}
			className={cn("flex items-end justify-between group", className)}
			{...props}
		>
			<span className="flex items-center">
				<span className="w-0 group-hover:w-6 transition-all">
					<span className="scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all text-primary text-3xl font-bold">
						➭
					</span>
				</span>
				<T.H3 className="group-hover:text-primary truncate">{skill.name}</T.H3>
			</span>

			<T.Small className="text-muted-foreground group-hover:text-primary mb-2">
				{skill.oneliner}
			</T.Small>
		</Link>
	);
};

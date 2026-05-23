import { T } from "@lensed/ui/components/typography";
import { Link } from "@tanstack/react-router";
import type { FC } from "react";
import { SafeMdxRenderer } from "safe-mdx";
import { mdxParse } from "safe-mdx/parse";
import { useSkill } from "~lib/entities/skill";

export const SkillContent: FC = () => {
	const skill = useSkill();
	const ast = mdxParse(skill.content);

	return (
		<SafeMdxRenderer
			markdown={skill.content}
			mdast={ast}
			components={{
				p({ children, ...props }) {
					return <T.P {...props}>{children}</T.P>;
				},
				h1({ children, ...props }) {
					return <T.H1 {...props}>{children}</T.H1>;
				},
				h2({ children, ...props }) {
					return <T.H2 {...props}>{children}</T.H2>;
				},
				h3({ children, ...props }) {
					return <T.H3 {...props}>{children}</T.H3>;
				},
				img: ({ src, alt }) => (
					<img src={src} alt={alt} loading="lazy" className="shadow-md" />
				),
				a({ children, href }) {
					if (href?.startsWith("/")) return <Link to={href}>{children}</Link>;
					return <a href={href}>{children}</a>;
				},
			}}
		/>
	);
};

import { P } from "@studio-albums/ui/components/typography";
import { Link } from "@tanstack/react-router";
import type { FC } from "react";
import { SafeMdxRenderer } from "safe-mdx";
import { mdxParse } from "safe-mdx/parse";
import { usePoster } from "~lib/entities/poster";

export const PosterContent: FC = () => {
	const poster = usePoster();
	const ast = mdxParse(poster.content);

	return (
		<div className="prose">
			<SafeMdxRenderer
				markdown={poster.content}
				mdast={ast}
				components={{
					p({ children, ...props }) {
						return <P {...props}>{children}</P>;
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
		</div>
	);
};

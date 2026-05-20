import { T } from "@studio-albums/ui/components/typography";
import { WebglCanvas } from "@studio-albums/ui/components/webgl-canvas";
import { WebglStaticCanvas } from "@studio-albums/ui/components/webgl-static-canvas";
import { Link } from "@tanstack/react-router";
import { type FC, useState } from "react";
import * as Entity from "~entities/poster";

export interface PosterPreviewWidgetProps {
	poster: Entity.PosterModel;
}

export const PosterPreviewWidget: FC<PosterPreviewWidgetProps> = ({
	poster,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Entity.PosterEntity poster={poster}>
			<Link
				to="/p/$slug"
				params={{ slug: poster.slug }}
				className="block"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className="w-full aspect-9/16">
					{isHovered ? (
						<WebglCanvas fragment={poster.frag} vertex={poster.vertex} />
					) : (
						<WebglStaticCanvas fragment={poster.frag} vertex={poster.vertex} />
					)}
				</div>
				<T.H3>{poster.title}</T.H3>
			</Link>
		</Entity.PosterEntity>
	);
};

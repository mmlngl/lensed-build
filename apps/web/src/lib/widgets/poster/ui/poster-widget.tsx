import type { FC } from "react";
import * as Entity from "~entities/poster";
import {
	PosterContent,
	PosterHeading,
	PosterImage,
} from "~lib/features/poster";

export interface PosterWidgetProps {
	poster: Entity.PosterModel;
}

export const PosterWidget: FC<PosterWidgetProps> = ({ poster }) => {
	return (
		<div className="mx-[5vw] my-[8vw]">
			<Entity.PosterEntity poster={poster}>
				<PosterImage />
				<PosterHeading />

				<div className="container mx-auto max-w-md">
					<PosterContent />
				</div>
			</Entity.PosterEntity>
		</div>
	);
};

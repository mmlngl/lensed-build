import { H1 } from "@studio-albums/ui/components/typography";
import type { FC } from "react";
import { usePoster } from "~lib/entities/poster";

export const PosterHeading: FC = () => {
	const poster = usePoster();
	return (
		<H1
			className="text-balance text-[6rem] sm:text-[10rem] leading-20 sm:leading-30 uppercase text-center my-12 mx-[6.5vw]"
			style={{ color: poster.themeColor }}
		>
			{poster.title}
		</H1>
	);
};

import { WebglCanvas } from "@studio-albums/ui/components/webgl-canvas";
import type { FC } from "react";
import { usePoster } from "~lib/entities/poster";

export const PosterImage: FC = () => {
	const poster = usePoster();
	return (
		<div
			className="border-[1vw] shadow-2xl min-h-[80vh]"
			style={{ borderColor: poster.themeColor }}
		>
			<WebglCanvas fragment={poster.frag} vertex={poster.vertex} />
		</div>
	);
};

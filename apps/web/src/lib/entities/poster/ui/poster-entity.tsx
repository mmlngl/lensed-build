import * as Option from "effect/Option";
import type { FC, PropsWithChildren } from "react";
import * as Lib from "../lib";

export const PosterEntity: FC<
	PropsWithChildren<{ poster: Lib.PosterModel }>
> = ({ poster, children }) => {
	return (
		<Lib.PosterEntityContext.Provider value={Option.some(poster)}>
			{children}
		</Lib.PosterEntityContext.Provider>
	);
};

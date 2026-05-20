import * as Option from "effect/Option";
import { useContext } from "react";
import * as Lib from "../lib";

export const usePoster = () => {
	const posterOption = useContext(Lib.PosterEntityContext);
	return Option.getOrThrowWith(
		posterOption,
		() => new Error("<PosterEntity> Not found"),
	);
};

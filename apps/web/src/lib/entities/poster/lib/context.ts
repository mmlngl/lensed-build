import * as Option from "effect/Option";
import { createContext } from "react";
import type * as Model from "./model";

export const PosterEntityContext = createContext<
	Option.Option<Model.PosterModel>
>(Option.none());

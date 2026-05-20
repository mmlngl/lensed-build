import * as Patterns from "./patterns";
import type * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";

export class RenderError extends Schema.ErrorClass<RenderError>("RenderError")({
	cause: Schema.Unknown,
}) {}

export interface RendererTrait<TTag extends string, T> {
	_tag: TTag;
	render: (pattern: Patterns.Pattern) => Effect.Effect<T, RenderError>;
}

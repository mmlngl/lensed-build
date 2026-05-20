import * as Schema from "effect/Schema";
import chroma from "chroma-js";

export const Color = Schema.String.pipe(
	Schema.check(
		Schema.makeFilter((input) =>
			chroma.valid(input)
				? undefined
				: {
						path: ["color"],
						issue: "Invalid Chromajs colour",
					},
		),
	),
	Schema.annotate({ description: "Any chroma-js compatible color" }),
);

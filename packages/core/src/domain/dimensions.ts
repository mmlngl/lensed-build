import * as Schema from "effect/Schema";

export const Length = Schema.Number.pipe(
	Schema.check(Schema.isGreaterThan(0)),
	Schema.annotate({
		title: "Length",
	}),
);

export type Length = typeof Length.Type;

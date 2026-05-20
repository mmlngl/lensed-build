import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import * as Canvases from "./canvas";
import * as Lattices from "./lattice";
import * as Motifs from "./motifs";

export const LatticePosition = Schema.Struct({
	a: Schema.Number.pipe(
		Schema.check(Schema.isBetween({ minimum: 0, maximum: 1 })),
		Schema.annotate({
			description: "Fractional coordinate along lattice vector a₁ (0-1)",
			examples: [0.25, 0.5, 0.75],
		}),
	),
	b: Schema.Number.pipe(
		Schema.check(Schema.isBetween({ minimum: 0, maximum: 1 })),
		Schema.annotate({
			description: "Fractional coordinate along lattice vector a₂ (0-1)",
			examples: [0.25, 0.5, 0.75],
		}),
	),
});

export type LatticePosition = typeof LatticePosition.Type;

export class Pattern extends Schema.TaggedClass<Pattern>()("pattern", {
	lattice: Lattices.AnyLattice.pipe(
		Schema.withConstructorDefault(
			Effect.succeed(Lattices.SquareLattice.make({ a: 100 })),
		),
	),
	motifs: Schema.Array(
		Schema.Struct({
			motif: Motifs.AnyMotif,
			position: LatticePosition.pipe(
				Schema.withConstructorDefault(
					Effect.succeed(
						LatticePosition.make({
							a: 0,
							b: 0,
						}),
					),
				),
				Schema.annotate({
					title: "Motif Position",
					description:
						"Fractional coordinates of the motif within the unit cell",
				}),
			),
		}),
	),
	canvas: Canvases.Canvas.pipe(
		Schema.withConstructorDefault(
			Effect.succeed(Canvases.Canvas.fromPreset("square500")),
		),
	),
}) {
	static decode = Schema.decodeUnknownEffect(Pattern);
}

export declare namespace Pattern {
	export type Type = typeof Pattern.Type;
	export type Encoded = Schema.Codec.Encoded<typeof Pattern>;
}

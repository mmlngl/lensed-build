import * as Schema from "effect/Schema";
import * as Effect from "effect/Effect";

export type Vector = readonly [number, number];
export interface LatticeVectors {
	readonly a1: Vector;
	readonly a2: Vector;
}

export const LatticeParameter = Schema.Number.pipe(
	Schema.check(Schema.isGreaterThan(0)),
	Schema.annotate({
		title: "Lattice Parameter",
		description: "A unit of distance within the lattice",
	}),
);

export type LatticeParameter = typeof LatticeParameter.Type;

export const AngleInDegrees = Schema.Number.pipe(
	Schema.check(Schema.isBetween({ minimum: 0, maximum: 180 })),
	Schema.annotate({
		title: "Angle (°)",
		description: "Angle between lattice vectors",
	}),
);

export type AngleInDegrees = typeof AngleInDegrees.Type;

//**********
// LATTICES
// **********

interface Lattice {
	vectors: Effect.Effect<LatticeVectors>;
}

// Square Lattice

export class SquareLattice
	extends Schema.TaggedClass<SquareLattice>()(
		"square",
		{
			a: LatticeParameter,
		},
		{
			title: "Square Lattice",
			description:
				"A square lattice with lattice parameter `a` along both axes",
		},
	)
	implements Lattice
{
	get vectors() {
		return Effect.succeed({
			a1: [this.a, 0] as const,
			a2: [0, this.a] as const,
		});
	}
}

export declare namespace SquareLattice {
	export type Type = typeof SquareLattice.Type;
	export type Encoded = Schema.Codec.Encoded<typeof SquareLattice>;
}

// Rectangular Lattice

export class RectangularLattice
	extends Schema.TaggedClass<RectangularLattice>()(
		"rectangular",
		{
			a: LatticeParameter,
			b: LatticeParameter,
		},
		{
			title: "Rectangular Lattice",
			description:
				"A rectangular lattice with two lattice parameters `a` and `b` along perpendicular axes",
		},
	)
	implements Lattice
{
	get vectors() {
		return Effect.succeed({
			a1: [this.a, 0] as const,
			a2: [0, this.b] as const,
		});
	}
}

export declare namespace RectangularLattice {
	export type Type = typeof RectangularLattice.Type;
	export type Encoded = Schema.Codec.Encoded<typeof RectangularLattice>;
}

// Hexagonal Lattice

export class HexagonalLattice
	extends Schema.TaggedClass<HexagonalLattice>()(
		"hexagonal",
		{
			a: LatticeParameter,
		},
		{
			title: "Hexagonal Lattice",
			description:
				"A hexagonal lattice with a lattice parameter `a` along the hexagonal axes",
		},
	)
	implements Lattice
{
	get vectors() {
		const a = this.a;
		return Effect.succeed({
			a1: [a, 0] as const,
			a2: [a / 2, (a * Math.sqrt(3)) / 2] as const,
		});
	}
}

export declare namespace HexagonalLattice {
	export type Type = typeof HexagonalLattice.Type;
	export type Encoded = Schema.Codec.Encoded<typeof HexagonalLattice>;
}

// Oblique Lattice

export class ObliqueLattice
	extends Schema.TaggedClass<ObliqueLattice>()(
		"oblique",
		{
			a: LatticeParameter,
			b: LatticeParameter,
			angle: AngleInDegrees,
		},
		{
			title: "Oblique Lattice",
			description:
				"An oblique lattice with lattice parameters `a` and `b` along the axes and an angle `angle` between them",
		},
	)
	implements Lattice
{
	get vectors() {
		const a = this.a;
		const b = this.b;
		const angleRad = (this.angle * Math.PI) / 180;
		return Effect.succeed({
			a1: [a, 0] as const,
			a2: [b * Math.cos(angleRad), b * Math.sin(angleRad)] as const,
		});
	}
}

export declare namespace ObliqueLattice {
	export type Type = typeof ObliqueLattice.Type;
	export type Encoded = Schema.Codec.Encoded<typeof ObliqueLattice>;
}

// Any Lattice

export const AnyLattice = Schema.Union([
	SquareLattice,
	RectangularLattice,
	HexagonalLattice,
	ObliqueLattice,
]);

export type AnyLattice = typeof AnyLattice.Type;

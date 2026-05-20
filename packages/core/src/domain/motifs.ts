import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import * as Colors from "./color";
import * as Dimensions from "./dimensions";

const MotifFields = {
	color: Colors.Color.pipe(
		Schema.withConstructorDefault(Effect.succeed("black")),
	),
};

// Circle

export const Circle = Schema.TaggedStruct("circle", {
	...MotifFields,
	d: Dimensions.Length.pipe(
		Schema.annotate({
			title: "Diameter",
			description: "The diameter of the circle.",
		}),
	),
});

export type Circle = typeof Circle.Type;

// Rectangle

export const Rectangle = Schema.TaggedStruct("rectangle", {
	...MotifFields,
	a: Dimensions.Length,
	b: Dimensions.Length,
}).pipe(
	Schema.annotate({
		title: "Rectangle Motif",
		description: "A rectangle with width `a`, height `b` and color, `color`.",
	}),
);

export type Rectangle = typeof Rectangle.Type;

// Ellipse

export const Ellipse = Schema.TaggedStruct("ellipse", {
	...MotifFields,
	rx: Dimensions.Length.pipe(
		Schema.annotate({
			title: "Horizontal Radius",
			description: "The horizontal radius of the ellipse.",
		}),
	),
	ry: Dimensions.Length.pipe(
		Schema.annotate({
			title: "Vertical Radius",
			description: "The vertical radius of the ellipse.",
		}),
	),
}).pipe(
	Schema.annotate({
		title: "Ellipse Motif",
		description:
			"An ellipse with horizontal radius `rx`, vertical radius `ry` and color, `color`.",
	}),
);

export type Ellipse = typeof Ellipse.Type;

// Polygon

export const Polygon = Schema.TaggedStruct("polygon", {
	...MotifFields,
	sides: Schema.Number.pipe(
		Schema.check(Schema.isInt()),
		Schema.check(Schema.isGreaterThanOrEqualTo(3)),
		Schema.annotate({
			title: "Sides",
			description: "Number of sides (≥3).",
		}),
	),
	r: Dimensions.Length.pipe(
		Schema.annotate({
			title: "Radius",
			description: "Distance from center to vertex.",
		}),
	),
}).pipe(
	Schema.annotate({
		title: "Polygon Motif",
		description:
			"A polygon with `sides` sides and radius `r`, and color, `color`.",
	}),
);

export type Polygon = typeof Polygon.Type;

// Star

export const Star = Schema.TaggedStruct("star", {
	...MotifFields,
	points: Schema.Number.pipe(
		Schema.check(Schema.isInt()),
		Schema.check(Schema.isGreaterThanOrEqualTo(3)),
		Schema.annotate({
			title: "Points",
			description: "Number of star points (≥3).",
		}),
	),
	outerRadius: Dimensions.Length.pipe(
		Schema.annotate({
			title: "Outer Radius",
			description: "Distance from center to outer points.",
		}),
	),
	innerRadius: Dimensions.Length.pipe(
		Schema.annotate({
			title: "Inner Radius",
			description: "Distance from center to inner points.",
		}),
	),
}).pipe(
	Schema.annotate({
		title: "Star Motif",
		description:
			"A star with `points` points, outer radius `outerRadius` and inner radius `innerRadius`.",
	}),
);

export type Star = typeof Star.Type;

// Svg

export const Svg = Schema.TaggedStruct("svg", {
	...MotifFields,
	svg: Schema.String.pipe(
		Schema.annotate({
			title: "SVG Content",
			description: "Raw SVG markup (paths, masks, images, filters, etc.)",
		}),
	),
	viewBox: Schema.optional(
		Schema.Struct({
			x: Schema.Number,
			y: Schema.Number,
			width: Schema.Number,
			height: Schema.Number,
		}),
	).pipe(
		Schema.annotate({
			title: "ViewBox",
			description: "Optional viewBox for the SVG content",
		}),
	),
}).pipe(
	Schema.annotate({
		title: "SVG Motif",
		description:
			"Raw SVG fragment supporting full SVG spec (paths, masks, images, filters, patterns, gradients, etc.)",
	}),
);

export type Svg = typeof Svg.Type;

// Any Motif

export const AnyMotif = Schema.Union([
	Circle,
	Rectangle,
	Ellipse,
	Polygon,
	Star,
	Svg,
]);

export type AnyMotif = typeof AnyMotif.Type;

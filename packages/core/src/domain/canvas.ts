import * as Schema from "effect/Schema";
import * as Dimensions from "./dimensions";

const PresetKind = Schema.Literals([
	"square500",
	"square1000",
	"hd",
	"instagram",
]);

const presets: Record<
	typeof PresetKind.Type,
	Schema.Codec.Encoded<typeof Canvas>
> = {
	square500: { width: 500, height: 500 },
	square1000: { width: 1000, height: 1000 },
	hd: { width: 1920, height: 1080 },
	instagram: { width: 1080, height: 1080 },
} as const;

export class Canvas extends Schema.Class<Canvas>("Canvas")({
	width: Dimensions.Length,
	height: Dimensions.Length,
}) {
	static fromPreset(kind: typeof PresetKind.Type): Canvas {
		return Canvas.make(presets[kind]);
	}
}

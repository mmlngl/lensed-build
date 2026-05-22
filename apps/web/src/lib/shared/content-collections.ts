import { defineCollection, defineConfig } from "@content-collections/core";
import * as Schema from "effect/Schema";
import * as Effect from "effect/Effect";

const Skill = Schema.Struct({
	name: Schema.String,
	slug: Schema.String,
	oneliner: Schema.String,
	isFeatured: Schema.Boolean.pipe(
		Schema.optionalKey,
		Schema.withConstructorDefault(Effect.succeed(false)),
	),
	description: Schema.String,
	category: Schema.String,
	discipline: Schema.String,
	themeColor: Schema.String,
	fragmentShader: Schema.String,
	vertexShader: Schema.String.pipe(
		Schema.optionalKey,
		Schema.withConstructorDefault(
			Effect.succeed(`
      attribute vec2 uv;
      attribute vec2 position;

      void main() {
        gl_Position = vec4(position, 0, 1);
      }
    `),
		),
	),
	content: Schema.String,
});

const skills = defineCollection({
	name: "skills",
	directory: "../../../content/skills",
	include: "*.mdx",
	schema: Schema.toStandardSchemaV1(Skill),
	transform: (data) => Schema.encodePromise(Skill)(Skill.make(data)),
});

const config = defineConfig({
	content: [skills],
});

export default config;

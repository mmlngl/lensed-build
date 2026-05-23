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
	category: Schema.String.pipe(
		Schema.annotate({
			title: "category",
			description: "The purpose of the skill",
			examples: ["convincing", "discovery"],
		}),
	),
	discipline: Schema.Literals(["Dev", "PM", "Design"]),
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

const GuidePage = Schema.Struct({
	title: Schema.String,
	slug: Schema.String,
	order: Schema.Number,
	description: Schema.String,
	category: Schema.String,
	content: Schema.String,
});

const skills = defineCollection({
	name: "skills",
	directory: "../../../content/skills",
	include: "*.mdx",
	schema: Schema.toStandardSchemaV1(Skill),
	transform: (data) => Schema.encodePromise(Skill)(Skill.make(data)),
});

const guides = defineCollection({
	name: "guides",
	directory: "../../../content/guide",
	include: "*.mdx",
	schema: Schema.toStandardSchemaV1(GuidePage),
	transform: (data) => Schema.encodePromise(GuidePage)(GuidePage.make(data)),
});

const config = defineConfig({
	content: [skills, guides],
});

export default config;

import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import * as Schema from "effect/Schema";

const PosterSchema = Schema.Struct({
	content: Schema.String,
	publishedOn: Schema.DateFromString,
	slug: Schema.String,
	title: Schema.String,
	isFeatured: Schema.optional(Schema.Boolean),
	pattern: Schema.optional(Schema.Any),
	themeColor: Schema.String,
	vertex: Schema.String,
	frag: Schema.String,
});

const posters = defineCollection({
	name: "posters",
	directory: "./content/posters",
	include: "*.mdx",
	schema: Schema.toStandardSchemaV1(PosterSchema),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document, {
			rehypePlugins: [],
			remarkPlugins: [],
		});
		return {
			isFeatured: false,
			...document,
			mdx,
		};
	},
});

const config = defineConfig({
	content: [posters],
});

export default config;

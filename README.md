# Isohedral

## Problem Statement

Users need a way to generate deterministic, crystallographic SVG patterns programmatically. Currently, there's no simple tool that lets you define a lattice structure, place motifs within unit cells, and render the result as clean, reusable SVG output. Existing tools either produce raster output, generate bloated SVG markup, or lack mathematical rigor in their tiling systems.

## Solution

Build a minimal pattern generation system that takes a Pattern specification (lattice type, motif position, canvas size) and renders it as an SVG file. The system uses Effect TS for type-safe schemas and services, follows crystallographic principles (lattice-native coordinates, unit cell expansion), and produces compact SVG output using symbolic instancing.
The MVP supports square lattices only, hardcoded circle motifs, and generates deterministic output that can be piped to a file via CLI.

## User Stories

1.  As a generative artist, I want to define a square lattice pattern with a single motif position, so that I can generate tiled SVG artwork
2.  As a developer, I want to specify canvas dimensions in pixels, so that the output fits my target medium (web, print, social media)
3.  As a user, I want to specify fractional coordinates (0-1) for motif placement, so that I can position motifs anywhere within the unit cell
4.  As a user, I want the renderer to calculate how many unit cells fit my canvas automatically, so that I don't have to do math manually
5.  As a developer, I want the SVG to use lattice-native viewBox coordinates, so that the output preserves geometric structure and can be rescaled without regenerating
6.  As a CLI user, I want to run a generate command that outputs SVG to stdout, so that I can pipe it to a file or process it further
7.  As a developer, I want all schemas validated with Effect Schema, so that invalid patterns are caught at runtime with clear error messages
8.  As a contributor, I want the rendering logic in an Effect service, so that it can be tested in isolation and composed with other services
9.  As a user, I want the system to follow the domain language defined in CONTEXT.md (Lattice, Pattern, Motif, Unit Cell, Basis), so that the codebase is consistent and navigable
10. As a developer, I want architectural decisions documented in ADRs, so that I understand why certain choices were made (SVG AST, motif-local transforms, lattice-native viewBox, etc.)

## Implementation Decisions

### Domain Model

- Pattern schema defines the complete input: lattice parameter a, motif position (fractional coordinates), and canvasSize (width/height in pixels)
- Fractional coordinates are constrained to 0, 1 using Schema.isBetween
- Canvas dimensions are positive integers using Schema.isInt() and Schema.isGreaterThan(0)
- Pattern is a tagged struct with \_tag: "pattern" for future discriminated unions

### Rendering Architecture

- SvgRenderer service implements the core rendering logic as an Effect service
- Renderer calculates unit cell count: nx = ceil(width / a), ny = ceil(height / a)
- For each cell (i, j), place a circle at (i + position.a) _ a, (j + position.b) _ a
- Circle properties hardcoded: radius = 30% of cell size, fill = #FF5733
- SVG viewBox uses lattice coordinates, width/height attributes use canvas pixels (per ADR-0003)
  Effect Integration
- Full Effect runtime with services and layers (per architectural decision during grilling session)
- SvgRenderer.layer provides the renderer implementation
- CLI command uses Effect.gen and provides the layer at runtime
- Branded SvgString type for type safety at the boundary

### CLI Interface

- generate command outputs SVG to stdout
- No arguments required (pattern is currently hardcoded)
- User pipes output to file: pnpm run --silent exec generate > output.svg

## Modules Built

1.  packages/core/src/domain/pattern/schema.ts - Pattern schema with validation
2.  packages/core/src/domain/renderers/svg.ts - SvgRenderer service and implementation
3.  apps/cli/src/Generate/command.ts - CLI command wiring Pattern to SvgRenderer

## Testing Decisions

### What Makes a Good Test

- Test external behavior, not implementation details
- Test the Effect returned by the service, not internal functions
- Use @effect/vitest for Effect-aware test utilities
- Provide layers explicitly in tests using Effect.provide()

### Modules to Test

- SvgRenderer - the core rendering logic
  - Validates SVG structure (viewBox, width, height, xmlns)
  - Validates cell count calculation for non-square canvases
  - Validates fractional positioning of circles

## Prior Art

- New test file created: packages/core/src/domain/renderers/svg.test.ts
- Uses it.effect() for Effect-based tests
- Pattern instantiated via Pattern.Pattern.make()

## Out of Scope

- Multiple lattice types (rectangular, hexagonal, oblique) - square only for MVP
- Custom motif definitions - circles are hardcoded
- Color palette system - single hardcoded color
- Seed-based randomness - no parametric mutations yet
- Transforms (rotate, scale, translate) - no transform system
- Multiple motifs in basis - single motif per pattern
- SVG <defs> + <use> instancing - inline circles for simplicity
- AI integration - no LLM-driven pattern generation yet
- Web interface - CLI only

## Further Notes

### Next Steps Beyond MVP

After the MVP is validated, the natural extensions are:

1.  Parameterize the motif - add motif field to Pattern schema (radius, color)
2.  Add seed - prepare for deterministic randomness (even if unused initially)
3.  Multiple lattice types - rectangular, hexagonal (requires lattice vector calculations)
4.  Basis array - support multiple motifs per unit cell
5.  Transforms - rotate, scale, translate operations on motifs
6.  Palette system - colors by index reference (per ADR-0005)
7.  Symbolic instancing - migrate to <defs> + <use> for large tilings

## Architectural Foundation

The grilling session established strong architectural foundations:

- 7 ADRs documenting key decisions
- CONTEXT.md with precise domain language
- Effect services architecture ready for complexity
- Lattice-native coordinate system for mathematical correctness
  These decisions will support future growth without requiring refactoring.)

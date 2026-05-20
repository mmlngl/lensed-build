# Isohedral

A procedural crystallographic SVG generation engine that produces deterministic tiling-based vector structures using lattice mathematics and symmetry operations.

## Language

**Lattice**:
The infinite periodic point array defined by basis vectors (a₁, a₂).
_Avoid_: Grid, tiling pattern

**Lattice vectors**:
The basis vectors (a₁, a₂) that define the periodicity of the lattice.
_Avoid_: Basis vectors (reserve "basis" for motif placement)

**Unit cell**:
The parallelogram region that tiles the lattice; the smallest repeating area.
_Avoid_: Tile, cell

**Basis**:
The collection of motifs placed at fractional coordinates within the unit cell.
_Avoid_: Atoms, elements

**Motif**:
A single geometric element (SVG shape or group) that can be placed and instanced, represented as an SVG AST.
_Avoid_: Tile, pattern, shape

**SVG AST**:
A structured JSON representation of SVG elements with tag, attributes, and children.
_Avoid_: SVG string, markup, template

**Tiled structure**:
The final geometric result after expanding the unit cell and basis across the lattice.
_Avoid_: Pattern, output, tiling

**Pattern**:
The complete specification for generating a tiled structure, including lattice type, basis, canvas size, palette, and seed.
_Avoid_: Config, template, blueprint

**Palette**:
An ordered array of colors referenced by index in motif attributes.
_Avoid_: Color scheme, theme

## Relationships

- A **Lattice** is defined by **lattice vectors** (a₁, a₂)
- A **Unit cell** exists within the **Lattice**
- A **Basis** contains one or more **Motifs** placed at fractional coordinates (0-1) within the **Unit cell**
- Each **Motif** in the **Basis** has an associated list of symmetry transformations
- Expanding the **Unit cell** + **Basis** across the **Lattice** using integer lattice coordinates produces a **Tiled structure**
- A **Motif** is defined as an **SVG AST** and rendered to `<defs>`, then instanced via `<use>` with transforms
- A **Pattern** specifies the complete generation parameters: lattice type, basis entries, canvas size, palette, and seed
- A **Palette** defines colors at the config level; motifs reference palette indices in their attributes
- All parametric mutations are seed-driven for deterministic reproducibility

## Example dialogue

> **Dev:** "When we define a hexagonal **Lattice**, does the **Motif** know about the six-fold symmetry?"
> **Domain expert:** "No — the **Motif** is just geometry. The **Basis** places it at specific fractional coordinates, and symmetry operations transform it during expansion."

> **Dev:** "If I change the **Palette** in a **Pattern**, do I need to regenerate the **Motifs**?"
> **Domain expert:** "No — **Motifs** reference palette indices. Change the **Palette**, and all motifs render with new colors automatically."

## Flagged ambiguities

- "basis" was initially ambiguous between lattice vectors and motif placement — resolved: **lattice vectors** define periodicity, **basis** is the collection of placed motifs.

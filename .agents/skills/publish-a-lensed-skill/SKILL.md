---
name: publish-a-lensed-skill
description: End-to-end workflow for publishing a Lensed Build skill. Use when user asks to write a new skill, create a skill, or publish a skill to the Lensed Build codebase.
---

# Publish a Lensed Skill

Complete workflow: draft skill → place in repo → publish documentation.

## Step 1 — Draft the Skill

Load the `write-a-skill` skill and follow its process:

1. Gather requirements from user
2. Draft SKILL.md
3. Review with user

## Step 2 — Place the Skill

After user approves the draft:

```
packages/skills/skills/<category>/<skill-name>/SKILL.md
```

Categories (bucket folders):

- `convincing/` — tasks for persuasion
- `critical-thinking/` — tasks for evaluation and analysis
- `delivery/` — tasks for execution and delivery

**Update bucket README** at `packages/skills/skills/<category>/README.md`:

```md
- **[skill-name](./skill-name/SKILL.md)** — One-line description.
```

**Update top-level README** at `packages/skills/README.md`:
Add link under the appropriate category.

## Step 3 — Publish Documentation

Create companion docs at:

```
apps/web/content/skills/<skill-name>.mdx
```

### Frontmatter Template

```mdx
---
name: /<skill-name>
slug: <skill-name>
category: <category>
isFeatured: false
discipline: <skill-discipline>
oneliner: <oneline value proposition>
description: From the SKILL.md description
themeColor: black
fragmentShader: |
  // Black/white GLSL shader (unique per skill)
---
```

### Fragment Shader Guidelines

Create a unique black/white procedural shader. Use these patterns:

- Concentric rings
- Radial rays
- Grid/mosaic
- Noise/grain
- Wave interference

Must use:

- `precision highp float;`
- `uniform float uTime;`
- `uniform vec2 uResolution;`
- Output via `gl_FragColor = vec4(vec3(brightness), 1.0);`

### Content Structure

Write 100-200 words covering:

1. **The problem** — What goes wrong without this skill (the disease)
2. **The moment** — What most people miss
3. **Why it exists** — How this skill helps
4. **The gut check** — One question to ask before shipping

Write in second person. Conversational. No fluff.

## If User Asks for a New Skill

Start with the `write-a-skill` skill, then follow steps 2 and 3 above.

## If User Asks to Document an Existing Skill

Skip step 1. Go directly to step 3 (documentation). Reference the existing SKILL.md for content.

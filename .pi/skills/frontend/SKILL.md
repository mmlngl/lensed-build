---
name: frontend
description: Builds React UI components using Feature-sliced Design layers
---

# Frontend

When you build React components, follow strict Feature-Sliced Design ("FSD") conventions for organising code.

Every component is a [componentType]:

- `Entity` – The business terms the product works with (e.g. User, Badge, BlogPost). Owns the type, context, and hook for one domain object.

- `Feature` – The main interactions users care about. Optimise for a newcomer to quickly discover large important areas.

- `Widget` – Large self-sufficient blocks of UI. Most useful when reused across pages, or when a page has multiple large independent blocks.

---

## Entity pattern

Each Entity owns three concerns:

1. **Model** – the frontend type, derived from the domain's `Encoded` type (JSON-safe, no server-only dependencies)
2. **Context** – a React context defaulting to `Option.none()`, plus a `use[Entity]FromContext` hook
3. **Provider** – a `[Entity]Entity` component that wraps children with the context value

### File structure

```
entities/
  [EntityName]/
    model/
      [entity-name]-model.ts   ← type BadgeModel = Domain.Badge.Encoded
      index.ts                 ← re-exports
    ui/
      [entity-name]-context.ts ← createContext + use[Entity]FromContext hook
      [entity-name]-entity.tsx ← <[Entity]Entity> provider component
    index.ts                   ← re-exports model + ui
```

### Example: Badge

**`model/badge-model.ts`**

```ts
import type * as Domain from "@studio-albums/core/domain";
export type BadgeModel = Domain.Badges.Badge.Encoded;
```

**`ui/badge-context.ts`**

```ts
import { createContext, useContext } from "react";
import * as Option from "effect/Option";
import type * as Model from "../model";

export const BadgeContext = createContext<Option.Option<Model.BadgeModel>>(
  Option.none(),
);

export const useBadgeFromContext = (): Model.BadgeModel =>
  Option.getOrThrowWith(
    useContext(BadgeContext),
    () => new Error("useBadge must be used within a <BadgeEntity>"),
  );
```

**`ui/badge-entity.tsx`**

```tsx
import type { FC, PropsWithChildren } from "react";
import * as Option from "effect/Option";
import type * as Model from "../model";
import { BadgeContext } from "./badge-context";

export const BadgeEntity: FC<PropsWithChildren<{ badge: Model.BadgeModel }>> = (
  props,
) => (
  <BadgeContext.Provider value={Option.some(props.badge)}>
    {props.children}
  </BadgeContext.Provider>
);
```

**`index.ts`**

```ts
export * from "./model";
export * from "./ui/badge-entity";
export * from "./ui/badge-context";
```

---

## Widget pattern

Widgets receive the entity model as a prop, mount the `[Entity]Entity` provider, and render UI. Features and sub-components inside the widget call `use[Entity]FromContext()` — they never receive the model as a prop.

### File structure

```
widgets/
  [EntityName]/
    ui/
      [entity-name]-widget.tsx
    index.ts
```

### Example: BadgeWidget

```tsx
import type { FC } from "react";
import * as Entity from "~entities/badge";

export const BadgeWidget: FC<{ badge: Entity.BadgeModel }> = ({ badge }) => (
  <Entity.BadgeEntity badge={badge}>
    {/* Features and sub-components use useBadgeFromContext() */}
  </Entity.BadgeEntity>
);
```

---

## Data flow

```
Route loader
    ↓  badge: BadgeModel  (decoded on server, JSON-safe)
Route component
    ↓  <BadgeWidget badge={badge} />
BadgeWidget
    ↓  <BadgeEntity badge={badge}>   ← mounts context
        Features / sub-components
            → useBadgeFromContext()  ← reads context, no prop drilling
```

For collections, map over the data and render one Widget per item:

```tsx
badges.map((b) => <BadgeWidget key={b.slug} badge={b} />);
```

Each Widget creates its own context scope — `useBadgeFromContext()` inside each always returns the correct badge.

---

## General file structure (all component types)

```
[ComponentType]/
  [ComponentName]/
    ui/
      [ComponentName].tsx
    index.ts
```

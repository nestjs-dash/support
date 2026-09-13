# @nestjs-dash/support

Shared utilities and types used across the Adminify packages — the JSON-serializable schema/chart types that travel between `@nestjs-dash/core` (server) and `@nestjs-dash/design-system` (client), plus a couple of small runtime helpers. No dependencies of its own; this is the leaf of the whole dependency graph.

## Install

```bash
pnpm add @nestjs-dash/support
```

## What's in here

- **`SchemaNode`/`ComponentKind`/`JsonValue`/`JsonObject`** — the JSON-serializable server-rendered-UI tree that `@nestjs-dash/core`'s builders (`TextInput`, `TextColumn`, `Action`, …) produce and `@nestjs-dash/design-system`'s `renderSchemaNode` consumes.
- **`ChartSpec`/`ChartKind`/`ChartSeriesSpec`/`ChartRow`** — the JSON chart description produced by `@nestjs-dash/core`'s `BarChart`/`LineChart`/`PieChart` builders and rendered by `@nestjs-dash/design-system`'s `ChartWidget`. Lives here rather than in `@nestjs-dash/core` because `design-system` depends on `support` but not on `core`.
- **`BADGE_COLORS`/`BadgeColor`** — the Tailwind palette tokens `BadgeColumn.colors()` accepts.
- **`jsonTextareaFieldKey(name, property?)`** — builds the qualified `<column>.<property>` HTML field name used by `Textarea.make(name).json(property)`, so multiple property-scoped JSON textareas targeting the same column don't collide.
- **`escapeHtml(value)`** — minimal HTML-escaping helper.
- **`assertNever(value, message?)`** — exhaustiveness-check helper for switch statements over a union.
- **`compactObject(value)`** — returns a shallow copy of an object with every `undefined`-valued key removed.

## Usage

```ts
import { assertNever, compactObject, type ChartSpec } from '@nestjs-dash/support';

const spec: ChartSpec = {
  kind: 'bar',
  data: [{ month: 'Jan', total: 12 }],
  categoryKey: 'month',
  series: [{ key: 'total', label: 'Total' }],
};

compactObject({ a: 1, b: undefined }); // { a: 1 }
```

## Part of Adminify

This package is one piece of [Adminify](https://github.com/nestjs-dash/adminify), a NestJS-native admin framework. Most consumers will reach for `@nestjs-dash/core` and `@nestjs-dash/nestjs` directly rather than this package on its own.

## License

MIT

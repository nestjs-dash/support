export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export type JsonObject = { [key: string]: JsonValue };

export type ComponentKind =
  | 'schema'
  | 'text-input'
  | 'select'
  | 'checkbox'
  | 'toggle'
  | 'textarea'
  | 'radio'
  | 'date-picker'
  | 'date-time-picker'
  | 'color-picker'
  | 'code-editor'
  | 'tags-input'
  | 'rich-editor'
  | 'rich-box'
  | 'file-upload'
  | 'repeater'
  | 'section'
  | 'grid'
  | 'tabs'
  | 'tab'
  | 'html'
  | 'text-column'
  | 'icon-column'
  | 'image-column'
  | 'badge-column'
  | 'boolean-column'
  | 'date-column'
  | 'image-upload'
  | 'select-filter'
  | 'text-filter'
  | 'date-filter'
  | 'action'
  | 'edit-action'
  | 'delete-action'
  | 'restore-action'
  | 'create-action'
  | 'view-action'
  | 'bulk-action'
  | 'bulk-delete-action'
  | 'associate-action'
  | 'dissociate-action'
  | 'attach-action'
  | 'detach-action'
  | 'bulk-dissociate-action'
  | 'bulk-detach-action'
  | 'dialog';

export interface SchemaNode {
  kind: ComponentKind;
  name?: string;
  props: JsonObject;
  children?: SchemaNode[];
}

/**
 * The HTML `name`/value-lookup key for a `Textarea.make(name).json(property)` field.
 *
 * A property-scoped JSON textarea can't submit or display under the bare column `name` —
 * multiple property fields (e.g. one per locale) commonly target the same JSON column, and a
 * shared HTML `name` would collide (duplicate form fields, duplicate React keys). Qualifying it
 * as `<column>.<property>` keeps each field's submission and default value independent.
 *
 * Shared by `@nestjs-dash/core`'s `parseJsonTextareaFields`/`stringifyJsonTextareaFields` (server)
 * and `@nestjs-dash/design-system`'s `schema-form.tsx` textarea renderer (client) — keep in sync.
 */
export function jsonTextareaFieldKey(name: string, property?: string): string {
  return property ? `${name}.${property}` : name;
}

/** Tailwind palette tokens available to `BadgeColumn.colors()`. */
export const BADGE_COLORS = [
  'gray',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;

export type BadgeColor = (typeof BADGE_COLORS)[number];

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/** Chart kinds `@nestjs-dash/core`'s chart builders (`BarChart`/`LineChart`/`PieChart`) can produce. */
export type ChartKind = 'bar' | 'line' | 'pie';

export interface ChartSeriesSpec {
  /** Key in each data row this series reads its value from. */
  key: string;
  /** Legend / tooltip label. Defaults to `key`. */
  label?: string;
  /** Maps to the design system's `--chart-1..5` theme tokens. Defaults to series position. */
  color?: 1 | 2 | 3 | 4 | 5;
}

export type ChartRow = Record<string, string | number>;

/**
 * JSON-serializable chart description produced by `@nestjs-dash/core`'s chart
 * builders and consumed by `@nestjs-dash/design-system`'s `ChartWidget` —
 * shared here (rather than in `@nestjs-dash/core`) because `design-system`
 * depends on `@nestjs-dash/support` but not on `@nestjs-dash/core`.
 */
export interface ChartSpec {
  kind: ChartKind;
  /** Row-oriented, JSON-serializable data — travels through `window.__AFI_PROPS__` unchanged. */
  data: ChartRow[];
  /** Row key used as the x-axis category (bar/line) or slice label (pie). */
  categoryKey: string;
  series: ChartSeriesSpec[];
  title?: string;
  description?: string;
  /** Fixed pixel height reserved before/after client mount. Default 240. */
  height?: number;
  legend?: boolean;
  /** Shown instead of the chart when `data.length === 0`. */
  emptyLabel?: string;
}

export function assertNever(value: never, message = 'Unexpected value'): never {
  throw new Error(`${message}: ${String(value)}`);
}

export function compactObject<T extends Record<string, unknown>>(value: T): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (entry !== undefined) {
      (result as Record<string, unknown>)[key] = entry;
    }
  }
  return result;
}

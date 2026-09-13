import { describe, expect, it } from 'vitest';
import { compactObject } from './index.js';

describe('compactObject', () => {
  it('removes undefined values', () => {
    expect(compactObject({ a: 1, b: undefined, c: 'x' })).toEqual({
      a: 1,
      c: 'x',
    });
  });
});

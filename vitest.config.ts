import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'support',
    include: ['src/**/*.test.ts'],
  },
});

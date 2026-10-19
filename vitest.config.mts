import react from '@vitejs/plugin-react';
import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ['./**/*.{test,spec}.ts(x)?'],
    exclude: [...configDefaults.exclude, './tests'],
    environment: 'jsdom',
  },
});

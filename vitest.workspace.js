import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      './packages/persister/vite.config.ts',
      './packages/react-persister/vite.config.ts',
    ],
  },
})

import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://realtime-app-supabase-omega.vercel.app/',
    viewportHeight: 600,
    viewportWidth: 1000,
    video: true,
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})

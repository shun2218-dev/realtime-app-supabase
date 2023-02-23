import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 600,
    viewportWidth: 1000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})

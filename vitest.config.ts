import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    reporters: [
      'default', // Garde le reporter par défaut en plus de JUnit
      'junit',
    ],
    outputFile : {
      junit : './test-results/junit.xml'
    }
  },
})

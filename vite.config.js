import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // <--- ADD THIS LINE
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@reduxjs/toolkit'],
      output: {
        globals: {
          '@reduxjs/toolkit': 'ReduxToolkit',
        },
      },
    },
  },
})

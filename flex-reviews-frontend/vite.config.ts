import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // ensures relative asset paths on Vercel
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // avoids chunk splitting issues
      },
    },
  },
})

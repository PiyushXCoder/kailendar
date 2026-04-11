import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'kailendar': resolve(__dirname, '../../packages/kailendar/src'),
    },
  },
})

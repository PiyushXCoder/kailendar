import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), dts(), cssInjectedByJs()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Kailendar',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'kailendar.js'
        return 'kailendar.umd.cjs'
      },
    },
    cssCodeSplit: false,
  },
})

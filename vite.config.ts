import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [imagetools(), reactRouter(), tsconfigPaths()]
})

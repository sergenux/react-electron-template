import { readdirSync } from 'node:fs'

const include = [
  'build',
  // 'node_modules',
  'main.electron.js',
  'package.json'
]

const ignore = readdirSync(import.meta.dirname)
  .filter((path) => !include.includes(path))
  .map((path) => `^/${path}`)

/** @type {import('@electron-forge/shared-types').ForgeConfig} */
export default {
  packagerConfig: {
    asar: true,
    icon: './icons/app',
    ignore
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
      config: {}
    }
  ]
}

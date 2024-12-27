declare global {
  // Vite image tools parameter
  declare module '*&url' {
    const src: string
    export default src
  }
}

export {}

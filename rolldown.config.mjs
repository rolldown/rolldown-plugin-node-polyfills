
export default {
  input: './src/index.ts',
  platform: 'node',
  output: {
    format: 'cjs',
    entryFileNames: '[name].cjs'
  }
}

import { terser } from 'rollup-plugin-terser'

export default {
  input: 'assets/ts/main.ts',
  output: [
    {
      file: 'assets/js/main.js',
      format: 'iife',
      sourcemap: true,
      plugins: [terser()]
    }
  ]
}

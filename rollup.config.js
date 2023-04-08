import typescript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-terser';

const name = "fetra"

export default [
  {
    input: "src/index.ts",
    output: [
      {
        name,
        file: './dist/index.js',
        format: 'umd',
      }
    ],
    plugins: [
      typescript({
        compilerOptions: {
          declaration: false,
          declarationDir: null,
        }
      }), terser()
    ]
  },
  {
    input: "src/index.ts",
    output: [
      {
        name,
        file: './dist/index.esm.js',
        format: 'esm',
      },
      {
        name,
        file: './dist/index.cjs.js',
        format: 'cjs',
      }
    ],
    plugins: [typescript()]
  }
]

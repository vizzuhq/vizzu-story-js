const path = require('path')
const terser = require('@rollup/plugin-terser')
const copy = require('rollup-plugin-copy')

module.exports = [
  {
    input: path.resolve(__dirname, "./src/vizzu-player.js"),
    output: {
      file: path.resolve(__dirname, "./dist/vizzu-story.min.js"),
      format: "es",
      name: "bundle",
    },
    plugins: [
      terser(),
      copy({
        targets: [
          { src: 'src/vizzu-story.d.ts', dest: 'dist', flatten: true },
        ],
      })
    ],
  },
]

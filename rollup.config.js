import { terser } from "rollup-plugin-terser";

const path = require("path");

export default [
  {
    input: path.resolve(__dirname, "./src/vizzu-player.js"),
    output: {
      file: path.resolve(__dirname, "./dist/vizzu-story.min.js"),
      format: "es",
      name: "bundle",
    },
    plugins: [terser()],
  },
];

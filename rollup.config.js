import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/useHttpRequest.js",
  output: {
    file: "dist/index.js",
    format: "es",
  },
  plugins: [resolve(), commonjs(), terser()],
  external: ["react"],
};

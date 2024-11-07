// eslint.config.js
import markdown from "@eslint/markdown";

export default [
  ...markdown.configs.recommended,
  {
    ignore: ["scaffolds/*"],
  },
];

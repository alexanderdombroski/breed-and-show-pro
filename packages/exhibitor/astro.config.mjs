// @ts-check
import { defineConfig } from "astro/config";
import path from "node:path";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  outDir: path.resolve(import.meta.dirname, "..", "..", "dist", "exhibitor"),
});

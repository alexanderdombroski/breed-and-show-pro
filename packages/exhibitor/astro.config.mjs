// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import path from "node:path";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  outDir: path.resolve(import.meta.dirname, "..", "..", "dist", "exhibitor"),
  base: "/breed-and-show-pro/exhibitor",
  devToolbar: {
    enabled: false,
  },
  fonts: [
    {
      name: "Fira Sans Extra Condensed",
      provider: fontProviders.google(),
      cssVariable: "--font-titles",
    },
    {
      name: "Monda",
      provider: fontProviders.google(),
      cssVariable: "--font-number",
    },
    {
      name: "Carrois Gothic",
      provider: fontProviders.google(),
      cssVariable: "--font-headline",
    },
    {
      name: "Hind Guntur",
      provider: fontProviders.google(),
      cssVariable: "--font-body",
    },
  ],
});

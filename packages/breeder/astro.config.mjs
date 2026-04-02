// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import path from "node:path";

import svelte from "@astrojs/svelte";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [svelte()],
  outDir: path.resolve(import.meta.dirname, "..", "..", "dist", "breeder"),
  base: "/breed-and-show-pro/breeder",
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

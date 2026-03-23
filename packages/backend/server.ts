import express from "express";
import { loadEnvFile } from "node:process";
import path from "node:path";
import { router } from "./src/routes/index.ts";

if (process.env.NODE_ENV === "development") {
  loadEnvFile(path.join(import.meta.dirname, ".env"));
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(router);

// Start server
app.listen(PORT, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});

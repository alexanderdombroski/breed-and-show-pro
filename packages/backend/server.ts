import express from "express";
import { router } from "./src/routes/index.ts";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(router);

// Start server
app.listen(PORT, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import { router } from "./src/routes/index.ts";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/service/auth.ts";

const app = express();
const PORT = process.env.PORT || 3000;

router.all("/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use(router);

// Start server
app.listen(PORT, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});

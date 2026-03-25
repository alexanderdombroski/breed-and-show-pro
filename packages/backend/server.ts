import express from "express";
import { router } from "./src/routes/index.ts";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/service/auth.ts";
import { devLogger, corsHandler } from "./src/middleware/index.ts";
import { isDev } from "./src/utils/index.ts";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsHandler);

if (isDev) {
  app.use(devLogger);
}

router.all("/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use(router);

// Start server
app.listen(PORT, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});

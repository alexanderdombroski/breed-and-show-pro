import express from "express";
import { router } from "./src/routes/index.ts";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/service/auth.ts";
import { devLogger, corsHandler } from "./src/middleware/index.ts";
import { isDev } from "./src/utils/index.ts";
import { getMongoClient } from "./src/db/index.mts";
import { limiter } from "./src/middleware/rateLimit.ts";
import EntityNotFoundError from "./src/errors/EntityNotFoundError.mts";
import { globalErrorHandler } from "./src/middleware/error.middleware.mts";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsHandler);
app.use(helmet());

if (isDev) {
  app.use(devLogger);
}

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(limiter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

// --- 3. ERROR HANDLING ---
app.use((req, res, next) => {
  next(
    new EntityNotFoundError({
      message: `Can't find ${req.originalUrl} on this server!`,
      code: "ERR_NF",
      statusCode: 404,
    }),
  );
});
// Global Error Handler
app.use(globalErrorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});

/** Handle Server Shutdown */
const shutdown = async (signal: string) => {
  console.info(`Received ${signal}. Shutting down...`);

  server.close(async (err) => {
    if (err) {
      console.error("Error closing server:", err);
      process.exit(1);
    }

    try {
      await getMongoClient().close();

      console.info("Shutdown complete");
      process.exit(0);
    } catch (e) {
      console.error("Error during cleanup:", e);
      process.exit(1);
    }
  });
};

if (!isDev) {
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

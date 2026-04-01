import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";

import routes from "./routes/index.mts";
import EntityNotFoundError from "./errors/EntityNotFoundError.mts";
import { globalErrorHandler } from "./middleware/error.middleware.mts";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: express.Application = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));
app.use(cors());

// --- 1. GLOBAL MIDDLEWARES ---

app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// --- 2. ROUTES ---
app.use("/breed-show-api/", routes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "success", message: "Server is running" });
});

// --- 3. ERROR HANDLING ---
// Handle Unhandled Routes (404)
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

export default app;

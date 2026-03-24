import express, { type Router } from "express";
import { auth } from "../service/auth.ts";
import { router as usersRouter } from "./users.ts";

const router: Router = express.Router();

router.use("/auth", auth.handler);
router.use("/users", usersRouter);

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export { router };

import express, { type Router } from "express";
import { router as usersRouter } from "./users.routes.mts";
import tasksRouter from "./task.routes.mts";
import pigRouter from "./pig.routes.mts";

const router: Router = express.Router();

router.get("/", (req, res) => {
  res.json({ title: "Breed & Show Pro API" });
});

router.use("/users", usersRouter);
router.use("/tasks", tasksRouter);
router.use("/pigs", pigRouter);

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export { router };

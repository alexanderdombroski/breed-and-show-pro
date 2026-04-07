import express, { type Router } from "express";
import { router as usersRouter } from "./users.routes.mts";
import tasksRouter from "./task.routes.mts";
import pigRouter from "./pig.routes.mts";
import herdRoutes from "./herd.routes.mts";
import litterRoutes from "./litter.routes.mts";
import breedingRoutes from "./breeding.routes.mts";
import upcomingDatesRoutes from "./upcomingDates.routes.mts";

const router: Router = express.Router();

router.get("/", (req, res) => {
  res.json({ title: "Breed & Show Pro API" });
});

router.use("/users", usersRouter);
router.use("/tasks", tasksRouter);
router.use("/pigs", pigRouter);
router.use("/stats/herd-summary", herdRoutes);
router.use("/litters", litterRoutes);
router.use("/breeding-calculator", breedingRoutes);
router.use("/upcoming-dates", upcomingDatesRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export { router };

import { Router } from "express";
import pigRoutes from "./pig.routes.mts";
import herdRoutes from "./herd.routes.mts";
import litterRoutes from "./litter.routes.mts";
import taskRoutes from "./task.routes.mts";
import breedingRoutes from "./breeding.routes.mts";
import upcomingDatesRoutes from "./upcomingDates.routes.mts";

const router: Router = Router();

router
  .use("/pigs", pigRoutes) // Pig Routes
  .use("/stats/herd-summary", herdRoutes) // Herd endpoints
  .use("/litters", litterRoutes) // Litter Routes
  .use("/tasks", taskRoutes) // Task Routes
  .use("/breeding-calculator", breedingRoutes) // Breeding Calculator
  .use("/upcoming-dates", upcomingDatesRoutes); // Upcoming Dates Routes

export default router;

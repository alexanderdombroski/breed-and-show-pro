import { Router } from "express";
import { getUpcomingDates } from "../controllers/upcoming.controller.mts";

const router: Router = Router();

router.get("/", getUpcomingDates);

export default router;

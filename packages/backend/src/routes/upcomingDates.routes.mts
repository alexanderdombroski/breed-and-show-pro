import { Router } from "express";
import { getUpcomingDates } from "../services/upcoming.service.mts";

const router: Router = Router();

router.get("/", getUpcomingDates);

export default router;

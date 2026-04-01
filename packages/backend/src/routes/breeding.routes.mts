import { Router } from "express";
import { calculateBreeding } from "../controllers/breeding.controller.mts";

const router: Router = Router();

router.post("/", calculateBreeding);

export default router;

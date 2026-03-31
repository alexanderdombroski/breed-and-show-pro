import { Router } from "express";
import { calculateBreeding } from "../services/breeding.service.mts";

const router: Router = Router();

router.post("/", calculateBreeding);

export default router;

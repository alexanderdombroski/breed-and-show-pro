import { Router } from "express";
import {
  getHerdSummary,
  getBredHerdSummary,
  getFarrowedHerdSummary,
  getOpenHerdSummary,
} from "../services/herd.service.mts";

const router: Router = Router();

router.get("/", getHerdSummary);
router.get("/bred", getBredHerdSummary);
router.get("/farrowed", getFarrowedHerdSummary);
router.get("/open", getOpenHerdSummary);

export default router;

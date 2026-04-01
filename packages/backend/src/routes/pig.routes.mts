import { Router } from "express";
import {
  getPigs,
  createPig,
  getPigById,
  updatePig,
  deletePig,
  addBreeding,
  addFarrowing,
  addWeaning,
  addHeatDate,
  archivePig,
} from "../controllers/pig.controller.mts";

const router: Router = Router();

router.get("/", getPigs);
router.post("/", createPig);
router.get("/:id", getPigById);
router.put("/:id", updatePig);
router.delete("/:id", deletePig);

router.post("/:id/breeding", addBreeding);
router.post("/:id/farrowing", addFarrowing);
router.post("/:id/weaning", addWeaning);
router.post("/:id/heat-date", addHeatDate);
router.patch("/:id/archive", archivePig);

export default router;

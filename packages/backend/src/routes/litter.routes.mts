import { Router } from "express";
import {
  getLitters,
  createLitter,
  getLitterById,
  updateLitter,
  deleteLitter,
} from "../controllers/litter.controller.mts";

const router: Router = Router();

router.get("/", getLitters);
router.post("/", createLitter);
router.get("/:id", getLitterById);
router.put("/:id", updateLitter);
router.delete("/:id", deleteLitter);

export default router;

import { Router } from "express";
import {
  getPigs,
  getPigById,
  createPig,
  updatePig,
  deletePig,
  addBreeding,
  addFarrowing,
  // addWeaning,
  addHeatDate,
  archivePig,
} from "../controllers/pig.controller.mts";

const router: Router = Router();

// This route handles GET requests to http://localhost:3000/pigs
router.get("/", async (req, res, next) => {
  try {
    const pigsFromDatabase = await getPigs(req, res, next);

    res.json(pigsFromDatabase);
  } catch (error) {
    next(error);
  }
});
router.post("/", createPig);
router.get("/:id", async (req, res) => {
  const pig = await getPigById(req, res, () => {});
  res.json(pig);
});
router.put("/pigs/:id", (req, res, next) => updatePig(req, res, next));
router.delete("/pigs/:id", deletePig);

router.post("/:id/breeding", addBreeding);
router.post("/:id/farrowing", addFarrowing);
// router.post("/:id/weaning", addWeaning);
router.post("/:id/heat-date", addHeatDate);
router.patch("/:id/archive", archivePig);

export default router;

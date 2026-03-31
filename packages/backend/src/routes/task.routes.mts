import { Router } from "express";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  completeTask,
  deleteTask,
} from "../services/task.service.mts";

const router: Router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.patch("/:id/complete", completeTask);
router.delete("/:id", deleteTask);

export default router;

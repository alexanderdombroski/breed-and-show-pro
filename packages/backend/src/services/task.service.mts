import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import {
  getAllTasks,
  getTaskById as fetchTaskById,
  createTask as insertTask,
  updateTask as updateTaskRecord,
  completeTask as markTaskComplete,
  deleteTask as removeTask,
  // @ts-expect-error
} from "../models/task.model.mts";

export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await getAllTasks();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = req.body;
    const task = {
      _id: randomUUID(),
      ...payload,
      isCompleted: payload.isCompleted ?? false,
      completedAt: payload.completedAt ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await insertTask(task);
    if (!result.acknowledged) {
      throw new Error("Failed to create task");
    }
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export async function getTaskById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const task = await fetchTaskById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const payload = req.body;
    const result = await updateTaskRecord(id, {
      ...payload,
      updatedAt: new Date(),
    });
    if (!result.matchedCount) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task updated" });
  } catch (error) {
    next(error);
  }
}

export async function completeTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const result = await markTaskComplete(id);
    if (!result.matchedCount) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task completed" });
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const result = await removeTask(id);
    if (!result.deletedCount) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import {
  getAllNotes,
  getNoteById as fetchTaskById,
  createNote as insertTask,
  updateNote as updateTaskRecord,
  deleteNote as removeTask,
} from "../models/notes.model.mts";

export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await getAllNotes();
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
      _type: "task" as const,
      ...payload,
      dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined,
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
    const updateData: any = {
      ...payload,
      updatedAt: new Date(),
    };

    // Convert dueDate to Date object if present
    if (payload.dueDate) {
      updateData.dueDate = new Date(payload.dueDate);
    }

    const result = await updateTaskRecord(id, updateData);
    if (!result.matchedCount) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task updated" });
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

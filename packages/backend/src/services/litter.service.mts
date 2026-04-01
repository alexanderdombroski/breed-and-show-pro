import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import {
  getAllLitters,
  getLitterById as fetchLitterById,
  createLitter as insertLitter,
  updateLitter as updateLitterRecord,
  deleteLitter as removeLitter,
} from "../models/litters.model.mts";

export async function getLitters(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await getAllLitters();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function createLitter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = req.body;
    const litter = {
      _id: randomUUID(),
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await insertLitter(litter);
    if (!result.acknowledged) {
      throw new Error("Failed to create litter");
    }
    res.status(201).json(litter);
  } catch (error) {
    next(error);
  }
}

export async function getLitterById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const litter = await fetchLitterById(id);
    if (!litter) {
      return res.status(404).json({ message: "Litter not found" });
    }
    res.json(litter);
  } catch (error) {
    next(error);
  }
}

export async function updateLitter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const payload = req.body;
    const result = await updateLitterRecord(id, {
      ...payload,
      updatedAt: new Date(),
    });
    if (!result.matchedCount) {
      return res.status(404).json({ message: "Litter not found" });
    }
    res.json({ message: "Litter updated" });
  } catch (error) {
    next(error);
  }
}

export async function deleteLitter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const result = await removeLitter(id);
    if (!result.deletedCount) {
      return res.status(404).json({ message: "Litter not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

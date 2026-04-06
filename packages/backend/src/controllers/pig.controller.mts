import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import {
  listPigs,
  getPigById as fetchPigById,
  createPig as insertPig,
  updatePig as updatePigRecord,
  deletePig as removePig,
} from "../service/pigs.ts";

export async function getPigs(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await listPigs();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function createPig(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = req.body;
    const newPig = {
      _id: randomUUID(),
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await insertPig(newPig);
    if (!result.acknowledged) {
      throw new Error("Failed to create pig");
    }
    res.status(201).json(newPig);
  } catch (error) {
    next(error);
  }
}

export async function getPigById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const pig = await fetchPigById(id);
    if (!pig) {
      return res.status(404).json({ message: "Pig not found" });
    }
    res.json(pig);
  } catch (error) {
    next(error);
  }
}

export async function updatePig(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    console.info(`Updating pig ${id}`);
    const payload = req.body;
    const result = await updatePigRecord(id, {
      ...payload,
      updatedAt: new Date(),
    });
    if (!result.matchedCount) {
      return res.status(404).json({ message: "Pig not found" });
    }
    res.json({ message: "Pig updated" });
  } catch (error) {
    throw new Error(`Error Updating Pig: ${error}`);
  }
}

export async function deletePig(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const result = await removePig(id);
    if (!result.deletedCount) {
      return res.status(404).json({ message: "Pig not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

const updatePigEvent = async (id: string, update: Record<string, unknown>) => {
  return await updatePigRecord(id, update);
};

export async function addBreeding(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const payload = req.body;
    const result = await updatePigEvent(id, {
      $set: {
        currentBreeding: payload,
        status: "bred",
        updatedAt: new Date(),
      },
    });
    if (!result.matchedCount) {
      return res.status(404).json({ message: "Pig not found" });
    }
    res.json({ message: "Breeding details recorded" });
  } catch (error) {
    next(error);
  }
}

export async function addFarrowing(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const payload = req.body;
    const result = await updatePigEvent(id, {
      $set: {
        lastFarrowedDate: payload?.farrowingDate
          ? new Date(payload.farrowingDate)
          : new Date(),
        farrowingDetails: payload,
        status: "farrowed",
        updatedAt: new Date(),
      },
    });
    if (!result.matchedCount) {
      return res.status(404).json({ message: "Pig not found" });
    }
    res.json({ message: "Farrowing recorded" });
  } catch (error) {
    next(error);
  }
}

export async function addWeaning(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const payload = req.body;
    const result = await updatePigEvent(id, {
      $set: {
        weaningDate: payload?.weaningDate
          ? new Date(payload.weaningDate)
          : new Date(),
        pigletsWeaned: payload?.pigletsWeaned,
        weaningDetails: payload,
        updatedAt: new Date(),
      },
    });
    if (!result.matchedCount) {
      return res.status(404).json({ message: "Pig not found" });
    }
    res.json({ message: "Weaning recorded" });
  } catch (error) {
    next(error);
  }
}

export async function addHeatDate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const payload = req.body;
    const result = await updatePigEvent(id, {
      $push: {
        heatDates: payload,
      },
      $set: {
        updatedAt: new Date(),
      },
    });
    if (!result.matchedCount) {
      return res.status(404).json({ message: "Pig not found" });
    }
    res.json({ message: "Heat date added" });
  } catch (error) {
    next(error);
  }
}

export async function archivePig(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = String(req.params.id);
    const result = await updatePigEvent(id, {
      $set: {
        isArchived: true,
        archivedAt: new Date(),
        updatedAt: new Date(),
      },
    });
    if (!result.matchedCount) {
      return res.status(404).json({ message: "Pig not found" });
    }
    res.json({ message: "Pig archived" });
  } catch (error) {
    next(error);
  }
}

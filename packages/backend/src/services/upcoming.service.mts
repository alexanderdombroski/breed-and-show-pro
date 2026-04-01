import type { Request, Response, NextFunction } from "express";
// @ts-expect-error
import { getAllUpcomingDates } from "../models/upcoming.model.mts";

export async function getUpcomingDates(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await getAllUpcomingDates();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

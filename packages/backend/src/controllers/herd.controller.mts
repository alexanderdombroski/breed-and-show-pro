import type { Request, Response, NextFunction } from "express";
import {
  getHerdSummaryCounts,
  getHerdCountByStatus,
  // @ts-expect-error
} from "../models/herd.model.mts";

export async function getHerdSummary(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const summary = await getHerdSummaryCounts();
    res.json(summary);
  } catch (error) {
    next(error);
  }
}

export async function getBredHerdSummary(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const count = await getHerdCountByStatus("bred");
    res.json({ status: "bred", count });
  } catch (error) {
    next(error);
  }
}

export async function getFarrowedHerdSummary(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const count = await getHerdCountByStatus("farrowed");
    res.json({ status: "farrowed", count });
  } catch (error) {
    next(error);
  }
}

export async function getOpenHerdSummary(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const count = await getHerdCountByStatus("open");
    res.json({ status: "open", count });
  } catch (error) {
    next(error);
  }
}

import type { Request, Response, NextFunction } from "express";
import getAllUsers from "../models/user.model.mts";

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

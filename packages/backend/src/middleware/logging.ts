import type { NextFunction, Request, Response } from "express";

export function devLogger(req: Request, res: Response, next: NextFunction) {
  console.info(`[Req] ${req.method} ${req.originalUrl}`);
  next();
}

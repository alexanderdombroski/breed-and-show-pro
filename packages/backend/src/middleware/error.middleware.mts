import type { Request, Response, NextFunction } from "express";
import CustomError from "../errors/CustomError.mts";
import EntityNotFoundError from "../errors/EntityNotFoundError.mts";

const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) {
    return err.message;
  }
  if (typeof err === "string") {
    return err;
  }
  if (err && typeof err === "object" && "message" in err) {
    return String(err.message);
  }
  return "An unknown error occurred";
};

/**
 * Global error handling middleware.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    next(err);
    return;
  }
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        statusCode: err.statusCode,
        code: err.code,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      message:
        getErrorMessage(err) || "An Error occurred. Please try again later.",
    },
  });
};

export const error404Handler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(
    new EntityNotFoundError({
      message: `Can't find ${req.originalUrl} on this server!`,
      code: "ERR_NF",
      statusCode: 404,
    }),
  );
};

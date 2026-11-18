import type { Request, Response, NextFunction } from "express";
import { logger } from "../logging/logger.js";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(
    {
      event: "http_request_failed",
      method: req.method,
      responseStarted: res.headersSent,
    },
    "Request processing failed",
  );

  if (res.headersSent) {
    next(error);
    return;
  }

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred.",
    },
  });
}

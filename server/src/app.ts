import express from "express";
import { errorHandler } from "./common/middleware/error-handler.js";

export default function createApp() {
  const app = express();

  app.get("/health", (_, res) => {
    return res.status(200).json({
      status: "ok",
    });
  });

  app.use((_, res) => {
    return res.status(404).json({
      error: {
        code: "NOT_FOUND",
        message: "Route not found.",
      },
    });
  });

  app.use(errorHandler);

  return app;
}

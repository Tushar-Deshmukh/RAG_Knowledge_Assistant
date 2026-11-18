import express, { type ErrorRequestHandler } from "express";
import request from "supertest";
import { describe, expect, it, afterEach, vi } from "vitest";
import { errorHandler } from "./error-handler.js";
import { logger } from "../logging/logger.js";

describe("error handler", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a safe JSON 500 without exposing error details", async () => {
    const app = express();
    const logSpy = vi.spyOn(logger, "error").mockImplementation(() => {});

    app.get("/fail", () => {
      throw new Error("TEST_PRIVATE_DETAIL");
    });

    app.use(errorHandler);

    const response = await request(app).get("/fail");

    expect(logSpy).toHaveBeenCalledTimes(1);

    expect(logSpy).toHaveBeenCalledWith(
      {
        event: "http_request_failed",
        method: "GET",
        responseStarted: false,
      },
      "Request processing failed",
    );

    expect(response.status).toBe(500);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.body).toEqual({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
      },
    });
  });

  it("delegates errors when the response has already started", async () => {
    const app = express();

    const logSpy = vi.spyOn(logger, "error").mockImplementation(() => {});

    const streamFailure = new Error("STREAM_FAILURE");

    app.get("/write-response", (_, res) => {
      res.write("partial response");

      throw streamFailure;
    });

    app.use(errorHandler);

    const forwardedErrors: unknown[] = [];

    const fallback: ErrorRequestHandler = (
      error: unknown,
      _req,
      res,
      _next,
    ) => {
      forwardedErrors.push(error);
      res.end();
    };

    app.use(fallback);

    const response = await request(app).get("/write-response");

    expect(logSpy).toHaveBeenCalledTimes(1);

    expect(logSpy).toHaveBeenCalledWith(
      {
        event: "http_request_failed",
        method: "GET",
        responseStarted: true,
      },
      "Request processing failed",
    );

    expect(forwardedErrors).toHaveLength(1);
    expect(forwardedErrors[0]).toBe(streamFailure);
    expect(response.text).toBe("partial response");
  });
});

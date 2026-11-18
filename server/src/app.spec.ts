import { describe, expect, it } from "vitest";
import request from "supertest";
import createApp from "./app.js";

describe("GET /health", () => {
  it("returns a healthy JSON response", async () => {
    const app = createApp();

    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.body).toEqual({ status: "ok" });
  });

  it("returns a JSON 404 for an unknown route", async () => {
    const app = createApp();

    const response = await request(app).get("/another-missing-route");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: {
        code: "NOT_FOUND",
        message: "Route not found.",
      },
    });
  });
});

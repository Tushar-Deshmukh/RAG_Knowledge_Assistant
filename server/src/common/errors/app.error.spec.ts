import { describe, expect, it } from "vitest";
import {
  AppError,
  DimensionMismatchError,
  ZeroVectorError,
} from "./app.error.js";

describe("AppError", () => {
  it("carries message, code and httpStatus", () => {
    const error = new AppError("boom", "SOME_CODE", 503);
    expect(error.message).toBe("boom");
    expect(error.code).toBe("SOME_CODE");
    expect(error.httpStatus).toBe(503);
  });

  it("is a real Error, so stack traces and instanceof work", () => {
    const error = new AppError("boom", "SOME_CODE", 500);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
    expect(typeof error.stack).toBe("string");
  });

  it("uses the concrete class name as .name", () => {
    expect(new AppError("x", "C", 500).name).toBe("AppError");
    expect(new DimensionMismatchError("x").name).toBe("DimensionMismatchError");
    expect(new ZeroVectorError("x").name).toBe("ZeroVectorError");
  });

  it("keeps optional details and the original cause", () => {
    const original = new Error("low-level");
    const error = new AppError("high-level", "C", 500, {
      details: { a: 1 },
      cause: original,
    });
    expect(error.details).toEqual({ a: 1 });
    expect(error.cause).toBe(original);
  });

  it("has no cause or details unless given", () => {
    const error = new AppError("x", "C", 500);
    expect(error.cause).toBeUndefined();
    expect(error.details).toBeUndefined();
  });
});

describe("subclasses", () => {
  it("DimensionMismatchError has its own stable code and extends AppError", () => {
    const error = new DimensionMismatchError("msg", { left: 3, right: 2 });
    expect(error).toBeInstanceOf(AppError);
    expect(error.code).toBe("DIMENSION_MISMATCH");
    expect(error.details).toEqual({ left: 3, right: 2 });
  });

  it("ZeroVectorError has its own stable code and extends AppError", () => {
    const error = new ZeroVectorError("msg");
    expect(error).toBeInstanceOf(AppError);
    expect(error.code).toBe("ZERO_VECTOR");
  });

  it("both pick an HTTP error status (400-599)", () => {
    for (const error of [
      new DimensionMismatchError("x"),
      new ZeroVectorError("x"),
    ]) {
      expect(error.httpStatus).toBeGreaterThanOrEqual(400);
      expect(error.httpStatus).toBeLessThanOrEqual(599);
    }
  });
});

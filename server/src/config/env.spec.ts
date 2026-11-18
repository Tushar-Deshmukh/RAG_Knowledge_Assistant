import { describe, expect, it } from "vitest";
import { parseEnv } from "./env.js";

describe("parseEnv", () => {
  it("defaults PORT to 3000 when missing", () => {
    const result = parseEnv({});
    expect(result.PORT).toBe(3000);
  });

  it("converts a valid port string into a number", () => {
    const result = parseEnv({ PORT: "4000" });
    expect(result.PORT).toBe(4000);
  });

  it("accepts the minimum port 1", () => {
    const result = parseEnv({ PORT: "1" });
    expect(result.PORT).toBe(1);
  });

  it("accepts the maximum port 65535", () => {
    const result = parseEnv({ PORT: "65535" });
    expect(result.PORT).toBe(65535);
  });

  it("rejects a nonnumeric port", () => {
    expect(() => parseEnv({ PORT: "hello" })).toThrow(
      "Invalid PORT: expected an integer between 1 and 65535.",
    );
  });

  for (const port of ["", " ", "0", "-1", "3.5", "65536"]) {
    it(`rejects invalid PORT ${JSON.stringify(port)}`, () => {
      expect(() => parseEnv({ PORT: port })).toThrow(
        "Invalid PORT: expected an integer between 1 and 65535.",
      );
    });
  }
});

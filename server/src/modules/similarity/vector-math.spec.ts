import { describe, expect, it } from "vitest";
import {
  DimensionMismatchError,
  ZeroVectorError,
} from "../../common/errors/app.error.js";
import {
  cosineSimilarity,
  dot,
  euclideanDistance,
  normalize,
  norm,
} from "./vector-math.js";

// The worked example from the lesson: a = [1,2,2], b = [2,1,2].
const a = [1, 2, 2];
const b = [2, 1, 2];

describe("dot", () => {
  it("multiplies pairwise and sums", () => {
    expect(dot(a, b)).toBe(8);
  });
  it("is 0 against the zero vector", () => {
    expect(dot([1, 2], [0, 0])).toBe(0);
  });
  it("throws DimensionMismatchError naming both lengths", () => {
    expect(() => dot([1, 2, 3], [1, 2])).toThrow(DimensionMismatchError);
    try {
      dot([1, 2, 3], [1, 2]);
    } catch (error) {
      expect((error as DimensionMismatchError).details).toEqual({
        left: 3,
        right: 2,
      });
      expect((error as Error).message).toContain("3");
      expect((error as Error).message).toContain("2");
    }
  });
});

describe("norm", () => {
  it("is the length of the vector", () => {
    expect(norm([3, 4])).toBe(5);
    expect(norm(a)).toBe(3);
  });
});

describe("cosineSimilarity", () => {
  it("matches the hand calculation 8/9", () => {
    expect(cosineSimilarity(a, b)).toBeCloseTo(8 / 9, 10);
  });
  it("ignores vector length (a vs 2a is 1)", () => {
    expect(cosineSimilarity(a, [2, 4, 4])).toBeCloseTo(1, 10);
  });
  it("is symmetric", () => {
    expect(cosineSimilarity(a, b)).toBeCloseTo(cosineSimilarity(b, a), 12);
  });
  it("is -1 for opposite directions and 0 for perpendicular ones", () => {
    expect(cosineSimilarity([1, 0], [-1, 0])).toBeCloseTo(-1, 10);
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0, 10);
  });
  it("throws ZeroVectorError when either vector is all zeros", () => {
    expect(() => cosineSimilarity([0, 0], [1, 1])).toThrow(ZeroVectorError);
    expect(() => cosineSimilarity([1, 1], [0, 0])).toThrow(ZeroVectorError);
  });
  it("throws DimensionMismatchError for different lengths", () => {
    expect(() => cosineSimilarity([1, 2, 3], [1, 2])).toThrow(
      DimensionMismatchError,
    );
  });
});

describe("euclideanDistance", () => {
  it("matches the hand calculation sqrt(2)", () => {
    expect(euclideanDistance(a, b)).toBeCloseTo(Math.SQRT2, 10);
  });
  it("is 0 for identical vectors, and unlike cosine it sees length (a vs 2a is 3)", () => {
    expect(euclideanDistance(a, a)).toBe(0);
    expect(euclideanDistance(a, [2, 4, 4])).toBeCloseTo(3, 10);
  });
  it("throws DimensionMismatchError for different lengths", () => {
    expect(() => euclideanDistance([1], [1, 2])).toThrow(
      DimensionMismatchError,
    );
  });
});

describe("normalize", () => {
  it("scales to length 1", () => {
    const unit = normalize([3, 4]);
    expect(unit[0]).toBeCloseTo(0.6, 12);
    expect(unit[1]).toBeCloseTo(0.8, 12);
    expect(norm(unit)).toBeCloseTo(1, 12);
  });
  it("does not modify its input", () => {
    const input = [3, 4];
    normalize(input);
    expect(input).toEqual([3, 4]);
  });
  it("throws ZeroVectorError for an all-zero vector", () => {
    expect(() => normalize([0, 0, 0])).toThrow(ZeroVectorError);
  });
});

describe("relationships the lesson claims", () => {
  it("dot grows with length but cosine does not: dot(a, 2a) = 18, cosine = 1", () => {
    expect(dot(a, [2, 4, 4])).toBe(18);
    expect(cosineSimilarity(a, [2, 4, 4])).toBeCloseTo(1, 10);
  });
  it("for unit vectors, dot equals cosine", () => {
    expect(dot(normalize(a), normalize(b))).toBeCloseTo(
      cosineSimilarity(a, b),
      12,
    );
  });
  it("for unit vectors, distance squared = 2 - 2 * cosine", () => {
    const d = euclideanDistance(normalize(a), normalize(b));
    expect(d * d).toBeCloseTo(2 - 2 * cosineSimilarity(a, b), 12);
  });
});

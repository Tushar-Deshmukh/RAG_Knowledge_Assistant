import {
  DimensionMismatchError,
  ZeroVectorError,
} from "../../common/errors/app.error.js";

export type Vector = readonly number[];

function assertSameLength(a: Vector, b: Vector): void {
  if (a.length !== b.length) {
    throw new DimensionMismatchError(
      `Cannot compare vectors of different dimensions (${a.length} vs ${b.length}).`,
      { left: a.length, right: b.length },
    );
  }
}

export function dot(a: Vector, b: Vector): number {
  assertSameLength(a, b);
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

export function norm(a: Vector): number {
  let sum = 0;
  for (const x of a) sum += x * x;
  return Math.sqrt(sum);
}

export function cosineSimilarity(a: Vector, b: Vector): number {
  assertSameLength(a, b);
  const lengthA = norm(a);
  const lengthB = norm(b);
  if (lengthA === 0 || lengthB === 0) {
    throw new ZeroVectorError(
      "Cosine similarity is undefined for an all-zero vector.",
    );
  }
  return dot(a, b) / (lengthA * lengthB);
}

export function euclideanDistance(a: Vector, b: Vector): number {
  assertSameLength(a, b);
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - b[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

export function normalize(a: Vector): number[] {
  const length = norm(a);
  if (length === 0)
    throw new ZeroVectorError("Cannot normalize an all-zero vector.");
  return a.map((x) => x / length);
}

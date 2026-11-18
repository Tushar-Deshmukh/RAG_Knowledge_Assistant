import z from "zod";
export const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

export function parseEnv(env: NodeJS.ProcessEnv) {
  const result = envSchema.safeParse(env);

  if (!result.success) {
    throw new Error("Invalid PORT: expected an integer between 1 and 65535.");
  }

  return result.data;
}

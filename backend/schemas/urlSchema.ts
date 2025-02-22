import { z } from "zod";

const urlSchema = z.object({
  originalUrl: z.string().url("Invalid URL format"),
  customAlias: z
    .string()
    .max(30, "Custom alias must be at most 30 characters long")
    .regex(/^[a-zA-Z0-9-]+$/)
    .optional(),
});

export { urlSchema };

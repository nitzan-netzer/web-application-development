import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, {
    message:
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number, and special character",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least 1 lowercase letter",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least 1 uppercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least 1 number",
  })
  .refine((val) => /[^a-zA-Z0-9]/.test(val), {
    message: "Password must contain at least 1 special character",
  });
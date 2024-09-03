import { z } from 'zod';
import { passwordSchema } from './Password.validation';

export const LoginValidation = z.object({
    email: z.string().email("Please enter a valid emails.").refine((val) => val.trim() !== "", {
      message: "Please enter an emails.",
    }),
    password: passwordSchema.refine((val) => val.trim() !== "", {
      message: "Please enter a password.",
    }),
  });
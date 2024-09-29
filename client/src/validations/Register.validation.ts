import { z } from 'zod';
import { passwordSchema } from './Password.validation';

export const RegisterValidation = z.object({
		name: z.string().optional(),
		email: z.string().email(),
		password: passwordSchema,
		passwordConfirmation: z.string(),
});
import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const signupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	metaData: z.object({}).default({}),
});

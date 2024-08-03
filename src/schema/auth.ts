import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const signupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	metaData: z.object({
		firstName: z.string(),
		middleName: z.string().optional(),
		lastName: z.string(),
		age: z.number(),
		dateOfBirth: z.string(),
		aadharID: z.string(),
		phoneNumber: z.string().min(10).max(10),
		address: z.string().optional(),
		city: z.string().optional(),
		state: z.string().optional(),
		pincode: z.string().optional(),
		picture: z.string().optional(),
	}),
});

export const verifyUserSchema = z.object({
	email: z.string().email(),
	verify: z.boolean().default(true),
});

export const moderatorSignupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	metaData: z.object({
		firstName: z.string(),
		middleName: z.string().optional(),
		lastName: z.string(),
		age: z.number(),
		dateOfBirth: z.string(),
		picture: z.string().optional(),
	}),
});
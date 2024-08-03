import { loginSchema, signupSchema } from "@/schema/auth";
import { SupabaseService } from "@/services/supabase";
import { BackendError } from "@/utils/errors";
import type { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
	const { email, password, metaData } = signupSchema.parse(req.body);
	const { data, error } = await SupabaseService.getSupabase().auth.signUp({
		email,
		password,
		options: {
			data: metaData,
		},
	});

	if (error) {
		throw new BackendError("AUTH_ERROR", { message: error.message });
	}

	return data.session!;
};

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = loginSchema.parse(req.body);
	const { data, error } =
		await SupabaseService.getSupabase().auth.signInWithPassword({
			email,
			password,
		});

	if (error) {
		throw new BackendError("AUTH_ERROR", { message: error.message });
	}
	return data.session;
};

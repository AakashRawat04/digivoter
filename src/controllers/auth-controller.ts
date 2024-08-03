import { loginSchema, moderatorSignupSchema, signupSchema, verifyUserSchema } from "@/schema/auth";
import { SupabaseService } from "@/services/supabase";
import { BackendError } from "@/utils/errors";
import type { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
	const { email, password, metaData } = signupSchema.parse(req.body);
	const { data, error } = await SupabaseService.getSupabase().auth.signUp({
		email,
		password,
		options: {
			data: {
				...metaData,
				userType: "user",
				isVerified: false,
			},
		},
	});

	if (error) {
		throw new BackendError("AUTH_ERROR", { message: error.message });
	}

	res.json({
		data: data.session
	});
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

	if (data.user.user_metadata.userType !== "user") {
		throw new BackendError("AUTH_ERROR", {
			message: "Entity is not a user",
		});
	}

	res.json({
		data: data.session
	});
};

export const verifyUser = async (req: Request, res: Response) => {
	const { email, verify } = verifyUserSchema.parse(req.body);

	const { data, error } = await SupabaseService.getSupabase().rpc("get_user_by_email", {
		email,
	});

	if (error) {
		throw new BackendError("AUTH_ERROR", { message: "Failed to get user" });
	}

	const { id, raw_user_meta_data } = data;

	if (raw_user_meta_data.isVerified === verify) {
		throw new BackendError("NOT_MODIFIED", { message: `Entity is already ${verify ? "verified" : "unverified"}` });
	}

	const { error: updateError } = await SupabaseService.getSupabase().auth.admin.updateUserById(id, {
		user_metadata: {
			...data.user_metadata,
			isVerified: verify,
		}
	});

	if (updateError) {
		throw new BackendError("AUTH_ERROR", { message: "Failed to verify user" });
	}

	res.sendStatus(200);
}

export const loginModerator = async (req: Request, res: Response) => {
	const { email, password } = loginSchema.parse(req.body);
	const { data, error } =
		await SupabaseService.getSupabase().auth.signInWithPassword({
			email,
			password,
		});

	if (error) {
		throw new BackendError("AUTH_ERROR", { message: error.message });
	}

	if (data.user.user_metadata.userType !== "moderator") {
		throw new BackendError("AUTH_ERROR", {
			message: "Entity is not a moderator",
		});
	}

	res.json({
		data: data.session
	});
}

export const registerModerator = async (req: Request, res: Response) => {
	const { email, password, metaData } = moderatorSignupSchema.parse(req.body);
	const { data, error } = await SupabaseService.getSupabase().auth.signUp({
		email,
		password,
		options: {
			data: {
				...metaData,
				userType: "moderator",
			},
		},
	});

	if (error) {
		throw new BackendError("AUTH_ERROR", { message: error.message });
	}

	res.json({
		data: data.session
	});
}
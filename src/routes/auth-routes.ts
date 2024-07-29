import { loginUser, registerUser } from "@/controllers/auth-controller";
import { asyncHandler } from "@/utils/handler";
import { Router } from "express";

export const authRoutes = () => {
	const router = Router();

	router.post("/login", asyncHandler(loginUser));
	router.post("/register", asyncHandler(registerUser));

	return router;
};

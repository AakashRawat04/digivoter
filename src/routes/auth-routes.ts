import { loginModerator, loginUser, registerModerator, registerUser, verifyUser } from "@/controllers/auth-controller";
import { asyncHandler } from "@/utils/handler";
import { Router } from "express";

export const authRoutes = () => {
	const router = Router();

	router.post("/login", asyncHandler(loginUser));
	router.post("/register", asyncHandler(registerUser));
	router.post("/verify", asyncHandler(verifyUser));

	router.post("/moderator/login", asyncHandler(loginModerator));
	router.post("/moderator/register", asyncHandler(registerModerator));

	return router;
};

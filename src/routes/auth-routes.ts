import { loginUser, signupUser } from "@/controllers/auth-controller";
import { Router } from "express";

export const authRoutes = () => {
	const router = Router();
	router.get("/login", loginUser);
	router.get("/register", signupUser);
};

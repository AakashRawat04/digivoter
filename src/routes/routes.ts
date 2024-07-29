import { Router } from "express";
import { authRoutes } from "./auth-routes";

export const routes = () => {
	const router = Router();

	router.use("/auth", authRoutes());

	return router;
};

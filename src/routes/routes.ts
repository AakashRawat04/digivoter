import { Router } from "express";
import { authRoutes } from "./auth-routes";
import { resourceRoutes } from "@/routes/resource-routes";

export const routes = () => {
	const router = Router();

	router.use("/auth", authRoutes());
	router.use("/resource", resourceRoutes());

	return router;
};

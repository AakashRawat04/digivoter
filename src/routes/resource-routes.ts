import { uploadImage } from "@/controllers/resource-controller";
import { SupabaseService } from "@/services/supabase";
import { asyncHandler } from "@/utils/handler";
import { Router } from "express";
import multer from "multer";

export const resourceRoutes = () => {
	const router = Router();


  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  router.post("/image", upload.single("image"), asyncHandler(uploadImage));

	return router;
};

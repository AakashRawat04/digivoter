import { SupabaseService } from "@/services/supabase";
import { SUPABASE_BUCKET_BASE } from "@/utils/contants";
import { BackendError } from "@/utils/errors";
import { generateRandomUUID } from "@/utils/helpers";
import type { Request, Response } from "express";

export const uploadImage = async (req: Request, res: Response) => {
  const file = req.file

  if (!file) {
    throw new BackendError("UPLOAD_ERROR", {
      message: "No file uploaded",
    });
  }

  const { data, error } = await SupabaseService.getSupabase()
    .storage.from("images")
    .upload(`profiles/${generateRandomUUID()}`, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    throw new BackendError("UPLOAD_ERROR", {
      message: "Failed to upload image",
    });
  }

  res.json({
    data: new URL(data.fullPath, SUPABASE_BUCKET_BASE),
  });
};

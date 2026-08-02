import { Express } from "express";
import { supabase } from "../config/supabase";

export async function uploadService(file: Express.Multer.File) {
    if (!file || !file.buffer) {
        throw new Error("Invalid file upload: missing file buffer.");
    }

    const fileName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const { error } = await supabase.storage
        .from("documents")
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
        });

    if (error) {
        throw new Error(`Supabase Storage Error: ${error.message}`);
    }

    const { data } = supabase.storage
        .from("documents")
        .getPublicUrl(fileName);

    return {
        success: true,
        filename: fileName,
        fileUrl: data.publicUrl,
    };
}
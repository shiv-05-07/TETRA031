import { Request, Response } from "express";
import { uploadService } from "../services/upload.service.ts";

export async function uploadController(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded under field 'file'.",
            });
        }

        const result = await uploadService(req.file);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({
            success: false,
            message: "Upload failed.",
        });
    }
}
import { Request, Response } from "express";
import { uploadService } from "../services/upload.service";

export async function uploadController(
    req: Request,
    res: Response
) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const result = await uploadService(req.file);

        return res.json(result);
    } catch (err: any) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
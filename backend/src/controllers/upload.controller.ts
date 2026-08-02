import { Request, Response } from "express";
import { uploadService } from "../services/upload.service";

export async function uploadController(
    req: Request,
    res: Response
) {
    console.log("[DEBUG] Controller reached");
    try {
        if (!req.file) {
            console.log("[DEBUG] No file in req.file");
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const userId = (req as any).user?.id || (req as any).userId || null;
        const result = await uploadService(req.file, userId);

        console.log("[DEBUG] Returning response");
        return res.json(result);
    } catch (err: any) {
        console.error("[DEBUG] Controller caught error:", err.message);
        console.error("[DEBUG] Stack:", err.stack);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

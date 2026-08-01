import { Express } from "express";

export async function uploadService(file: Express.Multer.File) {
  return {
    success: true,
    filename: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    uploadedAt: new Date(),
  };
}
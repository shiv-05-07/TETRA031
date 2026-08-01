import { Request, Response } from "express";
import {
  generateCurriculumService,
  auditSyllabusService,
} from "../services/curriculum.service";

export async function generateCurriculumController(
  req: Request,
  res: Response
) {
  try {
    const result = await generateCurriculumService(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Error generating curriculum:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to generate curriculum",
    });
  }
}

export async function auditSyllabusController(req: Request, res: Response) {
  try {
    const { syllabusText } = req.body;
    const result = await auditSyllabusService(syllabusText);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Error auditing syllabus:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to audit syllabus",
    });
  }
}

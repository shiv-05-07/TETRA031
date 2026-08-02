import { Request, Response } from "express";
import { askGraphRAG } from "../services/recommendationService";

export async function chatController(req: Request, res: Response) {
  try {
    const { question, query, documentId } = req.body;
    const userQuestion = question || query || "How can I improve this curriculum for industry readiness?";

    console.log(`[DEBUG] Chat Controller called with question: "${userQuestion}"`);
    const result = await askGraphRAG(userQuestion, documentId);

    res.json(result);
  } catch (err: any) {
    console.error("[DEBUG] Chat Controller error:", err);
    res.status(500).json({
      answer: "An error occurred while generating GraphRAG response.",
      sources: [],
      relatedSkills: [],
      confidence: 0,
      error: err.message,
    });
  }
}

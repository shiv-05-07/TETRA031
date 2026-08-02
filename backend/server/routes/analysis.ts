import { Router, Request, Response } from "express";
import multer from "multer";
import { extractTextFromPDF } from "../services/pdfService.js";
import { extractTopics, performSemanticSearch } from "../services/curriculumService.js";
import { performGapAnalysis } from "../services/gapAnalysis.js";
import { generateRecommendations } from "../services/recommendationService.js";

const router = Router();

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// 1. POST /upload - Accept PDF file, extract text, return text
router.post("/upload", upload.single("pdf"), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No PDF file uploaded." });
      return;
    }

    if (req.file.mimetype !== "application/pdf") {
      res.status(400).json({ error: "Uploaded file must be a PDF." });
      return;
    }

    console.log("Extracting text from PDF...");
    const text = await extractTextFromPDF(req.file.buffer);

    res.json({
      message: "PDF parsed successfully.",
      curriculumText: text
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ 
      error: "An error occurred while parsing the PDF.",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// 2. POST /analyze - Run the full AI curriculum gap analysis
router.post("/analyze", async (req: Request, res: Response): Promise<void> => {
  try {
    const { curriculumText } = req.body;

    if (!curriculumText || typeof curriculumText !== "string") {
      res.status(400).json({ error: "Invalid or missing curriculumText in request body." });
      return;
    }

    console.log("1. Extracting topics from curriculum...");
    const topics = extractTopics(curriculumText);

    if (topics.length === 0) {
      res.status(400).json({ error: "Could not extract any meaningful topics from the text." });
      return;
    }

    console.log("2. Running semantic vector search...");
    const semanticMatches = await performSemanticSearch(topics);

    console.log("3. Performing gap analysis (Strict AI Thresholds)...");
    const gapAnalysis = performGapAnalysis(semanticMatches);

    console.log("4. Generating recommendations via Gemini RAG...");
    const summary = curriculumText.length > 1000 
      ? curriculumText.substring(0, 1000) + "..." 
      : curriculumText;

    const recommendations = await generateRecommendations({
      curriculumSummary: summary,
      matchedSkills: gapAnalysis.matchedSkills,
      weakAreas: gapAnalysis.weakAreas,
      missingSkills: gapAnalysis.missingSkills
    });

    console.log("5. Returning full analysis response.");
    res.json({
      matchedSkills: gapAnalysis.matchedSkills,
      missingSkills: gapAnalysis.missingSkills,
      weakAreas: gapAnalysis.weakAreas,
      recommendations: recommendations
    });
    
  } catch (error) {
    console.error("Analysis Pipeline Error:", error);
    res.status(500).json({ 
      error: "An error occurred during the curriculum analysis process.",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

export default router;

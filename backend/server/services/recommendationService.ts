import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);
const generationModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

export interface RecommendationParams {
  curriculumSummary: string;
  matchedSkills: string[];
  weakAreas: string[];
  missingSkills: string[];
}

/**
 * Uses Gemini to generate structured recommendations based on a gap analysis.
 */
export async function generateRecommendations(params: RecommendationParams): Promise<string> {
  const prompt = `
    You are an expert curriculum designer and AI academic advisor.
    Based on the following gap analysis between a curriculum and industry standards, generate actionable recommendations.

    Curriculum Context/Summary: 
    ${params.curriculumSummary}

    Covered Industry Skills: 
    ${params.matchedSkills.join(", ") || "None"}

    Weak Areas (Needs Improvement):
    ${params.weakAreas.join(", ") || "None"}

    Missing Industry Skills (Gaps): 
    ${params.missingSkills.join(", ") || "None"}

    Please provide a structured response with:
    1. Suggested skills to add
    2. Suggested topics and modules
    3. Learning improvements and roadmap
    
    Output the response in clean Markdown format without enclosing codeblocks.
  `;

  try {
    const result = await generationModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw new Error("Failed to generate curriculum recommendations using Gemini.");
  }
}

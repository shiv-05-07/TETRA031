import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function generateRecommendations(data: {
  topics: string[];
  covered: string[];
  missing: string[];
}) {
  const { topics, covered, missing } = data;

  const prompt = `
You are an AI curriculum advisor.

Curriculum Topics:
${topics.join(", ")}

Covered Industry Skills:
${covered.join(", ")}

Missing Industry Skills:
${missing.join(", ")}

Tasks:
1. Identify key gaps
2. Suggest new subjects/modules
3. Recommend practical components (projects/tools)
4. Provide a short improvement roadmap

Keep answer structured and concise.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return response;
  } catch (error) {
    console.error("❌ Recommendation error:", error);
    return "Error generating recommendations";
  }
}
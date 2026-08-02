import { getGeminiClient } from "../config/gemini";

export async function generateEmbedding(text: string): Promise<number[]> {
  const ai = getGeminiClient();
  if (!ai) return [];
  try {
    const response = await ai.models.embedContent({
      model: "text-embedding-004",
      contents: text,
    });
    const res = response as any;
    return res.embedding?.values || res.embeddings?.[0]?.values || [];
  } catch {
    return [];
  }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Generates an embedding array for the given text using the Gemini model.
 * @param text The input text to embed.
 * @returns A promise that resolves to an array of numbers (the embedding vector).
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    // gemini-embedding-2 is the current robust model endpoint for text embeddings via the SDK
    const model = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : String(error)}`);
  }
}

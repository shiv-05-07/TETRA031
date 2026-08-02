import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let ai: GoogleGenAI | null = null;
console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);
console.log("Gemini key:", process.env.GEMINI_API_KEY);
export function getGeminiClient(): GoogleGenAI | null {
  if (!ai && process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

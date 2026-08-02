import { generateEmbedding } from "./embeddingService.js";
import { querySimilar, ChromaMatch } from "./vectorStore.js";

/**
 * Very basic text chunker that splits text into roughly sized chunks.
 * A production system might use a library like LangChain's RecursiveCharacterTextSplitter.
 */
export function chunkText(text: string, chunkSize: number = 500): string[] {
  const chunks: string[] = [];
  let currentChunk = "";
  const sentences = text.split(/(?<=[.?!])\s+/);

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = "";
    }
    currentChunk += sentence + " ";
  }

  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Extracts individual topics or skills from a block of text.
 * Here we use a naive split, assuming comma or newline separated topics.
 */
export function extractTopics(text: string): string[] {
  return text
    .split(/[\n,;]+/)
    .map(topic => topic.trim())
    .filter(topic => topic.length > 0 && topic.length < 100);
}

export interface SemanticMatchResult {
  topic: string;
  matches: ChromaMatch[];
}

/**
 * For each curriculum topic: generates an embedding, queries ChromaDB, and gets Top-K matches.
 * @param topics Array of extracted topics
 * @returns Array of matches for each topic
 */
export async function performSemanticSearch(topics: string[]): Promise<SemanticMatchResult[]> {
  const results: SemanticMatchResult[] = [];
  
  for (const topic of topics) {
    const embedding = await generateEmbedding(topic);
    const matches = await querySimilar(embedding, 3); // Get Top 3 matches
    
    results.push({
      topic,
      matches
    });
  }
  
  return results;
}

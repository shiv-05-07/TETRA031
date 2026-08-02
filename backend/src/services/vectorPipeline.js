import { generateEmbedding } from "./embeddingService.js";
import { storeEmbedding } from "./vectorService.js";

export async function processTextForVectorSearch({
  videoId,
  content,
}) {
  if (!content || !content.trim()) {
    throw new Error("Content cannot be empty");
  }

  console.log("Generating embedding...");

  const embedding = await generateEmbedding(content);

  console.log("Embedding generated. Storing in Supabase...");

  const storedChunk = await storeEmbedding({
    videoId,
    content,
    embedding,
  });

  return storedChunk;
}

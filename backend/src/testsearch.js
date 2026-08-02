import "dotenv/config";

import { generateEmbedding } from "./services/embeddingService.js";
import { searchSimilarChunks } from "./services/vectorSearchService.js";

async function test() {
  console.log("VECTOR SEARCH TEST STARTED");

  try {
    const query =
      "How can artificial intelligence help computers learn from data?";

    console.log("Generating query embedding...");

    const embedding = await generateEmbedding(query);

    console.log("Query embedding generated.");

    console.log("Searching similar chunks...");

    const results = await searchSimilarChunks({
      embedding,
      matchThreshold: 0.3,
      matchCount: 5,
    });

    console.log("Search results:");
    console.dir(results, { depth: null });
  } catch (error) {
    console.error("Vector search failed:");
    console.error(error);
  }
}

test();
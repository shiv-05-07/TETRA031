import { ChromaClient } from "chromadb";
import { generateEmbedding } from "./embeddingService.js";

const client = new ChromaClient({
  host: "localhost",
  port: 8000
});

const COLLECTION_NAME = "industry_skills";

let collection: any;

// Initialize collection
export async function initVectorDB() {
  try {
    collection = await client.getOrCreateCollection({
      name: COLLECTION_NAME,
    });

    console.log("✅ ChromaDB collection ready");
  } catch (error) {
    console.error("❌ ChromaDB init error:", error);
  }
}

// Add documents (industry skills)
export async function addDocuments(texts: string[]) {
  try {
    const embeddings = await Promise.all(
      texts.map((text) => generateEmbedding(text))
    );

    const ids = texts.map((_, i) => `id-${i}-${Date.now()}`);

    await collection.add({
      ids,
      documents: texts,
      embeddings,
    });

    console.log("✅ Documents added to ChromaDB");
  } catch (error) {
    console.error("❌ Add documents error:", error);
  }
}

// Query similar items
export async function querySimilar(text: string, topK: number = 5) {
  try {
    const embedding = await generateEmbedding(text);

    const results = await collection.query({
      queryEmbeddings: [embedding],
      nResults: topK,
    });

    return results.documents[0] as string[]; // array of matches
  } catch (error) {
    console.error("❌ Query error:", error);
    return [];
  }
}
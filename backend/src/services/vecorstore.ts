import { generateEmbedding } from "./embeddingService";

let collection: any = null;

export async function initVectorDB() {
  try {
    const { ChromaClient } = await import("chromadb" as any);
    const client = new ChromaClient({ host: "localhost", port: 8000 });
    collection = await client.getOrCreateCollection({ name: "industry_skills" });
    console.log("✅ ChromaDB collection ready");
  } catch (error) {
    console.warn("⚠️ ChromaDB not available:", (error as any).message);
  }
}

export async function addDocuments(texts: string[]) {
  if (!collection) return;
  try {
    const embeddings = await Promise.all(texts.map((text) => generateEmbedding(text)));
    const ids = texts.map((_, i) => `id-${i}-${Date.now()}`);
    await collection.add({ ids, documents: texts, embeddings });
    console.log("✅ Documents added to ChromaDB");
  } catch (error) {
    console.error("❌ Add documents error:", error);
  }
}

export async function querySimilar(text: string, topK: number = 5) {
  if (!collection) return [];
  try {
    const embedding = await generateEmbedding(text);
    const results = await collection.query({ queryEmbeddings: [embedding], nResults: topK });
    return (results.documents[0] as string[]) || [];
  } catch (error) {
    console.error("❌ Query error:", error);
    return [];
  }
}
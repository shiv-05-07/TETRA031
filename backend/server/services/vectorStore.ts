import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  path: process.env.CHROMADB_URL || "http://localhost:8000"
});

const COLLECTION_NAME = "industry_skills";

/**
 * Dummy embedding function because we generate embeddings externally via Gemini.
 */
const dummyEmbeddingFunction = {
  generate: async (texts: string[]) => {
    return new Array(texts.length).fill([]);
  }
};

/**
 * Ensures the ChromaDB collection exists and returns it.
 */
async function getCollection() {
  try {
    return await client.getOrCreateCollection({
      name: COLLECTION_NAME,
      embeddingFunction: dummyEmbeddingFunction
    });
  } catch (error) {
    console.error("Error connecting to ChromaDB:", error);
    throw error;
  }
}

/**
 * Adds documents (skills) along with their embeddings to ChromaDB.
 * @param ids Unique IDs for the skills
 * @param embeddings The vector embeddings of the skills
 * @param texts The actual skill text
 */
export async function addDocuments(ids: string[], embeddings: number[][], texts: string[]) {
  const collection = await getCollection();
  await collection.add({
    ids,
    embeddings,
    documents: texts
  });
}

export interface ChromaMatch {
  document: string;
  distance: number;
}

/**
 * Queries the collection for similar skills based on the provided embedding.
 * @param queryEmbedding The vector embedding of the curriculum text/topic to search for
 * @param topK Number of matches to return
 * @returns Array of matched text documents with distances
 */
export async function querySimilar(queryEmbedding: number[], topK: number = 5): Promise<ChromaMatch[]> {
  const collection = await getCollection();
  
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: topK
  });

  const matchedDocs = results.documents[0] || [];
  const matchedDistances = results.distances?.[0] || [];
  
  const matches: ChromaMatch[] = [];
  for (let i = 0; i < matchedDocs.length; i++) {
    const doc = matchedDocs[i];
    if (doc !== null) {
      matches.push({ document: doc, distance: matchedDistances[i] || 0 });
    }
  }
  
  return matches;
}

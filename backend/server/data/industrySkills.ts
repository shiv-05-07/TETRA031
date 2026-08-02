import { generateEmbedding } from "../services/embeddingService.js";
import { addDocuments } from "../services/vectorStore.js";

// A predefined list of realistic industry skills as requested.
export const INDUSTRY_SKILLS = [
  "Deep Learning",
  "MLOps",
  "Docker",
  "Kubernetes",
  "LLM Engineering",
  "Cloud Deployment",
  "Microservices Architecture",
  "Data Engineering",
  "Vector Databases",
  "Prompt Engineering"
];

/**
 * Initializes the ChromaDB database by generating embeddings for all industry skills
 * and storing them.
 */
export async function seedIndustrySkills() {
  console.log("Starting to seed industry skills...");
  
  const ids: string[] = [];
  const embeddings: number[][] = [];
  
  for (let i = 0; i < INDUSTRY_SKILLS.length; i++) {
    const skill = INDUSTRY_SKILLS[i];
    console.log(`Generating embedding for: ${skill}`);
    
    const embedding = await generateEmbedding(skill);
    
    ids.push(`skill_${i}`);
    embeddings.push(embedding);
  }
  
  console.log("Storing skills in ChromaDB...");
  await addDocuments(ids, embeddings, INDUSTRY_SKILLS);
  
  console.log("Seeding complete!");
}

import { fileURLToPath } from "url";

// Allow running this file directly via tsx
const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMainModule) {
  seedIndustrySkills().catch(err => {
    console.error("Failed to seed skills:", err);
    process.exit(1);
  });
}

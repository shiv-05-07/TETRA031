import { generateEmbedding } from "./services/embeddingService.js";
import { querySimilar } from "./services/vectorStore.js";

const curriculumTopics = [
  "Neural Networks",
  "Database Systems",
  "Operating Systems",
];

const industrySkills = [
  "Deep Learning",
  "MLOps",
  "Docker",
  "Kubernetes",
  "Cloud Deployment",
  "LLM Engineering",
  "Vector Databases",
  "Prompt Engineering",
];

async function runPipeline() {
  console.log("🚀 Starting Pipeline...\n");

  const results: { topic: string; matches: string[] }[] = [];

  // 1. Semantic Search
  for (const topic of curriculumTopics) {
    console.log(`🔍 Searching for: ${topic}`);

    // Generate embedding first before querying ChromaDB
    const embedding = await generateEmbedding(topic);
    
    // Pass the embedding (number[]) instead of the raw string topic
    const matches = await querySimilar(embedding, 3);

    results.push({
      topic,
      matches: matches.map(m => m.document),
    });
  }

  console.log("\n📊 Semantic Matches:");
  console.log(JSON.stringify(results, null, 2));

  // 2. GAP ANALYSIS
  const coveredSkills = new Set(results.flatMap(r => r.matches));

  const missingSkills = industrySkills.filter(
    skill => !coveredSkills.has(skill)
  );

  let coverage = 0;
  if (industrySkills.length > 0) {
    coverage = (coveredSkills.size / industrySkills.length) * 100;
  }

  console.log("\n📈 GAP ANALYSIS:");
  console.log("Coverage:", coverage.toFixed(2) + "%");
  console.log("Covered Skills:", [...coveredSkills]);
  console.log("Missing Skills:", missingSkills);
}

runPipeline();

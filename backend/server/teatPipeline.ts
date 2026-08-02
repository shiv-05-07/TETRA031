import { initVectorDB, querySimilar } from "./services/vectorStore";

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

  // 1. Init DB
  await initVectorDB();

  const results: { topic: string; matches: string[] }[] = [];

  // 2. Semantic Search
  for (const topic of curriculumTopics) {
    console.log(`🔍 Searching for: ${topic}`);

    const matches = await querySimilar(topic, 3);

    results.push({
      topic,
      matches,
    });
  }

  console.log("\n📊 Semantic Matches:");
  console.log(results);

  // 3. GAP ANALYSIS
  const coveredSkills = new Set(results.flatMap(r => r.matches));

  const missingSkills = industrySkills.filter(
    skill => !coveredSkills.has(skill)
  );

  const coverage =
    (coveredSkills.size / industrySkills.length) * 100;

  console.log("\n📈 GAP ANALYSIS:");
  console.log("Coverage:", coverage.toFixed(2) + "%");
  console.log("Covered Skills:", [...coveredSkills]);
  console.log("Missing Skills:", missingSkills);
}

runPipeline();
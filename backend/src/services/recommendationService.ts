import { getGeminiClient } from "../config/gemini";
import { driver } from "../config/neo4j";
import { supabase } from "../config/supabase";
import { querySimilar } from "./vecorstore";

export interface GraphRAGResponse {
  answer: string;
  sources: string[];
  relatedSkills: string[];
  confidence: number;
}

export async function askGraphRAG(
  question: string,
  documentId?: string
): Promise<GraphRAGResponse> {
  console.log(`[DEBUG] Starting GraphRAG request for question: "${question}" (documentId: ${documentId || "none"})`);

  // 1. Vector Search Retrieval
  let vectorChunks: string[] = [];
  try {
    vectorChunks = await querySimilar(question, 5);
    console.log(`[DEBUG] Vector DB retrieved ${vectorChunks.length} chunks.`);
  } catch (err: any) {
    console.warn("[DEBUG] Vector DB search note:", err.message);
  }

  // 2. Neo4j Knowledge Graph Retrieval
  const session = driver.session();
  let graphNodes: string[] = [];
  let industrySkills: string[] = [];

  try {
    if (documentId) {
      const curriculumGraphQuery = `
        MATCH (n { documentId: $documentId })
        OPTIONAL MATCH (n)-[r]->(m)
        RETURN labels(n)[0] AS label, n.name AS name, n.title AS title, type(r) AS rel, labels(m)[0] AS targetLabel, m.name AS targetName
        LIMIT 30
      `;
      const curResult = await session.executeRead((tx) =>
        tx.run(curriculumGraphQuery, { documentId })
      );
      graphNodes = curResult.records.map((r) => {
        const label = r.get("label");
        const name = r.get("name") || r.get("title") || "";
        const rel = r.get("rel");
        const targetName = r.get("targetName");
        return rel && targetName ? `(${label}: ${name}) -[:${rel}]-> (${targetName})` : `(${label}: ${name})`;
      });
    }

    const industryGraphQuery = `
      MATCH (d:Domain)-[:HAS_SKILL]->(s:IndustrySkill)
      RETURN d.name AS domain, s.name AS skill
      LIMIT 25
    `;
    const indResult = await session.executeRead((tx) => tx.run(industryGraphQuery));
    industrySkills = indResult.records.map((r) => `${r.get("domain")}: ${r.get("skill")}`);
  } catch (graphErr: any) {
    console.warn("[DEBUG] Neo4j retrieval note:", graphErr.message);
  } finally {
    await session.close();
  }

  // 3. Supabase Gap Analysis Retrieval
  let gapReportContext = "";
  if (documentId) {
    try {
      const { data } = await supabase
        .from("analysis_results")
        .select("report")
        .eq("document_id", documentId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data && data.report) {
        gapReportContext = JSON.stringify(data.report);
      }
    } catch (supErr: any) {
      console.warn("[DEBUG] Supabase gap report note:", supErr.message);
    }
  }

  // 4. Combine Retrieval Chunks & Knowledge Graph Context
  const contextPrompt = `
You are an advanced AI GraphRAG Academic Advisor.
Answer the user's question using the retrieved context from Vector Embeddings, Neo4j Knowledge Graph, and Industry Skill Benchmarks.

User Question:
"${question}"

Context from Vector DB (Embeddings):
${vectorChunks.length > 0 ? vectorChunks.join("\n") : "None retrieved"}

Context from Neo4j Curriculum Knowledge Graph:
${graphNodes.length > 0 ? graphNodes.join("\n") : "No specific curriculum graph found for this document"}

Context from Neo4j Industry Knowledge Graph:
${industrySkills.length > 0 ? industrySkills.join("\n") : "Standard Software Engineering & AI skills"}

Context from Gap Analysis Report:
${gapReportContext || "No prior gap report found"}

Instructions:
1. Provide a detailed, insightful, and actionable answer.
2. Return ONLY valid JSON matching this exact structure:
{
  "answer": "Clear, comprehensive answer addressing the user's question.",
  "sources": ["Vector DB", "Neo4j Knowledge Graph", "Industry Skill Graph"],
  "relatedSkills": ["Skill 1", "Skill 2", "Skill 3"],
  "confidence": 90
}
`;

  // 5. Send Context to Gemini
  const ai = getGeminiClient();
  if (!ai) {
    return {
      answer: "Gemini AI client is unavailable.",
      sources: ["Fallback"],
      relatedSkills: ["Python", "Docker", "Algorithms"],
      confidence: 50,
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contextPrompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const rawText = response.text || "";
    const cleanedText = rawText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    const parsed = JSON.parse(cleanedText);

    return {
      answer: parsed.answer || "No response text generated.",
      sources: Array.isArray(parsed.sources) ? parsed.sources : ["Neo4j Knowledge Graph", "Industry Benchmark"],
      relatedSkills: Array.isArray(parsed.relatedSkills) ? parsed.relatedSkills : ["Docker", "Python", "Kubernetes"],
      confidence: typeof parsed.confidence === "number" ? parsed.confidence : 88,
    };
  } catch (err: any) {
    console.error("[DEBUG] Gemini GraphRAG error:", err.message);
    return {
      answer: `Based on your curriculum graph and industry benchmarks, we recommend aligning your syllabus with cloud-native practices (Docker, CI/CD, Microservices). (Note: ${err.message})`,
      sources: ["Neo4j Knowledge Graph", "Industry Benchmarks"],
      relatedSkills: ["Docker", "Kubernetes", "Git", "REST APIs"],
      confidence: 80,
    };
  }
}

export async function generateRecommendations(data: {
  topics: string[];
  covered: string[];
  missing: string[];
}) {
  const { topics, covered, missing } = data;
  const question = `What recommendations do you have for a course with missing skills: ${missing.join(", ")}?`;
  return askGraphRAG(question);
}
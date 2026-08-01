import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini client lazily if key exists
  let ai: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!ai && process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return ai;
  }

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Lumini Backend", timestamp: new Date().toISOString() });
  });

  // AI Curriculum Generator Endpoint
  app.post("/api/generate-curriculum", async (req, res) => {
    try {
      const { subject, level, focus, format } = req.body;
      const client = getGeminiClient();

      if (!client) {
        // High quality fallback payload if GEMINI_API_KEY is not available in environment
        return res.json({
          status: "success",
          source: "simulated",
          data: {
            title: `${subject || "Advanced Machine Learning & AI"} Curriculum`,
            code: "CS-8042",
            level: level || "Graduate / Master's Level",
            credits: 4,
            bloomMapping: {
              remembering: "15% - Core terminology & mathematical foundations",
              understanding: "20% - Model architectures & optimization theories",
              applying: "25% - PyTorch/TensorFlow implementations & ML pipelines",
              analyzing: "20% - Error diagnostics, bias detection & performance tuning",
              evaluating: "10% - Model benchmarking, ethics & trade-off trade-off analysis",
              creating: "10% - Novel architecture design & capstone industry project"
            },
            learningOutcomes: [
              "Formulate and evaluate deep learning architectures for high-dimensional multi-modal data.",
              "Implement scalable distributed training pipelines using Docker, Kubernetes, and Ray.",
              "Construct robust MLOps monitoring systems to detect model drift, latency spikes, and bias.",
              "Design ethical AI governance frameworks adhering to international compliance standards."
            ],
            units: [
              {
                unitNumber: 1,
                title: "Foundations & High-Dimensional Representations",
                topics: ["Tensor Algebra & Autograd", "Loss Surface Dynamics", "Latent Space Mapping", "Dimensionality Reduction"],
                practicalLab: "Build an autograd engine from scratch using Python/NumPy",
                durationWeeks: 3
              },
              {
                unitNumber: 2,
                title: "Modern Transformer & Attention Mechanisms",
                topics: ["Self-Attention Mechanics", "Multi-Head Projection", "Positional Encodings", "FlashAttention & KV-Caching"],
                practicalLab: "Train a 10M parameter mini-GPT model on custom domain text",
                durationWeeks: 4
              },
              {
                unitNumber: 3,
                title: "MLOps, Containerization & Distributed Inference",
                topics: ["Docker & Kubernetes Orchestration", "vLLM / TensorRT Acceleration", "Model Drift & Evidentiary Metrics"],
                practicalLab: "Deploy a high-throughput LLM API behind Nginx with Prometheus metrics",
                durationWeeks: 4
              },
              {
                unitNumber: 4,
                title: "AI Safety, Alignment & Capstone Architecture",
                topics: ["RLHF & DPO Alignment", "Red Teaming & Jailbreak Mitigation", "Model Governance & Auditing"],
                practicalLab: "Industry Capstone: Enterprise-grade Retrieval Augmented Generation (RAG) System",
                durationWeeks: 4
              }
            ],
            assessmentMatrix: [
              { component: "Practical Labs & Coding Assignments", weight: "30%", format: "GitHub Repositories + Automated CI/CD Autograding" },
              { component: "Mid-Term Technical Examination", weight: "20%", format: "Theoretical & Algorithm Formulation" },
              { component: "Industry Capstone Project", weight: "35%", format: "Peer-reviewed Code, Architecture Document & Live Demo" },
              { component: "Bloom's Reflective Quizzes & Rubrics", weight: "15%", format: "Weekly AI-generated adaptive question papers" }
            ],
            industryToolsCoverage: ["PyTorch", "Docker", "vLLM", "Ray", "Weights & Biases", "FastAPI", "Prometheus", "ChromaDB"]
          }
        });
      }

      const prompt = `You are Lumini, an enterprise curriculum intelligence AI.
Generate an institutional-grade, Bloom's Taxonomy-aligned course curriculum for:
Subject: ${subject || "Artificial Intelligence & Distributed Systems"}
Level: ${level || "Undergraduate / Post-Graduate"}
Focus Area: ${focus || "Industry Readiness & Hands-on MLOps"}
Format: ${format || "15-Week Semester"}

Respond in structured JSON format with exact keys:
{
  "title": "string",
  "code": "string",
  "level": "string",
  "credits": number,
  "bloomMapping": {
    "remembering": "string",
    "understanding": "string",
    "applying": "string",
    "analyzing": "string",
    "evaluating": "string",
    "creating": "string"
  },
  "learningOutcomes": ["string", "string", "string", "string"],
  "units": [
    {
      "unitNumber": number,
      "title": "string",
      "topics": ["string", "string"],
      "practicalLab": "string",
      "durationWeeks": number
    }
  ],
  "assessmentMatrix": [
    { "component": "string", "weight": "string", "format": "string" }
  ],
  "industryToolsCoverage": ["string", "string"]
}`;

      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json({
        status: "success",
        source: "gemini-3.6-flash",
        data: parsed
      });
    } catch (error: any) {
      console.error("Error generating curriculum:", error);
      res.status(500).json({ status: "error", message: error.message || "Failed to generate curriculum" });
    }
  });

  // AI Audit Syllabus Endpoint
  app.post("/api/audit-syllabus", async (req, res) => {
    try {
      const { syllabusText } = req.body;
      const client = getGeminiClient();

      if (!client || !syllabusText) {
        return res.json({
          status: "success",
          source: "simulated",
          data: {
            healthScore: 94,
            industryAlignmentScore: 92,
            missingSkills: ["Docker & Containerization", "LLM Inference Acceleration", "MLOps Pipeline Automation", "Vector Search Databases"],
            outdatedTopics: ["Legacy Monolithic Deployments", "Manual Feature Engineering with Weka"],
            bloomTaxonomyDistribution: {
              lowerOrderPct: 35,
              higherOrderPct: 65
            },
            recommendations: [
              {
                priority: "High",
                title: "Integrate PyTorch & Distributed Training in Unit 3",
                rationale: "92% of current AI Engineering roles require familiarity with GPU tensor operations and distributed data parallel training.",
                evidence: "Found in 120+ active AI Engineering Job Descriptions from Top Tech & Research Labs."
              },
              {
                priority: "Medium",
                title: "Add MLOps Monitoring & Model Governance Lab",
                rationale: "Accreditation guidelines (ABET & IEEE 2025) mandate ethics and observability in AI engineering degree programs.",
                evidence: "Required by 88% of enterprise engineering teams."
              }
            ]
          }
        });
      }

      const prompt = `You are Lumini Audit Engine. Analyze this syllabus snippet:
"${syllabusText.slice(0, 3000)}"

Return structured JSON audit results:
{
  "healthScore": number (0-100),
  "industryAlignmentScore": number (0-100),
  "missingSkills": ["string"],
  "outdatedTopics": ["string"],
  "bloomTaxonomyDistribution": { "lowerOrderPct": number, "higherOrderPct": number },
  "recommendations": [
    { "priority": "High" | "Medium" | "Low", "title": "string", "rationale": "string", "evidence": "string" }
  ]
}`;

      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.1
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json({
        status: "success",
        source: "gemini-3.6-flash",
        data: parsed
      });
    } catch (error: any) {
      console.error("Error auditing syllabus:", error);
      res.status(500).json({ status: "error", message: error.message || "Failed to audit syllabus" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lumini Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

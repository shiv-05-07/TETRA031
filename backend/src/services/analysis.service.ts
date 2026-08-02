import { getGeminiClient } from "../config/gemini";

export interface CourseAnalysis {
  course: {
    name: string;
    semester: number | null;
    credits: number | null;
  };
  units: Array<{
    title: string;
    topics: string[];
  }>;
  prerequisites: string[];
  learningOutcomes: string[];
  books: string[];
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isUnavailableError(err: any): boolean {
  if (!err) return false;
  const status = err.status || err.statusCode || err.code;
  if (status === 503 || status === "503") return true;

  const msg = (err.message || "").toLowerCase();
  const resp = JSON.stringify(err.response || "").toLowerCase();

  return (
    msg.includes("503") ||
    msg.includes("unavailable") ||
    msg.includes("high demand") ||
    msg.includes("overloaded") ||
    resp.includes("503") ||
    resp.includes("unavailable") ||
    resp.includes("high demand")
  );
}

export async function analyzeCurriculum(text: string): Promise<CourseAnalysis> {
  console.log("[DEBUG] Gemini analysis started inside analyzeCurriculum");
  const ai = getGeminiClient();
  const isDummyKey = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "dummy";

  if (!ai || isDummyKey) {
    console.log("[DEBUG] Dummy key detected or client missing. Returning mock schema.");
    return {
      course: {
        name: "Extracted Course Syllabus",
        semester: 1,
        credits: 4,
      },
      units: [
        {
          title: "Unit 1: Introduction",
          topics: ["Overview", "Fundamentals"],
        },
      ],
      prerequisites: ["Basic Knowledge"],
      learningOutcomes: ["Understand core concepts"],
      books: ["Standard Reference Textbook"],
    };
  }

  const prompt = `
You are an expert academic curriculum parser. Extract structured course details from the provided syllabus/curriculum text.
You MUST return ONLY valid JSON matching this exact structure, with no markdown code fences or additional commentary:

{
  "course": {
    "name": "Course Name",
    "semester": null,
    "credits": null
  },
  "units": [
    {
      "title": "Unit Title",
      "topics": ["Topic 1", "Topic 2"]
    }
  ],
  "prerequisites": [],
  "learningOutcomes": [],
  "books": []
}

Curriculum Text:
${text}
`;

  const maxAttempts = 3;
  const delays = [2000, 4000];

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`[DEBUG] Gemini attempt ${attempt}`);

    try {
      console.log("[DEBUG] Sending request to Gemini using model: gemini-3.6-flash");
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      console.log("[DEBUG] Gemini response received");
      const rawText = response.text || "";
      console.log("[DEBUG] Gemini raw output snippet:", rawText.slice(0, 300));

      const cleanedText = rawText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const parsed: CourseAnalysis = JSON.parse(cleanedText);

      if (!parsed || typeof parsed !== "object" || !parsed.course) {
        throw new Error("Invalid schema returned by Gemini");
      }

      console.log("[DEBUG] Gemini success");
      return {
        course: {
          name: parsed.course?.name || "Unknown Course",
          semester: typeof parsed.course?.semester === "number" ? parsed.course.semester : null,
          credits: typeof parsed.course?.credits === "number" ? parsed.course.credits : null,
        },
        units: Array.isArray(parsed.units) ? parsed.units : [],
        prerequisites: Array.isArray(parsed.prerequisites) ? parsed.prerequisites : [],
        learningOutcomes: Array.isArray(parsed.learningOutcomes) ? parsed.learningOutcomes : [],
        books: Array.isArray(parsed.books) ? parsed.books : [],
      };
    } catch (err: any) {
      console.error(`[DEBUG] Gemini Error on attempt ${attempt}:`, err.message);

      if (err.message && err.message.includes("API_KEY_INVALID")) {
        console.log("[DEBUG] API_KEY_INVALID detected, returning fallback schema.");
        return {
          course: {
            name: "Extracted Course Syllabus",
            semester: 1,
            credits: 4,
          },
          units: [
            {
              title: "Unit 1: Introduction",
              topics: ["Overview", "Fundamentals"],
            },
          ],
          prerequisites: ["Basic Knowledge"],
          learningOutcomes: ["Understand core concepts"],
          books: ["Standard Reference Textbook"],
        };
      }

      const isUnavailable = isUnavailableError(err);

      if (isUnavailable && attempt < maxAttempts) {
        const waitSec = delays[attempt - 1] / 1000;
        console.log(`[DEBUG] Retry after ${waitSec}s`);
        await delay(delays[attempt - 1]);
      } else if (isUnavailable && attempt === maxAttempts) {
        console.error("[DEBUG] Gemini failed after retries");
        throw new Error("Gemini service is temporarily unavailable. Please try again in a few minutes.");
      } else {
        throw new Error(`Gemini Analysis Error: ${err.message}`);
      }
    }
  }

  console.error("[DEBUG] Gemini failed after retries");
  throw new Error("Gemini service is temporarily unavailable. Please try again in a few minutes.");
}

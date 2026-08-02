import { driver } from "../config/neo4j";
import { CourseAnalysis } from "./analysis.service";

export async function createKnowledgeGraph(
    documentId: string,
    analysis: CourseAnalysis
): Promise<void> {
    console.log(`[DEBUG] Starting Neo4j knowledge graph generation for documentId: ${documentId}`);
    const session = driver.session();

    try {
        const courseName = analysis.course?.name || "Untitled Course";
        const semester = analysis.course?.semester ?? null;
        const credits = analysis.course?.credits ?? null;
        const units = analysis.units || [];
        const prerequisites = analysis.prerequisites || [];
        const learningOutcomes = analysis.learningOutcomes || [];
        const books = analysis.books || [];

        // Extract tools or software mentioned across topics and outcomes
        const toolKeywords = ["Python", "Java", "C++", "C", "SQL", "Git", "Docker", "Linux", "VSCode", "React", "Node", "MongoDB", "PostgreSQL", "R"];
        const extractedToolsSet = new Set<string>();

        const allText = JSON.stringify(analysis).toLowerCase();
        for (const kw of toolKeywords) {
            if (allText.includes(kw.toLowerCase())) {
                extractedToolsSet.add(kw);
            }
        }
        if (extractedToolsSet.size === 0) {
            extractedToolsSet.add("Standard Development Environment");
        }
        const tools = Array.from(extractedToolsSet);

        // Cypher query creating nodes (Course, Unit, Topic, Skill, Tool, Book, Prerequisite)
        // and relationships ((Course)-[:HAS_UNIT]->(Unit), (Unit)-[:HAS_TOPIC]->(Topic), (Course)-[:DEVELOPS]->(Skill), (Course)-[:USES_TOOL]->(Tool), (Course)-[:REQUIRES]->(Prerequisite), (Course)-[:REFERENCES]->(Book))
        const cypherQuery = `
            MERGE (c:Course { documentId: $documentId })
            SET c.courseName = $courseName,
                c.semester = $semester,
                c.credits = $credits

            WITH c
            UNWIND $units AS uData
            MERGE (u:Unit { name: uData.title, documentId: $documentId })
            MERGE (c)-[:HAS_UNIT]->(u)

            WITH c, u, uData
            UNWIND uData.topics AS tName
            MERGE (t:Topic { name: tName, documentId: $documentId })
            MERGE (u)-[:HAS_TOPIC]->(t)
            MERGE (sk:Skill { name: tName, documentId: $documentId })
            MERGE (c)-[:DEVELOPS]->(sk)

            WITH c
            UNWIND $prerequisites AS pName
            MERGE (p:Prerequisite { name: pName, documentId: $documentId })
            MERGE (c)-[:REQUIRES]->(p)

            WITH c
            UNWIND $learningOutcomes AS loName
            MERGE (s:Skill { name: loName, documentId: $documentId })
            MERGE (c)-[:DEVELOPS]->(s)

            WITH c
            UNWIND $books AS bName
            MERGE (b:Book { title: bName, documentId: $documentId })
            MERGE (c)-[:REFERENCES]->(b)

            WITH c
            UNWIND $tools AS tlName
            MERGE (tl:Tool { name: tlName, documentId: $documentId })
            MERGE (c)-[:USES_TOOL]->(tl)
        `;

        await session.executeWrite((tx) =>
            tx.run(cypherQuery, {
                documentId,
                courseName,
                semester,
                credits,
                units: units.length > 0 ? units : [{ title: "Unit 1: Fundamentals", topics: ["Introduction", "Core Principles"] }],
                prerequisites: prerequisites.length > 0 ? prerequisites : ["Basic Knowledge"],
                learningOutcomes: learningOutcomes.length > 0 ? learningOutcomes : ["Master Core Concepts"],
                books: books.length > 0 ? books : ["Standard Reference Book"],
                tools: tools,
            })
        );

        console.log(`[DEBUG] Neo4j knowledge graph generated successfully for documentId: ${documentId}`);
    } catch (err: any) {
        console.error("[DEBUG] Neo4j graph generation failed:", err);
        throw new Error(`Neo4j Graph Generation Error: ${err.message}`);
    } finally {
        await session.close();
    }
}

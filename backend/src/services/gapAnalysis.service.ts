import { driver } from "../config/neo4j";
import { supabase } from "../config/supabase";

export interface GapReport {
    overallScore: number;
    coverage: number;
    missingSkills: string[];
    missingTopics: string[];
    missingTools: string[];
    missingPrerequisites: string[];
    recommendations: string[];
}

export async function analyzeCurriculumGap(documentId: string): Promise<GapReport> {
    console.log(`[DEBUG] Starting Neo4j-only curriculum gap analysis for documentId: ${documentId}`);
    const session = driver.session();

    try {
        // 1. Query IndustrySkill nodes directly from Neo4j
        const fetchIndustrySkillsQuery = `
            MATCH (s:IndustrySkill)
            RETURN DISTINCT s.name AS name
        `;
        const skillsResult = await session.executeRead((tx) => tx.run(fetchIndustrySkillsQuery));
        const industrySkills = skillsResult.records.map((r) => r.get("name") as string).filter(Boolean);

        // 2. Query Industry Tool nodes directly from Neo4j
        const fetchIndustryToolsQuery = `
            MATCH (d:Domain)-[:USES_TOOL]->(t:Tool)
            RETURN DISTINCT t.name AS name
        `;
        const toolsResult = await session.executeRead((tx) => tx.run(fetchIndustryToolsQuery));
        const industryTools = toolsResult.records.map((r) => r.get("name") as string).filter(Boolean);

        // 3. Query Uploaded Curriculum nodes for this documentId from Neo4j
        const fetchCurriculumQuery = `
            MATCH (n { documentId: $documentId })
            RETURN labels(n) AS labels, n.name AS name, n.title AS title, n.courseName AS courseName
        `;
        const curriculumResult = await session.executeRead((tx) => tx.run(fetchCurriculumQuery, { documentId }));

        const curriculumConcepts = new Set<string>();
        curriculumResult.records.forEach((rec) => {
            const name = rec.get("name") || rec.get("title") || rec.get("courseName");
            if (name && typeof name === "string") {
                curriculumConcepts.add(name.toLowerCase());
            }
        });

        // 4. Compare Curriculum Graph against Neo4j Industry Graph
        const missingSkills: string[] = [];
        const coveredSkills: string[] = [];

        industrySkills.forEach((skill) => {
            const lowerSkill = skill.toLowerCase();
            let isCovered = false;
            for (const concept of curriculumConcepts) {
                if (concept.includes(lowerSkill) || lowerSkill.includes(concept)) {
                    isCovered = true;
                    break;
                }
            }
            if (isCovered) {
                coveredSkills.push(skill);
            } else {
                missingSkills.push(skill);
            }
        });

        const missingTools: string[] = [];
        industryTools.forEach((tool) => {
            const lowerTool = tool.toLowerCase();
            let isCovered = false;
            for (const concept of curriculumConcepts) {
                if (concept.includes(lowerTool) || lowerTool.includes(concept)) {
                    isCovered = true;
                    break;
                }
            }
            if (!isCovered) {
                missingTools.push(tool);
            }
        });

        const totalIndustrySkills = Math.max(1, industrySkills.length);
        const coverage = Math.min(100, Math.round((coveredSkills.length / totalIndustrySkills) * 100));
        const overallScore = Math.min(100, Math.round(coverage * 0.7 + 30));

        const missingTopics = missingSkills.slice(0, 5).map((s) => `${s} Principles & Application`);
        const missingPrerequisites = missingSkills.slice(0, 3).map((s) => `${s} Fundamentals`);

        const recommendations: string[] = [];
        if (missingTools.length > 0) {
            recommendations.push(`Incorporate hands-on practical lab for ${missingTools.slice(0, 3).join(", ")}`);
        }
        if (missingSkills.length > 0) {
            recommendations.push(`Add course modules covering ${missingSkills.slice(0, 4).join(", ")}`);
        }
        recommendations.push("Modernize syllabus learning outcomes to align with current Neo4j Industry Knowledge Graph benchmarks");

        const report: GapReport = {
            overallScore,
            coverage,
            missingSkills: missingSkills.slice(0, 15),
            missingTopics,
            missingTools: missingTools.slice(0, 10),
            missingPrerequisites,
            recommendations,
        };

        // 5. Save report in Supabase analysis_results table
        try {
            const { error: dbError } = await supabase
                .from("analysis_results")
                .insert({
                    document_id: documentId,
                    score: report.overallScore,
                    coverage: report.coverage,
                    report: report,
                });

            if (dbError) {
                console.warn("[DEBUG] Notice on analysis_results storage:", dbError.message);
            } else {
                console.log("[DEBUG] Gap report saved to analysis_results table successfully.");
            }
        } catch (dbErr: any) {
            console.warn("[DEBUG] Note on analysis_results storage:", dbErr.message);
        }

        return report;
    } catch (err: any) {
        console.error("[DEBUG] Neo4j Curriculum Gap Analysis failed:", err);
        throw new Error(`Gap Analysis Error: ${err.message}`);
    } finally {
        await session.close();
    }
}

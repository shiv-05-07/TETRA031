import { driver } from "../config/neo4j";
import { getRawIndustryData } from "../services/industry.service";

export async function importIndustryGraph(): Promise<void> {
    console.log("[SEED] Starting Industry Knowledge Graph import...");
    const data = getRawIndustryData();
    const session = driver.session();

    try {
        const cypherQuery = `
            UNWIND $domains AS dData
            MERGE (d:Domain { name: dData.name })

            WITH d, dData
            UNWIND dData.skills AS skillName
            MERGE (s:IndustrySkill { name: skillName })
            MERGE (d)-[:HAS_SKILL]->(s)

            WITH d, dData
            UNWIND dData.tools AS toolName
            MERGE (t:Tool { name: toolName })
            MERGE (d)-[:USES_TOOL]->(t)
        `;

        await session.executeWrite((tx) =>
            tx.run(cypherQuery, {
                domains: data.domains,
            })
        );

        console.log("[SEED] Industry Knowledge Graph seeded successfully using MERGE.");
    } catch (err: any) {
        console.error("[SEED] Failed to import Industry Knowledge Graph:", err);
        throw err;
    } finally {
        await session.close();
    }
}

async function runMain() {
    try {
        await importIndustryGraph();
        console.log("[SEED] Completed successfully.");
    } catch (err) {
        console.error("[SEED] Error:", err);
        process.exitCode = 1;
    } finally {
        await driver.close();
    }
}

runMain();

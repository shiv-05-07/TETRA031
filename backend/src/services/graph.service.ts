import { driver } from "../config/neo4j";

export interface TopicNode {
    name: string;
    prerequisites?: string[];
}

export interface UnitNode {
    name: string;
    topics: TopicNode[];
}

export interface SubjectGraph {
    name: string;
    semester?: number;
    credits?: number;
    units: UnitNode[];
}

class GraphService {
    /**
     * Creates/updates a complete subject graph.
     */
    async createSubjectGraph(data: SubjectGraph) {
        const session = driver.session();

        try {
            await session.executeWrite(async (tx) => {
                // Subject
                await tx.run(
                    `
          MERGE (s:Subject {name:$name})
          SET
            s.semester = $semester,
            s.credits = $credits,
            s.updatedAt = datetime()
          `,
                    {
                        name: data.name,
                        semester: data.semester ?? null,
                        credits: data.credits ?? null,
                    }
                );

                // Units
                for (const unit of data.units) {
                    await tx.run(
                        `
            MATCH (s:Subject {name:$subject})

            MERGE (u:Unit {name:$unit})

            MERGE (s)-[:HAS_UNIT]->(u)
            `,
                        {
                            subject: data.name,
                            unit: unit.name,
                        }
                    );

                    // Topics
                    for (const topic of unit.topics) {
                        await tx.run(
                            `
              MATCH (u:Unit {name:$unit})

              MERGE (t:Topic {name:$topic})

              MERGE (u)-[:HAS_TOPIC]->(t)
              `,
                            {
                                unit: unit.name,
                                topic: topic.name,
                            }
                        );

                        // Prerequisites
                        if (topic.prerequisites) {
                            for (const prerequisite of topic.prerequisites) {
                                await tx.run(
                                    `
                  MATCH (t:Topic {name:$topic})

                  MERGE (p:Topic {name:$prerequisite})

                  MERGE (t)-[:PREREQUISITE]->(p)
                  `,
                                    {
                                        topic: topic.name,
                                        prerequisite,
                                    }
                                );
                            }
                        }
                    }
                }
            });

            return {
                success: true,
            };
        } finally {
            await session.close();
        }
    }

    /**
     * Returns complete graph for visualization.
     */
    async getKnowledgeGraph() {
        const session = driver.session();

        try {
            const result = await session.run(`
        MATCH (n)
        OPTIONAL MATCH (n)-[r]->(m)

        RETURN
          collect(DISTINCT n) AS nodes,
          collect(DISTINCT {
            source:id(startNode(r)),
            target:id(endNode(r)),
            type:type(r)
          }) AS relationships
      `);

            return result.records[0].toObject();
        } finally {
            await session.close();
        }
    }

    /**
     * Semantic graph search.
     */
    async findTopic(topic: string) {
        const session = driver.session();

        try {
            const result = await session.run(
                `
        MATCH (t:Topic {name:$topic})

        OPTIONAL MATCH (t)-[:PREREQUISITE]->(p)

        OPTIONAL MATCH (u)-[:HAS_TOPIC]->(t)

        OPTIONAL MATCH (s)-[:HAS_UNIT]->(u)

        RETURN s,u,t,collect(p) AS prerequisites
        `,
                { topic }
            );

            return result.records.map((r) => r.toObject());
        } finally {
            await session.close();
        }
    }

    /**
     * Deletes a subject and its relationships.
     */
    async deleteSubject(subject: string) {
        const session = driver.session();

        try {
            await session.run(
                `
        MATCH (s:Subject {name:$subject})

        DETACH DELETE s
        `,
                { subject }
            );
        } finally {
            await session.close();
        }
    }

    /**
     * Database health check.
     */
    async health() {
        const session = driver.session();

        try {
            await session.run("RETURN 1");
            return true;
        } finally {
            await session.close();
        }
    }
}

export default new GraphService();

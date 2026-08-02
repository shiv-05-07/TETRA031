import { INDUSTRY_SKILLS } from "../data/industrySkills.js";
import { SemanticMatchResult } from "./curriculumService.js";

export interface GapAnalysisResult {
  matchedSkills: string[];
  weakAreas: string[];
  missingSkills: string[];
}

/**
 * Performs a gap analysis by diffing the semantic matches against the full industry baseline.
 * Thresholds:
 * - Similarity > 0.75 -> matched
 * - Similarity 0.4 - 0.75 -> weak
 * - Similarity < 0.4 -> missing
 * 
 * Note: Chroma returns distance. We naive convert distance to similarity via (1 - distance) assuming cosine.
 */
export function performGapAnalysis(semanticResults: SemanticMatchResult[]): GapAnalysisResult {
  const matchedSet = new Set<string>();
  const weakSet = new Set<string>();

  // Extract all matched industry skills from the curriculum results
  for (const result of semanticResults) {
    for (const match of result.matches) {
      if (INDUSTRY_SKILLS.includes(match.document)) {
        // Simple conversion from distance to similarity
        const similarity = Math.max(0, 1 - match.distance);
        
        if (similarity > 0.75) {
          matchedSet.add(match.document);
        } else if (similarity >= 0.40) {
          weakSet.add(match.document);
        }
      }
    }
  }

  const matchedSkills = Array.from(matchedSet);
  const weakAreas = Array.from(weakSet).filter(skill => !matchedSet.has(skill));
  
  // Missing skills are those that are neither matched nor weak
  const missingSkills = INDUSTRY_SKILLS.filter(
    skill => !matchedSet.has(skill) && !weakSet.has(skill)
  );

  return {
    matchedSkills,
    weakAreas,
    missingSkills
  };
}

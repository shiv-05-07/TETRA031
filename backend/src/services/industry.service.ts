import fs from "fs";
import path from "path";

export interface IndustryDomainData {
    name: string;
    skills: string[];
    tools: string[];
}

export interface IndustryJSON {
    industry: string;
    version: string;
    domains: IndustryDomainData[];
}

function loadJSON(): IndustryJSON {
    const primaryPath = path.resolve(process.cwd(), "backend/data/industry-skills.json");
    const secondaryPath = path.resolve(process.cwd(), "backend/src/data/industry-skills.json");

    let filePath = primaryPath;
    if (!fs.existsSync(filePath)) {
        filePath = secondaryPath;
    }

    if (!fs.existsSync(filePath)) {
        throw new Error(`industry-skills.json not found at ${primaryPath} or ${secondaryPath}`);
    }

    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as IndustryJSON;
}

export function getRawIndustryData(): IndustryJSON {
    return loadJSON();
}

export function getIndustryDomains(): string[] {
    const data = loadJSON();
    const domains = data.domains.map((d) => d.name.trim());
    return Array.from(new Set(domains));
}

export function getIndustrySkills(): string[] {
    const data = loadJSON();
    const allSkills = data.domains.flatMap((d) => d.skills.map((s) => s.trim()));
    return Array.from(new Set(allSkills));
}

export function getIndustryTools(): string[] {
    const data = loadJSON();
    const allTools = data.domains.flatMap((d) => d.tools.map((t) => t.trim()));
    return Array.from(new Set(allTools));
}

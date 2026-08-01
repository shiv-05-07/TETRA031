import React from 'react';
import { motion } from 'motion/react';
import { Network, Binary, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface TechnologyStackProps {
  theme: ThemeMode;
}

const technologies = [
  {
    title: "Neo4j",
    subtitle: "Skill Ontology Graph",
    description: "Maps relationships between courses, skills, technologies, industry roles and job-demand concepts.",
    icon: Network,
    color: "#4F46E5" // Indigo
  },
  {
    title: "ChromaDB / Milvus",
    subtitle: "Semantic Gap Analyzer",
    description: "Uses vector search and semantic similarity to compare curriculum content against industry requirements.",
    icon: Binary,
    color: "#0EA5E9" // Sky
  },
  {
    title: "LLM",
    subtitle: "Syllabus Augmenter",
    description: "Generates relevant syllabus modifications, modern topics, tools, case studies and project suggestions.",
    icon: Sparkles,
    color: "#10B981" // Emerald
  }
];

export const TechnologyStack: React.FC<TechnologyStackProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="technology" className={`py-20 lg:py-28 transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FFFFFF] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Powered by Advanced AI Technologies
          </h2>
          <p className={`text-base leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Purpose-built AI components work together to identify curriculum gaps and generate actionable improvements.
          </p>
        </div>

        {/* Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-[24px] border relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#111111] border-[#262626] hover:border-[#10B981]/40'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] hover:border-[#10B981]/40 hover:shadow-xl hover:shadow-[#10B981]/10'
              }`}
            >
              {/* Subtle top gradient line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: tech.color }}
              />

              <div className="flex flex-col h-full">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${tech.color}15` }}
                >
                  <tech.icon className="w-7 h-7" style={{ color: tech.color }} />
                </div>
                
                <h3 className="font-heading font-bold text-2xl mb-1">
                  {tech.title}
                </h3>
                <h4 className={`font-mono text-sm uppercase tracking-wider mb-4 font-semibold`} style={{ color: tech.color }}>
                  {tech.subtitle}
                </h4>
                
                <p className={`text-sm leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

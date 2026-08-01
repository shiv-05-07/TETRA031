import React from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';

interface PlatformMetricsProps {
  theme: ThemeMode;
}

const metrics = [
  { value: "PDF / DOCX", label: "Curriculum Input" },
  { value: "Neo4j", label: "Skill Ontology" },
  { value: "Vector Search", label: "Semantic Analysis" },
  { value: "LLM", label: "Syllabus Augmentation" }
];

export const PlatformMetrics: React.FC<PlatformMetricsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section className={`py-12 border-b transition-colors ${
      isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-dashed divide-[#262626]/20">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center px-4"
            >
              <span className={`text-xl sm:text-2xl font-heading font-bold mb-1 ${
                isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'
              }`}>
                {metric.value}
              </span>
              <span className={`text-xs font-mono uppercase tracking-wider ${
                isDark ? 'text-[#10B981]' : 'text-[#059669]'
              }`}>
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

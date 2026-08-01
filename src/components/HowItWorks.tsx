import React from 'react';
import { motion } from 'motion/react';
import { Upload, Cpu, Network, Search, Sparkles, LayoutDashboard } from 'lucide-react';
import { ThemeMode } from '../types';

interface HowItWorksProps {
  theme: ThemeMode;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const STEPS = [
    {
      stepNumber: "01",
      icon: Upload,
      title: "Upload Curriculum",
      description: "Upload curriculum documents in PDF/DOCX format."
    },
    {
      stepNumber: "02",
      icon: Cpu,
      title: "AI Processing",
      description: "Extract curriculum text and generate semantic embeddings."
    },
    {
      stepNumber: "03",
      icon: Network,
      title: "Skill Mapping",
      description: "Map course outcomes and curriculum concepts to the Skill Ontology using Neo4j."
    },
    {
      stepNumber: "04",
      icon: Search,
      title: "Semantic Analysis",
      description: "Compare curriculum content against industry requirements using vector similarity search."
    },
    {
      stepNumber: "05",
      icon: Sparkles,
      title: "AI Recommendations",
      description: "Use an LLM to generate actionable syllabus improvements."
    },
    {
      stepNumber: "06",
      icon: LayoutDashboard,
      title: "Results & Insights",
      description: "View skill coverage, missing skills, outdated skills, semantic gaps and recommendations."
    }
  ];

  return (
    <section id="how-it-works" className={`py-20 lg:py-28 transition-colors ${
      isDark ? 'bg-[#111111] text-[#FAFAFA]' : 'bg-[#F8FAFC] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 relative z-10">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            How CurricuAlign AI Works
          </h2>
          <p className={`text-base leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            An AI-powered pipeline transforms your curriculum into actionable industry-alignment insights.
          </p>
        </div>

        {/* Timeline Grid with Dotted Connector Line */}
        <div className="relative">
          {/* Subtle Dotted Flow Line (visible on md+) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0 border-t-2 border-dashed border-[#10B981]/30 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`p-6 rounded-[18px] border relative transition-all duration-200 hover:border-[#10B981]/50 ${
                    isDark
                      ? 'bg-[#171717] border-[#262626]'
                      : 'bg-[#FFFFFF] border-[#E5E7EB]'
                  }`}
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono font-bold text-sm text-[#10B981]">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl tracking-tight mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

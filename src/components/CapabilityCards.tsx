import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, Target, Network, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface CapabilityCardsProps {
  theme: ThemeMode;
}

const features = [
  {
    title: "Data-Driven Insights",
    description: "Analyze curriculum content against industry and skill-market data.",
    icon: BarChart3
  },
  {
    title: "Identify Skill Gaps",
    description: "Detect missing, outdated and underrepresented skills.",
    icon: Target
  },
  {
    title: "Semantic Gap Analysis",
    description: "Compare curriculum content with industry requirements using vector similarity.",
    icon: Network
  },
  {
    title: "AI-Powered Recommendations",
    description: "Generate actionable syllabus improvements, modern topics, tools, case studies and projects.",
    icon: Sparkles
  }
];

export const CapabilityCards: React.FC<CapabilityCardsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="features" className={`py-16 transition-colors ${
      isDark ? 'bg-[#0A0A0A]' : 'bg-[#FFFFFF]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-[20px] border relative overflow-hidden group ${
                isDark 
                  ? 'bg-[#111111] border-[#262626] hover:border-[#10B981]/50' 
                  : 'bg-[#F8FAFC] border-[#E5E7EB] hover:border-[#10B981]/50 hover:shadow-lg hover:shadow-[#10B981]/10'
              } transition-all duration-300`}
            >
              {/* Green Glow Hover Effect */}
              <div className="absolute top-0 right-0 p-12 bg-gradient-to-bl from-[#10B981]/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-[#10B981]" />
                </div>
                
                <h3 className={`text-lg font-bold mb-2 font-heading ${
                  isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'
                }`}>
                  {feature.title}
                </h3>
                
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'
                }`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

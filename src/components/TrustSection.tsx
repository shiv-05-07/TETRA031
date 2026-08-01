import React from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';

interface TrustSectionProps {
  theme: ThemeMode;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const UNIVERSITIES = [
    { name: 'Stanford University', label: 'STANFORD' },
    { name: 'Massachusetts Institute of Technology', label: 'MIT' },
    { name: 'University of Oxford', label: 'OXFORD' },
    { name: 'ETH Zürich', label: 'ETH ZÜRICH' },
    { name: 'University of Cambridge', label: 'CAMBRIDGE' },
    { name: 'Carnegie Mellon University', label: 'CARNEGIE MELLON' },
    { name: 'UC Berkeley', label: 'UC BERKELEY' }
  ];

  const STATS = [
    { value: '50,000+', label: 'Resources Generated', desc: 'Lesson plans, question papers & rubrics' },
    { value: '95%', label: 'Time Saved', desc: 'In annual curriculum revision cycles' },
    { value: '100+', label: 'Institutions', desc: 'Universities & technical colleges' },
    { value: '24/7', label: 'AI Availability', desc: 'Continuous Bloom\'s & accreditation alignment' }
  ];

  return (
    <section className={`py-16 border-y transition-colors ${
      isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <p className={`text-xs font-mono font-semibold uppercase tracking-widest ${
            isDark ? 'text-[#737373]' : 'text-[#6B7280]'
          }`}>
            Trusted by Leading Educational Institutions Worldwide
          </p>
        </div>

        {/* Minimal University Logos Bar (Grayscale Style) */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-opacity">
          {UNIVERSITIES.map((uni, idx) => (
            <div 
              key={idx}
              className={`font-heading font-bold tracking-tight text-lg sm:text-xl uppercase select-none transition-colors ${
                isDark ? 'text-[#737373] hover:text-[#FAFAFA]' : 'text-[#9CA3AF] hover:text-[#111827]'
              }`}
            >
              {uni.label}
            </div>
          ))}
        </div>

        {/* 4 Core Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-6 rounded-[18px] border transition-all duration-200 hover:border-[#10B981]/40 ${
                isDark
                  ? 'bg-[#171717] border-[#262626]'
                  : 'bg-[#FFFFFF] border-[#E5E7EB]'
              }`}
            >
              <div className="font-heading font-bold text-3xl sm:text-4xl text-[#10B981] tracking-tight">
                {stat.value}
              </div>
              <div className={`font-semibold text-base mt-2 ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
                {stat.label}
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

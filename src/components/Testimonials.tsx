import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck } from 'lucide-react';
import { ThemeMode } from '../types';
import { TESTIMONIALS_LIST } from '../data';

interface TestimonialsProps {
  theme: ThemeMode;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section className={`py-20 lg:py-28 border-y transition-colors ${
      isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#10B981]">
            Academic Endorsements
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Validated by Deans & Department Chairs
          </h2>
          <p className={`text-base leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Hear how top engineering and data science departments modernize their course syllabi.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_LIST.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`p-6 rounded-[18px] border flex flex-col justify-between space-y-6 ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
              }`}
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-[#10B981]">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#10B981]" />
                ))}
              </div>

              {/* Quote */}
              <p className={`text-sm leading-relaxed italic ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
                "{item.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#262626]/40">
                <div className="w-10 h-10 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center font-bold text-[#10B981] text-sm">
                  {item.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-bold text-sm">{item.author}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <span className={`text-xs block ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    {item.role}, {item.institution}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

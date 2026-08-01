import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ThemeMode } from '../types';
import { FAQ_LIST } from '../data';

interface FAQProps {
  theme: ThemeMode;
}

export const FAQ: React.FC<FAQProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [openId, setOpenId] = useState<string | null>(FAQ_LIST[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className={`py-20 lg:py-28 transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FFFFFF] text-[#111827]'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#10B981]">
            Common Inquiries
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className={`text-base leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Everything you need to know about Lumini's AI engine, security standards, and accreditation mapping.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {FAQ_LIST.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-[18px] border overflow-hidden transition-colors ${
                  isOpen
                    ? 'border-[#10B981]/50 shadow-lg'
                    : isDark
                      ? 'bg-[#111111] border-[#262626]'
                      : 'bg-[#F8FAFC] border-[#E5E7EB]'
                } ${isOpen && isDark ? 'bg-[#171717]' : isOpen && 'bg-[#FFFFFF]'}`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-semibold text-base sm:text-lg focus:outline-none"
                >
                  <span className={isOpen ? 'text-[#10B981]' : ''}>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#10B981]/20 text-[#10B981]' : isDark ? 'bg-[#262626] text-[#B3B3B3]' : 'bg-[#E5E7EB] text-[#6B7280]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`px-6 pb-6 text-sm leading-relaxed border-t pt-4 ${
                        isDark ? 'border-[#262626] text-[#B3B3B3]' : 'border-[#E5E7EB] text-[#6B7280]'
                      }`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

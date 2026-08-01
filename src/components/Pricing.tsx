import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { ThemeMode } from '../types';
import { PRICING_PLANS } from '../data';

interface PricingProps {
  theme: ThemeMode;
  onOpenGetStarted: () => void;
  onOpenBookDemo: () => void;
}

export const Pricing: React.FC<PricingProps> = ({
  theme,
  onOpenGetStarted,
  onOpenBookDemo
}) => {
  const isDark = theme === 'dark';
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className={`py-20 lg:py-28 transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FFFFFF] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#10B981]">
            Transparent Institutional Pricing
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Plans for Individual Professors to University Systems
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Scale AI-powered curriculum alignment across your department with zero hidden fees.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-[#10B981]' : isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
              Monthly Billing
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 rounded-full bg-[#10B981]/20 p-1 border border-[#10B981]/40 transition-colors"
            >
              <div className={`w-6 h-6 rounded-full bg-[#10B981] transition-transform duration-200 ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>

            <span className={`text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-[#10B981]' : isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981] text-white">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className={`rounded-[22px] border p-8 flex flex-col justify-between relative transition-all ${
                  plan.isPopular
                    ? 'border-[#10B981] shadow-2xl shadow-[#10B981]/15 ring-1 ring-[#10B981]'
                    : isDark
                      ? 'bg-[#111111] border-[#262626]'
                      : 'bg-[#F8FAFC] border-[#E5E7EB]'
                } ${plan.isPopular && isDark ? 'bg-[#171717]' : plan.isPopular && 'bg-[#FFFFFF]'}`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#10B981] text-white shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading font-bold text-2xl tracking-tight">
                      {plan.name}
                    </h3>
                    <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 pt-2">
                    {price === 0 ? (
                      <span className="font-heading font-bold text-4xl sm:text-5xl">Free</span>
                    ) : (
                      <>
                        <span className="font-heading font-bold text-4xl sm:text-5xl text-[#10B981]">
                          ${price}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                          / month per dept
                        </span>
                      </>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-4 border-t border-[#262626]/40">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#10B981] font-mono block">
                      Included Capabilities
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs font-medium">
                        <div className="w-4 h-4 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className={isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <button
                    onClick={() => {
                      if (plan.id === 'university') {
                        onOpenBookDemo();
                      } else {
                        onOpenGetStarted();
                      }
                    }}
                    className={`w-full py-3.5 px-4 text-sm font-semibold rounded-[14px] transition-all shadow-md ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-[#10B981] to-[#34D399] text-white hover:shadow-lg hover:shadow-[#10B981]/30'
                        : isDark
                          ? 'bg-[#171717] border border-[#262626] text-[#FAFAFA] hover:bg-[#262626]'
                          : 'bg-[#FFFFFF] border border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6]'
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

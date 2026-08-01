import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

export interface PresetItem {
  title: string;
  level?: string;
  category?: string;
}

interface AutoHorizontalScrollProps {
  presets: PresetItem[];
  selectedTitle: string;
  onSelectPreset: (preset: PresetItem) => void;
  theme: ThemeMode;
  autoScrollSpeed?: number; // pixels per frame or interval
}

export const AutoHorizontalScroll: React.FC<AutoHorizontalScrollProps> = ({
  presets,
  selectedTitle,
  onSelectPreset,
  theme,
  autoScrollSpeed = 0.6
}) => {
  const isDark = theme === 'dark';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const animFrameId = useRef<number | null>(null);

  // Auto-scroll loop
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let isScrollingForward = true;

    const step = () => {
      if (!isPaused && scrollContainer) {
        // Check scroll boundaries
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        if (maxScroll > 0) {
          if (isScrollingForward) {
            scrollContainer.scrollLeft += autoScrollSpeed;
            if (scrollContainer.scrollLeft >= maxScroll - 1) {
              isScrollingForward = false;
            }
          } else {
            scrollContainer.scrollLeft -= autoScrollSpeed;
            if (scrollContainer.scrollLeft <= 1) {
              isScrollingForward = true;
            }
          }
        }
      }

      animFrameId.current = requestAnimationFrame(step);
    };

    animFrameId.current = requestAnimationFrame(step);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isPaused, autoScrollSpeed]);

  // Check scroll positions for manual arrows
  const checkScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollState);
      checkScrollState();
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollState);
      }
    };
  }, []);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 280;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full group/presetContainer">
      {/* Scroll Controls Header Info */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${
            isDark ? 'text-[#737373]' : 'text-[#6B7280]'
          }`}>
            Quick Discipline Presets
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-medium bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            Auto & Manual Scroll
          </span>
        </div>

        {/* Play / Pause Toggle Button */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Resume Auto-scroll" : "Pause Auto-scroll"}
            className={`text-[10px] font-mono px-2 py-1 rounded-lg border flex items-center gap-1 transition-all cursor-pointer ${
              isDark
                ? 'bg-[#171717] border-[#262626] text-[#A3A3A3] hover:text-[#FAFAFA]'
                : 'bg-[#F1F5F9] border-[#E2E8F0] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {isPaused ? (
              <>
                <Play className="w-2.5 h-2.5 text-[#10B981]" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Pause className="w-2.5 h-2.5 text-[#10B981]" />
                <span>Pause</span>
              </>
            )}
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => handleManualScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`p-1 rounded-lg border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
              isDark
                ? 'bg-[#171717] border-[#262626] text-[#A3A3A3] hover:text-[#FAFAFA] hover:border-[#10B981]'
                : 'bg-[#F1F5F9] border-[#E2E8F0] text-[#6B7280] hover:text-[#111827] hover:border-[#10B981]'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => handleManualScroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`p-1 rounded-lg border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
              isDark
                ? 'bg-[#171717] border-[#262626] text-[#A3A3A3] hover:text-[#FAFAFA] hover:border-[#10B981]'
                : 'bg-[#F1F5F9] border-[#E2E8F0] text-[#6B7280] hover:text-[#111827] hover:border-[#10B981]'
            }`}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Horizontally Scrollable Container */}
      <div className="relative">
        {/* Left Fading Edge Mask */}
        {canScrollLeft && (
          <div className={`absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r ${
            isDark ? 'from-[#111111] to-transparent' : 'from-[#F8FAFC] to-transparent'
          }`} />
        )}

        {/* Right Fading Edge Mask */}
        {canScrollRight && (
          <div className={`absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l ${
            isDark ? 'from-[#111111] to-transparent' : 'from-[#F8FAFC] to-transparent'
          }`} />
        )}

        {/* Scroll Track */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex items-center gap-2.5 overflow-x-auto scrollbar-none py-1.5 px-0.5 scroll-smooth select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {presets.map((preset, idx) => {
            const isSelected = selectedTitle === preset.title;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectPreset(preset)}
                className={`flex-shrink-0 text-xs px-3.5 py-2 rounded-xl border transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#10B981] text-white border-[#10B981] shadow-md shadow-[#10B981]/20 font-semibold scale-[1.01]'
                    : isDark
                    ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA] hover:border-[#3a3a3a] hover:bg-[#202020]'
                    : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827] hover:border-[#D1D5DB] hover:bg-[#F3F4F6] shadow-2xs'
                }`}
              >
                <span>{preset.title}</span>
                {preset.level && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : isDark
                      ? 'bg-[#262626] text-[#888888]'
                      : 'bg-[#E5E7EB] text-[#6B7280]'
                  }`}>
                    {preset.level.split('/')[0]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

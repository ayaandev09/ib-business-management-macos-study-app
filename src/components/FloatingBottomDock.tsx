"use client";

import React, { useRef } from "react";
import { ALL_TOPICS } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Zap,
  ArrowUp,
} from "lucide-react";

export function FloatingBottomDock() {
  const {
    activeTopicId,
    setActiveTopic,
    viewMode,
    setViewMode,
    completedTopics,
    toggleTopicComplete,
    speedReadMode,
    toggleSpeedReadMode,
  } = useStudyStore();

  const dockScrollRef = useRef<HTMLDivElement>(null);
  const currentIndex = ALL_TOPICS.findIndex((t) => t.id === activeTopicId);
  const currentTopic = ALL_TOPICS[currentIndex] || ALL_TOPICS[0];
  const prevTopic = currentIndex > 0 ? ALL_TOPICS[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < ALL_TOPICS.length - 1 ? ALL_TOPICS[currentIndex + 1] : null;

  const isCompleted = !!completedTopics[currentTopic.id];

  const navigateTo = (id: string) => {
    setActiveTopic(id);
    if (viewMode !== "focus" && viewMode !== "stream") {
      setViewMode("focus");
    }
    if (viewMode === "stream") {
      const el = document.getElementById(`topic-card-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const UNIT_JUMPS = [
    { label: "U1", title: "Unit 1", firstId: "u1-1" },
    { label: "U2", title: "Unit 2", firstId: "u2-1" },
    { label: "U3", title: "Unit 3", firstId: "u3-1" },
    { label: "U4", title: "Unit 4", firstId: "u4-1" },
    { label: "U5", title: "Unit 5", firstId: "u5-1" },
    { label: "BMT", title: "Toolkit", firstId: "bmt-t1" },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl pointer-events-none transition-all">
      <div className="liquid-glass-dock rounded-full px-3 py-2 flex items-center justify-between gap-2 pointer-events-auto shadow-2xl">
        {/* Horizontally Scrollable Dock Content */}
        <div
          ref={dockScrollRef}
          tabIndex={0}
          role="region"
          aria-label="Study navigation dock"
          className="flex items-center justify-between gap-2 w-full overflow-x-auto no-scrollbar touch-pan-x scroll-smooth overscroll-x-contain"
        >
          {/* Previous Topic */}
          <button
            disabled={!prevTopic}
            onClick={() => prevTopic && navigateTo(prevTopic.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
              prevTopic
                ? "liquid-glass-pill text-slate-200 cursor-pointer"
                : "opacity-35 cursor-not-allowed text-slate-500"
            }`}
            title={prevTopic ? `Previous: ${prevTopic.title}` : undefined}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Unit Jump Pills */}
          <div className="flex items-center gap-1 shrink-0 bg-slate-950/40 p-1 rounded-full border border-white/10">
            {UNIT_JUMPS.map((uj) => (
              <button
                key={uj.label}
                onClick={() => navigateTo(uj.firstId)}
                title={`Jump to ${uj.title}`}
                className="px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                {uj.label}
              </button>
            ))}
          </div>

          {/* Current Topic Badge & Mastered Toggle */}
          <button
            onClick={() => toggleTopicComplete(currentTopic.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
              isCompleted
                ? "bg-emerald-500/25 border border-emerald-400/50 text-emerald-200"
                : "liquid-glass-pill text-slate-300"
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Circle className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span className="font-bold">{currentTopic.displayCode}</span>
            <span className="hidden md:inline truncate max-w-[140px]">
              {isCompleted ? "Done" : "Mark Done"}
            </span>
          </button>

          {/* Speed-Read Toggle */}
          <button
            onClick={toggleSpeedReadMode}
            title={speedReadMode ? "Disable Speed-Read" : "Enable Speed-Read"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
              speedReadMode
                ? "bg-amber-400/25 border border-amber-400/50 text-amber-200 shadow-[0_0_15px_-3px_rgba(251,191,36,0.5)]"
                : "liquid-glass-pill text-slate-300"
            }`}
          >
            <Zap
              className={`w-3.5 h-3.5 ${
                speedReadMode ? "text-amber-300 fill-amber-300" : ""
              }`}
            />
            <span className="hidden sm:inline">Speed</span>
          </button>

          {/* Next Topic */}
          <button
            disabled={!nextTopic}
            onClick={() => nextTopic && navigateTo(nextTopic.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
              nextTopic
                ? "liquid-glass-pill text-slate-200 cursor-pointer"
                : "opacity-35 cursor-not-allowed text-slate-500"
            }`}
            title={nextTopic ? `Next: ${nextTopic.title}` : undefined}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Scroll to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            title="Scroll to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

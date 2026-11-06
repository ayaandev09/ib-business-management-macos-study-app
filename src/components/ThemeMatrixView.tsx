"use client";

import React, { useState, useMemo } from "react";
import { CONCEPTS_TAXONOMY, ALL_TOPICS, ConceptId } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import {
  Network,
  ArrowUpRight,
  Filter,
  Bookmark,
  Sparkles,
  Building2,
  GraduationCap,
} from "lucide-react";

// Pre-compute once at module load — static syllabus cases
const ALL_CASES_WITH_TOPIC = ALL_TOPICS.flatMap((topic) =>
  topic.cases.map((cs) => ({
    ...cs,
    topicId: topic.id,
    topicCode: topic.displayCode,
    topicTitle: topic.title,
  }))
);

export const ThemeMatrixView = React.memo(function ThemeMatrixView() {
  const {
    activeConceptFilter,
    setActiveConceptFilter,
    bookmarkedCases,
    toggleBookmarkCase,
    setActiveTopic,
    setViewMode,
    searchQuery,
  } = useStudyStore();

  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const conceptsList = Object.values(CONCEPTS_TAXONOMY);
  const q = searchQuery.trim().toLowerCase();

  const filteredCases = useMemo(() => {
    return ALL_CASES_WITH_TOPIC.filter((cs) => {
      if (onlyBookmarked && !bookmarkedCases[cs.id]) return false;
      const matchesConcept =
        activeConceptFilter === "all" ||
        cs.concepts.includes(activeConceptFilter);
      const matchesSearch =
        !q ||
        cs.company.toLowerCase().includes(q) ||
        cs.context.toLowerCase().includes(q) ||
        cs.application.toLowerCase().includes(q) ||
        cs.evaluationAO3AO4.toLowerCase().includes(q) ||
        cs.topicTitle.toLowerCase().includes(q) ||
        cs.topicCode.toLowerCase().includes(q);
      return matchesConcept && matchesSearch;
    });
  }, [onlyBookmarked, bookmarkedCases, activeConceptFilter, q]);

  const jumpToTopic = (topicId: string) => {
    setActiveTopic(topicId);
    setViewMode("focus");
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-6">
      {/* =====================================================================
          1. 4 KEY CONCEPTS HEADER & PILL SELECTOR
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Network className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                IB BM 4 Key Concepts Matrix (CCES)
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Filter case studies and syllabus topics through the four conceptual lenses: Creativity, Change, Ethics, and Sustainability.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlyBookmarked((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-mono transition-all cursor-pointer ${
                onlyBookmarked
                  ? "bg-amber-400/25 border border-amber-400/50 text-amber-200"
                  : "liquid-glass-pill text-slate-400 hover:text-white"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bookmarked Only</span>
            </button>
          </div>
        </div>

        {/* 4 Concepts Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveConceptFilter("all")}
            className={`px-3.5 py-2 rounded-2xl text-xs font-mono transition-all cursor-pointer ${
              activeConceptFilter === "all"
                ? "liquid-glass-pill-active text-white shadow-md"
                : "liquid-glass-pill text-slate-300 hover:text-white"
            }`}
          >
            All 4 Concepts ({ALL_CASES_WITH_TOPIC.length})
          </button>

          {conceptsList.map((c) => {
            const active = activeConceptFilter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveConceptFilter(c.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-mono transition-all cursor-pointer ${
                  active
                    ? `${c.badgeBg} ${c.badgeText} border ${c.badgeBorder} shadow-lg`
                    : "liquid-glass-pill text-slate-300 hover:text-white"
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: c.color }}
                />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          2. SELECTED CONCEPT DEEP-DIVE OVERVIEW CARD
          ===================================================================== */}
      {activeConceptFilter !== "all" && (
        <section
          className={`liquid-glass-bento rounded-3xl p-6 border ${
            CONCEPTS_TAXONOMY[activeConceptFilter].badgeBorder
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`font-mono text-xs font-bold px-2.5 py-1 rounded-xl ${
                    CONCEPTS_TAXONOMY[activeConceptFilter].badgeBg
                  } ${CONCEPTS_TAXONOMY[activeConceptFilter].badgeText}`}
                >
                  CONCEPT GUIDE
                </span>
                <h3 className="text-xl font-bold text-white">
                  {CONCEPTS_TAXONOMY[activeConceptFilter].name}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3">
                {CONCEPTS_TAXONOMY[activeConceptFilter].description}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-sky-300">Core Mechanism: </strong>
                {CONCEPTS_TAXONOMY[activeConceptFilter].coreMechanism}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 lg:w-96 shrink-0 space-y-1.5">
              <div className="flex items-center gap-1.5 font-mono text-xs text-amber-300 font-bold">
                <GraduationCap className="w-4 h-4" />
                Paper 1 / Paper 2 Section C Tip:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {CONCEPTS_TAXONOMY[activeConceptFilter].examTips}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          3. REAL-WORLD CORPORATE CASES GRID
          ===================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
          <span>
            Displaying {filteredCases.length} corporate case applications
          </span>
          {activeConceptFilter !== "all" && (
            <span>Filtered by: {CONCEPTS_TAXONOMY[activeConceptFilter].name}</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCases.map((cs) => {
            const isBookmarked = !!bookmarkedCases[cs.id];
            return (
              <div
                key={cs.id}
                className="liquid-glass-bento rounded-3xl p-5 space-y-3 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30">
                        {cs.topicCode}
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        {cs.company}
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-400 block font-mono">
                      {cs.context}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleBookmarkCase(cs.id)}
                      className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                        isBookmarked
                          ? "bg-amber-400/20 text-amber-300"
                          : "text-slate-500 hover:text-amber-300 hover:bg-white/5"
                      }`}
                      title={
                        isBookmarked ? "Remove Bookmark" : "Bookmark Case"
                      }
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => jumpToTopic(cs.topicId)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title="Jump to Topic in Focus View"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">
                  {cs.application}
                </p>

                <div className="p-3 rounded-2xl bg-slate-950/50 border border-white/10 text-xs text-slate-300">
                  <span className="font-bold text-purple-300 font-mono">
                    Evaluation (AO3/AO4):{" "}
                  </span>
                  {cs.evaluationAO3AO4}
                </div>

                {/* Concept Tags & Topic link */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {cs.concepts.map((cid) => {
                      const def = CONCEPTS_TAXONOMY[cid];
                      return (
                        <span
                          key={cid}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-mono border ${def.badgeBg} ${def.badgeText} ${def.badgeBorder}`}
                        >
                          {def.name}
                        </span>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => jumpToTopic(cs.topicId)}
                    className="text-[10px] font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View {cs.topicCode}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
});

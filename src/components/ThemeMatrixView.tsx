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
  Layers,
  Flame,
  Search,
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

type MatrixTab = "concepts" | "cases" | "heatmap";

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

  const [matrixTab, setMatrixTab] = useState<MatrixTab>("concepts");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [caseSearch, setCaseSearch] = useState("");
  const conceptsList = Object.values(CONCEPTS_TAXONOMY);

  const q = (caseSearch || searchQuery).trim().toLowerCase();

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
      {/* Top Segmented Navigation Bar */}
      <div className="liquid-glass-bento rounded-3xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Network className="w-4 h-4 text-sky-400" />
            IB BM 4 Key Concepts Matrix (CCES)
          </h2>
          <p className="text-xs text-slate-400">
            Conceptual lenses: Creativity, Change, Ethics, and Sustainability across all syllabus topics
          </p>
        </div>

        {/* Segmented Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10">
          <button
            onClick={() => setMatrixTab("concepts")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              matrixTab === "concepts"
                ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Core Concepts
          </button>
          <button
            onClick={() => setMatrixTab("cases")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              matrixTab === "cases"
                ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Corporate Case Vault ({ALL_CASES_WITH_TOPIC.length})
          </button>
          <button
            onClick={() => setMatrixTab("heatmap")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              matrixTab === "heatmap"
                ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Syllabus Heatmap
          </button>
        </div>
      </div>

      {/* ==================== TAB 1: CORE CONCEPTS ==================== */}
      {matrixTab === "concepts" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conceptsList.map((c) => {
              const count = ALL_CASES_WITH_TOPIC.filter((cs) =>
                cs.concepts.includes(c.id)
              ).length;
              return (
                <div
                  key={c.id}
                  className={`liquid-glass-bento rounded-3xl p-5 border ${c.badgeBorder} flex flex-col justify-between space-y-4`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: c.color }}
                        />
                        <span
                          className={`font-mono text-xs font-bold px-2 py-0.5 rounded-lg ${c.badgeBg} ${c.badgeText}`}
                        >
                          {c.name.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {count} Case Applications
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {c.description}
                    </p>

                    <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/10 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-sky-300">
                        CORE STRATEGIC MECHANISM:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {c.coreMechanism}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/20 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-amber-300 flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        PAPER 1 / PAPER 2 SECTION C EXAM TIP:
                      </span>
                      <p className="text-xs text-amber-100/90 leading-relaxed">
                        {c.examTips}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setActiveConceptFilter(c.id);
                        setMatrixTab("cases");
                      }}
                      className="text-xs font-mono text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore {count} Cases for {c.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== TAB 2: CORPORATE CASE STUDIES VAULT ==================== */}
      {matrixTab === "cases" && (
        <div className="space-y-5">
          {/* Filter Bar */}
          <div className="liquid-glass-bento rounded-3xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setActiveConceptFilter("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeConceptFilter === "all"
                    ? "liquid-glass-pill-active text-white"
                    : "liquid-glass-pill text-slate-300 hover:text-white"
                }`}
              >
                All Concepts ({ALL_CASES_WITH_TOPIC.length})
              </button>

              {conceptsList.map((c) => {
                const active = activeConceptFilter === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveConceptFilter(c.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      active
                        ? `${c.badgeBg} ${c.badgeText} border ${c.badgeBorder} shadow-md`
                        : "liquid-glass-pill text-slate-300 hover:text-white"
                    }`}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setOnlyBookmarked((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  onlyBookmarked
                    ? "bg-amber-400/25 border border-amber-400/50 text-amber-200"
                    : "liquid-glass-pill text-slate-400 hover:text-white"
                }`}
              >
                <Bookmark className="w-3 h-3" />
                <span>Bookmarked</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCases.map((cs) => {
              const isBookmarked = !!bookmarkedCases[cs.id];
              return (
                <div
                  key={cs.id}
                  className="liquid-glass-bento rounded-3xl p-5 space-y-3 relative group border border-white/10 hover:border-amber-400/30 transition-all"
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

                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {cs.application}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 text-xs text-slate-300">
                    <span className="font-bold text-purple-300 font-mono">
                      Evaluation (AO3/AO4):{" "}
                    </span>
                    {cs.evaluationAO3AO4}
                  </div>

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
        </div>
      )}

      {/* ==================== TAB 3: SYLLABUS HEATMAP ==================== */}
      {matrixTab === "heatmap" && (
        <div className="liquid-glass-bento rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              Topic-by-Concept Thematic Heatmap ({ALL_TOPICS.length} Topics)
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              Click any cell to jump directly to that syllabus unit
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 max-h-[600px] overflow-y-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-950/80 sticky top-0 z-10 border-b border-white/10 backdrop-blur-md">
                <tr>
                  <th className="py-2.5 px-3 font-mono text-[11px] text-slate-400 font-semibold">Topic</th>
                  <th className="py-2.5 px-3 font-mono text-[11px] text-slate-400 font-semibold">Title</th>
                  {conceptsList.map((c) => (
                    <th key={c.id} className="py-2.5 px-3 font-mono text-[11px] text-center font-semibold" style={{ color: c.color }}>
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ALL_TOPICS.map((topic) => {
                  const conceptMap = new Map(
                    topic.conceptTracking.map((ct) => [ct.conceptId, ct.intensity])
                  );

                  return (
                    <tr
                      key={topic.id}
                      onClick={() => jumpToTopic(topic.id)}
                      className="hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <td className="py-2 px-3 font-mono text-[11px] font-bold text-amber-300">
                        {topic.displayCode}
                      </td>
                      <td className="py-2 px-3 text-white font-medium max-w-[240px] truncate">
                        {topic.title}
                      </td>
                      {conceptsList.map((c) => {
                        const intensity = conceptMap.get(c.id) || 0;
                        return (
                          <td key={c.id} className="py-2 px-3 text-center">
                            {intensity > 0 ? (
                              <span
                                className="inline-block px-2 py-0.5 rounded font-mono text-[10px] font-bold"
                                style={{
                                  backgroundColor: `${c.color}25`,
                                  color: c.color,
                                  border: `1px solid ${c.color}50`,
                                }}
                              >
                                {intensity}★
                              </span>
                            ) : (
                              <span className="text-slate-600 font-mono text-[10px]">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
});

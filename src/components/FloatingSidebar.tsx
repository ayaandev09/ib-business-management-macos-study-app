"use client";

import React, { useState, useMemo } from "react";
import {
  SYLLABUS_UNITS,
  TOTAL_TOPICS_COUNT,
  TOTAL_READING_MINUTES,
  ALL_TOPICS,
  UnitId,
} from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { IBBusinessAppLogo } from "./IBBusinessAppLogo";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  Clock,
  RotateCcw,
  Sparkles,
  BookOpen,
  Eye,
  X,
  GraduationCap,
  Briefcase,
  Flame,
} from "lucide-react";

interface FloatingSidebarProps {
  isMobileSheet?: boolean;
}

export const FloatingSidebar: React.FC<FloatingSidebarProps> = React.memo(({
  isMobileSheet = false,
}) => {
  const {
    activeTopicId,
    setActiveTopic,
    viewMode,
    setViewMode,
    completedTopics,
    toggleTopicComplete,
    toggleUnitComplete,
    resetAllProgress,
    unitSheetOpen,
    setUnitSheetOpen,
    triggerDiagnostics,
    sidebarCollapsed,
  } = useStudyStore();

  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    "unit-1": true,
    "unit-2": true,
    "unit-3": true,
    "unit-4": true,
    "unit-5": true,
    bmt: true,
  });

  const toggleUnitAccordion = (unitId: string) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const completedTopicsCount = useMemo(
    () => ALL_TOPICS.filter((t) => !!completedTopics[t.id]).length,
    [completedTopics]
  );

  const progressPercent = Math.round(
    (completedTopicsCount / TOTAL_TOPICS_COUNT) * 100
  );

  const remainingReadingMinutes = useMemo(
    () =>
      ALL_TOPICS.reduce(
        (sum, t) => (completedTopics[t.id] ? sum : sum + t.readingTimeMinutes),
        0
      ),
    [completedTopics]
  );

  // If mobile sheet mode and closed, return null
  if (isMobileSheet && !unitSheetOpen) return null;

  const handleSelectTopic = (topicId: string) => {
    setActiveTopic(topicId);
    if (isMobileSheet) {
      setUnitSheetOpen(false);
    }
    if (viewMode !== "focus" && viewMode !== "stream") {
      setViewMode("focus");
    }
    if (viewMode === "stream") {
      const el = document.getElementById(`topic-card-${topicId}`);
      if (el) {
        el.scrollIntoView({ behavior: "instant", block: "start" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  };

  const content = (
    <>
      {/* Top Header */}
      {isMobileSheet ? (
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 shrink-0">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-sky-300 block">
              SYLLABUS INDEX • MAC CODEX
            </span>
            <h2 className="text-base font-bold text-white">
              Units &amp; Topics (1.1 ➔ BMT 15)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {completedTopicsCount > 0 && (
              <button
                onClick={resetAllProgress}
                title="Reset all reading progress"
                className="p-2.5 rounded-2xl liquid-glass-pill text-slate-300 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setUnitSheetOpen(false)}
              className="p-2.5 rounded-2xl liquid-glass-pill text-slate-300 active:scale-95 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 shrink-0 min-h-[44px] w-full mac-drag-region">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/25 to-sky-500/20 border border-emerald-400/30 flex items-center justify-center overflow-hidden p-1 mac-no-drag shrink-0">
              <IBBusinessAppLogo className="w-full h-full object-contain" />
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-sky-400 block font-mono truncate">
                  IB BM HL // 2026
                </span>
                <h2 className="text-sm font-bold text-white tracking-tight truncate">
                  Syllabus Codex
                </h2>
              </div>
            )}
          </div>

          {!sidebarCollapsed && completedTopicsCount > 0 && (
            <button
              onClick={resetAllProgress}
              title="Reset progress"
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {!sidebarCollapsed && (
        <>
          {/* Speed-Read & Progress Telemetry Bar */}
          <div className="liquid-glass-bento rounded-2xl p-3 mb-3 shrink-0">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-300 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Syllabus Mastered</span>
          </span>
          <span className="font-mono font-bold text-sky-300">
            {completedTopicsCount}/{TOTAL_TOPICS_COUNT} ({progressPercent}%)
          </span>
        </div>

        {/* Progress Fill */}
        <div className="w-full h-2 rounded-full bg-slate-950/80 overflow-hidden border border-white/10 mb-2.5">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-sky-300" />
            {remainingReadingMinutes}m remaining
          </span>
          <span className="text-slate-300">5 Units + BMT</span>
        </div>
      </div>

      {/* Accordion Units & Topics Scroll Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-0.5">
        {SYLLABUS_UNITS.map((unit) => {
          const isExpanded = expandedUnits[unit.id];
          const unitDoneCount = unit.topics.filter(
            (t) => !!completedTopics[t.id]
          ).length;
          const isUnitAllDone = unitDoneCount === unit.topics.length && unit.topics.length > 0;

          return (
            <div
              key={unit.id}
              className="rounded-2xl border border-white/10 overflow-hidden bg-slate-950/40"
            >
              {/* Unit Header Accordion Trigger */}
              <div
                onClick={() => toggleUnitAccordion(unit.id)}
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-xs font-bold text-sky-400 shrink-0">
                    {unit.badge}
                  </span>
                  <span className="text-xs font-semibold text-white truncate">
                    {unit.title.includes(":") ? unit.title.split(":")[1].trim() : unit.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-mono text-[10px] text-slate-400">
                    {unitDoneCount}/{unit.topics.length}
                  </span>

                  <button
                    type="button"
                    title={
                      isUnitAllDone
                        ? "Mark unit uncompleted"
                        : "Mark all topics in unit completed"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUnitComplete(unit.id as UnitId);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {isUnitAllDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>

                  <div className="text-slate-400">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Collapsible Topics List */}
              {isExpanded && (
                <div className="p-1.5 space-y-1 border-t border-white/[0.06] bg-slate-950/60">
                  {unit.topics.map((topic) => {
                    const isActive = topic.id === activeTopicId;
                    const isDone = !!completedTopics[topic.id];

                    return (
                      <div
                        key={topic.id}
                        onClick={() => handleSelectTopic(topic.id)}
                        className={`group flex items-center justify-between gap-2 p-2 rounded-xl text-xs transition-all cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-sky-500/35 to-indigo-500/25 text-white border border-sky-400/50 shadow-sm"
                            : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTopicComplete(topic.id);
                              if (typeof navigator !== "undefined" && navigator.vibrate) {
                                navigator.vibrate(20);
                              }
                            }}
                            className={`w-9 h-9 -my-1 -ml-1 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all duration-200 active:scale-80 select-none ${
                              isDone
                                ? "text-emerald-400 bg-emerald-500/20 hover:bg-emerald-500/30"
                                : "text-slate-400 hover:text-emerald-300 hover:bg-white/10 active:bg-white/20"
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-tick-pop" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                            )}
                          </button>
                          <span className="font-mono text-[10px] font-bold text-sky-300 shrink-0">
                            {topic.displayCode}
                          </span>
                          <span
                            className={`truncate ${
                              isDone ? "line-through text-slate-500" : ""
                            }`}
                          >
                            {topic.title.replace(/^BMT \d+:\s*/, "")}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 font-mono text-[10px] text-slate-400">
                          {topic.level === "HL ONLY" && (
                            <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[9px] border border-rose-400/30">
                              HL
                            </span>
                          )}
                          <span>{topic.readingTimeMinutes}m</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Attribution (Mac Desktop) */}
      {!isMobileSheet && (
        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-sky-300" />
            IB BM HL 2026 Specification
          </span>
          <span className="font-mono text-slate-300">
            {TOTAL_READING_MINUTES}m total
          </span>
        </div>
      )}
        </>
      )}
    </>
  );

  if (isMobileSheet) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
        onClick={() => setUnitSheetOpen(false)}
      >
        <aside
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[420px] max-h-[85dvh] flex flex-col liquid-glass-sheet rounded-t-3xl p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] overflow-hidden select-none"
        >
          <div className="w-10 h-1.5 rounded-full bg-white/25 mx-auto mb-3 shrink-0" />
          {content}
        </aside>
      </div>
    );
  }

  // Desktop Floating Sidebar (Exact Apple HIG Proportions with Collapse Support)
  return (
    <aside
      data-tour="sidebar"
      className={`hidden lg:flex shrink-0 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] flex-col liquid-glass-sidebar rounded-3xl p-4 overflow-hidden select-none z-20 transition-all duration-300 ${
        sidebarCollapsed ? "w-20 items-center px-2" : "w-64 xl:w-72"
      }`}
    >
      {content}
    </aside>
  );
});

FloatingSidebar.displayName = "FloatingSidebar";

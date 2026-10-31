"use client";

import React, { useState } from "react";
import {
  SYLLABUS_UNITS,
  TOTAL_TOPICS_COUNT,
  TOTAL_READING_MINUTES,
  ALL_TOPICS,
  UnitId,
} from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  Clock,
  Briefcase,
  Flame,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export function FloatingSidebar() {
  const {
    activeTopicId,
    setActiveTopic,
    viewMode,
    setViewMode,
    completedTopics,
    toggleTopicComplete,
    toggleUnitComplete,
    resetAllProgress,
  } = useStudyStore();

  const [expandedUnits, setExpandedUnits] = useState<Record<UnitId, boolean>>({
    "unit-1": true,
    "unit-2": true,
    "unit-3": true,
    "unit-4": true,
    "unit-5": true,
    bmt: true,
  });

  const completedCount = ALL_TOPICS.filter(
    (t) => !!completedTopics[t.id]
  ).length;
  const progressPercent = Math.round(
    (completedCount / TOTAL_TOPICS_COUNT) * 100
  );

  const completedMinutes = ALL_TOPICS.reduce(
    (acc, t) => (completedTopics[t.id] ? acc + t.readingTimeMinutes : acc),
    0
  );
  const remainingMinutes = Math.max(
    0,
    TOTAL_READING_MINUTES - completedMinutes
  );

  const toggleUnit = (unitId: UnitId) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const handleSelectTopic = (topicId: string) => {
    setActiveTopic(topicId);
    if (viewMode !== "focus" && viewMode !== "stream") {
      setViewMode("focus");
    }
    if (viewMode === "stream") {
      const el = document.getElementById(`topic-card-${topicId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <aside className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-6 space-y-4 max-h-[calc(100vh-3rem)] overflow-y-auto no-scrollbar pb-12">
      {/* =====================================================================
          1. OVERALL PROGRESS & SPEED-READ TELEMETRY CARD
          ===================================================================== */}
      <div className="liquid-glass-sidebar rounded-3xl p-5 border border-white/15">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white tracking-wide uppercase">
                IB Business HL
              </h2>
              <span className="text-[10px] text-slate-400 font-mono">
                Study & Exam Dashboard
              </span>
            </div>
          </div>
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-400/25">
            {progressPercent}% Complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-950/80 overflow-hidden mb-3 border border-white/5">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPercent}%`,
              background: "linear-gradient(90deg, #0ea5e9, #a855f7)",
              boxShadow: "0 0 12px rgba(14, 165, 233, 0.6)",
            }}
          />
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 gap-2 text-center font-mono">
          <div className="p-2 rounded-xl bg-slate-950/50 border border-white/10">
            <span className="text-[10px] text-slate-400 block mb-0.5">
              Topics Mastered
            </span>
            <span className="text-xs font-bold text-white">
              {completedCount} / {TOTAL_TOPICS_COUNT}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/50 border border-white/10">
            <span className="text-[10px] text-slate-400 block mb-0.5 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              Est. Time Left
            </span>
            <span className="text-xs font-bold text-amber-300">
              {remainingMinutes} mins
            </span>
          </div>
        </div>

        {/* Reset Progress Button */}
        {completedCount > 0 && (
          <button
            onClick={resetAllProgress}
            className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[10px] font-mono text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All Progress Checkboxes</span>
          </button>
        )}
      </div>

      {/* =====================================================================
          2. UNITS & TOPICS ACCORDION NAVIGATION
          ===================================================================== */}
      <div className="space-y-3">
        {SYLLABUS_UNITS.map((unit) => {
          const isExpanded = !!expandedUnits[unit.id];
          const unitCompletedCount = unit.topics.filter(
            (t) => !!completedTopics[t.id]
          ).length;
          const isUnitAllDone =
            unit.topics.length > 0 &&
            unitCompletedCount === unit.topics.length;

          return (
            <div
              key={unit.id}
              className="liquid-glass-bento rounded-2xl overflow-hidden border border-white/10"
            >
              {/* Unit Accordion Header */}
              <div
                className={`p-3.5 flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                  isExpanded ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                }`}
                onClick={() => toggleUnit(unit.id)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-xs text-sky-400 font-bold shrink-0">
                    {unit.badge}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold text-white truncate">
                      {unit.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      {unitCompletedCount}/{unit.topics.length} topics
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Mark Entire Unit Done Button */}
                  <button
                    type="button"
                    title={
                      isUnitAllDone
                        ? "Mark unit uncompleted"
                        : "Mark all topics in unit completed"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUnitComplete(unit.id);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {isUnitAllDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  <div className="text-slate-400">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Collapsible Topics List */}
              {isExpanded && (
                <div className="p-2 space-y-1 border-t border-white/[0.06] bg-slate-950/40">
                  {unit.topics.map((topic) => {
                    const isActive = topic.id === activeTopicId;
                    const isDone = !!completedTopics[topic.id];

                    return (
                      <div
                        key={topic.id}
                        onClick={() => handleSelectTopic(topic.id)}
                        className={`group flex items-center justify-between gap-2 p-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                          isActive
                            ? "liquid-glass-pill-active text-white"
                            : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTopicComplete(topic.id);
                            }}
                            className="shrink-0 cursor-pointer p-0.5 rounded text-slate-400 hover:text-emerald-400"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />
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
    </aside>
  );
}

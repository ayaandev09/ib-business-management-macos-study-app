"use client";

import React, { useRef, useEffect } from "react";
import { SYLLABUS_UNITS, ALL_TOPICS, UnitId } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { TopCommandBar } from "@/components/TopCommandBar";
import { TopicBentoCard } from "@/components/TopicBentoCard";
import { ThemeMatrixView } from "@/components/ThemeMatrixView";
import { LexiconDossierView } from "@/components/LexiconDossierView";
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Monitor,
  Zap,
  SearchX,
  Layers,
} from "lucide-react";

export function IPhone16eShell() {
  const {
    activeTopicId,
    setActiveTopic,
    activeUnitFilter,
    setActiveUnitFilter,
    viewMode,
    searchQuery,
    setSearchQuery,
    completedTopics,
    toggleTopicComplete,
    goToNextTopic,
    setDeviceMode,
  } = useStudyStore();

  const activeTopic =
    ALL_TOPICS.find((t) => t.id === activeTopicId) || ALL_TOPICS[0];
  const activeUnit =
    SYLLABUS_UNITS.find((u) => u.id === activeTopic.unitId) || SYLLABUS_UNITS[0];

  const currentTopicIndex = ALL_TOPICS.findIndex(
    (t) => t.id === activeTopic.id
  );
  const nextTopic =
    currentTopicIndex >= 0 && currentTopicIndex < ALL_TOPICS.length - 1
      ? ALL_TOPICS[currentTopicIndex + 1]
      : null;

  const scrubberRef = useRef<HTMLDivElement>(null);

  // Smoothly center the active pill in the horizontal scrubber
  useEffect(() => {
    if (scrubberRef.current) {
      const activeBtn = scrubberRef.current.querySelector(
        `[data-topic-id="${activeTopic.id}"]`
      );
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [activeTopic.id]);

  const filteredTopics = ALL_TOPICS.filter((t) => {
    if (activeUnitFilter !== "all" && t.unitId !== activeUnitFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.displayCode.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="iphone-16e-shell">
      {/* =====================================================================
          DYNAMIC ISLAND STATUS HEADER
          ===================================================================== */}
      <div className="flex items-center justify-between mb-3 px-1 pt-1 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>IB BM HL • 2026</span>
        </div>
        {/* Dynamic Island pill */}
        <div className="w-24 h-4 rounded-full bg-black border border-white/20 mx-auto shadow-sm" />
        <button
          onClick={() => setDeviceMode("mac")}
          className="text-sky-300 hover:text-white flex items-center gap-1 cursor-pointer"
          title="Switch to Mac Desktop Mode"
        >
          <Monitor className="w-3 h-3" />
          <span>Mac</span>
        </button>
      </div>

      {/* Top Command Bar in Mobile Shell */}
      <TopCommandBar />

      {/* =====================================================================
          UNIT SELECTOR TABS
          ===================================================================== */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-3">
        <button
          onClick={() => setActiveUnitFilter("all")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-all cursor-pointer ${
            activeUnitFilter === "all"
              ? "liquid-glass-pill-active text-white"
              : "liquid-glass-pill text-slate-400"
          }`}
        >
          All (52)
        </button>
        {SYLLABUS_UNITS.map((u) => (
          <button
            key={u.id}
            onClick={() => setActiveUnitFilter(u.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-all cursor-pointer ${
              activeUnitFilter === u.id
                ? "liquid-glass-pill-active text-white"
                : "liquid-glass-pill text-slate-400"
            }`}
          >
            {u.badge}
          </button>
        ))}
      </div>

      {/* =====================================================================
          HORIZONTAL TOPIC SCRUBBER (SMOOTH HORIZONTAL SWIPE)
          ===================================================================== */}
      <div
        ref={scrubberRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4 scroll-smooth"
      >
        {filteredTopics.map((topic) => {
          const isActive = topic.id === activeTopic.id;
          const isDone = !!completedTopics[topic.id];

          return (
            <button
              key={topic.id}
              data-topic-id={topic.id}
              onClick={() => {
                setActiveTopic(topic.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-mono transition-all cursor-pointer ${
                isActive
                  ? "bg-sky-500/30 border border-sky-400/50 text-white shadow-lg"
                  : isDone
                    ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-300"
                    : "liquid-glass-pill text-slate-400"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              )}
              <span className="font-bold">{topic.displayCode}</span>
            </button>
          );
        })}
      </div>

      {/* =====================================================================
          ACTIVE VIEW CONTENT
          ===================================================================== */}
      {viewMode === "focus" && (
        <div className="space-y-4">
          <TopicBentoCard topic={activeTopic} />

          {/* Mobile Next Topic Action Card */}
          {nextTopic && (
            <div
              onClick={() => {
                goToNextTopic();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="liquid-glass-bento rounded-3xl p-4 flex items-center justify-between gap-3 cursor-pointer border border-sky-400/30 hover:border-sky-400/50"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-sky-300 uppercase block mb-0.5">
                  Up Next →
                </span>
                <h4 className="text-xs font-bold text-white truncate">
                  {nextTopic.displayCode}: {nextTopic.title}
                </h4>
              </div>
              <div className="p-2 rounded-2xl bg-sky-500/20 text-sky-300 shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      )}

      {viewMode === "stream" && (
        <div className="space-y-5">
          {filteredTopics.map((topic, idx) => (
            <TopicBentoCard
              key={topic.id}
              topic={topic}
              isDeferred={idx > 0}
            />
          ))}
        </div>
      )}

      {viewMode === "matrix" && <ThemeMatrixView />}

      {viewMode === "lexicon" && <LexiconDossierView />}
    </div>
  );
}

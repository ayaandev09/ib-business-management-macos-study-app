"use client";

import React, { useState } from "react";
import { TopicData, SYLLABUS_UNITS, CONCEPTS_TAXONOMY } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { RecallFlipCard } from "@/components/RecallFlipCard";
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Layers,
  Brain,
  BookOpenCheck,
  StickyNote,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  GraduationCap,
  Building2,
  AlertCircle,
  Wrench,
  TrendingUp,
  Zap,
  HelpCircle,
  Lightbulb,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

interface TopicBentoCardProps {
  topic: TopicData;
  isDeferred?: boolean;
  showPrevNextControls?: boolean;
}

const IMPORTANCE_BADGE_STYLES: Record<
  TopicData["strategicImportance"],
  string
> = {
  "CORE FOUNDATION": "bg-sky-500/15 text-sky-300 border-sky-400/35",
  "HIGH-YIELD HL":
    "bg-rose-500/20 text-rose-300 border-rose-400/40 shadow-[0_0_15px_-3px_rgba(244,63,94,0.3)]",
  "QUANTITATIVE TOOLKIT":
    "bg-emerald-500/15 text-emerald-300 border-emerald-400/35",
  "STRATEGIC EVALUATION":
    "bg-purple-500/15 text-purple-300 border-purple-400/35",
  "PAPER 1 / 2 ESSENTIAL":
    "bg-amber-500/20 text-amber-200 border-amber-400/40",
};

export const TopicBentoCard = React.memo(function TopicBentoCard({
  topic,
  isDeferred = false,
  showPrevNextControls = true,
}: TopicBentoCardProps) {
  const {
    completedTopics,
    completedSubSections,
    bookmarkedCases,
    toggleTopicComplete,
    toggleSubSectionComplete,
    toggleBookmarkCase,
    speedReadMode,
    setViewMode,
    setActiveConceptFilter,
    topicNotes,
    setTopicNote,
    learningPosture,
    setLearningPosture,
    studyGoal,
    setStudyGoal,
    goToPrevTopic,
    goToNextTopic,
    setActiveFlashcardDeck,
  } = useStudyStore();

  const [showScratchpad, setShowScratchpad] = useState(false);
  const [showCheckpointHint, setShowCheckpointHint] = useState(false);
  const [showCheckpointAnswer, setShowCheckpointAnswer] = useState(false);
  const [activePracticeTab, setActivePracticeTab] = useState<"2m" | "4m" | "10m">("10m");
  const isCompleted = !!completedTopics[topic.id];
  const noteText = topicNotes[topic.id] || "";
  const unit = SYLLABUS_UNITS.find((u) => u.id === topic.unitId);
  const completedSubsCount = topic.subSections.filter(
    (s) => !!completedSubSections[s.id]
  ).length;

  return (
    <article
      key={topic.id}
      id={`topic-card-${topic.id}`}
      className={`space-y-5 topic-transition-enter ${isDeferred ? "deferred-chapter-card" : ""}`}
    >
      <RecallFlipCard
        moduleCode={topic.displayCode}
        title={`${topic.displayCode} · ${topic.title}`}
        prompt={topic.examPromptTakeaway || topic.summary}
        answer={topic.analysis.coreThesis || topic.summary}
        accent="#50C878"
        secondary="#D4AF37"
        meta="ACTIVE RECALL"
      />

      {/* =====================================================================
          1. HERO TOPIC BANNER
          ===================================================================== */}
      <div className="liquid-glass-bento rounded-3xl p-6 lg:p-7 relative overflow-hidden">
        {/* Specular Radial Glow */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-25"
          style={{
            background:
              topic.unitNumber === 1
                ? "radial-gradient(circle, #0ea5e9, transparent 70%)"
                : topic.unitNumber === 2
                  ? "radial-gradient(circle, #a855f7, transparent 70%)"
                  : topic.unitNumber === 3
                    ? "radial-gradient(circle, #10b981, transparent 70%)"
                    : topic.unitNumber === 4
                      ? "radial-gradient(circle, #f59e0b, transparent 70%)"
                      : topic.unitNumber === 5
                        ? "radial-gradient(circle, #38bdf8, transparent 70%)"
                        : "radial-gradient(circle, #f43f5e, transparent 70%)",
          }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-white/10 text-white border border-white/15">
                {topic.displayCode}
              </span>
              <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/25">
                {unit?.title.split(":")[0] || `UNIT ${topic.unitNumber}`}
              </span>
              <span
                className={`font-mono text-[11px] font-semibold px-2.5 py-1 rounded-xl border ${
                  topic.level === "HL ONLY"
                    ? "bg-rose-500/20 text-rose-300 border-rose-400/40"
                    : "bg-white/[0.06] text-slate-300 border-white/10"
                }`}
              >
                {topic.level}
              </span>
              <span
                className={`font-mono text-[11px] font-semibold px-2.5 py-1 rounded-xl border ${
                  IMPORTANCE_BADGE_STYLES[topic.strategicImportance]
                }`}
              >
                {topic.strategicImportance}
              </span>
              <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-white/[0.05] text-slate-300 border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {topic.readingTimeMinutes} min speed-read
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-1.5">
              {topic.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {topic.subtitle}
            </p>
            <div className="mt-2 text-[11px] text-slate-400 font-mono">
              SYLLABUS REF: {topic.syllabusRef}
            </div>
          </div>

          {/* Prev/Next Topic Controls + Mark Complete Button */}
          <div className="flex items-center gap-2 shrink-0">
            {showPrevNextControls && (
              <div className="flex items-center gap-1 mr-1">
                <button
                  onClick={goToPrevTopic}
                  title="Previous Topic"
                  className="p-2 rounded-2xl liquid-glass-pill text-slate-300 hover:text-white cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNextTopic}
                  title="Next Topic"
                  className="p-2 rounded-2xl liquid-glass-pill text-slate-300 hover:text-white cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={() => {
                toggleTopicComplete(topic.id);
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                  navigator.vibrate(20);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 select-none ${
                isCompleted
                  ? "bg-emerald-500/25 border border-emerald-400/50 text-emerald-200 shadow-[0_0_20px_-4px_rgba(16,185,129,0.5)]"
                  : "bg-white/10 hover:bg-emerald-500/20 text-white border border-white/20 hover:border-emerald-400/40"
              }`}
            >
              <div className={isCompleted ? "animate-tick-pop" : ""}>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <span>{isCompleted ? "Topic Mastered" : "Mark as Mastered"}</span>
            </button>
          </div>
        </div>

        {/* Dual Mode Postural Switcher */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-white/10">
            <button
              onClick={() => setLearningPosture("learn-new")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                learningPosture === "learn-new"
                  ? "bg-sky-500/25 border border-sky-400/40 text-sky-200 shadow-[0_0_15px_-3px_rgba(14,165,233,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>Study as New (Full Walkthrough)</span>
            </button>

            <button
              onClick={() => setLearningPosture("pre-lesson-cram")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                learningPosture === "pre-lesson-cram"
                  ? "bg-amber-500/25 border border-amber-400/40 text-amber-200 shadow-[0_0_15px_-3px_rgba(245,158,11,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Pre-Lesson / Exam Cram</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveFlashcardDeck("glossary");
                setViewMode("revision");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30 hover:bg-purple-500/30 transition-all cursor-pointer"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Practice Active Recall</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          PRE-LESSON 5-MINUTE PRIMER & EXAM CRAM BENTO
          ===================================================================== */}
      {learningPosture === "pre-lesson-cram" && (
        <section className="liquid-glass-bento rounded-3xl p-6 border-amber-400/30 bg-amber-950/15 space-y-5 shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)] animate-in fade-in duration-200">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white tracking-wide">
                5-Minute Pre-Lesson Classroom Primer &amp; Exam Cram
              </h2>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-400/30">
              ⚡ Rapid Review Mode
            </span>
          </div>

          {/* 1. What You Must Know Before Class */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              3-Minute Classroom Briefing:
            </span>
            <div className="space-y-1.5 text-xs text-slate-200">
              {topic.speedReadBullets.slice(0, 3).map((b, idx) => (
                <div key={idx} className="flex items-start gap-2 pl-2 border-l-2 border-amber-400/50">
                  <span className="text-amber-400 font-bold shrink-0">•</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Red Flag Warnings: Common Exam Traps */}
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-400/30 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-300 uppercase flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              High-Frequency Exam Traps &amp; Misconceptions:
            </span>
            <div className="space-y-1.5 text-xs text-rose-100">
              {topic.analysis.commonMisconceptions.map((m, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">⚠</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. High-Yield Practice Exam Prompts with Model Strategy */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-sky-300 uppercase flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                Practice Exam Prompts &amp; Mark Scheme Criteria:
              </span>
              <div className="flex items-center gap-1 p-0.5 rounded-xl bg-white/5 border border-white/10">
                <button
                  onClick={() => setActivePracticeTab("2m")}
                  className={`px-2 py-0.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activePracticeTab === "2m" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  2 Marks (AO1)
                </button>
                <button
                  onClick={() => setActivePracticeTab("4m")}
                  className={`px-2 py-0.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activePracticeTab === "4m" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  4 Marks (AO2)
                </button>
                <button
                  onClick={() => setActivePracticeTab("10m")}
                  className={`px-2 py-0.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activePracticeTab === "10m" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  10 Marks (AO3)
                </button>
              </div>
            </div>

            {activePracticeTab === "2m" && (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs">
                <div className="font-bold text-white">
                  <strong>Question: </strong> Define the term &lsquo;{topic.subSections[0]?.title.split(":")[0] || topic.title}&rsquo;. [2 marks]
                </div>
                <div className="text-slate-300 pl-3 border-l border-sky-400/40">
                  <strong className="text-sky-300">Mark Scheme Key: </strong>
                  Award [1] for basic outline and [2] for an authoritative, syllabus-accurate definition with key economic criteria.
                </div>
              </div>
            )}

            {activePracticeTab === "4m" && (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs">
                <div className="font-bold text-white">
                  <strong>Question: </strong> Explain one advantage and one disadvantage of implementing {topic.subSections[0]?.title} for a commercial business. [4 marks]
                </div>
                <div className="text-slate-300 pl-3 border-l border-sky-400/40 space-y-1">
                  <div><strong className="text-sky-300">Advantage: </strong>{topic.subSections[0]?.analyticalTakeaway}</div>
                  <div><strong className="text-sky-300">Disadvantage: </strong>{topic.analysis.commonMisconceptions[0] || "High capital setup cost and operational transition friction."}</div>
                </div>
              </div>
            )}

            {activePracticeTab === "10m" && (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-2.5 text-xs">
                <div className="font-bold text-white">
                  <strong>Essay Prompt: </strong> With reference to an organization of your choice, evaluate {topic.examPromptTakeaway.slice(0, 140)}... [10 marks]
                </div>
                <div className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-400/20 text-[11px] text-sky-200 font-mono space-y-1">
                  <div className="font-bold text-sky-300">SLAP Evaluation Formula for 10/10:</div>
                  <div>• <strong>S</strong>takeholders: Analyze conflicting impacts (shareholders vs staff vs customers).</div>
                  <div>• <strong>L</strong>ong-term vs Short-term: Immediate upfront costs vs long-run strategic survival.</div>
                  <div>• <strong>A</strong>ssumptions: What external STEEPLE conditions must hold true?</div>
                  <div>• <strong>P</strong>riorities: Decisive, justified final recommendation on what to execute first.</div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          2. SPEED-READ EXECUTIVE SUMMARY & BULLETS
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Executive Summary & Speed-Read Core
          </h2>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed mb-4">
          {topic.summary}
        </p>

        {/* Speed-Read Bullet Points */}
        <div className="space-y-2.5">
          {topic.speedReadBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/45 border border-white/[0.07] hover:border-amber-400/30 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-amber-400/15 text-amber-300 text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-amber-400/25">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          3. IN-DEPTH SYLLABUS ANALYSIS BENTO
          ===================================================================== */}
      {!speedReadMode && (
        <section className="liquid-glass-bento rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              In-Depth Syllabus Analysis & Theoretical Rigor
            </h2>
          </div>

          {/* Core Thesis & Theoretical Foundations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/10">
              <span className="font-mono text-xs font-semibold text-purple-300 flex items-center gap-1.5 mb-1.5">
                <Layers className="w-3.5 h-3.5" />
                Strategic Thesis
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {topic.analysis.coreThesis}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/10">
              <span className="font-mono text-xs font-semibold text-sky-300 flex items-center gap-1.5 mb-1.5">
                <BookOpenCheck className="w-3.5 h-3.5" />
                Theoretical Foundations
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {topic.analysis.theoreticalFoundations}
              </p>
            </div>
          </div>

          {/* Strategic Evaluation (AO3 & AO4) */}
          <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-400/25">
            <span className="font-mono text-xs font-semibold text-sky-300 flex items-center gap-1.5 mb-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              Evaluation Grid (AO3 Analysis & AO4 Evaluation)
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {topic.analysis.strategicEvaluationAO3AO4}
            </p>
          </div>

          {/* Common Misconceptions & Connected BMT Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-400/25">
              <span className="font-mono text-xs font-semibold text-rose-300 flex items-center gap-1.5 mb-2">
                <AlertCircle className="w-3.5 h-3.5" />
                Common Exam Pitfalls & Misconceptions
              </span>
              <ul className="space-y-1.5">
                {topic.analysis.commonMisconceptions.map((misc, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span>{misc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/10">
              <span className="font-mono text-xs font-semibold text-amber-300 flex items-center gap-1.5 mb-2">
                <Wrench className="w-3.5 h-3.5" />
                Connected BMT Decision Tools
              </span>
              <div className="flex flex-wrap gap-1.5">
                {topic.analysis.connectedBMTTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-xs font-mono bg-white/[0.06] text-slate-200 border border-white/10"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed">
                {topic.analysis.realWorldConnections}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          4. INTERACTIVE SUB-SECTIONS CHECKLIST
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Granular Sub-Sections ({completedSubsCount}/
              {topic.subSections.length} completed)
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-400">
            {Math.round(
              (completedSubsCount / (topic.subSections.length || 1)) * 100
            )}
            %
          </span>
        </div>

        <div className="space-y-3">
          {topic.subSections.map((sub) => {
            const isSubDone = !!completedSubSections[sub.id];
            return (
              <div
                key={sub.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isSubDone
                    ? "bg-slate-950/30 border-emerald-500/30"
                    : "bg-slate-950/60 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() =>
                        toggleSubSectionComplete(topic.id, sub.id)
                      }
                      className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer mt-0.5"
                    >
                      {isSubDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-lg bg-white/10 text-slate-300">
                      {sub.marker}
                    </span>
                    <h3
                      className={`text-xs sm:text-sm font-bold text-white ${
                        isSubDone ? "line-through text-slate-500" : ""
                      }`}
                    >
                      {sub.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-2.5 pl-6.5">
                  {sub.content}
                </p>

                {/* Analytical Takeaway */}
                <div className="ml-6.5 p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-xs text-sky-200">
                  <span className="font-bold text-sky-300">Exam Takeaway: </span>
                  {sub.analyticalTakeaway}
                </div>

                {/* Key Formula / Framework if present */}
                {sub.keyFormulaOrFramework && (
                  <div className="ml-6.5 mt-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-400/20 font-mono text-[11px] text-emerald-300">
                    <span className="font-bold">Formula / Core Rule: </span>
                    {sub.keyFormulaOrFramework}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          5. REAL-WORLD CORPORATE CASES BENTO
          ===================================================================== */}
      {topic.cases.length > 0 && (
        <section className="liquid-glass-bento rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Real-World Corporate Applications & Case Studies ({topic.cases.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.cases.map((cs) => {
              const isBookmarked = !!bookmarkedCases[cs.id];
              return (
                <div
                  key={cs.id}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-2.5 relative"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {cs.company}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {cs.context}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleBookmarkCase(cs.id)}
                      className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                        isBookmarked
                          ? "bg-amber-400/20 text-amber-300"
                          : "text-slate-500 hover:text-amber-300 hover:bg-white/5"
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Bookmark Case"}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cs.application}
                  </p>

                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-slate-300">
                    <span className="font-mono text-purple-300 font-bold">
                      Evaluation:{" "}
                    </span>
                    {cs.evaluationAO3AO4}
                  </div>

                  {/* Concept Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cs.concepts.map((cid) => {
                      const def = CONCEPTS_TAXONOMY[cid];
                      return (
                        <button
                          key={cid}
                          onClick={() => {
                            setActiveConceptFilter(cid);
                            setViewMode("matrix");
                          }}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-mono border cursor-pointer ${def.badgeBg} ${def.badgeText} ${def.badgeBorder}`}
                        >
                          {def.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================================
          6. CONCEPTUAL IMPACT MATRIX BARS (CCES)
          ===================================================================== */}
      {topic.conceptTracking.length > 0 && (
        <section className="liquid-glass-bento rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              IB BM 4 Key Concepts Alignment (CCES)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            How this syllabus topic maps to Creativity, Change, Ethics, and Sustainability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {topic.conceptTracking.map((track) => {
              const def = CONCEPTS_TAXONOMY[track.conceptId];
              return (
                <div
                  key={track.conceptId}
                  className="p-3.5 rounded-2xl bg-slate-950/50 border border-white/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded-lg ${def.badgeBg} ${def.badgeText} border ${def.badgeBorder}`}
                    >
                      {def.name}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      Intensity {track.intensity}/5
                    </span>
                  </div>

                  {/* Intensity Bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(track.intensity / 5) * 100}%`,
                        backgroundColor: def.color,
                        boxShadow: `0 0 8px ${def.glowColor}`,
                      }}
                    />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {track.manifestation}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================================
          7. STUDY-AS-NEW FORMATIVE CHECKPOINT (CHECK YOUR UNDERSTANDING)
          ===================================================================== */}
      {learningPosture === "learn-new" && (
        <section className="liquid-glass-bento rounded-3xl p-6 border-sky-400/30 bg-sky-950/15 space-y-4 shadow-[0_0_30px_-5px_rgba(14,165,233,0.15)] animate-in fade-in duration-200">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5 text-sky-400" />
              <h2 className="text-base font-bold text-white tracking-wide">
                Check Your Understanding • First-Principles Mastery Check
              </h2>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-sky-500/20 text-sky-200 border border-sky-400/30">
              🎓 Study as New Checkpoint
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3">
            <div className="text-xs font-mono font-bold text-sky-300 uppercase flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-sky-400" />
              <span>Core Application Challenge</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
              Based on the core syllabus principles of <strong>{topic.title}</strong>: How does {topic.subSections[0]?.title || "this business principle"} directly impact strategic decision-making and operational risk for a commercial organization?
            </p>

            {/* Toggle Hint & Model Answer */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setShowCheckpointHint((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>{showCheckpointHint ? "Hide Strategy Clue" : "Need a Clue?"}</span>
              </button>

              <button
                onClick={() => setShowCheckpointAnswer((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 transition-all cursor-pointer"
              >
                {showCheckpointAnswer ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide Model Answer</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Reveal Model Answer &amp; Evaluation Criteria</span>
                  </>
                )}
              </button>
            </div>

            {/* Hint Box */}
            {showCheckpointHint && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/25 text-xs text-amber-100 leading-relaxed animate-in fade-in duration-200">
                <span className="font-bold text-amber-300 font-mono">💡 Analytical Clue: </span>
                Consider: {topic.analysis.coreThesis.slice(0, 180)}... Focus on conflicting stakeholder interests (e.g. employees vs shareholders) and whether short-term gains threaten long-term strategic viability.
              </div>
            )}

            {/* Model Answer Box */}
            {showCheckpointAnswer && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-400/30 space-y-2 text-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-emerald-300 font-mono font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Exemplar Syllabus Answer &amp; Examiner Criteria:</span>
                </div>
                <p className="text-slate-200 leading-relaxed">
                  {topic.analysis.strategicEvaluationAO3AO4}
                </p>
                <div className="pt-2 border-t border-emerald-400/20 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-emerald-300">
                    Did you synthesize both advantages and strategic trade-offs?
                  </span>
                  <button
                    onClick={() => {
                      toggleTopicComplete(topic.id);
                      if (typeof navigator !== "undefined" && navigator.vibrate) {
                        navigator.vibrate(20);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs cursor-pointer transition-all duration-200 active:scale-95 select-none ${
                      isCompleted
                        ? "bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-sm"
                        : "bg-white/10 hover:bg-emerald-500/20 text-white border border-white/15"
                    }`}
                  >
                    {isCompleted ? "✓ Concept Mastered" : "Mark as Understood"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          8. REVISION SCRATCHPAD (PERSISTENT USER NOTES)
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-5">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setShowScratchpad((prev) => !prev)}
            className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wide cursor-pointer hover:text-amber-200"
          >
            <StickyNote className="w-4 h-4" />
            <span>
              {showScratchpad ? "Hide Revision Scratchpad" : "Open Revision Scratchpad"}
              {noteText ? " (Notes Saved)" : ""}
            </span>
          </button>
          <button
            onClick={() => setShowScratchpad((prev) => !prev)}
            className="text-slate-400 hover:text-white"
          >
            {showScratchpad ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {showScratchpad && (
          <div className="mt-3 pt-3 border-t border-white/10 animate-in fade-in duration-200">
            <textarea
              value={noteText}
              onChange={(e) => setTopicNote(topic.id, e.target.value)}
              placeholder="Jot down quick personal revision bullets, mnemonics, or questions for class..."
              rows={4}
              className="w-full p-3.5 rounded-2xl bg-slate-950/70 border border-white/15 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 resize-y font-mono"
            />
            <span className="font-mono text-[10px] text-slate-500 block mt-1">
              ✓ Auto-saved locally in browser storage
            </span>
          </div>
        )}
      </section>

      {/* =====================================================================
          8. HIGH-YIELD EXAM PROMPT TAKEAWAY
          ===================================================================== */}
      <footer className="p-4 rounded-3xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-3">
        <GraduationCap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-amber-200 uppercase">
            10-Mark & 20-Mark Evaluation Advice:
          </span>
          <p className="text-xs text-amber-100/90 leading-relaxed">
            {topic.examPromptTakeaway}
          </p>
        </div>
      </footer>
    </article>
  );
});

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopicData, CONCEPTS_TAXONOMY } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { RecallFlipCard } from "@/components/RecallFlipCard";
import {
  Briefcase,
  Building2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  PanelRightClose,
  Edit3,
  Copy,
  Check,
  GraduationCap,
  Scale,
  AlertTriangle,
  Layers,
  ChevronRight,
  Timer,
} from "lucide-react";

interface BusinessRightInspectorProps {
  topic: TopicData;
  isOpen: boolean;
  onToggle: () => void;
}

type InspectorTab = "eval" | "cases" | "recall" | "notes";

export function BusinessRightInspector({
  topic,
  isOpen,
  onToggle,
}: BusinessRightInspectorProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>("eval");
  const [copiedNote, setCopiedNote] = useState(false);

  const {
    bookmarkedCases,
    completedTopics,
    toggleTopicComplete,
    topicNotes,
    setTopicNote,
    openExamSprint,
  } = useStudyStore();

  const userNote = topicNotes[topic.id] || "";
  const isCompleted = !!completedTopics[topic.id];

  const handleCopyNote = () => {
    if (userNote.trim()) {
      navigator.clipboard.writeText(userNote);
      setCopiedNote(true);
      setTimeout(() => setCopiedNote(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="business-analytical-inspector"
          initial={{ opacity: 0, x: 36, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            x: 44,
            y: -32,
            scale: 0.92,
            transition: {
              duration: 0.26,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          transition={{
            duration: 0.32,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ willChange: "transform, opacity" }}
          data-tour="inspector"
          className="hidden xl:block w-[320px] xl:w-[340px] shrink-0 sticky top-5 z-20"
        >
          <div className="liquid-glass-bento rounded-3xl p-4 border border-emerald-500/30 bg-slate-950/70 backdrop-blur-2xl shadow-2xl flex flex-col max-h-[calc(100vh-2.5rem)] overflow-hidden">
            {/* Top Header */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10 shrink-0 min-h-[44px]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase block">
                    C-Suite Analytical Inspector
                  </span>
                  <h3 className="text-xs font-bold text-white truncate">
                    {topic.displayCode} · {topic.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    toggleTopicComplete(topic.id);
                    if (typeof navigator !== "undefined" && navigator.vibrate) {
                      navigator.vibrate(20);
                    }
                  }}
                  title={isCompleted ? "Mark Incomplete" : "Mark Topic Mastered"}
                  className={`p-2 rounded-xl text-xs font-mono transition-all duration-150 cursor-pointer active:scale-85 select-none ${
                    isCompleted
                      ? "bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 shadow-emerald-500/20"
                      : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-emerald-400 animate-tick-pop" : "text-slate-400"}`} />
                </button>
                <button
                  onClick={onToggle}
                  title="Tuck Inspector into Top Navigation Bar (⌘I)"
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer soft-button shrink-0 shadow-sm"
                >
                  <PanelRightClose className="w-3.5 h-3.5" />
                  <span className="font-semibold">Tuck to Bar ↑</span>
                </button>
              </div>
            </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 rounded-xl border border-white/10 mb-3 shrink-0">
          <button
            onClick={() => setActiveTab("eval")}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "eval"
                ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚖️ Eval
          </button>
          <button
            onClick={() => setActiveTab("cases")}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "cases"
                ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🏢 Cases
          </button>
          <button
            onClick={() => setActiveTab("recall")}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "recall"
                ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🎯 Cram
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "notes"
                ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📝 Notes
          </button>
        </div>

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar text-xs">
          {/* TAB 1: 10-MARK EVALUATION & STEEPLE */}
          {activeTab === "eval" && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-300 font-bold font-mono text-[11px]">
                  <Scale className="w-3.5 h-3.5" />
                  <span>10-Mark Strategic Evaluation (AO3/AO4)</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  {topic.analysis?.strategicEvaluationAO3AO4 ||
                    "Always contrast short-term liquidity/cash flow costs with long-term strategic competitiveness and market share gains."}
                </p>
              </div>

              {/* Stakeholder Tension Framework */}
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                  Stakeholder Conflict Blueprint
                </span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold shrink-0">Shareholders:</span>
                    <span className="text-slate-300">Demands immediate dividends, cost-cutting &amp; margin expansion.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-sky-400 font-bold shrink-0">Employees:</span>
                    <span className="text-slate-300">Demands job security, wage growth &amp; fair working conditions.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold shrink-0">Customers:</span>
                    <span className="text-slate-300">Expects ethical sourcing, consistent quality &amp; fair pricing.</span>
                  </div>
                </div>
              </div>

              {/* Connected BMT Tools */}
              {topic.analysis?.connectedBMTTools && topic.analysis.connectedBMTTools.length > 0 && (
                <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-300 font-bold block">
                    Applicable Business Tools (BMTs)
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {topic.analysis.connectedBMTTools.map((bmt, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/15 text-emerald-200 border border-emerald-400/25"
                      >
                        {bmt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REAL-WORLD CASE STUDIES */}
          {activeTab === "cases" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                  Corporate Case Anchors ({topic.cases?.length || 0})
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Exam-ready evidence</span>
              </div>

              {topic.cases?.map((cs, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2 hover:border-emerald-400/35 transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-emerald-300 font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-400/20 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {cs.company}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {cs.syllabusLink}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-200 leading-relaxed font-semibold">
                    {cs.context}
                  </p>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {cs.application}
                  </p>

                  <div className="p-2 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Evaluation Anchor (AO3/AO4)
                    </span>
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      {cs.evaluationAO3AO4}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ACTIVE RECALL & EXAM WARNINGS */}
          {activeTab === "recall" && (
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 block font-bold">
                  Active Recall Flipcard
                </span>
                <p className="text-[11px] text-slate-400">
                  Test your knowledge retrieval before looking at definitions.
                </p>
              </div>

              <RecallFlipCard
                moduleCode={topic.displayCode}
                title={`${topic.displayCode} · ${topic.title}`}
                prompt={
                  topic.examPromptTakeaway ||
                  topic.summary ||
                  `Evaluate the strategic benefits and limitations in ${topic.displayCode}.`
                }
                answer={topic.analysis?.coreThesis || topic.summary}
                accent="#10B981"
                secondary="#0284C7"
                meta="IB BM ACTIVE RECALL"
              />

              {/* Common Misconceptions */}
              {topic.analysis?.commonMisconceptions && topic.analysis.commonMisconceptions.length > 0 && (
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-400/25 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-rose-300 font-bold font-mono text-[10px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Examiner Warning: Common Pitfalls</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-rose-100/90 list-disc list-inside">
                    {topic.analysis.commonMisconceptions.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Launch Timed Exam Sprint Action Card */}
              <button
                onClick={openExamSprint}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-emerald-500/15 to-sky-500/15 border border-emerald-400/40 hover:border-emerald-400/70 text-left transition-all cursor-pointer flex items-center justify-between group shadow-lg"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 group-hover:scale-105 transition-transform">
                    <Timer className="w-4 h-4 animate-pulse" />
                  </span>
                  <div>
                    <span className="font-mono text-xs font-bold text-white block">
                      Launch 10-Mark Exam Sprint
                    </span>
                    <span className="text-[10px] text-emerald-200/80">
                      15m / 30m / 45m timed evaluation drill
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 font-bold px-2 py-1 rounded-lg bg-black/40 border border-white/10">
                  ⌘E
                </span>
              </button>
            </div>
          )}

          {/* TAB 4: PERSONAL NOTES */}
          {activeTab === "notes" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5" />
                  Strategic Topic Notes
                </span>
                <button
                  onClick={handleCopyNote}
                  className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedNote ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                value={userNote}
                onChange={(e) => setTopicNote(topic.id, e.target.value)}
                placeholder="Draft case study evaluation notes, formula shortcuts, or revision bullet points for this unit..."
                rows={10}
                className="w-full rounded-2xl bg-black/40 border border-white/10 p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 resize-none font-sans leading-relaxed"
              />

              <p className="text-[10px] text-slate-400 font-mono">
                💾 Auto-saved to local encrypted storage. Persists across sessions.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
      )}
    </AnimatePresence>
  );
}

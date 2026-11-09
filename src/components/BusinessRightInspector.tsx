"use client";

import React, { useState } from "react";
import { TopicData, CONCEPTS_TAXONOMY } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { RecallFlipCard } from "@/components/RecallFlipCard";
import { AcademicNotesSurface } from "@/components/AcademicNotesSurface";
import {
  Briefcase,
  Building2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  PanelRightClose,
  X,
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
    <aside
      data-tour="inspector"
      className={`shrink-0 sticky top-3 select-none overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${
        !isOpen
          ? "w-0 max-w-0 p-0 -ml-4 xl:-ml-5 border-0 opacity-0 pointer-events-none"
          : "w-80 lg:w-88 p-0 opacity-100"
      }`}
    >
      <div
        className={`w-80 lg:w-88 shrink-0 transition-opacity duration-200 ${
          !isOpen ? "opacity-0 pointer-events-none invisible" : "opacity-100 visible"
        }`}
      >
        <div className="liquid-glass-bento rounded-3xl p-4 border border-amber-500/35 bg-slate-950/85 backdrop-blur-2xl shadow-2xl flex flex-col max-h-[calc(100vh-1.5rem)] overflow-hidden">
            {/* Top Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-white/10 shrink-0 min-h-[44px]">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase block truncate">
                    C-SUITE INSPEKTOR
                  </span>
                  <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight truncate">
                    {topic.displayCode} · {topic.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => {
                    toggleTopicComplete(topic.id);
                    if (typeof navigator !== "undefined" && navigator.vibrate) {
                      navigator.vibrate(20);
                    }
                  }}
                  title={isCompleted ? "Mark Incomplete" : "Mark Topic Mastered"}
                  className={`p-1.5 rounded-xl text-xs font-mono transition-all duration-150 cursor-pointer active:scale-95 select-none ${
                    isCompleted
                      ? "bg-emerald-500/25 text-emerald-300 border border-emerald-400/40"
                      : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-emerald-400 animate-tick-pop" : "text-slate-400"}`} />
                </button>
                <button
                  onClick={onToggle}
                  title="Tuck Inspector away (⌘I)"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 rounded-xl border border-white/10 mb-3 shrink-0">
          <button
            onClick={() => setActiveTab("eval")}
            className={`py-1.5 px-1 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "eval"
                ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚖️ Eval
          </button>
          <button
            onClick={() => setActiveTab("cases")}
            className={`py-1.5 px-1 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "cases"
                ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🏢 Cases
          </button>
          <button
            onClick={() => setActiveTab("recall")}
            className={`py-1.5 px-1 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "recall"
                ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🎯 Cram
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`py-1.5 px-1 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "notes"
                ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
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
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/25 space-y-2">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold font-mono text-xs">
                  <Scale className="w-3.5 h-3.5" />
                  <span>10-Mark Strategic Evaluation (AO3/AO4)</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {topic.analysis?.strategicEvaluationAO3AO4 ||
                    "Always contrast short-term liquidity/cash flow costs with long-term strategic competitiveness and market share gains."}
                </p>
              </div>

              {/* Stakeholder Tension Framework */}
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold block">
                  Stakeholder Conflict Blueprint
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold shrink-0">Shareholders:</span>
                    <span className="text-slate-300">Demands immediate dividends, cost-cutting &amp; margin expansion.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold shrink-0">Employees:</span>
                    <span className="text-slate-300">Demands job security, wage growth &amp; fair working conditions.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-amber-300 font-bold shrink-0">Customers:</span>
                    <span className="text-slate-300">Expects ethical sourcing, consistent quality &amp; fair pricing.</span>
                  </div>
                </div>
              </div>

              {/* Connected BMT Tools */}
              {topic.analysis?.connectedBMTTools && topic.analysis.connectedBMTTools.length > 0 && (
                <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/20 space-y-1.5">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-300 font-bold block">
                    Applicable Business Tools (BMTs)
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {topic.analysis.connectedBMTTools.map((bmt, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-xs font-mono bg-amber-500/15 text-amber-200 border border-amber-400/25"
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
                <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                  Corporate Case Anchors ({topic.cases?.length || 0})
                </span>
                <span className="text-xs text-slate-400 font-mono">Exam-ready evidence</span>
              </div>

              {topic.cases?.map((cs, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2 hover:border-amber-400/35 transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-amber-300 font-bold px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-400/20 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {cs.company}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {cs.syllabusLink}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                    {cs.context}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cs.application}
                  </p>

                  <div className="p-2 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      Evaluation Anchor (AO3/AO4)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
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
                <span className="font-mono text-xs uppercase tracking-wider text-amber-400 block font-bold">
                  Active Recall Flipcard
                </span>
                <p className="text-xs text-slate-300">
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
                accent="#d97706"
                secondary="#991b1b"
                meta="IB BM ACTIVE RECALL"
              />

              {/* Common Misconceptions */}
              {topic.analysis?.commonMisconceptions && topic.analysis.commonMisconceptions.length > 0 && (
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-400/25 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-rose-300 font-bold font-mono text-xs">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Examiner Warning: Common Pitfalls</span>
                  </div>
                  <ul className="space-y-1 text-xs text-rose-100/90 list-disc list-inside">
                    {topic.analysis.commonMisconceptions.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Launch Timed Exam Sprint Action Card */}
              <button
                onClick={openExamSprint}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-600/15 to-rose-900/20 border border-amber-400/40 hover:border-amber-400/70 text-left transition-all cursor-pointer flex items-center justify-between group shadow-lg"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 group-hover:scale-105 transition-transform">
                    <Timer className="w-4 h-4 animate-pulse" />
                  </span>
                  <div>
                    <span className="font-mono text-xs font-bold text-white block">
                      Launch 10-Mark Exam Sprint
                    </span>
                    <span className="text-xs text-amber-200/80">
                      15m / 30m / 45m timed evaluation drill
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-amber-300 font-bold px-2 py-1 rounded-lg bg-black/40 border border-white/10">
                  ⌘E
                </span>
              </button>
            </div>
          )}

          {/* TAB 4: PERSONAL NOTES */}
          {activeTab === "notes" && (
            <AcademicNotesSurface
              note={userNote}
              onChange={(text) => setTopicNote(topic.id, text)}
              title="Strategic Topic Notes"
              itemCode={topic.displayCode}
              minRows={10}
              accentColor="#f59e0b"
            />
          )}
        </div>
      </div>
    </div>
  </aside>
  );
}

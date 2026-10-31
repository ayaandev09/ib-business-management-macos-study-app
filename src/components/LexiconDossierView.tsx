"use client";

import React, { useState } from "react";
import {
  FORMULA_BANK,
  THEORISTS_DOSSIER,
  GLOSSARY_TERMS,
  FormulaItem,
  TheoristProfile,
  GlossaryTerm,
} from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { MathFormula } from "./MathFormula";
import {
  Calculator,
  Users,
  BookOpen,
  Search,
  Sparkles,
  HelpCircle,
  GraduationCap,
  Layers,
} from "lucide-react";

type DossierTab = "formulas" | "theorists" | "glossary";

export function LexiconDossierView() {
  const { searchQuery } = useStudyStore();
  const [activeTab, setActiveTab] = useState<DossierTab>("formulas");
  const q = searchQuery.trim().toLowerCase();

  const filteredFormulas = FORMULA_BANK.filter(
    (f) =>
      !q ||
      f.name.toLowerCase().includes(q) ||
      f.code.toLowerCase().includes(q) ||
      f.unit.toLowerCase().includes(q) ||
      f.evaluationInterpretation.toLowerCase().includes(q)
  );

  const filteredTheorists = THEORISTS_DOSSIER.filter(
    (t) =>
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.schoolOrTheory.toLowerCase().includes(q) ||
      t.coreModel.toLowerCase().includes(q) ||
      t.evaluationAO3.toLowerCase().includes(q)
  );

  const filteredGlossary = GLOSSARY_TERMS.filter(
    (g) =>
      !q ||
      g.term.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q) ||
      g.examTip.toLowerCase().includes(q)
  );

  return (
    <div className="space-y-6">
      {/* =====================================================================
          1. DOSSIER HEADER & NAVIGATION TABS
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                Formulas, Theorists & Glossary Dossier
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Quantitative models, human resource theorists, and IB command terms.
            </p>
          </div>

          {/* Sub-Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-white/10">
            <button
              onClick={() => setActiveTab("formulas")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === "formulas"
                  ? "bg-emerald-500/25 border border-emerald-400/40 text-emerald-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Formulas ({filteredFormulas.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("theorists")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === "theorists"
                  ? "bg-purple-500/25 border border-purple-400/40 text-purple-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Theorists ({filteredTheorists.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("glossary")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === "glossary"
                  ? "bg-sky-500/25 border border-sky-400/40 text-sky-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Glossary ({filteredGlossary.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          TAB 1: FORMULAS BANK
          ===================================================================== */}
      {activeTab === "formulas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFormulas.map((f) => (
            <div
              key={f.id}
              className="liquid-glass-bento rounded-3xl p-5 space-y-3.5 border border-white/10 hover:border-emerald-400/30 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      {f.code}
                    </span>
                    <h3 className="text-sm font-bold text-white">{f.name}</h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {f.unit} {f.hlOnly ? "• (HL ONLY)" : "• (SL & HL)"}
                  </span>
                </div>
              </div>

              {/* Formula Display Box */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/15 text-center text-emerald-300 select-all overflow-x-auto shadow-inner flex items-center justify-center min-h-[64px]">
                <MathFormula formula={f.formula} displayMode={true} />
              </div>

              {/* Variables */}
              <div className="space-y-1 text-xs">
                {f.variables.map((v, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-1.5 text-slate-300"
                  >
                    <span className="text-emerald-400 font-mono font-bold">
                      • {v.name}:
                    </span>
                    <span>{v.definition}</span>
                  </div>
                ))}
              </div>

              {/* Benchmarks & Interpretation */}
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 text-xs">
                <div>
                  <strong className="text-amber-300 font-mono text-[11px]">
                    Target Benchmark:{" "}
                  </strong>
                  <span className="text-slate-300">{f.benchmarkGuidance}</span>
                </div>
                <div>
                  <strong className="text-sky-300 font-mono text-[11px]">
                    Interpretation:{" "}
                  </strong>
                  <span className="text-slate-300">
                    {f.evaluationInterpretation}
                  </span>
                </div>
              </div>

              {/* Worked Example */}
              <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-400/25 font-mono text-[11px] text-emerald-200">
                <span className="font-bold">Worked Example: </span>
                {f.workedExample}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          TAB 2: THEORISTS DOSSIER
          ===================================================================== */}
      {activeTab === "theorists" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTheorists.map((t) => (
            <div
              key={t.id}
              className="liquid-glass-bento rounded-3xl p-5 space-y-3 border border-white/10 hover:border-purple-400/30 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white">{t.name}</h3>
                  <span className="text-xs font-mono text-purple-300">
                    {t.schoolOrTheory}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/10 text-slate-300">
                  {t.unit}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                {t.coreModel}
              </p>

              {/* Key Assumptions */}
              <div className="p-3 rounded-2xl bg-slate-950/50 border border-white/10">
                <span className="font-mono text-[11px] text-slate-400 block mb-1.5 font-bold">
                  Key Theoretical Assumptions:
                </span>
                <ul className="space-y-1">
                  {t.keyAssumptions.map((ass, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-300 flex items-start gap-1.5"
                    >
                      <span className="text-purple-400 shrink-0">▸</span>
                      <span>{ass}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Evaluation AO3 */}
              <div className="p-3 rounded-2xl bg-purple-950/20 border border-purple-400/25 text-xs text-purple-200 leading-relaxed">
                <span className="font-mono font-bold">Critical Evaluation (AO3): </span>
                {t.evaluationAO3}
              </div>

              {/* Real World Example */}
              <div className="text-[11px] font-mono text-slate-400">
                <strong className="text-slate-300">Case Example: </strong>
                {t.realWorldExample}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          TAB 3: GLOSSARY & COMMAND TERMS
          ===================================================================== */}
      {activeTab === "glossary" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGlossary.map((g, idx) => (
            <div
              key={idx}
              className="liquid-glass-bento rounded-3xl p-5 space-y-2.5 border border-white/10 hover:border-sky-400/30 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-white">{g.term}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-400/25">
                  {g.unit} {g.hlOnly ? "• HL" : ""}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                {g.definition}
              </p>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-amber-200/90 font-mono">
                <span className="text-amber-400 font-bold">Exam Guidance: </span>
                {g.examTip}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

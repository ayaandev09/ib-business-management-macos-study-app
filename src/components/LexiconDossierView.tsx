"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import { CSuiteDecisionSandbox } from "./CSuiteDecisionSandbox";
import {
  Calculator,
  Users,
  BookOpen,
  Search,
  Sparkles,
  HelpCircle,
  GraduationCap,
  Layers,
  Filter,
  CheckCircle2,
} from "lucide-react";

type DossierTab = "csuite" | "formulas" | "theorists" | "glossary";

const ALPHABET = [
  "ALL",
  "#",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "Y",
  "Z",
];

const UNIT_FILTERS = [
  { id: "ALL", label: "All Syllabus Units" },
  { id: "Unit 1", label: "Unit 1: Business Org" },
  { id: "Unit 2", label: "Unit 2: HRM" },
  { id: "Unit 3", label: "Unit 3: Finance" },
  { id: "Unit 4", label: "Unit 4: Marketing" },
  { id: "Unit 5", label: "Unit 5: Operations" },
  { id: "BMT", label: "BMT Toolkit" },
  { id: "Command Terms", label: "IB Command Terms" },
];

export const LexiconDossierView = React.memo(function LexiconDossierView() {
  const searchQuery = useStudyStore((state) => state.searchQuery);
  const [activeTab, setActiveTab] = useState<DossierTab>("csuite");
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");
  const [selectedUnit, setSelectedUnit] = useState<string>("ALL");
  const [hlOnlyFilter, setHlOnlyFilter] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(40);

  const q = searchQuery.trim().toLowerCase();

  // Reset pagination when any filter changes
  useEffect(() => {
    setDisplayCount(40);
  }, [q, selectedLetter, selectedUnit, hlOnlyFilter]);

  const filteredFormulas = useMemo(() => {
    return FORMULA_BANK.filter(
      (f) =>
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.code.toLowerCase().includes(q) ||
        f.unit.toLowerCase().includes(q) ||
        f.evaluationInterpretation.toLowerCase().includes(q)
    );
  }, [q]);

  const filteredTheorists = useMemo(() => {
    return THEORISTS_DOSSIER.filter(
      (t) =>
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.schoolOrTheory.toLowerCase().includes(q) ||
        t.coreModel.toLowerCase().includes(q) ||
        t.evaluationAO3.toLowerCase().includes(q)
    );
  }, [q]);

  const filteredGlossary = useMemo(() => {
    return GLOSSARY_TERMS.filter((g) => {
      // 1. Text search
      if (q) {
        const matchesQ =
          g.term.toLowerCase().includes(q) ||
          g.definition.toLowerCase().includes(q) ||
          g.examTip.toLowerCase().includes(q);
        if (!matchesQ) return false;
      }

      // 2. Alphabet Filter
      if (selectedLetter !== "ALL") {
        const firstChar = g.term.charAt(0).toUpperCase();
        if (selectedLetter === "#") {
          if (!/[0-9]/.test(firstChar)) return false;
        } else {
          if (firstChar !== selectedLetter) return false;
        }
      }

      // 3. Unit Filter
      if (selectedUnit !== "ALL") {
        if (selectedUnit === "Command Terms") {
          if (g.unit !== "Command Terms") return false;
        } else if (selectedUnit === "BMT") {
          if (!g.unit.startsWith("BMT")) return false;
        } else {
          if (!g.unit.startsWith(selectedUnit)) return false;
        }
      }

      // 4. HL Only
      if (hlOnlyFilter && !g.hlOnly) {
        return false;
      }

      return true;
    });
  }, [q, selectedLetter, selectedUnit, hlOnlyFilter]);

  const visibleGlossary = useMemo(() => {
    return filteredGlossary.slice(0, displayCount);
  }, [filteredGlossary, displayCount]);

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
              Quantitative models, organizational theorists, and comprehensive {GLOSSARY_TERMS.length}-term IB syllabus glossary.
            </p>
          </div>

          {/* Sub-Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-white/10">
            <button
              onClick={() => setActiveTab("csuite")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === "csuite"
                  ? "bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-400/50 text-emerald-200 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>C-Suite Decision &amp; Quant Lab</span>
            </button>
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
          TAB 0: C-SUITE EXECUTIVE DECISION & QUANTITATIVE SANDBOX
          ===================================================================== */}
      {activeTab === "csuite" && <CSuiteDecisionSandbox />}

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
                    <span className="text-[11px] font-mono text-slate-400">
                      {f.unit}
                    </span>
                    {f.hlOnly && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-400/30">
                        HL ONLY
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white">{f.name}</h3>
                </div>
              </div>

              {/* KaTeX Math Formatted Formula Box */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 font-mono text-sm text-sky-300 min-h-[64px] flex items-center justify-center shadow-inner overflow-x-auto">
                <MathFormula formula={f.formula} displayMode={true} />
              </div>

              {/* Variables breakdown */}
              <div className="space-y-1 text-xs">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  VARIABLES & DEFINITIONS:
                </span>
                {f.variables.map((v, vIdx) => (
                  <div key={vIdx} className="text-slate-300 pl-2 border-l border-white/10">
                    <strong className="text-white font-mono">{v.name}:</strong>{" "}
                    {v.definition}
                  </div>
                ))}
              </div>

              {/* Benchmark guidance */}
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-emerald-300 font-mono">
                <span className="text-emerald-400 font-bold">Standard Target: </span>
                {f.benchmarkGuidance}
              </div>

              {/* Interpretation and worked example */}
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-slate-200">Analytical Value: </strong>
                {f.evaluationInterpretation}
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-400 font-mono">
                <span className="text-sky-300 font-bold">Worked Calculation: </span>
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
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-400/30">
                      {t.schoolOrTheory}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {t.unit}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{t.name}</h3>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-400/20 text-xs text-purple-200 font-mono">
                <span className="text-purple-300 font-bold">Core Paradigm: </span>
                {t.coreModel}
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  KEY ASSUMPTIONS:
                </span>
                {t.keyAssumptions.map((a, aIdx) => (
                  <div key={aIdx} className="text-slate-300 pl-2 border-l border-white/10">
                    • {a}
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-amber-200/90 font-mono">
                <span className="text-amber-400 font-bold">AO3 Evaluation: </span>
                {t.evaluationAO3}
              </div>

              <div className="text-[11px] text-slate-400 font-mono">
                <strong className="text-slate-300">Case Example: </strong>
                {t.realWorldExample}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          TAB 3: COMPLETE 412-TERM GLOSSARY & SYLLABUS LEXICON
          ===================================================================== */}
      {activeTab === "glossary" && (
        <div className="space-y-4">
          {/* Unit Filter Bar & Controls */}
          <div className="liquid-glass-bento rounded-3xl p-4 sm:p-5 border border-white/10 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Syllabus Unit:
                </span>
              </div>

              {/* HL Only Toggle Pill */}
              <button
                onClick={() => setHlOnlyFilter(!hlOnlyFilter)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  hlOnlyFilter
                    ? "bg-rose-500/25 border border-rose-400/50 text-rose-200 shadow-[0_0_15px_-3px_rgba(244,63,94,0.4)]"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    hlOnlyFilter ? "bg-rose-400 animate-pulse" : "bg-slate-500"
                  }`}
                />
                <span>HL Only Terms</span>
              </button>
            </div>

            {/* Unit Chips */}
            <div className="flex flex-wrap gap-1.5">
              {UNIT_FILTERS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUnit(u.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    selectedUnit === u.id
                      ? "bg-sky-500/25 border border-sky-400/40 text-sky-200 shadow-sm"
                      : "bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>

            {/* Alphabet Navigator Ribbon */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono text-slate-400">
                  ALPHABETICAL JUMP:
                </span>
                <span className="text-[11px] font-mono text-sky-400 font-bold">
                  {selectedLetter === "ALL" ? "All Letters" : `Letter '${selectedLetter}'`}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {ALPHABET.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(letter)}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedLetter === letter
                        ? "bg-sky-500 text-slate-950 shadow-[0_0_10px_rgba(14,165,233,0.5)] scale-105"
                        : "bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Counter / Source Attribution */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
              <span>
                Showing <strong className="text-sky-300">{visibleGlossary.length}</strong> of{" "}
                <strong className="text-white">{filteredGlossary.length}</strong> matching terms ({GLOSSARY_TERMS.length} total)
              </span>
              <span className="text-slate-500">
                Paul Hoang 5th Edition (2022 Syllabus)
              </span>
            </div>
          </div>

          {/* Terms Grid */}
          {filteredGlossary.length === 0 ? (
            <div className="liquid-glass-bento rounded-3xl p-12 text-center space-y-3">
              <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
              <h4 className="text-base font-bold text-white">No matching terms found</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Try clearing your search query or selecting &quot;All Letters&quot; in the alphabet ribbon above.
              </p>
              <button
                onClick={() => {
                  setSelectedLetter("ALL");
                  setSelectedUnit("ALL");
                  setHlOnlyFilter(false);
                }}
                className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-mono cursor-pointer hover:bg-sky-500/30"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleGlossary.map((g, idx) => (
                  <div
                    key={`${g.term}-${idx}`}
                    className="liquid-glass-bento rounded-3xl p-5 space-y-3 border border-white/10 hover:border-sky-400/35 transition-all group glossary-term-card"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-sky-200 transition-colors">
                        {g.term}
                      </h3>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-400/25">
                          {g.unit}
                        </span>
                        {g.hlOnly && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-400/30 font-semibold">
                            HL
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {g.definition}
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-amber-400/20 text-xs text-amber-200/95 font-mono shadow-inner">
                      <span className="text-amber-400 font-bold">IB Exam Guidance: </span>
                      {g.examTip}
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Pagination Bar */}
              {filteredGlossary.length > visibleGlossary.length && (
                <div className="pt-4 pb-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setDisplayCount((prev) => prev + 40)}
                    className="px-6 py-2.5 rounded-2xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/35 text-xs font-mono font-bold transition-all cursor-pointer shadow-md"
                  >
                    Load Next 40 Terms (Showing {visibleGlossary.length} of {filteredGlossary.length})
                  </button>
                  <button
                    onClick={() => setDisplayCount(filteredGlossary.length)}
                    className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-mono transition-all cursor-pointer"
                  >
                    Show All ({filteredGlossary.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

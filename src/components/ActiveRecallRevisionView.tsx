"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GLOSSARY_TERMS,
  FORMULA_BANK,
  THEORISTS_DOSSIER,
  ALL_TOPICS,
  GlossaryTerm,
  FormulaItem,
  TheoristProfile,
} from "@/data";
import { useStudyStore, FlashcardDeckType } from "@/store/useStudyStore";
import { MathFormula } from "./MathFormula";
import {
  Brain,
  Sparkles,
  RotateCw,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  BookOpen,
  Calculator,
  Users,
  Award,
  Filter,
  Eye,
  Layers,
  GraduationCap,
  Zap,
} from "lucide-react";

interface ExamQuestionCard {
  id: string;
  unit: string;
  hlOnly: boolean;
  commandTerm: string;
  marks: number;
  question: string;
  guidance: string;
  modelAnswerStructure: string[];
  keyConcept: string;
}

const HIGH_YIELD_EXAM_QUESTIONS: ExamQuestionCard[] = [
  {
    id: "eq-1",
    unit: "Unit 1",
    hlOnly: false,
    commandTerm: "Evaluate (10 marks)",
    marks: 10,
    question: "Evaluate whether a rapidly growing private limited company (Ltd) should float on the stock exchange to become a public limited company (PLC).",
    guidance: "Use SLAP evaluation: Stakeholders (founders lose control vs investors gain liquidity), Long-term vs Short-term (immediate growth capital vs quarterly dividend pressure), Assumptions (market receptive to IPO), Priorities.",
    modelAnswerStructure: [
      "Define PLC and contrast with Ltd (separation of ownership and control, prospectus requirements).",
      "Arguments for PLC: Massive permanent equity injection; eliminates debt interest strain; establishes public brand stature; enables major M&A.",
      "Arguments against PLC: Underwriting and legal IPO fees (up to 10% of funds raised); quarterly reporting scrutiny; vulnerability to hostile takeovers; loss of founder vision.",
      "Justified Conclusion: Recommend PLC if capital expenditure needs exceed internal borrowing capacity and founders hold a controlling voting block."
    ],
    keyConcept: "Change & Ethics"
  },
  {
    id: "eq-2",
    unit: "Unit 2",
    hlOnly: false,
    commandTerm: "Discuss (10 marks)",
    marks: 10,
    question: "Discuss the effectiveness of financial versus non-financial rewards in motivating professional software engineers.",
    guidance: "Contrast Taylor's economic man assumptions against Daniel Pink's Drive (Autonomy, Mastery, Purpose) and Herzberg's Hygiene-Motivator framework.",
    modelAnswerStructure: [
      "Define financial (PRP, stock options) vs non-financial rewards (empowerment, flexible hours, hackathons).",
      "Analysis of Financial Rewards: Competitive salaries satisfy Herzberg hygiene needs and attract talent; stock options align with equity, but PRP can cause code quality gaming.",
      "Analysis of Non-Financial Rewards: Pink argues knowledge workers require autonomy over time and technology; mastery drives personal pride; purpose links to mission.",
      "Balanced Synthesis: Base salary must be fair (hygiene), but intrinsic non-financial autonomy drives peak creative productivity."
    ],
    keyConcept: "Creativity"
  },
  {
    id: "eq-3",
    unit: "Unit 3",
    hlOnly: true,
    commandTerm: "Evaluate (10 marks)",
    marks: 10,
    question: "A manufacturing firm has a Gearing Ratio of 68% and an Acid Test Ratio of 0.65 : 1. Evaluate strategic options available to restore financial solvency.",
    guidance: "High gearing (>50%) and low quick ratio (<1.0) signal severe dual liquidity and solvency crises. Quantitative analysis must drive the strategic recommendation.",
    modelAnswerStructure: [
      "Interpret both metrics: Gearing of 68% means debt heavily finances capital employed; Acid Test of 0.65 indicates severe cash flow deficit to settle supplier bills.",
      "Option 1: Rights Issue (Issue shares to existing owners) to retire debt. Advantage: no interest burden; Disadvantage: share dilution.",
      "Option 2: Sale-and-Leaseback of non-current factories. Advantage: immediate liquid cash infusion; Disadvantage: permanent ongoing lease operating expense.",
      "Option 3: Working capital cycle tightening (extend creditor days, enforce strict debtor credit terms).",
      "Final Justification: Urgent sale-and-leaseback to retire high-interest debt, combined with cash-only customer discounts."
    ],
    keyConcept: "Sustainability"
  },
  {
    id: "eq-4",
    unit: "Unit 4",
    hlOnly: false,
    commandTerm: "Discuss (10 marks)",
    marks: 10,
    question: "Discuss whether an innovative consumer tech startup should adopt Price Skimming or Penetration Pricing when launching a novel smart wearable.",
    guidance: "Evaluate the product's USP, patent defense, brand equity, and target consumer price elasticity of demand (PED).",
    modelAnswerStructure: [
      "Define Price Skimming (high initial price to maximize margin from early adopters) vs Penetration Pricing (low introductory price to capture volume).",
      "Arguments for Skimming: Rapidly recoups R&D expenditure; reinforces premium luxury positioning; early adopters have highly price-inelastic demand.",
      "Arguments for Penetration: Creates network effects; deters copycat competitors from entering; exploits mass production scale economies.",
      "Contextual Decision: If protected by patents and distinctive USP, adopt skimming; if easily imitated by incumbents, adopt penetration to lock in users."
    ],
    keyConcept: "Change"
  },
  {
    id: "eq-5",
    unit: "Unit 5",
    hlOnly: false,
    commandTerm: "Evaluate (10 marks)",
    marks: 10,
    question: "Evaluate whether an established automotive firm should transition from Just-in-Case (JIC) buffer inventories to a Just-in-Time (JIT) lean production system.",
    guidance: "Balance working capital savings and zero warehouse waste against vulnerability to global supply chain bottlenecks and strikes.",
    modelAnswerStructure: [
      "Define JIT (pull production, zero buffer stock) vs JIC (holding safety stock).",
      "Benefits of JIT: Eliminates massive warehouse holding and insurance costs; frees up liquidity; exposes hidden assembly bottlenecks; reduces defect scrap.",
      "Risks of JIT: Zero buffer for supplier delays, dock strikes, or natural disasters; requires multi-skilled flexible workforce and absolute trust in suppliers.",
      "Recommendation: JIT succeeds only with regional tier-1 suppliers and long-term partnership contracts; highly risky with distant international suppliers."
    ],
    keyConcept: "Sustainability & Change"
  },
  {
    id: "eq-6",
    unit: "BMT",
    hlOnly: true,
    commandTerm: "Explain & Evaluate (10 marks)",
    marks: 10,
    question: "Using Critical Path Analysis (CPA), evaluate the usefulness of float time calculations for a project manager overseeing a factory relocation.",
    guidance: "Demonstrate exact distinction between Total Float and Free Float, and explain how critical activities with zero float must be prioritized.",
    modelAnswerStructure: [
      "Define Critical Path (sequence of dependent activities with zero float that dictates minimum project duration).",
      "Explain Float calculations: Total Float = LFT - Duration - EST; Free Float = EST(next) - EST(this) - Duration.",
      "Strategic Value: Allows resource transfers (e.g. moving equipment or labor from non-critical activities with surplus float to bottleneck tasks on the critical path).",
      "Limitations of CPA: Assumes activity durations are deterministic rather than probabilistic; ignores qualitative workforce resistance and supply disruptions."
    ],
    keyConcept: "Change"
  }
];

interface Flashcard {
  id: string;
  deckType: FlashcardDeckType;
  unit: string;
  hlOnly: boolean;
  front: string;
  frontSub: string;
  back: React.ReactNode;
  backTip?: string;
  categoryBadge: string;
}

export const ActiveRecallRevisionView = React.memo(function ActiveRecallRevisionView() {
  const {
    activeFlashcardDeck,
    setActiveFlashcardDeck,
    masteredFlashcards,
    toggleFlashcardMastered,
    resetFlashcardProgress,
    activeTopicId,
    setActiveTopic,
    setViewMode,
  } = useStudyStore();

  const [selectedUnit, setSelectedUnit] = useState<string>("ALL");
  const [onlyUnmastered, setOnlyUnmastered] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewFormat, setViewFormat] = useState<"card" | "sheet">("card");

  // Build flashcards dynamically based on active deck
  const allCards = useMemo<Flashcard[]>(() => {
    if (activeFlashcardDeck === "glossary") {
      return GLOSSARY_TERMS.map((g, idx) => ({
        id: `g-${idx}-${g.term.toLowerCase().replace(/\s+/g, "-")}`,
        deckType: "glossary",
        unit: g.unit,
        hlOnly: g.hlOnly,
        front: g.term,
        frontSub: `${g.unit} ${g.hlOnly ? "• HL Only" : "• SL / HL"}`,
        back: (
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans">
              {g.definition}
            </p>
          </div>
        ),
        backTip: g.examTip,
        categoryBadge: "Glossary Term",
      }));
    }

    if (activeFlashcardDeck === "formulas") {
      return FORMULA_BANK.map((f) => ({
        id: `f-${f.id}`,
        deckType: "formulas",
        unit: f.unit,
        hlOnly: f.hlOnly,
        front: f.name,
        frontSub: `Code: ${f.code} • ${f.unit}`,
        back: (
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-black/50 border border-white/10 font-mono text-sm text-sky-300 flex items-center justify-center overflow-x-auto">
              <MathFormula formula={f.formula} displayMode={true} />
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-emerald-300">Target Standard: </strong>
              {f.benchmarkGuidance}
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-sky-300">Analytical Meaning: </strong>
              {f.evaluationInterpretation}
            </div>
          </div>
        ),
        backTip: `Worked Example: ${f.workedExample}`,
        categoryBadge: "Quantitative Formula",
      }));
    }

    if (activeFlashcardDeck === "theorists") {
      return THEORISTS_DOSSIER.map((t) => ({
        id: `t-${t.id}`,
        deckType: "theorists",
        unit: t.unit,
        hlOnly: false,
        front: t.name,
        frontSub: `${t.schoolOrTheory} • ${t.unit}`,
        back: (
          <div className="space-y-2.5">
            <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-400/25 text-xs text-purple-200 font-mono">
              <span className="font-bold">Core Paradigm: </span>
              {t.coreModel}
            </div>
            <div className="space-y-1 text-xs text-slate-300">
              <span className="text-[11px] font-mono text-slate-400 block">
                KEY ASSUMPTIONS:
              </span>
              {t.keyAssumptions.map((a, aIdx) => (
                <div key={aIdx} className="pl-2 border-l border-white/10">
                  • {a}
                </div>
              ))}
            </div>
          </div>
        ),
        backTip: `AO3 Evaluation: ${t.evaluationAO3}`,
        categoryBadge: "Theorist & Model",
      }));
    }

    // Exam Questions Deck
    return HIGH_YIELD_EXAM_QUESTIONS.map((q) => ({
      id: q.id,
      deckType: "exam-questions",
      unit: q.unit,
      hlOnly: q.hlOnly,
      front: q.question,
      frontSub: `${q.commandTerm} • Concept: ${q.keyConcept}`,
      back: (
        <div className="space-y-2.5">
          <div className="text-xs font-mono text-amber-300 font-bold mb-1">
            MODEL ANSWER STRUCTURE:
          </div>
          <div className="space-y-1.5 text-xs text-slate-200">
            {q.modelAnswerStructure.map((step, sIdx) => (
              <div key={sIdx} className="p-2 rounded-xl bg-white/[0.04] border border-white/5 pl-3">
                <span className="font-mono text-sky-400 font-bold mr-1.5">
                  Step {sIdx + 1}:
                </span>
                {step}
              </div>
            ))}
          </div>
        </div>
      ),
      backTip: `Mark Scheme Pointer: ${q.guidance}`,
      categoryBadge: "Exam Question Drill",
    }));
  }, [activeFlashcardDeck]);

  // Filter cards by unit and unmastered toggle
  const filteredCards = useMemo(() => {
    return allCards.filter((card) => {
      if (selectedUnit !== "ALL") {
        if (!card.unit.startsWith(selectedUnit)) return false;
      }
      if (onlyUnmastered && masteredFlashcards[card.id]) {
        return false;
      }
      return true;
    });
  }, [allCards, selectedUnit, onlyUnmastered, masteredFlashcards]);

  // Reset index when deck or filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [activeFlashcardDeck, selectedUnit, onlyUnmastered]);

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];
  const isMastered = currentCard ? !!masteredFlashcards[currentCard.id] : false;

  const totalMasteredInDeck = useMemo(() => {
    return allCards.filter((c) => !!masteredFlashcards[c.id]).length;
  }, [allCards, masteredFlashcards]);

  const progressPercent = Math.round(
    (totalMasteredInDeck / (allCards.length || 1)) * 100
  );

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex, filteredCards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  }, [currentIndex, filteredCards.length]);

  const handleToggleMastered = () => {
    if (currentCard) {
      toggleFlashcardMastered(currentCard.id);
      handleNext();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        handleToggleMastered();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const shuffleDeck = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filteredCards.length));
  };

  return (
    <div className="space-y-6">
      {/* =====================================================================
          1. HEADER & DECK SELECTOR
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                Active Recall & Exam Revision Hub
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Interactive spaced repetition drills for rapid pre-lesson preparation and exam tests.
            </p>
          </div>

          {/* Deck Selectors */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-white/10">
            <button
              onClick={() => setActiveFlashcardDeck("glossary")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeFlashcardDeck === "glossary"
                  ? "bg-sky-500/25 border border-sky-400/40 text-sky-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Glossary ({GLOSSARY_TERMS.length})</span>
            </button>
            <button
              onClick={() => setActiveFlashcardDeck("formulas")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeFlashcardDeck === "formulas"
                  ? "bg-emerald-500/25 border border-emerald-400/40 text-emerald-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Formulas ({FORMULA_BANK.length})</span>
            </button>
            <button
              onClick={() => setActiveFlashcardDeck("theorists")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeFlashcardDeck === "theorists"
                  ? "bg-purple-500/25 border border-purple-400/40 text-purple-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Theorists ({THEORISTS_DOSSIER.length})</span>
            </button>
            <button
              onClick={() => setActiveFlashcardDeck("exam-questions")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeFlashcardDeck === "exam-questions"
                  ? "bg-amber-500/25 border border-amber-400/40 text-amber-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Exam Drills ({HIGH_YIELD_EXAM_QUESTIONS.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Progress Strip */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-sky-400" /> Filter Unit:
            </span>
            {["ALL", "Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "BMT"].map((u) => (
              <button
                key={u}
                onClick={() => setSelectedUnit(u)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-mono transition-all cursor-pointer ${
                  selectedUnit === u
                    ? "bg-white/15 text-white border border-white/25"
                    : "bg-white/[0.03] text-slate-400 hover:text-slate-200"
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Unmastered Only Toggle */}
            <button
              onClick={() => setOnlyUnmastered(!onlyUnmastered)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                onlyUnmastered
                  ? "bg-amber-500/20 text-amber-200 border border-amber-400/30"
                  : "bg-white/[0.04] text-slate-400 hover:text-white"
              }`}
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Unmastered Only</span>
            </button>

            {/* View Format Toggle (Card vs Cram Sheet) */}
            <div className="flex items-center p-0.5 rounded-xl bg-slate-950/60 border border-white/10">
              <button
                onClick={() => setViewFormat("card")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  viewFormat === "card"
                    ? "bg-white/15 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Flashcard
              </button>
              <button
                onClick={() => setViewFormat("sheet")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  viewFormat === "sheet"
                    ? "bg-white/15 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Cram Sheet
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-3">
          <div className="w-full h-2 rounded-full bg-slate-950/80 overflow-hidden border border-white/5">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, #10b981, #0ea5e9)",
                boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
              }}
            />
          </div>
          <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">
            {totalMasteredInDeck} / {allCards.length} Mastered ({progressPercent}%)
          </span>
          <button
            onClick={() => resetFlashcardProgress()}
            className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
            title="Reset Mastered Stats"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* =====================================================================
          2. FORMAT A: 3D INTERACTIVE FLASHCARD
          ===================================================================== */}
      {viewFormat === "card" && (
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredCards.length === 0 ? (
            <div className="liquid-glass-bento rounded-3xl p-12 text-center space-y-3">
              <Award className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Deck Mastered!</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                You have marked all cards in this category as mastered. Great job!
              </p>
              <button
                onClick={() => setOnlyUnmastered(false)}
                className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-mono cursor-pointer"
              >
                Review All Cards
              </button>
            </div>
          ) : currentCard ? (
            <>
              {/* Card Meta Indicator */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
                <span>
                  Card <strong className="text-white">{currentIndex + 1}</strong> of{" "}
                  {filteredCards.length}
                </span>
                <span className="text-[11px] text-slate-500">
                  Keyboard: Space = Flip • ← / → = Prev / Next • ↑ = Mark Mastered
                </span>
              </div>

              {/* Main Flip Card Container with Silky Smooth 3D Flip */}
              <div
                className="w-full min-h-[360px] cursor-pointer select-none"
                style={{ perspective: "1400px" }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {!isFlipped ? (
                    <motion.div
                      key={`front-${currentCard.id}`}
                      initial={{ rotateY: -80, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 80, opacity: 0 }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                      className="liquid-glass-bento rounded-3xl p-7 sm:p-9 min-h-[360px] flex flex-col justify-between border border-white/15 hover:border-sky-400/40 transition-colors bg-slate-950/80 shadow-2xl"
                    >
                      {/* Header Pills */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
                            {currentCard.categoryBadge}
                          </span>
                          <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-white/[0.06] text-slate-300 border border-white/10">
                            {currentCard.unit}
                          </span>
                          {currentCard.hlOnly && (
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-400/30">
                              HL
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {isMastered && (
                            <span className="flex items-center gap-1 font-mono text-xs text-emerald-400 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-lg">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Mastered
                            </span>
                          )}
                          <span className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors">
                            <RotateCw className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                      {/* Card Prompt */}
                      <div className="my-auto py-4 space-y-3">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                          PROMPT / QUESTION:
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                          {currentCard.front}
                        </h3>
                        <p className="text-xs font-mono text-slate-400">
                          {currentCard.frontSub}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-sky-400" />
                          Click anywhere to reveal answer (3D Flip)
                        </span>
                        <span className="text-slate-500">Tap Spacebar to Flip</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`back-${currentCard.id}`}
                      initial={{ rotateY: -80, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 80, opacity: 0 }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                      className="liquid-glass-bento rounded-3xl p-7 sm:p-9 min-h-[360px] flex flex-col justify-between border border-sky-400/40 bg-slate-900/95 shadow-[0_0_35px_-5px_rgba(14,165,233,0.3)]"
                    >
                      {/* Header Pills */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
                            {currentCard.categoryBadge} Solution
                          </span>
                          <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-white/[0.06] text-slate-300 border border-white/10">
                            {currentCard.unit}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isMastered && (
                            <span className="flex items-center gap-1 font-mono text-xs text-emerald-400 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-lg">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Mastered
                            </span>
                          )}
                          <span className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors">
                            <RotateCw className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                      {/* Card Solution */}
                      <div className="my-auto py-2 space-y-3">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                          EXPLANATION &amp; SYLLABUS ANSWER:
                        </span>
                        {currentCard.back}

                        {currentCard.backTip && (
                          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/25 text-xs text-amber-200 font-mono">
                            <span className="text-amber-400 font-bold">Exam Guidance: </span>
                            {currentCard.backTip}
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-1.5 text-sky-300">
                          <Eye className="w-3.5 h-3.5" />
                          Click anywhere to flip to question
                        </span>
                        <span className="text-slate-500">Tap Spacebar to Flip</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation & Grading Action Bar */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-mono transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={shuffleDeck}
                    className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                    title="Shuffle Cards"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleToggleMastered}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      isMastered
                        ? "bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]"
                        : "bg-white/10 border border-white/20 text-white hover:bg-emerald-500/20 hover:border-emerald-400/40 hover:text-emerald-300"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isMastered ? "Mark as Still Learning" : "Mark as Mastered"}</span>
                  </button>
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-200 hover:bg-sky-500/30 text-xs font-mono transition-all cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}

      {/* =====================================================================
          3. FORMAT B: PRE-LESSON CRAM SHEET (LIST VIEW)
          ===================================================================== */}
      {viewFormat === "sheet" && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/25 text-xs text-amber-200 font-mono flex items-center justify-between">
            <span>
              <strong>Pre-Lesson Quick Cram Sheet:</strong> Showing {filteredCards.length} key concepts. Perfect for quick review right before entering class or before exam papers.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredCards.map((card, idx) => (
              <div
                key={card.id}
                className="liquid-glass-bento rounded-2xl p-4 space-y-2.5 border border-white/10 hover:border-sky-400/30 transition-all glossary-term-card"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10 mr-1.5">
                      {card.unit}
                    </span>
                    <strong className="text-sm font-bold text-white">
                      {card.front}
                    </strong>
                  </div>
                  <button
                    onClick={() => toggleFlashcardMastered(card.id)}
                    className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {masteredFlashcards[card.id] ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-600" />
                    )}
                  </button>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed">
                  {card.back}
                </div>

                {card.backTip && (
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-amber-400/20 text-[11px] text-amber-200/90 font-mono">
                    <span className="text-amber-400 font-bold">Tip: </span>
                    {card.backTip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

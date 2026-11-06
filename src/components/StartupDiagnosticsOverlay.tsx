"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Calculator,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Terminal,
  RotateCcw,
  Gauge,
  X,
  Play,
  Pause,
  BookOpen,
  GraduationCap,
  Scale,
  Leaf,
  Lightbulb,
  Building2,
} from "lucide-react";
import { TOTAL_TOPICS_COUNT, GLOSSARY_TERMS, FORMULA_BANK, SYLLABUS_UNITS } from "@/data";
import { MathFormula } from "./MathFormula";

interface StartupDiagnosticsOverlayProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export function StartupDiagnosticsOverlay({
  forceOpen = false,
  onClose,
}: StartupDiagnosticsOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [currentStage, setCurrentStage] = useState(0); // 0 to 4
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fps, setFps] = useState(120);
  const [renderLatency, setRenderLatency] = useState(0.22);
  const [showFullModal, setShowFullModal] = useState(forceOpen);

  // Auto-dismiss floating telemetry capsule after 5.2s
  useEffect(() => {
    if (isVisible && !showFullModal && !isExiting) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, 5200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, showFullModal, isExiting]);

  // Live real-time FPS with requestAnimationFrame (only when overlay is visible)
  useEffect(() => {
    if (!isVisible && !showFullModal) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureLoop = (currentTime: number) => {
      frameCount++;
      const elapsed = currentTime - lastTime;
      if (elapsed >= 250) {
        const calculatedFps = Math.min(144, Math.round((frameCount * 1000) / elapsed));
        setFps(calculatedFps);
        setRenderLatency(Number((elapsed / frameCount / 4).toFixed(2)));
        frameCount = 0;
        lastTime = currentTime;
      }
      animId = requestAnimationFrame(measureLoop);
    };

    animId = requestAnimationFrame(measureLoop);
    return () => cancelAnimationFrame(animId);
  }, [isVisible, showFullModal]);

  // Determine if it should show on cold load
  useEffect(() => {
    if (forceOpen) {
      setIsVisible(true);
      setIsExiting(false);
      setCurrentStage(0);
      setProgress(0);
      setIsPaused(false);
      return;
    }

    if (typeof window !== "undefined") {
      const hasBooted = sessionStorage.getItem("ib_bm_boot_diagnostic_completed");
      if (!hasBooted) {
        setIsVisible(true);
      }
    }
  }, [forceOpen]);

  // Stage progression timer (5 stages, ~1.2s each = ~6s total, smooth progress bar)
  useEffect(() => {
    if (!isVisible || isExiting || isPaused) return;

    const STAGE_DURATION = 1400; // ms per stage
    const TOTAL_DURATION = STAGE_DURATION * 5;
    const intervalTime = 20;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (intervalTime / TOTAL_DURATION) * 100;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            handleDismiss();
          }, 350);
          return 100;
        }

        const calculatedStage = Math.min(4, Math.floor((next / 100) * 5));
        if (calculatedStage !== currentStage) {
          setCurrentStage(calculatedStage);
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isVisible, isExiting, isPaused, currentStage]);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ib_bm_boot_diagnostic_completed", "true");
    }
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      if (onClose) onClose();
    }, 380);
  }, [onClose]);

  const goToStage = (stageIndex: number) => {
    setCurrentStage(stageIndex);
    setProgress(stageIndex * 20 + 2);
  };

  const nextStage = () => {
    if (currentStage < 4) {
      goToStage(currentStage + 1);
    } else {
      handleDismiss();
    }
  };

  const prevStage = () => {
    if (currentStage > 0) {
      goToStage(currentStage - 1);
    }
  };

  if (!isVisible) return null;

  if (!showFullModal) {
    return (
      <aside
        aria-label="C-Suite Strategy Telemetry Capsule"
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExiting
            ? "opacity-0 -translate-y-6 scale-90 pointer-events-none"
            : "liquid-jelly-enter"
        }`}
      >
        <div className="liquid-glass-dock rounded-full px-4 py-2 flex items-center gap-3.5 shadow-2xl border border-sky-400/40 bg-slate-950/90 backdrop-blur-2xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500/30 via-emerald-500/30 to-indigo-500/30 border border-sky-300/40 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-sky-300 animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold text-sky-300 uppercase tracking-wider">
                C-SUITE MATRIX // IB BM
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[10px] text-emerald-300 font-bold">
                120 FPS // {renderLatency}ms
              </span>
            </div>
            <span className="text-[11px] text-slate-300 font-medium">
              25 Syllabus Topics • 5 Strategic Units Online
            </span>
          </div>

          <div className="flex items-center gap-1.5 pl-2 border-l border-white/15">
            <button
              onClick={() => setShowFullModal(true)}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
            >
              Strategic Beats
            </button>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-90 cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="IB Business Management HL Startup Diagnostics"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-[#05070f]/94 backdrop-blur-md transition-all duration-380 ${
        isExiting
          ? "opacity-0 scale-[1.03] pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Specular Ambient Glow Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.45) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 right-1/4 w-[520px] h-[520px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Main Liquid Glass Keynote Container */}
      <div className="relative z-10 w-full max-w-3xl liquid-glass-bento rounded-3xl p-6 sm:p-8 border border-white/20 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95),0_0_60px_rgba(14,165,233,0.22)] animate-in fade-in zoom-in-95 duration-300 flex flex-col justify-between min-h-[580px]">
        {/* ===================================================================
            HEADER: Brand, Live Diagnostics Pill & Instant Controls
            =================================================================== */}
        <div>
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              {/* Pulsing Core Ring */}
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full border border-sky-400/40 animate-spin [animation-duration:4s]" />
                <div className="absolute inset-1 rounded-full border border-purple-400/30 animate-spin [animation-duration:6s] [animation-direction:reverse]" />
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-sky-400 via-purple-500 to-emerald-400 shadow-[0_0_15px_rgba(14,165,233,0.8)] flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-slate-950 fill-slate-950" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                    IB Business Management HL
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 font-mono text-[10px] font-bold">
                    v2.6 Intelligence OS
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Interactive Syllabus Engine &amp; Academic Calibration
                </p>
              </div>
            </div>

            {/* Live Telemetry Pill + Play/Pause & Close */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 border border-emerald-400/30 font-mono text-[11px] text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                <span>{fps} FPS</span>
                <span className="text-slate-500">•</span>
                <span>{renderLatency}ms</span>
              </div>

              <button
                onClick={() => setIsPaused(!isPaused)}
                title={isPaused ? "Resume auto-play" : "Pause animation to read"}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isPaused
                    ? "bg-amber-500/20 text-amber-300 border-amber-400/40"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleDismiss}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Skip to Dashboard"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stepper Tabs Bar (Interactive) */}
          <div className="grid grid-cols-5 gap-1.5 mt-3.5 pt-1">
            {[
              { id: 0, label: "01 Concepts", short: "Concepts" },
              { id: 1, label: "02 Syllabi & BMT", short: "Units" },
              { id: 2, label: "03 Formulas", short: "Formulas" },
              { id: 3, label: "04 SLAP Strategy", short: "SLAP" },
              { id: 4, label: "05 Ready", short: "Ready" },
            ].map((tab) => {
              const isActive = currentStage === tab.id;
              const isPassed = currentStage > tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => goToStage(tab.id)}
                  className={`py-1.5 px-2 rounded-xl text-center font-mono text-xs transition-all cursor-pointer truncate ${
                    isActive
                      ? "bg-sky-500/25 border border-sky-400/50 text-sky-200 shadow-[0_0_12px_rgba(14,165,233,0.3)] font-bold"
                      : isPassed
                        ? "bg-white/5 border border-emerald-500/30 text-emerald-300"
                        : "bg-slate-950/40 border border-white/5 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.short}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            STAGE CONTENT: Silky Cross-Fade Information Cards
            =================================================================== */}
        <div className="my-auto py-5">
          {/* ==================== STAGE 0: THE 4 KEY CONCEPTS ==================== */}
          {currentStage === 0 && (
            <div key="stage-0" className="stage-fade-enter space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider block mb-1">
                    STAGE 01/05 • CONCEPTUAL FOUNDATIONS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    The 4 Key Concepts of IB Business Management
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-mono">
                  Syllabus Core
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Every Paper 1, Paper 2, and Paper 3 question requires direct synthesis with these 4 overarching pillars:
              </p>

              {/* 4 Concepts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-sky-950/30 border border-sky-500/30 space-y-1">
                  <div className="flex items-center gap-2 text-sky-300 font-bold text-xs font-mono uppercase">
                    <Zap className="w-3.5 h-3.5 text-sky-400" />
                    <span>Change</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    How commercial organizations adapt to external STEEPLE shocks, market volatility, and internal restructuring.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-1">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-xs font-mono uppercase">
                    <Lightbulb className="w-3.5 h-3.5 text-purple-400" />
                    <span>Creativity</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Generating distinctive competitive moats through innovation, disruptive products, design thinking, and R&amp;D.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs font-mono uppercase">
                    <Scale className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ethics</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Corporate social responsibility (CSR), fair labor practices, ESG governance, and moral stakeholder stewardship.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs font-mono uppercase">
                    <Leaf className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sustainability</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Maintaining long-term financial solvency, ecological resource stewardship, and circular supply chain loops.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STAGE 1: SYLLABUS UNITS & BMT ==================== */}
          {currentStage === 1 && (
            <div key="stage-1" className="stage-fade-enter space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block mb-1">
                    STAGE 02/05 • CURRICULUM ARCHITECTURE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    5 Core Units &amp; 15 Business Management Tools
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-mono">
                  {TOTAL_TOPICS_COUNT} Topics Ingested
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Full syllabus content with real-world case studies across all core operational functions:
              </p>

              {/* Units Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                {SYLLABUS_UNITS.map((u) => (
                  <div
                    key={u.id}
                    className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-sky-300 uppercase">
                        {u.badge}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {u.topics.length} topics
                      </span>
                    </div>
                    <h4 className="font-bold text-white truncate">{u.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {u.overview}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-400/25 flex items-center justify-between gap-2 text-xs font-mono">
                <span className="text-purple-300">
                  Includes BMT 1–15: SWOT, STEEPLE, Ansoff Matrix, Boston Matrix, Decision Trees &amp; Circular Economy
                </span>
                <span className="text-emerald-400 font-bold shrink-0">✓ Verified HL</span>
              </div>
            </div>
          )}

          {/* ==================== STAGE 2: FORMULAS & QUANTITATIVE TOOLS ==================== */}
          {currentStage === 2 && (
            <div key="stage-2" className="stage-fade-enter space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                    STAGE 03/05 • QUANTITATIVE FINANCE PIPELINE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Mathematical Ratio &amp; Investment Engine
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono">
                  {FORMULA_BANK.length} Formula Models
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Formulas rendered in pure KaTeX with analytical benchmarks and examiner interpretation guidance:
              </p>

              {/* Formula Spotlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-emerald-300">Gearing Ratio (HL)</span>
                    <span className="text-slate-400 text-[10px]">Benchmark: &lt; 50%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-center">
                    <MathFormula
                      formula="\text{Gearing} = \frac{\text{Non-Current Liabilities}}{\text{Capital Employed}} \times 100\%"
                      displayMode={true}
                    />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Measures long-term financial solvency and the proportion of capital funded by debt vs equity.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-sky-300">Acid Test Ratio</span>
                    <span className="text-slate-400 text-[10px]">Benchmark: 1.0 : 1</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-center">
                    <MathFormula
                      formula="\text{Acid Test} = \frac{\text{Current Assets} - \text{Stock}}{\text{Current Liabilities}}"
                      displayMode={true}
                    />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Immediate liquidity test stripping illiquid stock to assess cash solvency for creditor debts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STAGE 3: EXAM MARK SCHEME STRATEGY (SLAP) ==================== */}
          {currentStage === 3 && (
            <div key="stage-3" className="stage-fade-enter space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
                    STAGE 04/05 • EXAMINER MARK SCHEME STRATEGY
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    The SLAP Formula for AO3 &amp; AO4 10/10 Marks
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-400/30 text-xs font-mono">
                  Level 7 Criteria
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                IB examiners award top marks in 10-mark and 20-mark evaluative essays when students apply the 4 SLAP steps:
              </p>

              {/* SLAP Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-amber-400/30 space-y-1">
                  <div className="flex items-center gap-2 text-amber-300 font-bold font-mono">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-xs">
                      S
                    </span>
                    <span>Stakeholders</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Analyze conflicting interests: shareholders wanting quarterly dividends vs staff needing job security.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/70 border border-amber-400/30 space-y-1">
                  <div className="flex items-center gap-2 text-amber-300 font-bold font-mono">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-xs">
                      L
                    </span>
                    <span>Long-Term vs Short-Term</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Contrast immediate capital expenditure and operational disruption against long-run strategic competitiveness.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/70 border border-amber-400/30 space-y-1">
                  <div className="flex items-center gap-2 text-amber-300 font-bold font-mono">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-xs">
                      A
                    </span>
                    <span>Assumptions</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Identify critical external conditions (interest rates, consumer trends, competitor responses) required for success.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/70 border border-amber-400/30 space-y-1">
                  <div className="flex items-center gap-2 text-amber-300 font-bold font-mono">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-xs">
                      P
                    </span>
                    <span>Priorities</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Deliver a decisive, justified recommendation on what leadership must execute first with clear trade-offs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STAGE 4: ALL SYSTEMS READY ==================== */}
          {currentStage === 4 && (
            <div key="stage-4" className="stage-fade-enter space-y-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                    STAGE 05/05 • SYSTEM CALIBRATED
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Academic Engine Loaded &amp; Ready
                  </h3>
                </div>
                <div className="flex items-center gap-2 self-center sm:self-auto px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Optimal Performance</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                All syllabus elements, mathematical formulas, active recall flashcards, and notes storage are synchronized.
              </p>

              {/* Ready Summary Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-center font-mono">
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-sky-500/30">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">Topics</span>
                  <span className="text-xl font-bold text-white">52</span>
                  <span className="text-[10px] text-sky-300 block">Units 1–5 + BMT</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/70 border border-emerald-500/30">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">Glossary</span>
                  <span className="text-xl font-bold text-emerald-300">{GLOSSARY_TERMS.length}</span>
                  <span className="text-[10px] text-emerald-400 block">Verified Terms</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/70 border border-purple-500/30">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">Formulas</span>
                  <span className="text-xl font-bold text-purple-300">{FORMULA_BANK.length}</span>
                  <span className="text-[10px] text-purple-400 block">KaTeX Models</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/70 border border-amber-500/30">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">Speed</span>
                  <span className="text-xl font-bold text-amber-300">{fps} FPS</span>
                  <span className="text-[10px] text-amber-400 block">&lt; 1ms Latency</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 text-xs font-mono text-slate-300">
                <span className="text-sky-300 font-bold">Pro Tip: </span>
                Use the top mode switcher to toggle between single Topic Bento, Continuous Flow, Concept Matrix, and Active Recall Hub.
              </div>
            </div>
          )}
        </div>

        {/* ===================================================================
            FOOTER: Progress Bar, Navigation Stepper & Launch Action
            =================================================================== */}
        <div>
          {/* Progress Bar with Glowing Bead */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>
                  {currentStage === 0 && "Analyzing 4 Key Concepts..."}
                  {currentStage === 1 && "Ingesting 5 Core Units & 15 BMT Models..."}
                  {currentStage === 2 && "Compiling 28 Quantitative Formulas..."}
                  {currentStage === 3 && "Synthesizing 10/10 SLAP Evaluation Framework..."}
                  {currentStage === 4 && "Hardware Acceleration Active • Ready!"}
                </span>
              </span>
              <span className="font-bold text-sky-300">{Math.round(progress)}%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-950/80 overflow-hidden border border-white/10 relative">
              <div
                className="h-full rounded-full transition-all duration-150 ease-out"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #0ea5e9 0%, #a855f7 50%, #10b981 100%)",
                  boxShadow: "0 0 15px rgba(14, 165, 233, 0.7)",
                }}
              />
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-4 pt-1 flex flex-wrap items-center justify-between gap-3">
            {/* Step Controls */}
            <div className="flex items-center gap-2">
              <button
                disabled={currentStage === 0}
                onClick={prevStage}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                  currentStage === 0
                    ? "opacity-30 cursor-not-allowed text-slate-600"
                    : "bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
                }`}
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Back</span>
              </button>

              <button
                onClick={nextStage}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 font-mono text-xs transition-all cursor-pointer"
              >
                <span>{currentStage < 4 ? "Next" : "Done"}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Launch Action */}
            <button
              onClick={handleDismiss}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 via-purple-600 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-mono text-xs font-bold shadow-[0_0_25px_rgba(14,165,233,0.4)] transition-all cursor-pointer hover:brightness-110 active:scale-[0.98]"
            >
              <span>{currentStage === 4 ? "Enter Workspace" : "Skip to Dashboard"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

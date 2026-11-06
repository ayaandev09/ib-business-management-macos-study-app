"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Zap,
  BookOpen,
  LayoutGrid,
  FileText,
  Boxes,
  HelpCircle,
  Search,
  PanelLeft,
  Briefcase,
  Timer,
  CheckCircle2,
  Layers,
  GraduationCap,
  Sliders,
  Laptop,
} from "lucide-react";
import { IBBusinessAppLogo } from "./IBBusinessAppLogo";

interface ImmersiveAppWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGoal?: (goal: "learn" | "revise") => void;
}

export function ImmersiveAppWalkthrough({
  isOpen,
  onClose,
  onSelectGoal,
}: ImmersiveAppWalkthroughProps) {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [chosenGoal, setChosenGoal] = useState<"learn" | "revise">("learn");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard navigation: Left/Right arrows, Enter, Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleFinish();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleBack();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentStep === 4) {
          handleFinish();
        } else {
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStep, chosenGoal]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleFinish = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenAppWalkthrough_bm_v1", "true");
    }
    if (onSelectGoal) {
      onSelectGoal(chosenGoal);
    }
    onClose();
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto select-none"
        onClick={handleFinish}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl rounded-3xl p-6 sm:p-9 border border-emerald-400/30 bg-gradient-to-b from-slate-900/95 via-slate-950/98 to-black text-white shadow-2xl overflow-hidden flex flex-col min-h-[580px] justify-between"
          style={{
            boxShadow: "0 25px 60px -15px rgba(16, 185, 129, 0.25), 0 0 0 1px rgba(255,255,255,0.1) inset",
          }}
        >
          {/* Top Animated Progress Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
            <motion.div
              animate={{ width: `${((currentStep + 1) / 5) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
            />
          </div>

          {/* Ambient Specular Neon Ambient Glows */}
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-25 bg-emerald-500 animate-aurora-slow-1" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-25 bg-cyan-500 animate-aurora-slow-2" />

          {/* Modal Top Header & Step Indicator */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <Compass className="w-4 h-4 animate-spin-slow" />
              </span>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase block">
                  MAC NATIVE ONBOARDING // TOUR
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  C-Suite Matrix • Interactive App Walkthrough
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Step indicator pills */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-slate-400">
                <span className="text-emerald-300 font-bold">Step {currentStep + 1}</span>
                <span>/</span>
                <span>5</span>
              </div>

              <button
                onClick={handleFinish}
                title="Skip Walkthrough (Esc)"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Step Body Content with Smooth Slide Transitions */}
          <div className="my-auto py-5">
            <AnimatePresence mode="wait">
              {/* SLIDE 0: Welcome & Core Architecture */}
              {currentStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400/30 via-cyan-500/20 to-emerald-600/30 border border-emerald-400/50 flex items-center justify-center p-3 shadow-2xl overflow-hidden relative">
                      <IBBusinessAppLogo className="w-full h-full object-contain" />
                    </div>
                    <div className="absolute -inset-2 rounded-3xl bg-emerald-500/20 blur-xl -z-10 animate-pulse" />
                  </div>

                  <div className="space-y-1.5 max-w-lg">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Welcome to <span className="text-emerald-400">C-Suite Matrix</span>
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      The flagship native macOS study dashboard crafted for International Baccalaureate (IB) Diploma Business Management students (SL & HL).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl text-left pt-2">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                        <Zap className="w-3.5 h-3.5 text-emerald-400" /> 120 FPS Native
                      </span>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        AppKit liquid glass shell with silky hardware-accelerated responsiveness.
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                        <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> 2024–2026 Core
                      </span>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        52 syllabus modules, 15 BMT toolkit models, and corporate case anchors.
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                        <Laptop className="w-3.5 h-3.5 text-amber-400" /> On-Device Private
                      </span>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        Persistent local state and zero-lag live macOS desktop widgets.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 1: 5 Symmetrical Modalities */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                      FIVE INTEGRATED SECTIONS
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Tailored Modalities for Every Revision Goal
                    </h3>
                    <p className="text-xs text-slate-300 max-w-lg mx-auto">
                      Switch instantly between 5 dedicated view formats using the top command bar or numeric shortcuts.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-emerald-400/40 transition-colors">
                      <div className="space-y-1.5">
                        <LayoutGrid className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white block">1. Bento</span>
                        <p className="text-[10px] text-slate-400 leading-snug">
                          Command center with mastery ring, unit tree, and corporate anchors.
                        </p>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400/80 mt-2">Default</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-emerald-400/40 transition-colors">
                      <div className="space-y-1.5">
                        <FileText className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-white block">2. Stream</span>
                        <p className="text-[10px] text-slate-400 leading-snug">
                          Uninterrupted vertical reading stream with live margin annotations.
                        </p>
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400/80 mt-2">⌘ + 1</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-emerald-400/40 transition-colors">
                      <div className="space-y-1.5">
                        <Boxes className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-white block">3. Matrix</span>
                        <p className="text-[10px] text-slate-400 leading-snug">
                          Analytical grid of 4 Key Concepts & 15 BMT tool deep dives.
                        </p>
                      </div>
                      <span className="text-[9px] font-mono text-purple-400/80 mt-2">Synthesis</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-emerald-400/40 transition-colors">
                      <div className="space-y-1.5">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-white block">4. Revision</span>
                        <p className="text-[10px] text-slate-400 leading-snug">
                          Active recall flashcards with 3D flips and Leitner spaced memory.
                        </p>
                      </div>
                      <span className="text-[9px] font-mono text-amber-400/80 mt-2">⌘ + 2</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-emerald-400/40 transition-colors">
                      <div className="space-y-1.5">
                        <HelpCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white block">5. Glossary</span>
                        <p className="text-[10px] text-slate-400 leading-snug">
                          Financial formula vault with quantitative step calculations.
                        </p>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400/80 mt-2">Reference</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 2: Pro Shortcuts & Ergonomics */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                      ERGONOMICS & HOTKEYS
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Designed for Lightning-Fast Keyboard Mastery
                    </h3>
                    <p className="text-xs text-slate-300 max-w-lg mx-auto">
                      Navigate the entire syllabus without taking your hands off the keyboard.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                          <Search className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <span className="text-xs font-bold text-white block">Global Jelly Spotlight</span>
                          <span className="text-[10px] text-slate-400">Fuzzy search all formulas, modules, and cases</span>
                        </div>
                      </div>
                      <kbd className="px-2 py-1 rounded-lg bg-black/60 border border-white/15 text-xs font-mono font-bold text-emerald-300">
                        ⌘ + K
                      </kbd>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                          <PanelLeft className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <span className="text-xs font-bold text-white block">Sidebar Drawer Toggle</span>
                          <span className="text-[10px] text-slate-400">Maximize wide screen reading canvas</span>
                        </div>
                      </div>
                      <kbd className="px-2 py-1 rounded-lg bg-black/60 border border-white/15 text-xs font-mono font-bold text-cyan-300">
                        ⌘ + B
                      </kbd>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                          <Briefcase className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <span className="text-xs font-bold text-white block">Analytical Inspector</span>
                          <span className="text-[10px] text-slate-400">Live syllabus weights & examiner tips</span>
                        </div>
                      </div>
                      <kbd className="px-2 py-1 rounded-lg bg-black/60 border border-white/15 text-xs font-mono font-bold text-purple-300">
                        ⌘ + I
                      </kbd>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                          <Timer className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <span className="text-xs font-bold text-white block">Timed Exam Sprint</span>
                          <span className="text-[10px] text-slate-400">5m, 15m, 45m timed essay drills</span>
                        </div>
                      </div>
                      <kbd className="px-2 py-1 rounded-lg bg-black/60 border border-white/15 text-xs font-mono font-bold text-amber-300">
                        ⌘ + E
                      </kbd>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 3: Live Desktop Widgets */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                      MACOS WIDGETKIT INTEGRATION
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Live Revision On Your Mac Desktop
                    </h3>
                    <p className="text-xs text-slate-300 max-w-lg mx-auto">
                      Keep syllabus mastery top-of-mind even when the main app is closed.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Small (2x2)</span>
                        <h4 className="text-xs font-bold text-white mt-1">Daily Streak & Formula</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                          Shows current active streak, mastery percentage, and daily rotating BMT tool.
                        </p>
                      </div>
                      <div className="mt-3 p-2 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                        <span className="text-base">🔥</span>
                        <div className="text-[10px] leading-tight">
                          <span className="font-bold text-white block">5-Day Active Streak</span>
                          <span className="text-emerald-400">Break-Even Analysis</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Medium (4x2)</span>
                        <h4 className="text-xs font-bold text-white mt-1">Unit Progress Bar</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                          Live progress tracker across Unit 1–5 with instant one-click jump to next topic.
                        </p>
                      </div>
                      <div className="mt-3 p-2 rounded-xl bg-black/40 border border-white/10">
                        <div className="flex justify-between text-[10px] text-slate-300 mb-1">
                          <span>Unit 3: Finance</span>
                          <span className="font-mono text-cyan-400 font-bold">64%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-cyan-400 rounded-full w-[64%]" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Large (4x4)</span>
                        <h4 className="text-xs font-bold text-white mt-1">C-Suite Command Panel</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                          Full 5-unit syllabus radar, scheduled recall cards, and exam sprint launcher.
                        </p>
                      </div>
                      <div className="mt-3 p-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-[10px]">
                        <span className="text-purple-300 font-bold">All 5 Units Synced</span>
                        <span className="font-mono text-slate-400">0% Cloud Lag</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 4: Choose Focus & Launch */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                      SELECT YOUR INITIAL POSTURE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      How Would You Like to Start Today?
                    </h3>
                    <p className="text-xs text-slate-300 max-w-lg mx-auto">
                      Choose your learning objective. You can effortlessly switch modes anytime from the top bar.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setChosenGoal("learn")}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        chosenGoal === "learn"
                          ? "bg-emerald-500/20 border-emerald-400/80 shadow-lg ring-1 ring-emerald-400/40"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <BookOpen className="w-5 h-5 text-emerald-400" />
                          {chosenGoal === "learn" && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-white">Guided Deep Study</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Comprehensive module breakdowns, structured case study readings, and step-by-step financial formula derivations.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold mt-3">
                        Ideal for first-time syllabus coverage
                      </span>
                    </button>

                    <button
                      onClick={() => setChosenGoal("revise")}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        chosenGoal === "revise"
                          ? "bg-amber-500/20 border-amber-400/80 shadow-lg ring-1 ring-amber-400/40"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Zap className="w-5 h-5 text-amber-400" />
                          {chosenGoal === "revise" && (
                            <CheckCircle2 className="w-4 h-4 text-amber-300" />
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-white">Exam Revision & Cram</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Rapid-fire active recall flashcards, BMT tool evaluation traps, and timed Paper 1/2/3 exam planning drills.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold mt-3">
                        Ideal for mock exam & test cramming
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Modal Bottom Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 shrink-0">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentStep === 0
                  ? "opacity-30 cursor-not-allowed text-slate-500"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer border border-white/10"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {/* Step navigation dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((stepIdx) => (
                <button
                  key={stepIdx}
                  onClick={() => setCurrentStep(stepIdx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentStep === stepIdx
                      ? "w-6 bg-emerald-400 shadow-sm"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer shadow-lg hover:shadow-emerald-500/30"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 transition-all cursor-pointer shadow-xl hover:shadow-emerald-500/40 transform hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enter C-Suite Matrix</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}

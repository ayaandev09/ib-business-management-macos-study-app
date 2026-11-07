"use client";

import React, { useMemo, useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { AmbientAuroraCanvas } from "@/components/AmbientAuroraCanvas";
import { FloatingSidebar } from "@/components/FloatingSidebar";
import { TopCommandBar } from "@/components/TopCommandBar";
import { WidgetBridge } from "@/components/WidgetBridge";
import { StudyMiniHomepage } from "@/components/StudyMiniHomepage";
import { CuegisSandbox } from "@/components/CuegisSandbox";
import { TopicBentoCard } from "@/components/TopicBentoCard";
import { ThemeMatrixView } from "@/components/ThemeMatrixView";
import { LexiconDossierView } from "@/components/LexiconDossierView";
import { ActiveRecallRevisionView } from "@/components/ActiveRecallRevisionView";
import { FloatingBottomDock } from "@/components/FloatingBottomDock";
import { StartupDiagnosticsOverlay } from "@/components/StartupDiagnosticsOverlay";
import { CinematicStartupIntro } from "@/components/CinematicStartupIntro";
import { ImmersiveAppWalkthrough } from "@/components/ImmersiveAppWalkthrough";
import { BusinessRightInspector } from "@/components/BusinessRightInspector";
import { TimedExamSprintModal } from "@/components/TimedExamSprintModal";
import { LiveDiagnosticsModal } from "@/components/LiveDiagnosticsModal";
import { JellySpotlightModal } from "@/components/JellySpotlightModal";
import { ChromaticButton } from "@/components/chromatic-button";
import { ALL_TOPICS, SYLLABUS_UNITS, UnitId } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import {
  initLiveSyncConnection,
  decodeSyncFromUrl,
  pullSyncFromServer,
} from "@/lib/syncService";
import { initGlobalTactileListener } from "@/lib/tactileHaptics";
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Monitor,
  Sparkles,
  Layers,
  SearchX,
  X,
} from "lucide-react";

export default function IBBusinessManagementStudyDashboardPage() {
  const {
    activeTopicId,
    setActiveTopic,
    viewMode,
    searchQuery,
    setSearchQuery,
    activeUnitFilter,
    setActiveUnitFilter,
    deviceMode,
    setDeviceMode,
    completedTopics,
    toggleTopicComplete,
    goToNextTopic,
    academicStyle,
    handwrittenStyle,
    syncToastMessage,
    setSyncToastMessage,
    hydrateFromSyncPayload,
    isInspectorOpen,
    toggleInspector,
    isExamSprintActive,
    closeExamSprint,
    toggleExamSprint,
    isSpotlightOpen,
    closeSpotlight,
    setStudyGoal,
  } = useStudyStore();

  const [isStartupActive, setIsStartupActive] = useState(true);
  const [showMainUI, setShowMainUI] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  const handleStartupComplete = useCallback(() => {
    setIsStartupActive(false);
    setShowMainUI(true);
    if (typeof window !== "undefined") {
      const hasSeen = localStorage.getItem("hasSeenAppWalkthrough_bm_v1");
      if (!hasSeen) {
        setIsWalkthroughOpen(true);
      }
    }
  }, []);

  const [liveDiagOpen, setLiveDiagOpen] = useState(false);
  const [forceStartupDiag, setForceStartupDiag] = useState(false);

  // Synchronize universal academic professional font attribute (Oxford / Garamond / Jakarta)
  useEffect(() => {
    if (typeof document !== "undefined") {
      const activeFont = academicStyle || handwrittenStyle || "newsreader";
      document.documentElement.setAttribute("data-academic-font", activeFont);
      document.documentElement.setAttribute("data-handwritten-style", activeFont);
    }
  }, [academicStyle, handwrittenStyle]);

  // Activate universal tactile mechanical feedback on buttons
  useEffect(() => {
    const cleanup = initGlobalTactileListener();
    return cleanup;
  }, []);

  // Global Keyboard Shortcut: Cmd/Ctrl + I to toggle Analytical Inspector, Cmd/Ctrl + E to toggle Exam Sprint
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
        e.preventDefault();
        toggleInspector();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "e") {
        e.preventDefault();
        toggleExamSprint();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleInspector, toggleExamSprint]);

  // Live Sync connection
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const syncId = params.get("syncId") || params.get("sync");

      // Fetch live sync if sync parameter provided
      if (syncId) {
        const decoded = decodeSyncFromUrl(syncId);
        if (decoded) {
          hydrateFromSyncPayload(decoded as any);
        } else {
          pullSyncFromServer().then((remote) => {
            if (remote) hydrateFromSyncPayload(remote as any);
          });
        }
      } else {
        pullSyncFromServer().then((remote) => {
          if (remote) hydrateFromSyncPayload(remote as any);
        });
      }
    }

    const disconnectSync = initLiveSyncConnection((incoming) => {
      hydrateFromSyncPayload(incoming as any);
    });

    return () => {
      disconnectSync();
    };
  }, [hydrateFromSyncPayload]);

  // Auto-dismiss sync toast after 4s
  useEffect(() => {
    if (syncToastMessage) {
      const timer = setTimeout(() => {
        setSyncToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [syncToastMessage, setSyncToastMessage]);

  const activeTopic = useMemo(
    () => ALL_TOPICS.find((t) => t.id === activeTopicId) || ALL_TOPICS[0],
    [activeTopicId]
  );

  const activeUnit = useMemo(
    () =>
      SYLLABUS_UNITS.find((u) => u.id === activeTopic.unitId) ||
      SYLLABUS_UNITS[0],
    [activeTopic.unitId]
  );

  const currentTopicIndex = useMemo(
    () => ALL_TOPICS.findIndex((t) => t.id === activeTopic.id),
    [activeTopic.id]
  );

  const nextTopic = useMemo(
    () =>
      currentTopicIndex >= 0 && currentTopicIndex < ALL_TOPICS.length - 1
        ? ALL_TOPICS[currentTopicIndex + 1]
        : null,
    [currentTopicIndex]
  );

  const filteredTopics = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_TOPICS.filter((t) => {
      // Global search across all units when query is active
      if (!q && activeUnitFilter !== "all" && t.unitId !== activeUnitFilter) {
        return false;
      }
      if (!q) return true;

      const inHeader =
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.displayCode.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.syllabusRef.toLowerCase().includes(q);

      const inBullets = t.speedReadBullets.some((b) =>
        b.toLowerCase().includes(q)
      );
      const inSubsections = t.subSections.some(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.content.toLowerCase().includes(q) ||
          s.analyticalTakeaway.toLowerCase().includes(q)
      );
      const inCases = t.cases.some(
        (cs) =>
          cs.company.toLowerCase().includes(q) ||
          cs.application.toLowerCase().includes(q) ||
          cs.context.toLowerCase().includes(q)
      );

      return inHeader || inBullets || inSubsections || inCases;
    });
  }, [searchQuery, activeUnitFilter]);

  // When searching in focus mode, automatically sync active topic to first search match
  useEffect(() => {
    if (searchQuery.trim() && filteredTopics.length > 0) {
      if (!filteredTopics.some((t) => t.id === activeTopicId)) {
        setActiveTopic(filteredTopics[0].id);
      }
    }
  }, [searchQuery, filteredTopics, activeTopicId, setActiveTopic]);

  return (
    <>
      {/* 1. Bulletproof Zero-Latency Liquid Glass Startup Animation */}
      <AnimatePresence>
        {isStartupActive && (
          <CinematicStartupIntro
            isOpen={isStartupActive}
            onClose={handleStartupComplete}
            onComplete={handleStartupComplete}
          />
        )}
      </AnimatePresence>

      {/* 2. Main Study Dashboard - Buttery Liquid Glass reveal into main view */}
      <div
        className={`mac-dashboard-shell transition-opacity duration-700 ease-out ${
          showMainUI
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none select-none"
        }`}
      >
        <AmbientAuroraCanvas />
        {/* Live Sync Toast Banner */}
      {syncToastMessage && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-[92%] px-4 py-2.5 rounded-full bg-emerald-500/25 border border-emerald-400/50 text-emerald-200 backdrop-blur-2xl shadow-2xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{syncToastMessage}</span>
          <button
            onClick={() => setSyncToastMessage(null)}
            className="ml-1 p-0.5 rounded text-emerald-300 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =====================================================================
          MAIN SHELL CONTAINER (MAC WIDESCREEN DASHBOARD)
          ===================================================================== */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row gap-4 xl:gap-5 items-start">
        {/* Left Floating Sidebar */}
        <FloatingSidebar isMobileSheet={false} />

        {/* Right Main Content Workspace */}
        <main className="flex-1 min-w-0 w-full pb-36">
          {/* Top Command & View Switcher Long Bar */}
          <WidgetBridge />
          <TopCommandBar
            onOpenDiagnostics={() => setLiveDiagOpen(true)}
            onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
          />

          {/* Mini Homepage & Live Widget Telemetry Hub */}
          <StudyMiniHomepage />

          {/* =====================================================================
              BUTTER-SMOOTH VIEW CONTENT WORKSPACE
              ===================================================================== */}
          <div key={viewMode} className="liquid-view-enter">
            {/* ==================== VIEW 1: FOCUS TOPIC BENTO ==================== */}
            {viewMode === "focus" && (
              <div className="space-y-4">
                {/* Syllabus Unit Context Banner - 100% Full-Width Bulletproof Native Card */}
                <div className="liquid-glass-bento rounded-3xl p-5 mb-5 border border-white/15 shadow-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-300">
                      <BookOpen className="w-4 h-4 shrink-0 text-sky-400" />
                      <span className="font-bold text-sm text-white">{activeUnit.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-400/15 text-sky-300 border border-sky-400/30">
                        {activeUnit.badge}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-300 border border-white/10 bg-white/5">
                        {activeUnit.topics.length} Topics
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed w-full">
                    {activeUnit.overview}
                  </p>
                </div>

                {/* Active Topic Bento Grid with Buttery Smooth Swap */}
                <div key={activeTopic.id} data-tour="study-bento" className="liquid-chapter-swap">
                  <TopicBentoCard
                    topic={activeTopic}
                    isDeferred={false}
                    showPrevNextControls={true}
                  />
                </div>

                {/* Seamless Next-Topic Speed-Read Transition Footer */}
                {nextTopic && (
                  <div className="liquid-glass-bento rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Up Next in Your Speed-Read Queue
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white">
                        {nextTopic.displayCode}: {nextTopic.title}
                      </div>
                      <div className="text-xs text-sky-300">
                        {nextTopic.subtitle}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <ChromaticButton
                        onClick={() => {
                          if (!completedTopics[activeTopic.id]) {
                            toggleTopicComplete(activeTopic.id);
                          }
                          goToNextTopic();
                          window.scrollTo(0, 0);
                        }}
                        color="#00802f"
                        colorMode="spectrum"
                        speed={0.7}
                        paused={false}
                        phase={0}
                        feather={100}
                        projectionScale={174.7}
                        intensity={1.4}
                        grain={0.105}
                        seed={7}
                        borderRadius={50}
                        hoverEffect="brighten"
                        entrance="blur-up"
                        entranceSpeed={1}
                        entranceBlur={10}
                        entranceDistance={20}
                        entranceScale={0.65}
                        className="!min-w-[240px] !h-12 !px-6 !text-xs font-bold shadow-xl cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-300 mr-2" />
                        <span>Complete {activeTopic.displayCode} &amp; Continue</span>
                        <ArrowRight className="w-4 h-4 text-white ml-2" />
                      </ChromaticButton>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==================== VIEW 2: CONTINUOUS FLOW STREAM ==================== */}
            {viewMode === "stream" && (
              <div className="space-y-6">
                {/* Unit Filter Bar */}
                <div className="liquid-glass-bento rounded-3xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-sky-400" />
                      Continuous Flow Stream ({filteredTopics.length} Topics)
                    </h2>
                    <p className="text-xs text-slate-400">
                      All syllabus topics rendered in a continuous feed with WebKit GPU &amp;{" "}
                      <code className="text-sky-300">content-visibility: auto</code>{" "}
                      optimization.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {(
                      [
                        { id: "all", label: "All Units (52)" },
                        { id: "unit-1", label: "Unit 1 (6)" },
                        { id: "unit-2", label: "Unit 2 (7)" },
                        { id: "unit-3", label: "Unit 3 (9)" },
                        { id: "unit-4", label: "Unit 4 (6)" },
                        { id: "unit-5", label: "Unit 5 (9)" },
                        { id: "bmt", label: "Toolkit (15)" },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveUnitFilter(tab.id as UnitId | "all")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                          activeUnitFilter === tab.id
                            ? "bg-sky-500/30 text-white border border-sky-400/50"
                            : "liquid-glass-pill text-slate-300 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Render Topic Bento Cards */}
                {filteredTopics.length === 0 ? (
                  <div className="liquid-glass-bento rounded-3xl p-10 text-center">
                    <SearchX className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                    <p className="text-base font-semibold text-white mb-1">
                      No topics matched &ldquo;{searchQuery}&rdquo;
                    </p>
                    <p className="text-xs text-slate-400 mb-4">
                      Try searching for &ldquo;Ansoff&rdquo;, &ldquo;Break-Even&rdquo;,
                      &ldquo;Cash Flow&rdquo;, or &ldquo;Critical Path&rdquo;.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveUnitFilter("all");
                      }}
                      className="liquid-glass-pill px-4 py-2 rounded-xl text-xs font-mono text-sky-300 cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  filteredTopics.map((t, idx) => (
                    <TopicBentoCard
                      key={t.id}
                      topic={t}
                      isDeferred={idx > 0}
                      showPrevNextControls={false}
                    />
                  ))
                )}
              </div>
            )}

            {/* ==================== VIEW 3: CONCEPT & BMT MATRIX ==================== */}
            {viewMode === "matrix" && (
              <div className="space-y-5">
                <ThemeMatrixView />
                <CuegisSandbox />
              </div>
            )}

            {/* ==================== VIEW 4: GLOSSARY, FORMULAS & THEORISTS ==================== */}
            {viewMode === "lexicon" && <LexiconDossierView />}

            {/* ==================== VIEW 5: ACTIVE RECALL REVISION & EXAM HUB ==================== */}
            {viewMode === "revision" && <ActiveRecallRevisionView />}
          </div>
        </main>

        {/* Right Sticky Liquid Glass Analytical Inspector */}
        <BusinessRightInspector
          topic={activeTopic}
          isOpen={isInspectorOpen}
          onToggle={toggleInspector}
        />
      </div>



      {/* =====================================================================
          STARTUP DIAGNOSTICS & TELEMETRY OVERLAY
          ===================================================================== */}
      <StartupDiagnosticsOverlay
        forceOpen={forceStartupDiag}
        onClose={() => setForceStartupDiag(false)}
      />

      {/* =====================================================================
          PERSISTENT LIVE SYSTEM DIAGNOSTICS MODAL
          ===================================================================== */}
      <LiveDiagnosticsModal
        isOpen={liveDiagOpen}
        onClose={() => setLiveDiagOpen(false)}
        onRebootDiagnostics={() => setForceStartupDiag(true)}
      />
    </div>

    {/* Timed Exam Sprint Full-Screen Simulation Modal */}
    <TimedExamSprintModal
      isOpen={isExamSprintActive}
      onClose={closeExamSprint}
      topic={activeTopic}
    />

    {/* Flagship Spacious Jelly Spotlight Command Palette */}
    <JellySpotlightModal
      isOpen={isSpotlightOpen}
      onClose={closeSpotlight}
    />

    {/* Immersive Onboarding Walkthrough Tour */}
    <ImmersiveAppWalkthrough
      isOpen={isWalkthroughOpen}
      onClose={() => setIsWalkthroughOpen(false)}
      onSelectGoal={(goal) => setStudyGoal(goal)}
      isInspectorOpen={isInspectorOpen}
      onOpenInspector={() => {
        if (!isInspectorOpen) toggleInspector();
      }}
    />
    </>
  );
}

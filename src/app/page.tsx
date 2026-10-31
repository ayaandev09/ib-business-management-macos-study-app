"use client";

import React, { useMemo, useEffect } from "react";
import { FloatingSidebar } from "@/components/FloatingSidebar";
import { TopCommandBar } from "@/components/TopCommandBar";
import { TopicBentoCard } from "@/components/TopicBentoCard";
import { ThemeMatrixView } from "@/components/ThemeMatrixView";
import { LexiconDossierView } from "@/components/LexiconDossierView";
import { FloatingBottomDock } from "@/components/FloatingBottomDock";
import { IPhone16eShell } from "@/components/IPhone16eShell";
import { ALL_TOPICS, SYLLABUS_UNITS, UnitId } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { Sparkles, Layers, SearchX } from "lucide-react";

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
  } = useStudyStore();

  // Detect URL parameter ?view=mac or ?view=iphone
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get("view");
      if (viewParam === "mac") {
        setDeviceMode("mac");
      } else if (viewParam === "iphone" || viewParam === "iphone16e") {
        setDeviceMode("iphone16e");
      }
    }
  }, [setDeviceMode]);

  const activeTopic = useMemo(
    () => ALL_TOPICS.find((t) => t.id === activeTopicId) || ALL_TOPICS[0],
    [activeTopicId]
  );

  const filteredTopics = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_TOPICS.filter((t) => {
      const matchesUnit =
        activeUnitFilter === "all" || t.unitId === activeUnitFilter;
      if (!matchesUnit) return false;
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

  // If in iPhone 16e device mode, render the dedicated mobile shell
  if (deviceMode === "iphone16e") {
    return <IPhone16eShell />;
  }

  return (
    <div className="relative min-h-screen pb-28">
      {/* =====================================================================
          AMBIENT LIQUID GLASS LIGHT BLOBS
          ===================================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute -top-40 left-1/4 w-[650px] h-[650px] rounded-full blur-[150px] opacity-20"
          style={{
            background: "radial-gradient(circle, #0ea5e9, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20"
          style={{
            background: "radial-gradient(circle, #a855f7, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-48 left-1/3 w-[700px] h-[700px] rounded-full blur-[170px] opacity-15"
          style={{
            background: "radial-gradient(circle, #10b981, transparent 70%)",
          }}
        />
      </div>

      {/* =====================================================================
          MAIN LIQUID GLASS SHELL WORKSPACE (MAC DESKTOP)
          ===================================================================== */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Left Sticky Liquid Glass Navigation Sidebar */}
          <FloatingSidebar />

          {/* Main Content Column */}
          <main className="flex-1 min-w-0 w-full">
            <TopCommandBar />

            {/* If user is actively typing a search query while in single Bento mode, show matching scene pills */}
            {searchQuery.trim() && viewMode === "focus" && (
              <div className="liquid-glass-bento rounded-2xl p-4 mb-5 border border-sky-400/30">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="font-mono text-xs text-sky-300 flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Search Matches Across All 52 Topics ({filteredTopics.length})
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Click a pill to jump
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {filteredTopics.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTopic(t.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        t.id === activeTopicId
                          ? "bg-sky-400 text-slate-950 font-bold"
                          : "liquid-glass-pill text-slate-300 hover:text-white"
                      }`}
                    >
                      {t.displayCode}: {t.title.split(":")[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                MODE 1: FOCUS / BENTO CARD VIEW (FLAGSHIP)
                =============================================================== */}
            {viewMode === "focus" && (
              <TopicBentoCard topic={activeTopic} />
            )}

            {/* ===============================================================
                MODE 2: CONTINUOUS FLOW / STREAM VIEW
                =============================================================== */}
            {viewMode === "stream" && (
              <div className="space-y-6">
                {/* Stream Header & Unit Filter Pills */}
                <div className="liquid-glass-bento rounded-3xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-sky-400" />
                        Continuous Flow Stream ({filteredTopics.length} Topics)
                      </h2>
                      <p className="text-xs text-slate-400">
                        Smooth vertical feed of all IB Business Management HL topics and toolkit models.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {(
                        [
                          { id: "all", label: "All Units (52)" },
                          { id: "unit-1", label: "Unit 1 (6)" },
                          { id: "unit-2", label: "Unit 2 (7)" },
                          { id: "unit-3", label: "Unit 3 (9)" },
                          { id: "unit-4", label: "Unit 4 (6)" },
                          { id: "unit-5", label: "Unit 5 (9)" },
                          { id: "bmt", label: "Toolkit (15)" },
                        ] as { id: UnitId | "all"; label: string }[]
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveUnitFilter(tab.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                            activeUnitFilter === tab.id
                              ? "liquid-glass-pill-active text-white"
                              : "liquid-glass-pill text-slate-300"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Units Overviews Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {SYLLABUS_UNITS.map((u) => (
                      <div
                        key={u.id}
                        className="p-3.5 rounded-2xl bg-slate-950/55 border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[11px] font-bold text-sky-300 uppercase">
                            {u.badge}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            {u.topics.length} Topics
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-white mb-1 line-clamp-1">
                          {u.title}
                        </p>
                        <p className="text-[11px] text-slate-300 leading-relaxed mb-2 line-clamp-3">
                          {u.overview}
                        </p>
                        <p className="text-[10px] font-mono text-purple-300/90 line-clamp-1">
                          {u.strategicArc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Matching Topic Cards */}
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((t, idx) => (
                    <TopicBentoCard
                      key={t.id}
                      topic={t}
                      isDeferred={idx > 0}
                    />
                  ))
                ) : (
                  <div className="liquid-glass-bento rounded-3xl p-12 text-center">
                    <SearchX className="w-8 h-8 text-rose-400 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-white mb-1">
                      No Topics Match Your Filter
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      Try clearing your search query or switching back to All Units.
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
                )}
              </div>
            )}

            {/* ===============================================================
                MODE 3: CONCEPT & BMT MATRIX VIEW
                =============================================================== */}
            {viewMode === "matrix" && <ThemeMatrixView />}

            {/* ===============================================================
                MODE 4: FORMULAS, THEORISTS & GLOSSARY DOSSIER
                =============================================================== */}
            {viewMode === "lexicon" && <LexiconDossierView />}
          </main>
        </div>
      </div>

      {/* =====================================================================
          FLOATING LIQUID GLASS BOTTOM DOCK
          ===================================================================== */}
      <FloatingBottomDock />
    </div>
  );
}

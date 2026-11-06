"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  ArrowRight,
  Briefcase,
  Layers,
  Sparkles,
  Building2,
  Wrench,
  Compass,
  CornerDownLeft,
} from "lucide-react";
import { searchBusinessCodex, SearchFilterTab, SearchResultItem } from "@/lib/searchEngine";
import { useStudyStore } from "@/store/useStudyStore";

interface JellySpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FEATURED_QUICK_JUMPS = [
  { id: "bmt-1", code: "BMT 1", title: "SWOT Analysis", tag: "Strategic Audit" },
  { id: "bmt-2", code: "BMT 2", title: "Ansoff Matrix", tag: "Growth Vector" },
  { id: "bmt-4", code: "BMT 4", title: "BCG Matrix Portfolio", tag: "Portfolio Analysis" },
  { id: "topic-1-1", code: "U1.1", title: "Inputs, Functions & Enterprise (Tesla)", tag: "Foundation" },
  { id: "topic-3-5", code: "U3.5", title: "Break-Even & Margin of Safety", tag: "Financial Model" },
  { id: "topic-2-4", code: "U2.4", title: "Motivation Theories (Taylor, Maslow, Pink)", tag: "HR Management" },
  { id: "topic-4-4", code: "U4.4", title: "Market Research & Sampling Methods", tag: "Marketing" },
  { id: "bmt-9", code: "BMT 9", title: "Decision Trees & Expected Value", tag: "HL Quantitative" },
];

export const JellySpotlightModal: React.FC<JellySpotlightModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchFilterTab>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const { setActiveTopic, setViewMode } = useStudyStore();

  const results = useMemo(() => {
    return searchBusinessCodex(query, activeTab);
  }, [query, activeTab]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
      setActiveTab("all");
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeTab]);

  const handleSelect = (topicId: string) => {
    setActiveTopic(topicId);
    setViewMode("focus");
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const max = results.length > 0 ? results.length : FEATURED_QUICK_JUMPS.length;
        setSelectedIndex((prev) => (prev + 1) % max);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const max = results.length > 0 ? results.length : FEATURED_QUICK_JUMPS.length;
        setSelectedIndex((prev) => (prev - 1 + max) % max);
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex].id);
        } else if (!query && FEATURED_QUICK_JUMPS[selectedIndex]) {
          handleSelect(FEATURED_QUICK_JUMPS[selectedIndex].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md select-none transition-all"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="jelly-spotlight-enter w-full max-w-3xl liquid-card-flagship rounded-3xl p-5 border border-emerald-400/40 bg-[#02130c]/95 backdrop-blur-3xl shadow-[0_32px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(16,185,129,0.2)] flex flex-col max-h-[82vh] overflow-hidden"
      >
        {/* Header: Unified Single Spotlight Search Bar */}
        <div className="relative w-full mb-3 shrink-0">
          <Search className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 52 IB Business topics, cases (Tesla, Patagonia), BMT tools (SWOT, Ansoff)..."
            className="w-full pl-12 pr-24 py-3 rounded-2xl bg-black/60 border border-emerald-400/35 focus:border-emerald-400 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all font-sans"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-400/30">
              <kbd className="font-sans text-xs">esc</kbd>
            </span>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 overflow-x-auto no-scrollbar shrink-0">
          {(
            [
              { id: "all", label: "All Syllabus", icon: <Layers className="w-3 h-3" /> },
              { id: "topics", label: "Core Topics (U1-U5)", icon: <Briefcase className="w-3 h-3" /> },
              { id: "bmt", label: "BMT Analytical Tools", icon: <Wrench className="w-3 h-3" /> },
              { id: "cases", label: "Case Studies", icon: <Building2 className="w-3 h-3" /> },
              { id: "concepts", label: "Key Concepts", icon: <Compass className="w-3 h-3" /> },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Unified Fluid Search Results Feed */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-2 min-h-0">
          {query.trim().length > 0 ? (
            results.length > 0 ? (
              results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-4 border ${
                      isSelected
                        ? "bg-emerald-500/15 border-emerald-400/50 shadow-lg shadow-emerald-950/50 -translate-y-0.5"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/35">
                          {item.displayCode}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          {item.unitTitle}
                        </span>
                        {item.matchedCase && (
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30">
                            🏢 {item.matchedCase}
                          </span>
                        )}
                        {item.matchedTool && (
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/30">
                            🛠️ {item.matchedTool}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight truncate">
                        {item.title}
                      </h4>
                      {item.snippet && (
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                          {item.snippet}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isSelected && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-1 rounded-lg border border-emerald-400/30">
                          <CornerDownLeft className="w-3 h-3" />
                          Open
                        </span>
                      )}
                      <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? "text-emerald-300 translate-x-1" : "text-slate-500"}`} />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 font-mono text-xs">
                No syllabus modules matched &ldquo;{query}&rdquo;.
                <p className="mt-1 text-slate-500">
                  Try searching for terms like &apos;Ansoff&apos;, &apos;SWOT&apos;, &apos;Break-Even&apos;, &apos;Tesla&apos;, or &apos;BMT 4&apos;.
                </p>
              </div>
            )
          ) : (
            <div>
              <div className="flex items-center gap-1.5 px-2 mb-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Featured Quick Jumps &amp; Essential BMT Tools
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FEATURED_QUICK_JUMPS.map((jump, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={jump.id}
                      onClick={() => handleSelect(jump.id)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`text-left p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-2 border ${
                        isSelected
                          ? "bg-emerald-500/15 border-emerald-400/50 shadow-md"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="min-w-0 flex-1 truncate">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-mono text-[11px] font-bold text-emerald-300">
                            {jump.code}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400/70 px-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                            {jump.tag}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-white truncate">
                          {jump.title}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
          <div className="flex items-center gap-3">
            <span>
              <strong className="text-emerald-300 font-bold">{query ? results.length : 52}</strong> modules
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Use ↑ ↓ to navigate</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Enter to inspect</span>
          </div>
          <span className="text-[10px] text-emerald-400/80">
            IB Business Management C-Suite Codex
          </span>
        </div>
      </div>
    </div>
  );
};

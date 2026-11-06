"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, GripVertical, Link2, RotateCcw, Sparkles } from "lucide-react";

interface CuegisConcept {
  id: string;
  label: string;
  color: string;
  hint: string;
}

interface CaseNode {
  id: string;
  company: string;
  context: string;
  hook: string;
}

const CUEGIS_CONCEPTS: CuegisConcept[] = [
  { id: "change", label: "Change", color: "#50C878", hint: "Adaptation, resistance and transformation" },
  { id: "culture", label: "Culture", color: "#D4AF37", hint: "Schein levels, Handy typologies and values" },
  { id: "ethics", label: "Ethics", color: "#38BDF8", hint: "CSR, stakeholder welfare and governance" },
  { id: "globalization", label: "Globalization", color: "#A78BFA", hint: "MNCs, glocalisation and trade blocs" },
  { id: "innovation", label: "Innovation", color: "#34D399", hint: "R&D, intrapreneurship and disruption" },
  { id: "strategy", label: "Strategy", color: "#F59E0B", hint: "Objectives, Ansoff, BCG and decision models" },
];

const CASE_NODES: CaseNode[] = [
  { id: "spacex", company: "SpaceX", context: "Aerospace manufacturing", hook: "Reusable launch architecture collapses unit costs." },
  { id: "patagonia", company: "Patagonia", context: "Outdoor apparel", hook: "Circular supply chain and anti-consumerist ethics." },
  { id: "netflix", company: "Netflix", context: "Streaming media", hook: "Local-language content drives global market development." },
  { id: "zara", company: "Zara", context: "Fast fashion", hook: "Vertical integration compresses design-to-shelf lead time." },
  { id: "dyson", company: "Dyson", context: "Consumer technology", hook: "Heavy R&D reinvestment sustains product differentiation." },
  { id: "toyota", company: "Toyota", context: "Automotive", hook: "Kaizen culture and lean flow eliminate operational waste." },
  { id: "starbucks", company: "Starbucks", context: "Hospitality retail", hook: "Glocalisation adapts the store format to local rituals." },
  { id: "shein", company: "Shein", context: "E-commerce fashion", hook: "Algorithmic trend detection raises ethical scrutiny." },
];

const SEEDED_LINKS: Record<string, string[]> = {
  spacex: ["innovation", "strategy"],
  patagonia: ["ethics", "culture"],
  netflix: ["globalization", "strategy"],
  zara: ["strategy", "change"],
  dyson: ["innovation"],
  toyota: ["culture", "change"],
  starbucks: ["globalization"],
  shein: ["ethics", "strategy"],
};

export function CuegisSandbox() {
  const [links, setLinks] = useState<Record<string, string[]>>(SEEDED_LINKS);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  const conceptMap = useMemo(
    () => Object.fromEntries(CUEGIS_CONCEPTS.map((concept) => [concept.id, concept])),
    []
  );

  const linkCount = useMemo(
    () => Object.values(links).reduce((total, ids) => total + ids.length, 0),
    [links]
  );

  const assign = (nodeId: string, conceptId: string) => {
    setLinks((current) => {
      const existing = current[nodeId] || [];
      const next = existing.includes(conceptId)
        ? existing.filter((id) => id !== conceptId)
        : [...existing, conceptId];
      return { ...current, [nodeId]: next };
    });
    setSelectedConcept(conceptId);
  };

  return (
    <div className="ultraThinMaterial rounded-3xl p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="rounded-xl border border-emerald-400/40 bg-emerald-500/15 p-2 text-emerald-300">
            <Briefcase className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-white">CUEGIS Sandbox · Drag-and-Drop Matrix</h3>
            <p className="text-[11px] text-slate-400">
              Drag any CUEGIS concept onto a case node, or select a concept and tap a node. Active links glow with the emerald-gold theme.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setLinks(SEEDED_LINKS);
            setSelectedConcept(null);
          }}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-slate-300 transition hover:bg-white/10"
        >
          <RotateCcw className="h-3 w-3" />
          Reset Matrix · {linkCount} links
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
        {CUEGIS_CONCEPTS.map((concept) => {
          const isSelected = selectedConcept === concept.id;
          const usage = Object.values(links).filter((ids) => ids.includes(concept.id)).length;
          return (
            <motion.div
              key={concept.id}
              layout
              whileHover={{ y: -2, scale: 1.02 }}
              className="relative"
              title={concept.hint}
            >
              <button
                type="button"
                draggable
                onDragStart={(event: React.DragEvent<HTMLButtonElement>) => {
                  event.dataTransfer.setData("text/plain", concept.id);
                  event.dataTransfer.effectAllowed = "copy";
                  setSelectedConcept(concept.id);
                }}
                onClick={() => setSelectedConcept(isSelected ? null : concept.id)}
                className="flex w-full cursor-grab items-center justify-between gap-2 rounded-2xl border px-3 py-2.5 text-left active:cursor-grabbing"
                style={{
                  borderColor: isSelected ? concept.color : `${concept.color}55`,
                  background: isSelected
                    ? `radial-gradient(120% 140% at 0% 0%, ${concept.color}44, transparent 65%), rgba(4, 10, 20, 0.85)`
                    : `radial-gradient(120% 140% at 0% 0%, ${concept.color}1f, transparent 65%), rgba(4, 10, 20, 0.62)`,
                  boxShadow: isSelected ? `0 0 26px -6px ${concept.color}` : "none",
                }}
              >
                <span className="min-w-0">
                  <span className="block truncate text-xs font-bold text-white">{concept.label}</span>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                    {usage} linked nodes
                  </span>
                </span>
                <GripVertical className="h-3.5 w-3.5 shrink-0" style={{ color: concept.color }} />
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-4">
        {CASE_NODES.map((node, index) => {
          const assigned = links[node.id] || [];
          return (
            <motion.div
              key={node.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, type: "spring", stiffness: 180, damping: 22 }}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "copy";
              }}
              onDrop={(event) => {
                event.preventDefault();
                const conceptId = event.dataTransfer.getData("text/plain");
                if (conceptId) assign(node.id, conceptId);
              }}
              onClick={() => {
                if (selectedConcept) assign(node.id, selectedConcept);
              }}
              className={`flex min-h-[142px] flex-col justify-between rounded-2xl border p-3.5 transition-colors ${
                selectedConcept ? "cursor-copy" : "cursor-default"
              }`}
              style={{
                borderColor: assigned.length
                  ? "rgba(80, 200, 120, 0.42)"
                  : "rgba(255,255,255,0.1)",
                background: assigned.length
                  ? "radial-gradient(120% 140% at 100% 100%, rgba(80,200,120,0.16), transparent 65%), rgba(3, 9, 18, 0.72)"
                  : "rgba(3, 9, 18, 0.55)",
              }}
            >
              <div>
                <div className="mb-1.5 flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">{node.company}</h4>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                      {node.context}
                    </span>
                  </div>
                  <Link2 className="h-3.5 w-3.5 shrink-0 text-emerald-300/70" />
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">{node.hook}</p>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-1 border-t border-white/10 pt-2">
                <AnimatePresence initial={false}>
                  {assigned.map((conceptId) => {
                    const concept = conceptMap[conceptId];
                    if (!concept) return null;
                    return (
                      <motion.button
                        key={conceptId}
                        type="button"
                        layout
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        onClick={(event) => {
                          event.stopPropagation();
                          assign(node.id, conceptId);
                        }}
                        className="rounded-full border px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider"
                        style={{
                          borderColor: `${concept.color}66`,
                          backgroundColor: `${concept.color}24`,
                          color: concept.color,
                        }}
                        title={`Remove ${concept.label} link`}
                      >
                        {concept.label}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
                {assigned.length === 0 && (
                  <span className="flex items-center gap-1 font-mono text-[9px] text-slate-500">
                    <Sparkles className="h-2.5 w-2.5" />
                    Drop a CUEGIS concept here
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

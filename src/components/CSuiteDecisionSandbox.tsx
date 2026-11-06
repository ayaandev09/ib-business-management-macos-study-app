"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  GitBranch,
  Sliders,
  DollarSign,
  PieChart,
  Target,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Layers,
  Award,
  Scale,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Compass,
} from "lucide-react";

type LabTab = "decision-tree" | "break-even" | "strategy-matrices";

export function CSuiteDecisionSandbox() {
  const [activeLab, setActiveLab] = useState<LabTab>("decision-tree");

  // =========================================================================
  // 1. DECISION TREE SIMULATOR STATE
  // =========================================================================
  const [project1Name, setProject1Name] = useState("Option A: Direct DTC Global Expansion");
  const [project1Cost, setProject1Cost] = useState(120); // in $1,000s
  const [p1High, setP1High] = useState(0.65);
  const [p1HighPayoff, setP1HighPayoff] = useState(380); // in $1,000s
  const [p1LowPayoff, setP1LowPayoff] = useState(60); // in $1,000s

  const [project2Name, setProject2Name] = useState("Option B: Regional Franchise & Licensing");
  const [project2Cost, setProject2Cost] = useState(40); // in $1,000s
  const [p2High, setP2High] = useState(0.80);
  const [p2HighPayoff, setP2HighPayoff] = useState(210); // in $1,000s
  const [p2LowPayoff, setP2LowPayoff] = useState(90); // in $1,000s

  // Decision Tree Calculations
  const emv1 = useMemo(() => {
    return p1High * p1HighPayoff + (1 - p1High) * p1LowPayoff;
  }, [p1High, p1HighPayoff, p1LowPayoff]);

  const netEmv1 = useMemo(() => emv1 - project1Cost, [emv1, project1Cost]);

  const emv2 = useMemo(() => {
    return p2High * p2HighPayoff + (1 - p2High) * p2LowPayoff;
  }, [p2High, p2HighPayoff, p2LowPayoff]);

  const netEmv2 = useMemo(() => emv2 - project2Cost, [emv2, project2Cost]);

  const optimalChoice = netEmv1 >= netEmv2 ? "opt1" : "opt2";

  // =========================================================================
  // 2. BREAK-EVEN SIMULATOR STATE
  // =========================================================================
  const [fixedCosts, setFixedCosts] = useState(60000); // $
  const [variableCost, setVariableCost] = useState(25); // $
  const [sellingPrice, setSellingPrice] = useState(65); // $
  const [currentOutput, setCurrentOutput] = useState(2200); // units
  const [targetProfit, setTargetProfit] = useState(20000); // $

  const contributionMargin = Math.max(1, sellingPrice - variableCost);
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
  const breakEvenRevenue = breakEvenUnits * sellingPrice;
  const currentRevenue = currentOutput * sellingPrice;
  const currentTotalCosts = fixedCosts + variableCost * currentOutput;
  const currentProfit = currentRevenue - currentTotalCosts;
  const marginOfSafety = currentOutput - breakEvenUnits;
  const marginOfSafetyPercent = breakEvenUnits > 0 ? ((marginOfSafety / currentOutput) * 100).toFixed(1) : "0";
  const targetProfitUnits = Math.ceil((fixedCosts + targetProfit) / contributionMargin);

  // Dynamic Chart Scale
  const maxUnitsChart = Math.max(currentOutput * 1.35, breakEvenUnits * 1.5, targetProfitUnits * 1.15, 3000);
  const maxRevenueChart = Math.max(currentRevenue * 1.35, breakEvenRevenue * 1.5, fixedCosts * 2.5, 150000);

  // Coordinates helper for SVG chart (viewBox 0 0 500 320, padding 40)
  const chartW = 420;
  const chartH = 240;
  const padX = 50;
  const padY = 20;

  const toX = (units: number) => padX + (Math.min(units, maxUnitsChart) / maxUnitsChart) * chartW;
  const toY = (val: number) => padY + chartH - (Math.min(val, maxRevenueChart) / maxRevenueChart) * chartH;

  // Key chart points
  const bepX = toX(breakEvenUnits);
  const bepY = toY(breakEvenRevenue);
  const currentX = toX(currentOutput);
  const currentRevY = toY(currentRevenue);
  const currentCostY = toY(currentTotalCosts);

  // =========================================================================
  // 3. STRATEGIC MATRICES STATE
  // =========================================================================
  const [activeMatrix, setActiveMatrix] = useState<"ansoff" | "bcg" | "forcefield" | "steeple">("ansoff");

  // Force field weights
  const [forceDriving1, setForceDriving1] = useState(4);
  const [forceDriving2, setForceDriving2] = useState(5);
  const [forceDriving3, setForceDriving3] = useState(3);
  const [forceRestraining1, setForceRestraining1] = useState(4);
  const [forceRestraining2, setForceRestraining2] = useState(3);
  const [forceRestraining3, setForceRestraining3] = useState(2);

  const totalDriving = forceDriving1 + forceDriving2 + forceDriving3;
  const totalRestraining = forceRestraining1 + forceRestraining2 + forceRestraining3;

  return (
    <div className="space-y-6">
      {/* Flagship Hero Header */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-900 border border-emerald-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-inner">
                C-Suite Executive Lab // IB BMT Suite
              </span>
              <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Live Quantitative &amp; Strategic Simulator
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-display">
              Strategic Decision &amp; Financial Modeling Engine
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Model complex C-Suite decisions with rigorous Expected Monetary Value (EMV) probability trees, dynamic break-even sensitivity graphs, and interactive BMT matrices.
            </p>
          </div>

          {/* Module Selector Pill Bar */}
          <div className="flex flex-wrap md:flex-col gap-2 p-1.5 rounded-2xl bg-black/50 border border-white/10 shrink-0">
            <button
              onClick={() => setActiveLab("decision-tree")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeLab === "decision-tree"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg border border-emerald-400/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <GitBranch className="w-4 h-4 text-emerald-300" />
              <span>Decision Tree &amp; EMV Builder</span>
            </button>
            <button
              onClick={() => setActiveLab("break-even")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeLab === "break-even"
                  ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg border border-sky-400/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-sky-300" />
              <span>Break-Even &amp; Operating Leverage</span>
            </button>
            <button
              onClick={() => setActiveLab("strategy-matrices")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeLab === "strategy-matrices"
                  ? "bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-lg border border-amber-400/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4 text-amber-300" />
              <span>BMT Strategic Matrices (Ansoff, BCG, Lewin)</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LAB 1: INTERACTIVE DECISION TREE & EMV OPTIMIZER
          ===================================================================== */}
      {activeLab === "decision-tree" && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-5 rounded-2xl border transition-all ${
              optimalChoice === "opt1"
                ? "bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-950/40"
                : "bg-slate-900/60 border-white/10 opacity-75"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs uppercase text-emerald-400 font-bold">Option A Net EMV</span>
                {optimalChoice === "opt1" && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                    OPTIMAL PATH
                  </span>
                )}
              </div>
              <div className="text-2xl font-black text-white font-mono">
                ${netEmv1.toFixed(1)}k
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Gross EMV: ${emv1.toFixed(1)}k − CapEx: ${project1Cost}k
              </div>
            </div>

            <div className={`p-5 rounded-2xl border transition-all ${
              optimalChoice === "opt2"
                ? "bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-950/40"
                : "bg-slate-900/60 border-white/10 opacity-75"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs uppercase text-sky-400 font-bold">Option B Net EMV</span>
                {optimalChoice === "opt2" && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                    OPTIMAL PATH
                  </span>
                )}
              </div>
              <div className="text-2xl font-black text-white font-mono">
                ${netEmv2.toFixed(1)}k
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Gross EMV: ${emv2.toFixed(1)}k − CapEx: ${project2Cost}k
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 to-slate-900 border border-amber-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-xs uppercase text-amber-300 font-bold">C-Suite Verdict</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {optimalChoice === "opt1" ? project1Name : project2Name}
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Expected economic surplus advantage of <strong className="text-amber-300 font-mono">${Math.abs(netEmv1 - netEmv2).toFixed(1)}k</strong> over the alternative.
              </div>
            </div>
          </div>

          {/* Interactive Decision Tree Diagram Canvas */}
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-emerald-400" />
                  Expected Monetary Value (EMV) Decision Tree Diagram
                </h3>
                <p className="text-xs text-slate-400">
                  Standard IB notation: <span className="text-amber-300 font-mono">□</span> Decision Node &nbsp;•&nbsp; <span className="text-sky-300 font-mono">○</span> Chance Node &nbsp;•&nbsp; <span className="text-rose-400 font-bold">//</span> Double-Line Pruning (suboptimal branch).
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                  Calculated Live
                </span>
              </div>
            </div>

            {/* Tree SVG Architecture */}
            <div className="w-full overflow-x-auto py-4">
              <svg viewBox="0 0 840 380" className="w-full min-w-[760px] h-auto select-none font-sans">
                {/* Background Grid Accent */}
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Root Decision Node (Square) */}
                <rect x="30" y="165" width="50" height="50" rx="8" fill="#0F172A" stroke="#10B981" strokeWidth="2.5" />
                <text x="55" y="196" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="18" fontFamily="monospace">1</text>
                <text x="55" y="235" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold">DECISION</text>

                {/* Branch 1 to Option A */}
                <path
                  d="M 80 190 L 160 190 L 220 90 L 290 90"
                  fill="none"
                  stroke={optimalChoice === "opt1" ? "#10B981" : "#475569"}
                  strokeWidth={optimalChoice === "opt1" ? "3" : "1.8"}
                  strokeDasharray={optimalChoice === "opt1" ? "none" : "none"}
                />

                {/* Branch 2 to Option B */}
                <path
                  d="M 80 190 L 160 190 L 220 290 L 290 290"
                  fill="none"
                  stroke={optimalChoice === "opt2" ? "#10B981" : "#475569"}
                  strokeWidth={optimalChoice === "opt2" ? "3" : "1.8"}
                />

                {/* Double Strike Pruning on Rejected Branch */}
                {optimalChoice === "opt2" && (
                  <g transform="translate(180, 130) rotate(-40)">
                    <line x1="-12" y1="-14" x2="-12" y2="14" stroke="#F43F5E" strokeWidth="3.5" />
                    <line x1="-4" y1="-14" x2="-4" y2="14" stroke="#F43F5E" strokeWidth="3.5" />
                  </g>
                )}
                {optimalChoice === "opt1" && (
                  <g transform="translate(180, 250) rotate(40)">
                    <line x1="-12" y1="-14" x2="-12" y2="14" stroke="#F43F5E" strokeWidth="3.5" />
                    <line x1="-4" y1="-14" x2="-4" y2="14" stroke="#F43F5E" strokeWidth="3.5" />
                  </g>
                )}

                {/* Branch 1 Label */}
                <g transform="translate(130, 70)">
                  <rect x="0" y="0" width="140" height="26" rx="6" fill="#1E293B" stroke="#334155" />
                  <text x="70" y="17" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold">
                    Cost: -${project1Cost}k
                  </text>
                </g>

                {/* Chance Node A (Circle) */}
                <circle cx="310" cy="90" r="24" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
                <text x="310" y="95" textAnchor="middle" fill="#38BDF8" fontWeight="bold" fontSize="13" fontFamily="monospace">A</text>
                <text x="310" y="130" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold">
                  EMV: ${emv1.toFixed(1)}k
                </text>

                {/* Option A Sub-branches: High vs Low Demand */}
                <path d="M 334 90 L 400 90 L 460 45 L 530 45" fill="none" stroke="#38BDF8" strokeWidth="1.8" />
                <path d="M 334 90 L 400 90 L 460 135 L 530 135" fill="none" stroke="#38BDF8" strokeWidth="1.8" />

                {/* Chance Node A outcomes */}
                <text x="440" y="35" fill="#34D399" fontSize="11" fontWeight="bold">High Demand (p={p1High.toFixed(2)})</text>
                <text x="540" y="50" fill="#FFFFFF" fontSize="13" fontWeight="black" fontFamily="monospace">
                  +${p1HighPayoff}k
                </text>

                <text x="440" y="155" fill="#F87171" fontSize="11" fontWeight="bold">Low Demand (p={(1 - p1High).toFixed(2)})</text>
                <text x="540" y="140" fill="#FFFFFF" fontSize="13" fontWeight="black" fontFamily="monospace">
                  +${p1LowPayoff}k
                </text>

                {/* Net EMV A pill */}
                <g transform="translate(640, 75)">
                  <rect x="0" y="0" width="170" height="34" rx="8" fill={optimalChoice === "opt1" ? "#064E3B" : "#1E293B"} stroke={optimalChoice === "opt1" ? "#10B981" : "#334155"} strokeWidth="1.5" />
                  <text x="85" y="22" textAnchor="middle" fill={optimalChoice === "opt1" ? "#34D399" : "#94A3B8"} fontSize="12" fontWeight="bold" fontFamily="monospace">
                    Net EMV: ${netEmv1.toFixed(1)}k
                  </text>
                </g>

                {/* Branch 2 Label */}
                <g transform="translate(130, 275)">
                  <rect x="0" y="0" width="140" height="26" rx="6" fill="#1E293B" stroke="#334155" />
                  <text x="70" y="17" textAnchor="middle" fill="#A78BFA" fontSize="11" fontWeight="bold">
                    Cost: -${project2Cost}k
                  </text>
                </g>

                {/* Chance Node B (Circle) */}
                <circle cx="310" cy="290" r="24" fill="#0F172A" stroke="#A78BFA" strokeWidth="2.5" />
                <text x="310" y="295" textAnchor="middle" fill="#A78BFA" fontWeight="bold" fontSize="13" fontFamily="monospace">B</text>
                <text x="310" y="330" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold">
                  EMV: ${emv2.toFixed(1)}k
                </text>

                {/* Option B Sub-branches */}
                <path d="M 334 290 L 400 290 L 460 245 L 530 245" fill="none" stroke="#A78BFA" strokeWidth="1.8" />
                <path d="M 334 290 L 400 290 L 460 335 L 530 335" fill="none" stroke="#A78BFA" strokeWidth="1.8" />

                {/* Chance Node B outcomes */}
                <text x="440" y="235" fill="#34D399" fontSize="11" fontWeight="bold">High Demand (p={p2High.toFixed(2)})</text>
                <text x="540" y="250" fill="#FFFFFF" fontSize="13" fontWeight="black" fontFamily="monospace">
                  +${p2HighPayoff}k
                </text>

                <text x="440" y="355" fill="#F87171" fontSize="11" fontWeight="bold">Low Demand (p={(1 - p2High).toFixed(2)})</text>
                <text x="540" y="340" fill="#FFFFFF" fontSize="13" fontWeight="black" fontFamily="monospace">
                  +${p2LowPayoff}k
                </text>

                {/* Net EMV B pill */}
                <g transform="translate(640, 275)">
                  <rect x="0" y="0" width="170" height="34" rx="8" fill={optimalChoice === "opt2" ? "#064E3B" : "#1E293B"} stroke={optimalChoice === "opt2" ? "#10B981" : "#334155"} strokeWidth="1.5" />
                  <text x="85" y="22" textAnchor="middle" fill={optimalChoice === "opt2" ? "#34D399" : "#94A3B8"} fontSize="12" fontWeight="bold" fontFamily="monospace">
                    Net EMV: ${netEmv2.toFixed(1)}k
                  </text>
                </g>
              </svg>
            </div>

            {/* Interactive Control Sliders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-4 border-t border-white/10">
              {/* Option A Configuration */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-sky-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold font-mono uppercase text-sky-400">
                    Option A Parameters ({project1Name})
                  </h4>
                  <span className="text-xs text-sky-300 font-mono font-bold">CapEx: ${project1Cost}k</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Capital Investment (CapEx):</span>
                      <span className="font-mono text-white font-bold">${project1Cost}k</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={300}
                      step={5}
                      value={project1Cost}
                      onChange={(e) => setProject1Cost(Number(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>High Demand Probability:</span>
                      <span className="font-mono text-emerald-300 font-bold">{(p1High * 100).toFixed(0)}% (Low: {((1 - p1High) * 100).toFixed(0)}%)</span>
                    </div>
                    <input
                      type="range"
                      min={0.05}
                      max={0.95}
                      step={0.05}
                      value={p1High}
                      onChange={(e) => setP1High(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">High Demand Payoff</label>
                      <input
                        type="number"
                        value={p1HighPayoff}
                        onChange={(e) => setP1HighPayoff(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 font-mono text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Low Demand Payoff</label>
                      <input
                        type="number"
                        value={p1LowPayoff}
                        onChange={(e) => setP1LowPayoff(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 font-mono text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Option B Configuration */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold font-mono uppercase text-purple-400">
                    Option B Parameters ({project2Name})
                  </h4>
                  <span className="text-xs text-purple-300 font-mono font-bold">CapEx: ${project2Cost}k</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Capital Investment (CapEx):</span>
                      <span className="font-mono text-white font-bold">${project2Cost}k</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={200}
                      step={5}
                      value={project2Cost}
                      onChange={(e) => setProject2Cost(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>High Demand Probability:</span>
                      <span className="font-mono text-emerald-300 font-bold">{(p2High * 100).toFixed(0)}% (Low: {((1 - p2High) * 100).toFixed(0)}%)</span>
                    </div>
                    <input
                      type="range"
                      min={0.05}
                      max={0.95}
                      step={0.05}
                      value={p2High}
                      onChange={(e) => setP2High(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">High Demand Payoff</label>
                      <input
                        type="number"
                        value={p2HighPayoff}
                        onChange={(e) => setP2HighPayoff(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 font-mono text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Low Demand Payoff</label>
                      <input
                        type="number"
                        value={p2LowPayoff}
                        onChange={(e) => setP2LowPayoff(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 font-mono text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* IB Exam Evaluative Insight */}
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-amber-300 uppercase tracking-wider font-mono">
                  IB Exam Markscheme Evaluative Warning (Paper 2 &amp; Paper 3)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Never base a strategic recommendation on Net EMV alone! Expected values rely on <em>subjective probability estimates</em> and ignore qualitative realities: managerial competence, stakeholder pushback, brand identity dilution, and external economic shocks (STEEPLE factors).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          LAB 2: INTERACTIVE BREAK-EVEN & OPERATING LEVERAGE SANDBOX
          ===================================================================== */}
      {activeLab === "break-even" && (
        <div className="space-y-6">
          {/* Key Metric Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                Break-Even Quantity (BEQ)
              </span>
              <div className="text-xl md:text-2xl font-black text-amber-300 font-mono mt-1">
                {breakEvenUnits.toLocaleString()} units
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Rev: ${breakEvenRevenue.toLocaleString()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                Unit Contribution Margin
              </span>
              <div className="text-xl md:text-2xl font-black text-emerald-400 font-mono mt-1">
                ${contributionMargin} / unit
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Price (${sellingPrice}) − VC (${variableCost})
              </div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              marginOfSafety >= 0 ? "bg-emerald-950/30 border-emerald-500/40" : "bg-rose-950/30 border-rose-500/40"
            }`}>
              <span className="font-mono text-[10px] uppercase tracking-wider block text-slate-300">
                Margin of Safety (MoS)
              </span>
              <div className={`text-xl md:text-2xl font-black font-mono mt-1 ${
                marginOfSafety >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}>
                {marginOfSafety >= 0 ? `+${marginOfSafety.toLocaleString()}` : marginOfSafety.toLocaleString()} units
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {marginOfSafetyPercent}% above break-even
              </div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              currentProfit >= 0 ? "bg-emerald-950/30 border-emerald-500/40" : "bg-rose-950/30 border-rose-500/40"
            }`}>
              <span className="font-mono text-[10px] uppercase tracking-wider block text-slate-300">
                Current Net Profit / (Loss)
              </span>
              <div className={`text-xl md:text-2xl font-black font-mono mt-1 ${
                currentProfit >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}>
                {currentProfit >= 0 ? `+$${currentProfit.toLocaleString()}` : `-$${Math.abs(currentProfit).toLocaleString()}`}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                TR (${currentRevenue.toLocaleString()}) − TC (${currentTotalCosts.toLocaleString()})
              </div>
            </div>
          </div>

          {/* Interactive Dynamic SVG Break-Even Chart */}
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-sky-400" />
                  Live Dynamic Break-Even &amp; Operating Leverage Chart
                </h3>
                <p className="text-xs text-slate-400">
                  Interactive real-time geometry: Adjust cost curves and pricing to observe margin shifts.
                </p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-sky-300">
                  <span className="w-3 h-0.5 bg-sky-400 rounded-full" /> Total Revenue (TR)
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-3 h-0.5 bg-rose-500 rounded-full" /> Total Costs (TC)
                </span>
                <span className="flex items-center gap-1.5 text-amber-300">
                  <span className="w-3 h-0.5 bg-amber-400 rounded-full" /> Fixed Costs (FC)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Break-Even Point
                </span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="w-full overflow-x-auto py-2">
              <svg viewBox="0 0 500 320" className="w-full min-w-[500px] h-[300px] select-none font-sans">
                {/* Background grid */}
                <line x1={padX} y1={padY} x2={padX} y2={padY + chartH} stroke="#334155" strokeWidth="1.5" />
                <line x1={padX} y1={padY + chartH} x2={padX + chartW} y2={padY + chartH} stroke="#334155" strokeWidth="1.5" />

                {/* Profit/Loss Shaded Polygons */}
                {breakEvenUnits < maxUnitsChart && (
                  <>
                    {/* Loss zone polygon (between FC and BEP) */}
                    <polygon
                      points={`${bepX},${bepY} ${padX},${toY(fixedCosts)} ${padX},${toY(0)}`}
                      fill="rgba(244, 63, 94, 0.12)"
                    />
                    {/* Profit zone polygon (beyond BEP) */}
                    <polygon
                      points={`${bepX},${bepY} ${toX(maxUnitsChart)},${toY(maxUnitsChart * sellingPrice)} ${toX(maxUnitsChart)},${toY(fixedCosts + variableCost * maxUnitsChart)}`}
                      fill="rgba(16, 185, 129, 0.14)"
                    />
                  </>
                )}

                {/* Fixed Costs Line (Horizontal) */}
                <line
                  x1={padX}
                  y1={toY(fixedCosts)}
                  x2={padX + chartW}
                  y2={toY(fixedCosts)}
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <text x={padX + 8} y={toY(fixedCosts) - 6} fill="#F59E0B" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  FC: ${fixedCosts.toLocaleString()}
                </text>

                {/* Total Costs Line (Starting at FC) */}
                <line
                  x1={padX}
                  y1={toY(fixedCosts)}
                  x2={toX(maxUnitsChart)}
                  y2={toY(fixedCosts + variableCost * maxUnitsChart)}
                  stroke="#F43F5E"
                  strokeWidth="2.5"
                />

                {/* Total Revenue Line (Starting at 0) */}
                <line
                  x1={padX}
                  y1={toY(0)}
                  x2={toX(maxUnitsChart)}
                  y2={toY(maxUnitsChart * sellingPrice)}
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                />

                {/* Break-Even Point Circle & Dashed Projection */}
                {breakEvenUnits <= maxUnitsChart && (
                  <>
                    <line x1={bepX} y1={bepY} x2={bepX} y2={padY + chartH} stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1={padX} y1={bepY} x2={bepX} y2={bepY} stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx={bepX} cy={bepY} r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                    <text x={bepX + 8} y={bepY - 8} fill="#10B981" fontSize="11" fontWeight="bold">
                      BEP ({breakEvenUnits} units)
                    </text>
                  </>
                )}

                {/* Current Output Vertical Marker */}
                {currentOutput <= maxUnitsChart && (
                  <>
                    <line
                      x1={currentX}
                      y1={padY}
                      x2={currentX}
                      y2={padY + chartH}
                      stroke="#A855F7"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                    />
                    <circle cx={currentX} cy={currentRevY} r="4" fill="#38BDF8" />
                    <circle cx={currentX} cy={currentCostY} r="4" fill="#F43F5E" />
                    <text x={currentX + 4} y={padY + 16} fill="#A855F7" fontSize="10" fontWeight="bold">
                      Q = {currentOutput}
                    </text>
                  </>
                )}

                {/* Axes Labels */}
                <text x={padX + chartW - 10} y={padY + chartH + 18} textAnchor="end" fill="#94A3B8" fontSize="10">
                  Output (Units) →
                </text>
                <text x={padX - 8} y={padY + 12} textAnchor="end" fill="#94A3B8" fontSize="10">
                  Cost / Revenue ($) ↑
                </text>
              </svg>
            </div>

            {/* Parameter Sliders Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Fixed Costs (FC):</span>
                  <span className="font-mono text-amber-300 font-bold">${fixedCosts.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={200000}
                  step={5000}
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Variable Cost (VC):</span>
                  <span className="font-mono text-rose-300 font-bold">${variableCost}/unit</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={150}
                  step={1}
                  value={variableCost}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setVariableCost(val);
                    if (val >= sellingPrice) setSellingPrice(val + 5);
                  }}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Selling Price (P):</span>
                  <span className="font-mono text-sky-300 font-bold">${sellingPrice}/unit</span>
                </div>
                <input
                  type="range"
                  min={variableCost + 1}
                  max={300}
                  step={2}
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Current Output (Q):</span>
                  <span className="font-mono text-purple-300 font-bold">{currentOutput.toLocaleString()} units</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={5000}
                  step={50}
                  value={currentOutput}
                  onChange={(e) => setCurrentOutput(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Target Profit Planning Calculator */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-emerald-400" />
                  Target Profit Planning Model
                </span>
                <p className="text-xs text-slate-300">
                  Target Output Required = <code className="text-amber-300 font-mono">(Fixed Costs + Target Profit) ÷ Contribution</code>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 block">Set Target Profit:</span>
                  <input
                    type="number"
                    value={targetProfit}
                    onChange={(e) => setTargetProfit(Number(e.target.value))}
                    className="w-28 px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs"
                  />
                </div>
                <div className="border-l border-white/10 pl-4">
                  <span className="text-[10px] text-slate-400 block">Required Production:</span>
                  <span className="text-lg font-black text-emerald-400 font-mono">
                    {targetProfitUnits.toLocaleString()} units
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          LAB 3: STRATEGIC BMT MATRICES (ANSOFF, BCG, LEWIN FORCE FIELD)
          ===================================================================== */}
      {activeLab === "strategy-matrices" && (
        <div className="space-y-6">
          {/* Submatrix switcher */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10">
            <button
              onClick={() => setActiveMatrix("ansoff")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeMatrix === "ansoff"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Ansoff Matrix (Product-Market Grid)
            </button>
            <button
              onClick={() => setActiveMatrix("bcg")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeMatrix === "bcg"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-400/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              BCG Growth-Share Matrix
            </button>
            <button
              onClick={() => setActiveMatrix("forcefield")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeMatrix === "forcefield"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Lewin's Force Field Analysis
            </button>
            <button
              onClick={() => setActiveMatrix("steeple")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeMatrix === "steeple"
                  ? "bg-sky-500/20 text-sky-300 border border-sky-400/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              STEEPLE External Context Radar
            </button>
          </div>

          {/* ANSOFF MATRIX */}
          {activeMatrix === "ansoff" && (
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    Ansoff Matrix: Strategic Growth Pathways
                  </h3>
                  <p className="text-xs text-slate-400">
                    Evaluates corporate growth vectors based on Market Novelty vs Product Novelty and associated risk tiers.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Market Penetration */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Existing Market • Existing Product
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">Lowest Risk (Tier 1)</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">Market Penetration</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Maximizing market share in current segments through competitive pricing, loyalty programs, and brand reinforcement.
                  </p>
                  <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                    <strong className="text-white">Real-World Benchmark:</strong> Coca-Cola holiday marketing blitzes, Amazon Prime subscriber retention strategies.
                  </div>
                </div>

                {/* Product Development */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      Existing Market • New Product
                    </span>
                    <span className="text-[11px] font-mono text-sky-400 font-bold">Medium Risk (Tier 2)</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">Product Development</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Inventing new variants or product generations to sell to loyal existing customer bases. Heavy R&amp;D expenditure required.
                  </p>
                  <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                    <strong className="text-white">Real-World Benchmark:</strong> Apple launching Apple Watch to iPhone users; Dyson expanding into hair care.
                  </div>
                </div>

                {/* Market Development */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                      New Market • Existing Product
                    </span>
                    <span className="text-[11px] font-mono text-purple-400 font-bold">Medium Risk (Tier 2)</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">Market Development</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Exporting existing proven products to new geographic regions or untapped demographic segments (e.g., enterprise to consumer).
                  </p>
                  <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                    <strong className="text-white">Real-World Benchmark:</strong> Starbucks expanding aggressively in mainland China; Netflix globalizing Korean dramas.
                  </div>
                </div>

                {/* Diversification */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-400/30">
                      New Market • New Product
                    </span>
                    <span className="text-[11px] font-mono text-rose-400 font-bold">Highest Risk (Tier 4)</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">Diversification</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Entering entirely unknown product territories and consumer segments. Related vs Conglomerate diversification.
                  </p>
                  <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                    <strong className="text-white">Real-World Benchmark:</strong> Virgin Group entering space tourism (Virgin Galactic); Tesla entering humanoid robotics.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BCG MATRIX */}
          {activeMatrix === "bcg" && (
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-purple-400" />
                  Boston Consulting Group (BCG) Growth-Share Matrix
                </h3>
                <p className="text-xs text-slate-400">
                  Product portfolio mapping along Market Growth Rate (vertical) vs Relative Market Share (horizontal).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-300">★ STARS</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">High Growth • High Share</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Market leaders in rapidly expanding industries. Require substantial cash reinvestment to defend market dominance against copycats. Will mature into Cash Cows.
                  </p>
                  <div className="text-[11px] text-amber-300/90 font-mono">Strategy: Heavy reinvestment &amp; capacity expansion.</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-300">? QUESTION MARKS (Problem Children)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">High Growth • Low Share</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Operating in attractive booming sectors but struggling with low relative market share. Cash sinks that must either be aggressively funded to turn into Stars or divested.
                  </p>
                  <div className="text-[11px] text-purple-300/90 font-mono">Strategy: Selective investment or divestment.</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-300">🐄 CASH COWS</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">Low Growth • High Share</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Mature, high-volume products dominating low-growth markets. Low CapEx requirements generate immense cash flows used to fund Question Marks and Stars.
                  </p>
                  <div className="text-[11px] text-emerald-300/90 font-mono">Strategy: Milking &amp; harvesting cash surpluses.</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-rose-300">✕ DOGS</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">Low Growth • Low Share</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Depleted products with minimal market share in saturated or declining industries. Tie up operational capital with little to no return.
                  </p>
                  <div className="text-[11px] text-rose-300/90 font-mono">Strategy: Phased liquidation or divestiture.</div>
                </div>
              </div>
            </div>
          )}

          {/* LEWIN'S FORCE FIELD ANALYSIS */}
          {activeMatrix === "forcefield" && (
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-emerald-400" />
                    Kurt Lewin's Force Field Analysis Simulator
                  </h3>
                  <p className="text-xs text-slate-400">
                    Examine organizational change dynamics: Driving Forces (pushing change) vs Restraining Forces (resisting change).
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                  totalDriving > totalRestraining
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                    : "bg-rose-500/20 text-rose-300 border-rose-400/40"
                }`}>
                  {totalDriving > totalRestraining ? "CHANGE SUCCEEDS (Surplus Driving)" : "CHANGE BLOCKED (Restraining Dominates)"}
                </div>
              </div>

              {/* Force Field Visual Equilibrium Bar */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-emerald-400">Total Driving Force: {totalDriving}</span>
                  <span className="text-slate-400">Current Status Quo (Equilibrium)</span>
                  <span className="text-rose-400">Total Restraining Force: {totalRestraining}</span>
                </div>

                <div className="h-4 rounded-full bg-slate-800 overflow-hidden flex">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300"
                    style={{ width: `${(totalDriving / (totalDriving + totalRestraining)) * 100}%` }}
                  />
                  <div
                    className="h-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-300"
                    style={{ width: `${(totalRestraining / (totalDriving + totalRestraining)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Driving vs Restraining Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Driving Forces */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase text-emerald-400">
                    Driving Forces (For Change)
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Competitive Cost Pressures:</span>
                        <span className="font-mono text-emerald-300 font-bold">{forceDriving1}/5</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={forceDriving1}
                        onChange={(e) => setForceDriving1(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Technological Disruption (AI/Automation):</span>
                        <span className="font-mono text-emerald-300 font-bold">{forceDriving2}/5</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={forceDriving2}
                        onChange={(e) => setForceDriving2(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Executive Leadership Mandate:</span>
                        <span className="font-mono text-emerald-300 font-bold">{forceDriving3}/5</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={forceDriving3}
                        onChange={(e) => setForceDriving3(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Restraining Forces */}
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase text-rose-400">
                    Restraining Forces (Resisting Change)
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Employee Fear of Retrenchment / Inertia:</span>
                        <span className="font-mono text-rose-300 font-bold">{forceRestraining1}/5</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={forceRestraining1}
                        onChange={(e) => setForceRestraining1(Number(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Short-Term Transition Capital Costs:</span>
                        <span className="font-mono text-rose-300 font-bold">{forceRestraining2}/5</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={forceRestraining2}
                        onChange={(e) => setForceRestraining2(Number(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Trade Union Opposition / Compliance:</span>
                        <span className="font-mono text-rose-300 font-bold">{forceRestraining3}/5</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={forceRestraining3}
                        onChange={(e) => setForceRestraining3(Number(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEEPLE RADAR */}
          {activeMatrix === "steeple" && (
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sky-400" />
                  STEEPLE External Macro-Environment Radar
                </h3>
                <p className="text-xs text-slate-400">
                  Analytical dimensions for examining exogenous external shocks affecting strategic viability.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {[
                  { tag: "S", name: "Social & Cultural", desc: "Aging populations, changing diet preferences, demographic lifestyle shifts." },
                  { tag: "T", name: "Technological", desc: "Generative AI, EV powertrains, additive 3D manufacturing, 5G loT." },
                  { tag: "E", name: "Economic", desc: "Interest rate hiking cycles, foreign exchange volatility, stagflation, GDP cycles." },
                  { tag: "E", name: "Environmental", desc: "Scope 3 emissions accounting, extreme weather logistics risks, circular economy." },
                  { tag: "P", name: "Political", desc: "Tariff wars, national security FDI screening, government subsidy programs." },
                  { tag: "L", name: "Legal", desc: "Antitrust enforcement, GDPR data privacy rules, labor minimum wage laws." },
                  { tag: "E", name: "Ethical", desc: "Supply chain living wage audits, animal welfare, algorithmic bias transparency." },
                ].map((s, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-6 h-6 rounded-md bg-sky-500/20 text-sky-300 font-mono font-bold text-xs flex items-center justify-center border border-sky-400/30">
                          {s.tag}
                        </span>
                        <h5 className="font-bold text-white text-xs">{s.name}</h5>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

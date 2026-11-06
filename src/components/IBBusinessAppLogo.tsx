"use client";

import React from "react";

export const IBBusinessAppLogo: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <defs>
        {/* Emerald Executive Gradients */}
        <linearGradient id="ibEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="30%" stopColor="#34d399" />
          <stop offset="70%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <radialGradient id="ibEmeraldAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#059669" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
        </radialGradient>

        {/* Electric Sapphire Gradients */}
        <linearGradient id="ibSapphireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        {/* Deep Jade Gradients */}
        <linearGradient id="ibJadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>

        {/* Gold Exponential Arrow Gradients */}
        <linearGradient id="ibGoldVector" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="60%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fef08a" />
        </linearGradient>
      </defs>

      {/* Ambient Executive Aura */}
      <circle cx="256" cy="256" r="240" fill="url(#ibEmeraldAura)" />

      {/* Outer Glass Rim & Matrix Coordinates Ring */}
      <circle
        cx="256"
        cy="256"
        r="230"
        fill="#06121a"
        stroke="url(#ibEmeraldGrad)"
        strokeWidth="8"
        strokeOpacity="0.95"
      />
      <circle
        cx="256"
        cy="256"
        r="214"
        fill="none"
        stroke="#34d399"
        strokeWidth="2"
        strokeDasharray="8 8"
        strokeOpacity="0.6"
      />

      {/* 3D Isometric C-Suite Strategic Cube */}
      {/* Top Face: Strategy, Leadership & Governance */}
      <polygon
        points="256,104 388,180 256,256 124,180"
        fill="url(#ibEmeraldGrad)"
        stroke="#d1fae5"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Left Face: Finance, Accounts & Human Resource Management */}
      <polygon
        points="124,180 256,256 256,408 124,332"
        fill="url(#ibJadeGrad)"
        stroke="#34d399"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Right Face: Marketing, Operations & Growth */}
      <polygon
        points="256,256 388,180 388,332 256,408"
        fill="url(#ibSapphireGrad)"
        stroke="#38bdf8"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Central Spine Facet Line */}
      <line x1="256" y1="256" x2="256" y2="408" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.75" />

      {/* Upward Exponential Value Growth Vector Arrow */}
      <path
        d="M 176 352 L 232 268 L 284 300 L 372 136"
        fill="none"
        stroke="url(#ibGoldVector)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arrowhead */}
      <polygon
        points="386,116 384,166 338,142"
        fill="#fef08a"
        stroke="#f59e0b"
        strokeWidth="2"
      />

      {/* Growth Milestone Nodes */}
      <circle cx="176" cy="352" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
      <circle cx="232" cy="268" r="8" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
      <circle cx="284" cy="300" r="8" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
      <circle cx="372" cy="136" r="9" fill="#fef08a" stroke="#ffffff" strokeWidth="2.5" />

      {/* Central Diamond Node */}
      <polygon points="256,246 266,256 256,266 246,256" fill="#ffffff" />
    </svg>
  );
};

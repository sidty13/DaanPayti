"use client";

import React from "react";

interface CohortRing {
  year: string;
  retentionRate: number; // 0 - 100
  donorCount: number;
  label: string;
  color: string;
}

export function TreeRingsGraphic({ className = "" }: { className?: string }) {
  const cohorts: CohortRing[] = [
    { year: "Year 4 (2022-23)", retentionRate: 91, donorCount: 7, label: "Deep Roots (Foundational)", color: "#1F4D3A" },
    { year: "Year 3 (2023-24)", retentionRate: 86, donorCount: 9, label: "Sturdy Trunk (Sustained)", color: "#4A7338" },
    { year: "Year 2 (2024-25)", retentionRate: 82, donorCount: 11, label: "Spreading Boughs", color: "#8FB573" },
    { year: "Year 1 (2025-26)", retentionRate: 78, donorCount: 18, label: "Tender Branches (First-year)", color: "#A4C78B" },
  ];

  return (
    <div className={`p-5 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#1F4D3A]">
            Tree Rings — Cohort Retention
          </h3>
          <p className="text-xs text-[#66695C]">
            Concentric rings of enduring support across cohorts
          </p>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#C7DAC0]">
          87.4% Avg Retention
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Concentric Tree Rings SVG */}
        <div className="relative w-52 h-52 flex-shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Heartwood (Center) */}
            <circle cx="100" cy="100" r="16" fill="#6B4F3A" opacity="0.9" />
            <text x="100" y="104" textAnchor="middle" fill="#FFFDF8" fontSize="8" fontWeight="bold">
              UPAY
            </text>

            {/* Ring 4 (Deep Roots) */}
            <circle
              cx="100"
              cy="100"
              r="34"
              fill="none"
              stroke="#1F4D3A"
              strokeWidth="11"
              strokeDasharray="213"
              strokeDashoffset={213 - (213 * 91) / 100}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />

            {/* Ring 3 */}
            <circle
              cx="100"
              cy="100"
              r="52"
              fill="none"
              stroke="#4A7338"
              strokeWidth="11"
              strokeDasharray="326"
              strokeDashoffset={326 - (326 * 86) / 100}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />

            {/* Ring 2 */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#8FB573"
              strokeWidth="11"
              strokeDasharray="439"
              strokeDashoffset={439 - (439 * 82) / 100}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />

            {/* Ring 1 (Outer / Year 1) */}
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="#A4C78B"
              strokeWidth="11"
              strokeDasharray="552"
              strokeDashoffset={552 - (552 * 78) / 100}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
          </svg>
        </div>

        {/* Legend / Breakdown */}
        <div className="flex-1 space-y-2.5 w-full">
          {cohorts.map((c, i) => (
            <div
              key={c.year}
              className="p-2.5 rounded-xl border border-[#F0EAE1] bg-[#F7F3E8]/40 hover:bg-[#F7F3E8] transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#22261F] flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  {c.year}
                </span>
                <span className="font-serif font-bold text-[#1F4D3A] text-sm tabular-nums">
                  {c.retentionRate}% retained
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#66695C]">
                <span>{c.label}</span>
                <span>{c.donorCount} supporters active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

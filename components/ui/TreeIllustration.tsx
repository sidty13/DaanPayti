"use client";

import React from "react";

interface TreeIllustrationProps {
  supporterCount: number;
  className?: string;
}

export function TreeIllustration({ supporterCount, className = "" }: TreeIllustrationProps) {
  // Tree stage calculated from active supporters
  // Stage 1: Sprouting (1-5)
  // Stage 2: Young Banyan (6-15)
  // Stage 3: Spreading Banyan (16-25)
  // Stage 4: Majestic Canopy (26+)
  const stage = supporterCount >= 25 ? 4 : supporterCount >= 15 ? 3 : supporterCount >= 6 ? 2 : 1;

  const stageDescriptions = [
    "",
    "Tender Sapling: Early roots grounding UPAY's mission",
    "Young Grove: Branches spreading into 5 city learning pods",
    "Matured Canopy: 20+ sustained supporters sheltering 1,200 street learners",
    "Grand Banyan: Broad shade, deep aerial roots, generational community impact",
  ];

  return (
    <div className={`relative flex flex-col items-center justify-center p-4 bg-[#FFFDF8] rounded-2xl border border-[#E3DCC8] shadow-card overflow-hidden ${className}`}>
      {/* Background ambient ring decor */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
        <div className="w-[320px] h-[320px] rounded-full border border-[#1F4D3A] border-dashed animate-[spin_120s_linear_infinite]" />
        <div className="absolute w-[240px] h-[240px] rounded-full border border-[#8FB573]" />
      </div>

      {/* Dynamic SVG Banyan Tree */}
      <svg
        viewBox="0 0 400 280"
        className="w-full max-w-[420px] h-auto drop-shadow-sm select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soil Base Mound */}
        <path
          d="M 60 250 Q 200 238 340 250 Q 200 265 60 250 Z"
          fill="#EFE7D6"
          stroke="#D5CBB5"
          strokeWidth="1.5"
        />

        {/* Deep Ground Roots */}
        <g stroke="#6B4F3A" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85">
          <path d="M 185 240 Q 160 255 120 262" />
          <path d="M 200 242 Q 200 260 195 272" />
          <path d="M 215 240 Q 245 254 285 264" />
          <path d="M 175 242 Q 140 248 105 252" strokeWidth="1.5" />
          <path d="M 225 242 Q 260 249 295 254" strokeWidth="1.5" />
        </g>

        {/* Main Trunk */}
        <g stroke="#533C2C" strokeLinecap="round" fill="#6B4F3A">
          <path
            d="M 180 240 C 182 210, 175 175, 160 145 C 175 160, 190 170, 200 170 C 210 170, 225 160, 240 145 C 225 175, 218 210, 220 240 Z"
            strokeWidth="1.5"
          />
        </g>

        {/* Aerial Banyan Roots (Prop Roots) */}
        {stage >= 2 && (
          <g stroke="#7C5D45" strokeWidth="2" strokeLinecap="round" strokeDasharray="none" opacity="0.9">
            <path d="M 145 138 Q 135 185 140 242" />
            <path d="M 255 138 Q 265 185 260 242" />
          </g>
        )}
        {stage >= 3 && (
          <g stroke="#8B6C53" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
            <path d="M 110 120 Q 95 180 105 244" />
            <path d="M 290 120 Q 305 180 295 244" />
          </g>
        )}
        {stage >= 4 && (
          <g stroke="#9C7E66" strokeWidth="1.5" strokeLinecap="round" opacity="0.75">
            <path d="M 85 110 Q 70 175 78 246" />
            <path d="M 315 110 Q 330 175 322 246" />
          </g>
        )}

        {/* Major Branches */}
        <g stroke="#533C2C" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M 185 165 C 160 140, 125 125, 90 115" />
          <path d="M 215 165 C 240 140, 275 125, 310 115" />
          <path d="M 195 150 C 185 115, 175 90, 160 70" />
          <path d="M 205 150 C 215 115, 225 90, 240 70" />
        </g>

        {/* Stage 1 Foliage: Central Seedling / Sapling Cluster */}
        <g fill="#8FB573" stroke="#1F4D3A" strokeWidth="1.2" opacity="0.95">
          <ellipse cx="200" cy="115" rx="35" ry="24" />
          <ellipse cx="185" cy="95" rx="28" ry="20" fill="#A4C78B" />
          <ellipse cx="215" cy="95" rx="28" ry="20" fill="#749B5B" />
          <ellipse cx="200" cy="78" rx="24" ry="18" fill="#8FB573" />
        </g>

        {/* Stage 2 Foliage: Mid-Branches */}
        {stage >= 2 && (
          <g fill="#749B5B" stroke="#1F4D3A" strokeWidth="1.2" opacity="0.95">
            <ellipse cx="140" cy="110" rx="36" ry="24" fill="#8FB573" />
            <ellipse cx="260" cy="110" rx="36" ry="24" fill="#6B9352" />
            <ellipse cx="160" cy="80" rx="32" ry="22" fill="#A4C78B" />
            <ellipse cx="240" cy="80" rx="32" ry="22" fill="#8FB573" />
          </g>
        )}

        {/* Stage 3 Foliage: Spreading Canopy */}
        {stage >= 3 && (
          <g fill="#1F4D3A" stroke="#173B2C" strokeWidth="1.2" opacity="0.92">
            <ellipse cx="95" cy="105" rx="38" ry="25" fill="#8FB573" />
            <ellipse cx="305" cy="105" rx="38" ry="25" fill="#749B5B" />
            <ellipse cx="120" cy="80" rx="35" ry="24" fill="#A4C78B" />
            <ellipse cx="280" cy="80" rx="35" ry="24" fill="#A4C78B" />
            <ellipse cx="200" cy="55" rx="42" ry="26" fill="#6B9352" />
          </g>
        )}

        {/* Stage 4 Foliage: Grand Banyan Canopy & Golden Fruits */}
        {stage >= 4 && (
          <>
            <g fill="#8FB573" stroke="#173B2C" strokeWidth="1" opacity="0.95">
              <ellipse cx="65" cy="100" rx="34" ry="22" fill="#A4C78B" />
              <ellipse cx="335" cy="100" rx="34" ry="22" fill="#8FB573" />
              <ellipse cx="90" cy="65" rx="38" ry="24" fill="#6B9352" />
              <ellipse cx="310" cy="65" rx="38" ry="24" fill="#749B5B" />
              <ellipse cx="150" cy="50" rx="38" ry="22" fill="#A4C78B" />
              <ellipse cx="250" cy="50" rx="38" ry="22" fill="#A4C78B" />
              <ellipse cx="200" cy="40" rx="42" ry="24" fill="#8FB573" />
            </g>

            {/* Banyan Figs / Golden Impact Fruits (#D9A441) */}
            <g fill="#D9A441" stroke="#9E7321" strokeWidth="1">
              <circle cx="110" cy="85" r="4.5" />
              <circle cx="170" cy="65" r="4.5" />
              <circle cx="230" cy="65" r="4.5" />
              <circle cx="290" cy="85" r="4.5" />
              <circle cx="200" cy="95" r="5" />
              <circle cx="145" cy="120" r="4" />
              <circle cx="255" cy="120" r="4" />
              <circle cx="75" cy="110" r="4" />
              <circle cx="325" cy="110" r="4" />
            </g>
          </>
        )}

        {/* Hand-drawn leaf line accents */}
        <g stroke="#FFFFFF" strokeWidth="1" opacity="0.6" fill="none">
          <path d="M 195 72 Q 200 68 205 72" />
          <path d="M 155 78 Q 160 74 165 78" />
          <path d="M 235 78 Q 240 74 245 78" />
        </g>
      </svg>

      {/* Canopy state summary & Indian metaphor */}
      <div className="mt-2 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-medium border border-[#C7DAC0]">
          <span className="w-2 h-2 rounded-full bg-[#8FB573] animate-pulse" />
          <span>Stage {stage} Canopy: {supporterCount} Active Supporters</span>
        </div>
        <p className="text-xs text-[#66695C] mt-1 italic">
          {stageDescriptions[stage]}
        </p>
      </div>
    </div>
  );
}

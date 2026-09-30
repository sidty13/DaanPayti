"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDaanPayti } from "@/lib/store";
import { formatINR, formatDate } from "@/lib/utils";
import { GrowthBadge } from "@/components/ui/GrowthBadge";
import {
  TreeDeciduous,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Sparkles,
  Heart,
  MessageSquare,
  FileText,
  UserCheck,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react";

export default function Donor360Page() {
  const { donors, gifts, selectedDonorId, setSelectedDonorId } = useDaanPayti();

  // Selected donor (fallback to first donor)
  const currentDonor = donors.find((d) => d.id === selectedDonorId) || donors[0];

  // Gifts associated with this supporter
  const donorGifts = gifts.filter(
    (g) => g.donorId === currentDonor.id || g.donorName.toLowerCase() === currentDonor.name.toLowerCase()
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header & Donor Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#C7DAC0] mb-2">
            <TreeDeciduous className="w-3.5 h-3.5 text-[#1F4D3A]" />
            <span>Layer 3: Supporter Intelligence &amp; Care</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-[#1F4D3A]">
            Donor 360 <span className="font-devanagari font-normal text-2xl text-[#66695C]">(समर्थक ३६०)</span>
          </h1>
          <p className="text-sm text-[#66695C] mt-1">
            Complete relationship memory, tree-ring giving timeline, and personalised care cadence.
          </p>
        </div>

        {/* Supporter Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-[#66695C]">Viewing:</label>
          <select
            value={currentDonor.id}
            onChange={(e) => setSelectedDonorId(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#E3DCC8] bg-[#FFFDF8] text-[#22261F] shadow-soft focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]"
          >
            {donors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.growthStage.toUpperCase()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Supporter Hero Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E3DCC8]">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1F4D3A] text-[#FFFDF8] font-serif font-bold text-2xl flex items-center justify-center flex-shrink-0 shadow-soft">
              {currentDonor.name.charAt(0)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-serif font-bold text-2xl md:text-3xl text-[#22261F]">
                  {currentDonor.name}
                </h2>
                <GrowthBadge stage={currentDonor.growthStage} showHindi={true} size="md" />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#66695C] mt-2">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#1F4D3A]" />
                  {currentDonor.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#1F4D3A]" />
                  {currentDonor.phone}
                </span>
                <span>•</span>
                <span>{currentDonor.city}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                {currentDonor.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-[#F7F3E8] text-[#6B4F3A] text-[11px] font-medium border border-[#E3DCC8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Lifetime Giving Highlights */}
          <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] text-right flex-shrink-0 min-w-[200px]">
            <div className="text-xs text-[#66695C]">Lifetime Gifts Given</div>
            <div className="font-serif font-bold text-2xl text-[#1F4D3A] tabular-nums mt-1">
              {formatINR(currentDonor.lifetimeGivingINR)}
            </div>
            <div className="text-[11px] text-[#4A7338] font-medium mt-1">
              {currentDonor.totalGiftsCount} gifts recorded • First planted {formatDate(currentDonor.firstGiftDate)}
            </div>
          </div>
        </div>

        {/* 4 Quick Supporter Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs">
          <div className="p-3 rounded-xl bg-[#F7F3E8]/60 border border-[#F0EAE1]">
            <span className="text-[#66695C]">Giving Cadence</span>
            <div className="font-semibold text-sm text-[#22261F] mt-1">
              {currentDonor.recurringActive
                ? `Monthly Recurring (${formatINR(currentDonor.recurringAmountINR || 0)})`
                : "Periodic / Occasion Based"}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F7F3E8]/60 border border-[#F0EAE1]">
            <span className="text-[#66695C]">Preferred Channel</span>
            <div className="font-semibold text-sm text-[#22261F] mt-1">
              {currentDonor.preferredChannel}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F7F3E8]/60 border border-[#F0EAE1]">
            <span className="text-[#66695C]">80G Tax Exemption PAN</span>
            <div className="font-semibold text-sm text-[#1F4D3A] font-mono mt-1">
              {currentDonor.pan || "Awaiting PAN"}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F7F3E8]/60 border border-[#F0EAE1]">
            <span className="text-[#66695C]">Engagement Score</span>
            <div className="font-serif font-bold text-sm text-[#1F4D3A] mt-1 flex items-center gap-1.5">
              <span>{currentDonor.engagementScore}/100</span>
              <span className="w-2 h-2 rounded-full bg-[#8FB573]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Visual: Tree Ring Timeline & AI Next Step */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Tree Ring Giving Timeline */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1F4D3A]">
                Tree Ring Giving Timeline
              </h3>
              <p className="text-xs text-[#66695C]">
                Chronological rings of nourishment across campaigns and channels
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold">
              {donorGifts.length} Recorded Gifts
            </span>
          </div>

          {/* Timeline Nodes */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#8FB573]/50">
            {donorGifts.map((gift, idx) => (
              <div key={gift.id} className="relative group">
                {/* Ring Marker Node */}
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#FFFDF8] border-2 border-[#1F4D3A] flex items-center justify-center group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8FB573]" />
                </div>

                <div className="p-3.5 rounded-xl border border-[#E3DCC8] bg-[#F7F3E8]/40 hover:bg-[#F7F3E8] transition-colors">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-sm text-[#1F4D3A] tabular-nums">
                      {formatINR(gift.amountINR)}
                    </span>
                    <span className="text-[11px] text-[#66695C]">{formatDate(gift.date)}</span>
                  </div>

                  <p className="text-xs text-[#22261F] font-medium">
                    {gift.campaign}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#66695C] pt-2 border-t border-[#F0EAE1]">
                    <span>Channel: <strong>{gift.channel}</strong></span>
                    <span className="font-mono">{gift.receiptNumber || gift.referenceNumber}</span>
                  </div>
                </div>
              </div>
            ))}

            {donorGifts.length === 0 && (
              <div className="p-6 text-center text-xs text-[#66695C] italic">
                Initial gift from {currentDonor.firstGiftDate} recorded in legacy archives.
              </div>
            )}
          </div>
        </div>

        {/* Right Col: AI-Suggested Next Step & Care Panels */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI-Suggested Next Step Card */}
          <div className="p-5 rounded-2xl bg-[#FFFDF8] border-2 border-[#D9A441]/40 shadow-soft space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#D9A441]/20 text-[#B88220] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#D9A441]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F4D3A]">
                AI-Suggested Next Care Step
              </h3>
            </div>
            <p className="text-xs text-[#22261F] leading-relaxed bg-[#F7F3E8] p-3 rounded-xl border border-[#E3DCC8]">
              {currentDonor.aiSuggestedNextStep}
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-[#66695C] italic">Grounded in 18 months of giving history</span>
              <Link
                href="/seeds-of-words"
                className="px-3 py-1.5 rounded-lg bg-[#1F4D3A] text-[#FFFDF8] text-xs font-semibold flex items-center gap-1 shadow-soft"
              >
                <span>Draft Note</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Communication History Panel */}
          <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0EAE1]">
              <h3 className="font-serif font-bold text-base text-[#1F4D3A]">
                Communication Log
              </h3>
              <span className="text-[11px] text-[#66695C]">
                {currentDonor.communications.length} Touchpoints
              </span>
            </div>

            <div className="space-y-2.5">
              {currentDonor.communications.map((comm) => (
                <div key={comm.id} className="p-3 rounded-xl bg-[#F7F3E8]/50 border border-[#F0EAE1] text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#22261F]">{comm.title}</span>
                    <span className="text-[10px] text-[#66695C]">{formatDate(comm.date)}</span>
                  </div>
                  <p className="text-[11px] text-[#66695C]">{comm.summary}</p>
                  <div className="mt-1 text-[10px] text-[#8FB573] font-medium">Logged by: {comm.author}</div>
                </div>
              ))}

              {currentDonor.communications.length === 0 && (
                <div className="p-4 text-center text-xs text-[#66695C] italic">
                  No direct outreach logged yet this quarter.
                </div>
              )}
            </div>
          </div>

          {/* Consent & Data Privacy Card */}
          <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft text-xs space-y-2">
            <h4 className="font-serif font-bold text-sm text-[#1F4D3A] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4A7338]" />
              <span>Consent &amp; Tax Preferences</span>
            </h4>
            <div className="space-y-1.5 text-[#66695C]">
              <div className="flex items-center justify-between">
                <span>WhatsApp Impact Stories:</span>
                <span className="font-semibold text-[#4A7338]">Opted-In</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Annual 80G Certificate:</span>
                <span className="font-semibold text-[#4A7338]">Automated Dispatch</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Privacy (DPDP 2023):</span>
                <span className="font-semibold text-[#1F4D3A]">Explicit Care Consent Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

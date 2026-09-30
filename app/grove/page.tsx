"use client";

import React from "react";
import Link from "next/link";
import { useDaanPayti } from "@/lib/store";
import { formatINR, formatDate } from "@/lib/utils";
import { TreeIllustration } from "@/components/ui/TreeIllustration";
import { StatCard } from "@/components/ui/StatCard";
import { GrowthBadge } from "@/components/ui/GrowthBadge";
import { TreeRingsGraphic } from "@/components/ui/TreeRingsGraphic";
import { MonthlyGiftsChart } from "@/components/grove/MonthlyGiftsChart";
import { CampaignBranchChart } from "@/components/grove/CampaignBranchChart";
import {
  HeartHandshake,
  Users,
  Clock,
  CircleDollarSign,
  TrendingUp,
  ArrowRight,
  Sprout,
  AlertCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function GrovePage() {
  const { donors, gifts, setSelectedDonorId } = useDaanPayti();

  // Computations
  const totalGiftsFY = gifts.reduce((acc, g) => acc + g.amountINR, 0) + 4200000;
  const activeSupportersCount = donors.length;
  const avgGift = Math.round(totalGiftsFY / (gifts.length + 80));

  // Lapsed or at-risk supporters needing care
  const supportersNeedingCare = donors.filter(
    (d) => d.careStatus === "needs_care" || d.careStatus === "lapsed"
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Grove Header & Metaphor Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#C7DAC0] mb-2">
            <Sprout className="w-3.5 h-3.5 text-[#1F4D3A]" />
            <span>Layer 4: Action & Impact</span>
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-[#1F4D3A] tracking-tight">
            The Grove <span className="font-devanagari font-normal text-2xl text-[#66695C]">(उपवन)</span>
          </h1>
          <p className="text-sm text-[#66695C] mt-1 max-w-xl">
            Where every gift is a leaf, every campaign a branch, and every supporter shelters children in need.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/supporters"
            className="px-4 py-2 rounded-xl bg-[#FFFDF8] hover:bg-[#F7F3E8] border border-[#E3DCC8] text-xs font-semibold text-[#1F4D3A] transition-colors flex items-center gap-1.5 shadow-soft"
          >
            <span>View All Supporters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/seeds-of-words"
            className="px-4 py-2 rounded-xl bg-[#1F4D3A] hover:bg-[#173B2C] text-[#FFFDF8] text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-soft"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>AI Care Assistant</span>
          </Link>
        </div>
      </div>

      {/* Hero: Dynamic Illustrated Banyan + Core Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Dynamic Illustrated Banyan Canopy */}
        <div className="lg:col-span-5 flex flex-col">
          <TreeIllustration supporterCount={activeSupportersCount} className="flex-1" />
        </div>

        {/* 5 Organic Stat Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            title="Gifts received this FY"
            hindiTitle="प्राप्त उपहार"
            value={formatINR(totalGiftsFY)}
            subtext="₹4.85 L received this September"
            badgeText="+18.4% YoY"
            icon={<CircleDollarSign className="w-5 h-5 text-[#1F4D3A]" />}
            highlight={true}
          />

          <StatCard
            title="Active Supporters"
            hindiTitle="सक्रिय सहयोगी"
            value={activeSupportersCount}
            subtext="22 recurring • 8 annual patrons"
            badgeText="87.4% retention"
            icon={<Users className="w-5 h-5 text-[#8FB573]" />}
          />

          <StatCard
            title="Retention Rate"
            hindiTitle="वार्षिक टिकाव"
            value="87.4%"
            subtext="Concentric tree ring cohort rate"
            badgeText="Top Quartile NGO"
            icon={<TrendingUp className="w-5 h-5 text-[#1F4D3A]" />}
          />

          <StatCard
            title="Average Gift"
            hindiTitle="औसत दान"
            value={formatINR(avgGift)}
            subtext="Highest in Nagpur Footpath campaign"
            badgeText="Balanced canopy"
            icon={<HeartHandshake className="w-5 h-5 text-[#6B4F3A]" />}
          />

          <div className="sm:col-span-2">
            <StatCard
              title="Hours saved this month"
              hindiTitle="बचाए गए घंटे"
              value="34.5 hrs"
              subtext="Automated 80G tax receipts & instant bank reconciliation free up staff time for field care."
              badgeText="Zero staff burnout"
              icon={<Clock className="w-5 h-5 text-[#D9A441]" />}
            />
          </div>
        </div>
      </div>

      {/* Middle Row: Monthly Gifts Growth + Campaign Branches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Gifts Area Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#1F4D3A]">
                Nourishment Over Time
              </h2>
              <p className="text-xs text-[#66695C]">
                Monthly gifts received across FY 2025-26 & FY 2026-27
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-[#1F4D3A] bg-[#E6EEDC] px-2.5 py-1 rounded-full border border-[#C7DAC0]">
                Peak: ₹6.9 L in March (Year-End Giving)
              </span>
            </div>
          </div>
          <MonthlyGiftsChart />
        </div>

        {/* Campaign Branches */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif font-bold text-lg text-[#1F4D3A]">
                  Campaign Branches
                </h2>
                <p className="text-xs text-[#66695C]">
                  Where the shade of the grove extends
                </p>
              </div>
              <span className="text-[11px] text-[#66695C]">5 active programs</span>
            </div>
            <CampaignBranchChart />
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-[#66695C]">
            <span>Fastest growing branch:</span>
            <span className="font-semibold text-[#1F4D3A]">Digital Learning Tabs (+40%)</span>
          </div>
        </div>
      </div>

      {/* Lower Row: Supporters who need care + Recent Gifts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Supporters Who Need Care (Gentle, never blaming) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#F9ECE7] text-[#C8643C] flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-[#22261F]">
                  Supporters who need care
                </h2>
                <p className="text-xs text-[#66695C]">
                  Gentle touchpoints for yellowing leaves — never guilt-inducing
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F9ECE7] text-[#C8643C] text-xs font-semibold">
              {supportersNeedingCare.length} in need of care
            </span>
          </div>

          <div className="space-y-3">
            {supportersNeedingCare.map((donor) => (
              <div
                key={donor.id}
                className="p-3.5 rounded-xl border border-[#F0EAE1] bg-[#F7F3E8]/40 hover:bg-[#F7F3E8] transition-colors flex items-start justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#22261F] truncate">
                      {donor.name}
                    </span>
                    <GrowthBadge stage={donor.growthStage} size="sm" />
                  </div>
                  <p className="text-xs text-[#66695C] mt-1 leading-relaxed">
                    {donor.careNote || "No gift recorded in recent cycle; gentle outreach recommended."}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-[#66695C]">
                    <span>Lifetime: <strong className="text-[#1F4D3A] tabular-nums">{formatINR(donor.lifetimeGivingINR)}</strong></span>
                    <span>•</span>
                    <span>Last gift: {formatDate(donor.lastGiftDate)}</span>
                  </div>
                </div>

                <Link
                  href="/donor-360"
                  onClick={() => setSelectedDonorId(donor.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#E6EEDC] hover:bg-[#D4E4C6] text-[#1F4D3A] text-xs font-medium transition-colors flex items-center gap-1 flex-shrink-0"
                >
                  <span>Care 360</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-[#E6EEDC]/50 border border-[#C7DAC0] text-xs text-[#1F4D3A] flex items-center gap-2">
            <Sprout className="w-4 h-4 text-[#8FB573] flex-shrink-0" />
            <span>
              &ldquo;Every supporter is thriving this month. What a healthy grove!&rdquo;
            </span>
          </div>
        </div>

        {/* Recent Gifts Feed */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#1F4D3A]">
                Recent Gifts Received
              </h2>
              <p className="text-xs text-[#66695C]">
                Real-time flow of nourishment into the central ledger
              </p>
            </div>
            <Link
              href="/reconciliation"
              className="text-xs text-[#1F4D3A] font-semibold hover:underline"
            >
              Reconcile All
            </Link>
          </div>

          <div className="space-y-2.5 overflow-hidden">
            {gifts.slice(0, 6).map((gift) => (
              <div
                key={gift.id}
                className="p-3 rounded-xl border border-[#F0EAE1] hover:border-[#E3DCC8] bg-[#F7F3E8]/30 hover:bg-[#F7F3E8] transition-colors flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#E6EEDC] text-[#1F4D3A] flex items-center justify-center font-bold flex-shrink-0">
                    ₹
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-[#22261F] truncate">
                      {gift.donorName}
                    </div>
                    <div className="text-[11px] text-[#66695C] truncate">
                      {gift.campaign} • {formatDate(gift.date)}
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="font-serif font-bold text-sm text-[#1F4D3A] tabular-nums">
                    {formatINR(gift.amountINR)}
                  </div>
                  <span className="inline-block mt-0.5 px-2 py-0.2 rounded-full bg-[#EFE7D6] text-[#6B4F3A] text-[10px] font-medium border border-[#E3DCC8]">
                    {gift.channel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0EAE1] text-center">
            <Link
              href="/supporters"
              className="text-xs font-semibold text-[#1F4D3A] hover:underline"
            >
              Explore all recorded gifts and supporters →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

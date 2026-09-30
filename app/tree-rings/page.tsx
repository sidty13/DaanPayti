"use client";

import React, { useState } from "react";
import { useDaanPayti } from "@/lib/store";
import { formatINR, formatCompactINR } from "@/lib/utils";
import { TreeRingsGraphic } from "@/components/ui/TreeRingsGraphic";
import { CAMPAIGN_BRANCH_DATA } from "@/data/mockGifts";
import {
  LineChart,
  Download,
  Calendar,
  FileSpreadsheet,
  CheckCircle2,
  TrendingUp,
  Trees,
  Award,
  Users,
} from "lucide-react";

export default function TreeRingsPage() {
  const { donors, gifts } = useDaanPayti();
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      "Donor ID",
      "Full Name",
      "Stage",
      "City",
      "Phone",
      "PAN",
      "Preferred Channel",
      "Recurring",
      "Total Gifts",
      "Lifetime Giving INR",
      "Primary Campaign",
      "Care Status",
    ];

    const rows = donors.map((d) => [
      d.id,
      `"${d.name}"`,
      d.growthStage,
      `"${d.city}"`,
      `"${d.phone}"`,
      d.pan || "",
      d.preferredChannel,
      d.recurringActive ? "Yes" : "No",
      d.totalGiftsCount,
      d.lifetimeGivingINR,
      `"${d.primaryCampaign}"`,
      d.careStatus,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `UPAY_DaanPayti_Supporters_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice("Supporters report exported as Excel CSV!");
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#C7DAC0] mb-2">
            <LineChart className="w-3.5 h-3.5 text-[#1F4D3A]" />
            <span>Layer 3: Enduring Insights &amp; Cohorts</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-[#1F4D3A]">
            Tree Rings <span className="font-devanagari font-normal text-2xl text-[#66695C]">(वार्षिक वलय)</span> — Reports &amp; Insights
          </h1>
          <p className="text-sm text-[#66695C] mt-1 max-w-2xl">
            Reading the health of UPAY through the concentric rings of supporter retention, campaign branches, and giving frequency.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-[#1F4D3A] hover:bg-[#173B2C] text-[#FFFDF8] font-semibold text-xs transition-all flex items-center gap-2 shadow-soft"
          >
            <Download className="w-4 h-4 text-[#D9A441]" />
            <span>Export Supporter Audit (CSV/Excel)</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 rounded-xl bg-[#E6EEDC] border border-[#8FB573] text-xs text-[#1F4D3A] font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#4A7338]" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Cohort Tree Rings Visualizer Card */}
      <TreeRingsGraphic />

      {/* Branch & Campaign Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Branches */}
        <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1F4D3A]">
                Branch-Wise Shade &amp; Yield
              </h3>
              <p className="text-xs text-[#66695C]">
                Total gifts and supporter density across UPAY programs
              </p>
            </div>
            <span className="text-xs font-semibold text-[#1F4D3A]">FY 26-27</span>
          </div>

          <div className="space-y-4">
            {CAMPAIGN_BRANCH_DATA.map((camp) => (
              <div key={camp.name} className="p-3.5 rounded-xl bg-[#F7F3E8]/50 border border-[#F0EAE1]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#22261F] flex items-center gap-1.5">
                    <Trees className="w-4 h-4 text-[#1F4D3A]" />
                    {camp.name}
                  </span>
                  <span className="font-serif font-bold text-[#1F4D3A] text-sm tabular-nums">
                    {formatINR(camp.totalINR)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#66695C]">
                  <span>{camp.donors} active supporters</span>
                  <span className="font-semibold text-[#4A7338]">{camp.growth} growth YoY</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Giving Frequency & Growth Distribution */}
        <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1F4D3A]">
                Supporter Stage Distribution
              </h3>
              <p className="text-xs text-[#66695C]">
                How individual seeds mature into generational banyans
              </p>
            </div>
            <span className="text-xs font-semibold text-[#4A7338]">30 Supporters</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#F7F3E8]/70 border border-[#E3DCC8]">
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-[#1F4D3A]">Banyan (Long-term Pillars, 8 supporters)</span>
                <span className="font-serif font-bold tabular-nums">68% of Total Giving</span>
              </div>
              <p className="text-[#66695C] text-[11px]">
                8 foundational supporters and institutional trusts who provide core stability.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F3E8]/70 border border-[#E3DCC8]">
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-[#1F4D3A]">Young Tree (Recurring, 9 supporters)</span>
                <span className="font-serif font-bold tabular-nums">20% of Total Giving</span>
              </div>
              <p className="text-[#66695C] text-[11px]">
                Monthly recurring givers providing reliable operational funds for teachers and nutrition.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F3E8]/70 border border-[#E3DCC8]">
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-[#1F4D3A]">Saplings (2–3 gifts, 7 supporters)</span>
                <span className="font-serif font-bold tabular-nums">8% of Total Giving</span>
              </div>
              <p className="text-[#66695C] text-[11px]">
                Repeat contributors growing their roots through annual and seasonal campaigns.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F3E8]/70 border border-[#E3DCC8]">
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-[#1F4D3A]">Seeds (First Gift, 6 supporters)</span>
                <span className="font-serif font-bold tabular-nums">4% of Total Giving</span>
              </div>
              <p className="text-[#66695C] text-[11px]">
                Fresh believers newly welcomed into the grove this fiscal quarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

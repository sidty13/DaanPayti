"use client";

import React from "react";
import { CAMPAIGN_BRANCH_DATA } from "@/data/mockGifts";
import { formatCompactINR, formatINR } from "@/lib/utils";
import { Trees, ArrowUpRight } from "lucide-react";

export function CampaignBranchChart() {
  const maxAmount = Math.max(...CAMPAIGN_BRANCH_DATA.map((d) => d.totalINR));

  return (
    <div className="space-y-3.5">
      {CAMPAIGN_BRANCH_DATA.map((campaign) => {
        const percentage = Math.round((campaign.totalINR / maxAmount) * 100);
        return (
          <div key={campaign.name} className="group">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-[#22261F] flex items-center gap-1.5">
                <Trees className="w-3.5 h-3.5 text-[#1F4D3A]" />
                {campaign.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#66695C]">{campaign.donors} supporters</span>
                <span className="font-serif font-bold text-[#1F4D3A] tabular-nums">
                  {formatINR(campaign.totalINR)}
                </span>
                <span className="text-[11px] font-semibold text-[#4A7338] bg-[#EBF3E4] px-1.5 py-0.2 rounded">
                  {campaign.growth}
                </span>
              </div>
            </div>

            {/* Organic Branch Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[#EFE7D6] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: campaign.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

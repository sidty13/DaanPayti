import React from "react";
import { Leaf } from "lucide-react";

interface StatCardProps {
  title: string;
  hindiTitle?: string;
  value: string | number;
  subtext?: string;
  badgeText?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

export function StatCard({
  title,
  hindiTitle,
  value,
  subtext,
  badgeText,
  icon,
  highlight = false,
}: StatCardProps) {
  return (
    <div
      className={`relative p-5 rounded-card border transition-all duration-200 ${
        highlight
          ? "bg-[#FFFDF8] border-[#D9A441] shadow-card ring-1 ring-[#D9A441]/30"
          : "bg-[#FFFDF8] border-[#E3DCC8] shadow-soft hover:shadow-card hover:border-[#8FB573]/60"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#66695C]">
            <span>{title}</span>
            {hindiTitle && <span className="opacity-70 font-normal">({hindiTitle})</span>}
          </div>
          <div className="mt-2 text-2xl lg:text-3xl font-serif font-bold text-[#22261F] tabular-nums tracking-tight">
            {value}
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] text-[#1F4D3A]">
          {icon || <Leaf className="w-5 h-5 text-[#8FB573]" />}
        </div>
      </div>

      {(subtext || badgeText) && (
        <div className="mt-3 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-[#66695C]">
          <span>{subtext}</span>
          {badgeText && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-[11px] font-medium border border-[#C7DAC0]">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

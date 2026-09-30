import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as Indian Currency (e.g. ₹1,25,000)
 */
export function formatINR(amount: number, showDecimals = false): string {
  if (isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
}

/**
 * Compact Indian currency format (e.g. ₹12.5 L, ₹1.4 Cr)
 */
export function formatCompactINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)} k`;
  }
  return `₹${amount}`;
}

/**
 * Format date in friendly Indian format (e.g. "14 Oct 2026")
 */
export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return dateString;
  }
}

export type GrowthStage = "seed" | "sapling" | "young_tree" | "banyan";

export interface GrowthStageMeta {
  stage: GrowthStage;
  label: string;
  hindiLabel: string;
  metaphor: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

export const GROWTH_STAGE_CONFIG: Record<GrowthStage, GrowthStageMeta> = {
  seed: {
    stage: "seed",
    label: "Seed",
    hindiLabel: "बीज (1st gift)",
    metaphor: "First gift planted with hope",
    colorClass: "text-[#6B4F3A]",
    bgClass: "bg-[#F5EFE6]",
    borderClass: "border-[#E3D5C5]",
  },
  sapling: {
    stage: "sapling",
    label: "Sapling",
    hindiLabel: "अंकुर (2–3 gifts)",
    metaphor: "Roots taking hold with repeat care",
    colorClass: "text-[#4A7338]",
    bgClass: "bg-[#EBF3E4]",
    borderClass: "border-[#D1E6C5]",
  },
  young_tree: {
    stage: "young_tree",
    label: "Young Tree",
    hindiLabel: "तरु (Recurring)",
    metaphor: "Steady monthly nourishment for the grove",
    colorClass: "text-[#1F4D3A]",
    bgClass: "bg-[#E6EEDC]",
    borderClass: "border-[#C7DAC0]",
  },
  banyan: {
    stage: "banyan",
    label: "Banyan",
    hindiLabel: "वटवृक्ष (Long-term)",
    metaphor: "Spreading broad shade & enduring stability",
    colorClass: "text-[#16382A]",
    bgClass: "bg-[#DFEBE3]",
    borderClass: "border-[#B2D1C1]",
  },
};

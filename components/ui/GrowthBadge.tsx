import React from "react";
import { GrowthStage, GROWTH_STAGE_CONFIG } from "@/lib/utils";
import { Sprout, TreeDeciduous, Trees, Leaf } from "lucide-react";

interface GrowthBadgeProps {
  stage: GrowthStage;
  showHindi?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GrowthBadge({ stage, showHindi = false, size = "md", className = "" }: GrowthBadgeProps) {
  const meta = GROWTH_STAGE_CONFIG[stage] || GROWTH_STAGE_CONFIG.seed;

  const renderIcon = () => {
    switch (stage) {
      case "seed":
        return <Leaf className={size === "sm" ? "w-3 h-3 text-[#8A5A36]" : "w-3.5 h-3.5 text-[#8A5A36]"} />;
      case "sapling":
        return <Sprout className={size === "sm" ? "w-3 h-3 text-[#4A7338]" : "w-3.5 h-3.5 text-[#4A7338]"} />;
      case "young_tree":
        return <TreeDeciduous className={size === "sm" ? "w-3 h-3 text-[#1F4D3A]" : "w-3.5 h-3.5 text-[#1F4D3A]"} />;
      case "banyan":
        return <Trees className={size === "sm" ? "w-3 h-3 text-[#16382A]" : "w-3.5 h-3.5 text-[#16382A]"} />;
    }
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs font-medium gap-1.5",
    lg: "px-3 py-1.5 text-sm font-medium gap-2",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-all duration-150 ${meta.bgClass} ${meta.borderClass} ${meta.colorClass} ${sizeClasses[size]} ${className}`}
      title={`${meta.label}: ${meta.metaphor}`}
    >
      {renderIcon()}
      <span>{meta.label}</span>
      {showHindi && <span className="text-[10px] opacity-75 font-normal">({meta.hindiLabel})</span>}
    </span>
  );
}

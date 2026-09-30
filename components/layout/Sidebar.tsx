"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sprout,
  Network,
  Users,
  TreeDeciduous,
  Scale,
  Bell,
  Sparkles,
  LineChart,
  Shield,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Trees,
} from "lucide-react";

const NAV_ITEMS = [
  {
    name: "The Grove",
    hindiName: "उपवन",
    href: "/grove",
    icon: Sprout,
    layer: "Layer 4: Action & Impact",
  },
  {
    name: "Roots",
    hindiName: "मूल",
    href: "/roots",
    icon: Network,
    layer: "Layers 1 & 2: Ingest & Unify",
  },
  {
    name: "Supporters",
    hindiName: "सहयोगी",
    href: "/supporters",
    icon: Users,
    layer: "Core Directory",
  },
  {
    name: "Donor 360",
    hindiName: "समर्थक ३६०",
    href: "/donor-360",
    icon: TreeDeciduous,
    layer: "Layer 3: Profile & Rings",
  },
  {
    name: "Balancing the Ledger",
    hindiName: "बहीखाता मिलान",
    href: "/reconciliation",
    icon: Scale,
    layer: "Layer 3: Smart Reconciliation",
  },
  {
    name: "Care Queue",
    hindiName: "देखभाल कतार",
    href: "/care-queue",
    icon: Bell,
    badge: "5",
    layer: "Layer 3: Automation",
  },
  {
    name: "Seeds of Words",
    hindiName: "शब्द-बीज",
    href: "/seeds-of-words",
    icon: Sparkles,
    badge: "AI",
    layer: "AI Human-in-the-Loop",
  },
  {
    name: "Tree Rings",
    hindiName: "वार्षिक वलय",
    href: "/tree-rings",
    icon: LineChart,
    layer: "Layer 3: Insights",
  },
  {
    name: "Bark",
    hindiName: "छाल",
    href: "/bark",
    icon: Shield,
    layer: "Settings & Governance",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex flex-col justify-between transition-all duration-300 ease-in-out border-r border-[#E3DCC8] bg-[#1F4D3A] text-[#F7F3E8] z-30 select-none ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Top Header / Brand Logo */}
      <div className="p-4 border-b border-[#173B2C]">
        <div className="flex items-center justify-between">
          <Link href="/grove" className="flex items-center gap-2.5 overflow-hidden">
            {/* Sprouting Seed Logo Mark */}
            <div className="w-10 h-10 rounded-xl bg-[#8FB573]/20 border border-[#8FB573]/40 flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21V12" stroke="#D9A441" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 12C12 8 8 5 4 5C4 9 7 12 12 12Z" fill="#8FB573" stroke="#A4C78B" strokeWidth="1.5"/>
                <path d="M12 12C12 8 16 5 20 5C20 9 17 12 12 12Z" fill="#A4C78B" stroke="#8FB573" strokeWidth="1.5"/>
              </svg>
            </div>

            {!collapsed && (
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-devanagari font-bold text-2xl text-[#FFFDF8] tracking-tight">दान</span>
                  <span className="text-[#D9A441] font-bold text-xl">-</span>
                  <span className="font-serif font-semibold text-xl text-[#FFFDF8] tracking-wide">PayTi</span>
                </div>
                <span className="text-[10px] text-[#A4C78B] font-medium tracking-wide">
                  UPAY • Donor Intelligence
                </span>
              </div>
            )}
          </Link>

          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="p-1.5 rounded-lg text-[#A4C78B] hover:text-[#FFFDF8] hover:bg-[#173B2C] transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {!collapsed && (
          <p className="mt-2 text-[11px] text-[#E6EEDC]/80 italic">
            &ldquo;From every seed, a banyan.&rdquo;
          </p>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href === "/grove" && pathname === "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? `${item.name} (${item.hindiName})` : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group ${
                isActive
                  ? "bg-[#FFFDF8] text-[#1F4D3A] font-semibold shadow-soft"
                  : "text-[#E6EEDC] hover:bg-[#173B2C] hover:text-[#FFFDF8]"
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-colors ${
                  isActive ? "text-[#1F4D3A]" : "text-[#8FB573] group-hover:text-[#A4C78B]"
                }`}
              />

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <div className="flex flex-col">
                    <span className="truncate">{item.name}</span>
                    <span className={`text-[10px] ${isActive ? "text-[#66695C]" : "text-[#A4C78B]/70"}`}>
                      {item.hindiName}
                    </span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        item.badge === "AI"
                          ? "bg-[#D9A441] text-[#22261F]"
                          : isActive
                          ? "bg-[#1F4D3A] text-[#FFFDF8]"
                          : "bg-[#8FB573]/30 text-[#FFFDF8]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer: Tiny Banyan Silhouette & UPAY Emblem */}
      <div className="p-3 border-t border-[#173B2C] bg-[#173B2C]/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1F4D3A] border border-[#8FB573]/40 flex items-center justify-center flex-shrink-0 text-[#8FB573]">
            <Trees className="w-4 h-4" />
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-[#FFFDF8] truncate">
                UPAY NGO Grove
              </div>
              <div className="text-[10px] text-[#A4C78B] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FB573] inline-block animate-pulse" />
                <span>Nagpur Central • 100% Care</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

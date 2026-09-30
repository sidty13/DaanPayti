"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Plus, Bell, HeartHandshake, ShieldCheck } from "lucide-react";
import { RecordGiftModal } from "./RecordGiftModal";
import { useDaanPayti } from "@/lib/store";

export function Topbar() {
  const { careTasks, recentGiftAnimation } = useDaanPayti();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pendingTasksCount = careTasks.filter((t) => !t.completed).length;

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-[#FFFDF8]/90 backdrop-blur-md border-b border-[#E3DCC8] px-6 flex items-center justify-between">
        {/* Global Search Bar */}
        <div className="relative w-72 lg:w-96">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#66695C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search supporters, PAN, receipt no, city..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E3DCC8] bg-[#F7F3E8] text-[#22261F] placeholder-[#66695C] focus:outline-none focus:ring-2 focus:ring-[#1F4D3A] transition-all"
          />
        </div>

        {/* Right Actions & Gold Primary CTA */}
        <div className="flex items-center gap-4">
          {/* Subtle Live Toast / Micro-interaction indicator */}
          {recentGiftAnimation && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#8FB573] animate-bounce">
              <span className="w-2 h-2 rounded-full bg-[#8FB573] animate-ping" />
              <span>New leaf sprouted in the Grove!</span>
            </div>
          )}

          {/* FY Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] text-xs text-[#22261F]">
            <span className="text-[#66695C]">Fiscal Period:</span>
            <span className="font-semibold text-[#1F4D3A]">FY 2026-27</span>
          </div>

          {/* Care Queue Bell Notification */}
          <Link
            href="/care-queue"
            className="relative p-2 rounded-xl text-[#22261F] hover:bg-[#F7F3E8] border border-transparent hover:border-[#E3DCC8] transition-colors"
            title="Care Queue Alerts"
          >
            <Bell className="w-5 h-5 text-[#1F4D3A]" />
            {pendingTasksCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C8643C] text-white text-[10px] font-bold flex items-center justify-center shadow-soft">
                {pendingTasksCount}
              </span>
            )}
          </Link>

          {/* At Most ONE Primary Sunlit Gold CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D9A441] hover:bg-[#C59232] text-[#22261F] font-semibold text-xs shadow-soft transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Record a gift</span>
          </button>
        </div>
      </header>

      {/* Interactive Modal */}
      <RecordGiftModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

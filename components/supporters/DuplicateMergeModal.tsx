"use client";

import React, { useState } from "react";
import { Donor } from "@/data/mockDonors";
import { formatINR, formatDate } from "@/lib/utils";
import { GrowthBadge } from "@/components/ui/GrowthBadge";
import { useDaanPayti } from "@/lib/store";
import { X, GitMerge, Check, AlertCircle, ArrowRight } from "lucide-react";

interface DuplicateMergeModalProps {
  donorA: Donor;
  donorB: Donor;
  isOpen: boolean;
  onClose: () => void;
}

export function DuplicateMergeModal({ donorA, donorB, isOpen, onClose }: DuplicateMergeModalProps) {
  const { mergeDonors } = useDaanPayti();
  const [primaryId, setPrimaryId] = useState<string>(donorA.id);
  const [mergedSuccess, setMergedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const primaryDonor = primaryId === donorA.id ? donorA : donorB;
  const duplicateDonor = primaryId === donorA.id ? donorB : donorA;

  const combinedLifetime = donorA.lifetimeGivingINR + donorB.lifetimeGivingINR;
  const combinedGifts = donorA.totalGiftsCount + donorB.totalGiftsCount;

  const handleMerge = () => {
    mergeDonors(primaryDonor.id, duplicateDonor.id);
    setMergedSuccess(true);
    setTimeout(() => {
      setMergedSuccess(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22261F]/60 backdrop-blur-[2px] animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FFFDF8] rounded-2xl border border-[#E3DCC8] shadow-2xl p-6 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#66695C] hover:text-[#22261F] hover:bg-[#F7F3E8] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {mergedSuccess ? (
          <div className="py-12 text-center animate-leaf-sprout">
            <div className="w-14 h-14 rounded-full bg-[#E6EEDC] border-2 border-[#8FB573] flex items-center justify-center text-[#1F4D3A] mx-auto mb-3">
              <Check className="w-8 h-8 text-[#4A7338]" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#1F4D3A]">
              Supporter Records Successfully Consolidated!
            </h3>
            <p className="text-xs text-[#66695C] mt-2">
              All gifts ({combinedGifts} total) united under {primaryDonor.name}&apos;s profile. Combined lifetime giving: {formatINR(combinedLifetime)}.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3DCC8]">
              <div className="w-8 h-8 rounded-lg bg-[#F9ECE7] text-[#C8643C] flex items-center justify-center">
                <GitMerge className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-xl text-[#22261F]">
                  Side-by-Side Supporter Merge
                </h2>
                <p className="text-xs text-[#66695C]">
                  Resolve duplicate entries caused by different spelling, channel variations, or UPI names
                </p>
              </div>
            </div>

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-2 gap-4">
              {/* Option A */}
              <div
                onClick={() => setPrimaryId(donorA.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  primaryId === donorA.id
                    ? "bg-[#E6EEDC] border-[#1F4D3A] ring-2 ring-[#1F4D3A]"
                    : "bg-[#F7F3E8] border-[#E3DCC8] hover:border-[#8FB573]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66695C]">
                    Record 1
                  </span>
                  {primaryId === donorA.id && (
                    <span className="px-2 py-0.5 rounded-full bg-[#1F4D3A] text-white text-[10px] font-bold">
                      Keep as Primary
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-base text-[#22261F]">
                  {donorA.name}
                </h3>
                <div className="mt-1">
                  <GrowthBadge stage={donorA.growthStage} size="sm" />
                </div>

                <div className="mt-3 space-y-1 text-xs text-[#66695C]">
                  <div>Phone: <strong className="text-[#22261F]">{donorA.phone}</strong></div>
                  <div>Email: <strong className="text-[#22261F]">{donorA.email}</strong></div>
                  <div>PAN: <strong className="text-[#22261F] font-mono">{donorA.pan || "Not provided"}</strong></div>
                  <div>City: <strong className="text-[#22261F]">{donorA.city}</strong></div>
                  <div>Lifetime Gifts: <strong className="text-[#1F4D3A] font-serif tabular-nums">{formatINR(donorA.lifetimeGivingINR)} ({donorA.totalGiftsCount} gifts)</strong></div>
                </div>
              </div>

              {/* Option B */}
              <div
                onClick={() => setPrimaryId(donorB.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  primaryId === donorB.id
                    ? "bg-[#E6EEDC] border-[#1F4D3A] ring-2 ring-[#1F4D3A]"
                    : "bg-[#F7F3E8] border-[#E3DCC8] hover:border-[#8FB573]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66695C]">
                    Record 2
                  </span>
                  {primaryId === donorB.id && (
                    <span className="px-2 py-0.5 rounded-full bg-[#1F4D3A] text-white text-[10px] font-bold">
                      Keep as Primary
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-base text-[#22261F]">
                  {donorB.name}
                </h3>
                <div className="mt-1">
                  <GrowthBadge stage={donorB.growthStage} size="sm" />
                </div>

                <div className="mt-3 space-y-1 text-xs text-[#66695C]">
                  <div>Phone: <strong className="text-[#22261F]">{donorB.phone}</strong></div>
                  <div>Email: <strong className="text-[#22261F]">{donorB.email}</strong></div>
                  <div>PAN: <strong className="text-[#22261F] font-mono">{donorB.pan || "Not provided"}</strong></div>
                  <div>City: <strong className="text-[#22261F]">{donorB.city}</strong></div>
                  <div>Lifetime Gifts: <strong className="text-[#1F4D3A] font-serif tabular-nums">{formatINR(donorB.lifetimeGivingINR)} ({donorB.totalGiftsCount} gifts)</strong></div>
                </div>
              </div>
            </div>

            {/* Merge Result Preview */}
            <div className="p-3.5 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] text-xs space-y-1.5">
              <div className="font-semibold text-[#1F4D3A] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#8FB573]" />
                <span>Consolidation Outcome Preview</span>
              </div>
              <p className="text-[#66695C]">
                Target profile will retain the name <strong className="text-[#22261F]">{primaryDonor.name}</strong>. Contact information, PAN, and address will be auto-filled if missing. All {combinedGifts} historical gifts will be unified, raising their combined lifetime giving to <strong className="text-[#1F4D3A] font-serif tabular-nums">{formatINR(combinedLifetime)}</strong>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#66695C] hover:text-[#22261F]"
              >
                Cancel
              </button>
              <button
                onClick={handleMerge}
                className="px-5 py-2.5 rounded-xl bg-[#D9A441] hover:bg-[#C59232] text-[#22261F] font-semibold text-xs transition-colors flex items-center gap-2 shadow-soft"
              >
                <GitMerge className="w-4 h-4 text-[#22261F]" />
                <span>Confirm &amp; Merge Records</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

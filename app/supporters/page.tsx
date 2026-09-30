"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDaanPayti } from "@/lib/store";
import { formatINR, formatDate, GrowthStage } from "@/lib/utils";
import { GrowthBadge } from "@/components/ui/GrowthBadge";
import { DuplicateMergeModal } from "@/components/supporters/DuplicateMergeModal";
import {
  Users,
  Search,
  Filter,
  GitMerge,
  ExternalLink,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export default function SupportersPage() {
  const { donors, setSelectedDonorId } = useDaanPayti();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedChannel, setSelectedChannel] = useState<string>("all");
  const [selectedCare, setSelectedCare] = useState<string>("all");

  // Merge modal state
  const [mergePair, setMergePair] = useState<{ donorA: any; donorB: any } | null>(null);

  // Filtered supporters
  const filteredDonors = donors.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.pan && d.pan.toLowerCase().includes(searchQuery.toLowerCase())) ||
      d.phone.includes(searchQuery);

    const matchesStage = selectedStage === "all" || d.growthStage === selectedStage;
    const matchesChannel = selectedChannel === "all" || d.preferredChannel === selectedChannel;
    const matchesCare = selectedCare === "all" || d.careStatus === selectedCare;

    return matchesSearch && matchesStage && matchesChannel && matchesCare;
  });

  const duplicateDonorsCount = donors.filter((d) => d.possibleDuplicateId).length;

  const handleOpenMerge = (donor: any) => {
    if (!donor.possibleDuplicateId) return;
    const matched = donors.find((d) => d.id === donor.possibleDuplicateId);
    if (matched) {
      setMergePair({ donorA: donor, donorB: matched });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#C7DAC0] mb-2">
            <Users className="w-3.5 h-3.5 text-[#1F4D3A]" />
            <span>Layer 3: Supporter Ecosystem</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-[#1F4D3A]">
            Supporters <span className="font-devanagari font-normal text-2xl text-[#66695C]">(सहयोगी)</span> Directory
          </h1>
          <p className="text-sm text-[#66695C] mt-1 max-w-2xl">
            Caring for {donors.length} individuals and organizations sheltering UPAY&apos;s learners.
          </p>
        </div>

        {duplicateDonorsCount > 0 && (
          <div className="p-3 rounded-xl bg-[#F9ECE7] border border-[#F2D4C8] flex items-center gap-3 text-xs text-[#C8643C]">
            <GitMerge className="w-4 h-4 text-[#C8643C] flex-shrink-0" />
            <div>
              <span className="font-bold">{duplicateDonorsCount} duplicate profile candidates</span> detected. Click the &ldquo;Possible Duplicate&rdquo; chip to merge.
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#66695C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, city, phone, PAN (e.g. Ananya, Nagpur, ABCPD)..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E3DCC8] bg-[#F7F3E8] text-[#22261F] placeholder-[#66695C] focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]"
            />
          </div>

          {/* Channel Dropdown */}
          <div className="w-full md:w-48">
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E3DCC8] bg-[#F7F3E8] text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]"
            >
              <option value="all">All Channels</option>
              <option value="Razorpay">Razorpay</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cheque">Cheque</option>
              <option value="Online Form">Online Form</option>
              <option value="Google Sheets">Google Sheets</option>
            </select>
          </div>

          {/* Care Status Dropdown */}
          <div className="w-full md:w-44">
            <select
              value={selectedCare}
              onChange={(e) => setSelectedCare(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E3DCC8] bg-[#F7F3E8] text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]"
            >
              <option value="all">All Care Statuses</option>
              <option value="thriving">Thriving</option>
              <option value="needs_care">Needs Care</option>
              <option value="lapsed">Gentle Touchpoint (Lapsed)</option>
            </select>
          </div>
        </div>

        {/* Growth Stage Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#F0EAE1]">
          <span className="text-xs font-semibold text-[#66695C] mr-2">Stage:</span>
          {[
            { id: "all", label: "All Stages" },
            { id: "seed", label: "Seed (1st gift)" },
            { id: "sapling", label: "Sapling (2–3 gifts)" },
            { id: "young_tree", label: "Young Tree (Recurring)" },
            { id: "banyan", label: "Banyan (Long-term)" },
          ].map((stage) => (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                selectedStage === stage.id
                  ? "bg-[#1F4D3A] text-[#FFFDF8] font-semibold shadow-soft"
                  : "bg-[#F7F3E8] text-[#66695C] hover:text-[#22261F] hover:bg-[#EFE7D6]"
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>
      </div>

      {/* Supporters Table */}
      <div className="rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#EFE7D6] text-[#66695C] font-semibold border-b border-[#E3DCC8]">
              <tr>
                <th className="p-3.5 pl-5">Supporter</th>
                <th className="p-3.5">Stage</th>
                <th className="p-3.5">Cadence &amp; Channel</th>
                <th className="p-3.5">Primary Branch</th>
                <th className="p-3.5 text-right">Lifetime Giving</th>
                <th className="p-3.5 text-center">Gifts</th>
                <th className="p-3.5">Care Status</th>
                <th className="p-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE1]">
              {filteredDonors.map((donor) => (
                <tr
                  key={donor.id}
                  className="hover:bg-[#F7F3E8]/60 transition-colors group"
                >
                  {/* Name and details */}
                  <td className="p-3.5 pl-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#E6EEDC] text-[#1F4D3A] font-serif font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {donor.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Link
                            href="/donor-360"
                            onClick={() => setSelectedDonorId(donor.id)}
                            className="font-semibold text-sm text-[#22261F] hover:text-[#1F4D3A] hover:underline truncate"
                          >
                            {donor.name}
                          </Link>
                          {donor.possibleDuplicateId && (
                            <button
                              onClick={() => handleOpenMerge(donor)}
                              className="px-2 py-0.5 rounded-full bg-[#F9ECE7] hover:bg-[#F2D4C8] text-[#C8643C] text-[10px] font-bold border border-[#F2D4C8] flex items-center gap-1 transition-colors"
                              title="Click to compare side-by-side & merge"
                            >
                              <GitMerge className="w-3 h-3" />
                              <span>Possible duplicate</span>
                            </button>
                          )}
                        </div>
                        <div className="text-[11px] text-[#66695C] truncate">
                          {donor.city} {donor.pan ? `• PAN: ${donor.pan}` : ""}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Growth Stage Badge */}
                  <td className="p-3.5 whitespace-nowrap">
                    <GrowthBadge stage={donor.growthStage} size="sm" />
                  </td>

                  {/* Cadence & Channel */}
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="font-medium text-[#22261F]">
                      {donor.recurringActive ? (
                        <span className="text-[#1F4D3A] font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8FB573]" />
                          Monthly ({formatINR(donor.recurringAmountINR || 0)})
                        </span>
                      ) : (
                        <span>One-time / Annual</span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#66695C]">
                      via {donor.preferredChannel}
                    </div>
                  </td>

                  {/* Primary Campaign Branch */}
                  <td className="p-3.5 text-[#22261F] max-w-[180px] truncate">
                    {donor.primaryCampaign}
                  </td>

                  {/* Lifetime Giving */}
                  <td className="p-3.5 text-right font-serif font-bold text-[#1F4D3A] text-sm tabular-nums whitespace-nowrap">
                    {formatINR(donor.lifetimeGivingINR)}
                  </td>

                  {/* Total Gifts */}
                  <td className="p-3.5 text-center font-mono font-medium text-[#22261F] tabular-nums">
                    {donor.totalGiftsCount}
                  </td>

                  {/* Care Status */}
                  <td className="p-3.5 whitespace-nowrap">
                    {donor.careStatus === "thriving" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#4A7338] font-medium">
                        <CheckCircle2 className="w-3 h-3 text-[#4A7338]" />
                        <span>Thriving</span>
                      </span>
                    ) : donor.careStatus === "needs_care" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#C8643C] font-semibold bg-[#F9ECE7] px-2 py-0.5 rounded-full border border-[#F2D4C8]">
                        <AlertCircle className="w-3 h-3" />
                        <span>Needs Care</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#8A5A36] font-medium bg-[#F5EFE6] px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" />
                        <span>Lapsed (Touchpoint)</span>
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-3.5 pr-5 text-right whitespace-nowrap">
                    <Link
                      href="/donor-360"
                      onClick={() => setSelectedDonorId(donor.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#E6EEDC] hover:bg-[#D4E4C6] text-[#1F4D3A] text-xs font-semibold transition-colors inline-flex items-center gap-1"
                    >
                      <span>Donor 360</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-[#EFE7D6]/40 border-t border-[#E3DCC8] flex items-center justify-between text-xs text-[#66695C]">
          <span>Showing {filteredDonors.length} of {donors.length} supporters</span>
          <span className="font-serif italic text-[#1F4D3A]">
            &ldquo;Every seed planted with care will shelter a thousand dreams.&rdquo;
          </span>
        </div>
      </div>

      {/* Side-by-Side Duplicate Merge Modal */}
      {mergePair && (
        <DuplicateMergeModal
          donorA={mergePair.donorA}
          donorB={mergePair.donorB}
          isOpen={true}
          onClose={() => setMergePair(null)}
        />
      )}
    </div>
  );
}

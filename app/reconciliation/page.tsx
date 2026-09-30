"use client";

import React, { useState } from "react";
import { useDaanPayti } from "@/lib/store";
import { formatINR, formatDate } from "@/lib/utils";
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function ReconciliationPage() {
  const { reconciliationItems, approveReconciliation, bulkApproveReconciliation } = useDaanPayti();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [bulkNotice, setBulkNotice] = useState<boolean>(false);

  const filteredItems = reconciliationItems.filter((item) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "approved") return item.isApproved;
    if (filterStatus === "pending") return !item.isApproved;
    return item.matchStatus === filterStatus;
  });

  const highConfidencePending = reconciliationItems.filter(
    (item) => !item.isApproved && item.confidenceScore >= 90
  );

  const handleBulkApprove = () => {
    bulkApproveReconciliation();
    setBulkNotice(true);
    setTimeout(() => setBulkNotice(false), 2500);
  };

  const getStatusBadge = (item: any) => {
    if (item.isApproved) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-[11px] font-semibold border border-[#C7DAC0]">
          <CheckCircle2 className="w-3 h-3 text-[#4A7338]" />
          <span>Approved &amp; Reconciled</span>
        </span>
      );
    }

    switch (item.matchStatus) {
      case "matched":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBF3E4] text-[#4A7338] text-[11px] font-medium border border-[#D1E6C5]">
            <Check className="w-3 h-3 text-[#4A7338]" />
            <span>High Match ({item.confidenceScore}%)</span>
          </span>
        );
      case "needs_review":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF3D6] text-[#B88220] text-[11px] font-medium border border-[#E8D09E]">
            <AlertTriangle className="w-3 h-3 text-[#B88220]" />
            <span>Needs Review ({item.confidenceScore}%)</span>
          </span>
        );
      case "possible_duplicate":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F9ECE7] text-[#C8643C] text-[11px] font-medium border border-[#F2D4C8]">
            <AlertTriangle className="w-3 h-3 text-[#C8643C]" />
            <span>Possible Duplicate ({item.confidenceScore}%)</span>
          </span>
        );
      case "unmatched":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F5EFE6] text-[#6B4F3A] text-[11px] font-medium border border-[#E3DCC8]">
            <HelpCircle className="w-3 h-3 text-[#6B4F3A]" />
            <span>Unmatched ({item.confidenceScore}%)</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#C7DAC0] mb-2">
            <Scale className="w-3.5 h-3.5 text-[#1F4D3A]" />
            <span>Layer 3: Smart Reconciliation</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-[#1F4D3A]">
            Balancing the Ledger <span className="font-devanagari font-normal text-2xl text-[#66695C]">(बहीखाता मिलान)</span>
          </h1>
          <p className="text-sm text-[#66695C] mt-1 max-w-2xl">
            Automatically matching bank statement deposits &amp; Razorpay payouts with recorded donor gifts.
          </p>
        </div>

        {/* Bulk Action Button */}
        <div className="flex items-center gap-2">
          {highConfidencePending.length > 0 && (
            <button
              onClick={handleBulkApprove}
              className="px-4 py-2.5 rounded-xl bg-[#D9A441] hover:bg-[#C59232] text-[#22261F] font-semibold text-xs transition-all shadow-soft flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current text-[#22261F]" />
              <span>Bulk Approve {highConfidencePending.length} High Confidence (&ge;90%)</span>
            </button>
          )}
        </div>
      </div>

      {bulkNotice && (
        <div className="p-3 rounded-xl bg-[#E6EEDC] border border-[#8FB573] text-xs text-[#1F4D3A] font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#4A7338]" />
          <span>All high-confidence statement transactions have been approved and reconciled with donor receipts!</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-[#FFFDF8] rounded-xl border border-[#E3DCC8] shadow-soft text-xs">
        <span className="text-[#66695C] font-semibold px-2">Show:</span>
        {[
          { id: "all", label: "All Items" },
          { id: "pending", label: "Pending Approval" },
          { id: "approved", label: "Reconciled & Approved" },
          { id: "needs_review", label: "Needs Review" },
          { id: "unmatched", label: "Unmatched QR / Anonymous" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterStatus === tab.id
                ? "bg-[#1F4D3A] text-[#FFFDF8] font-semibold"
                : "text-[#66695C] hover:text-[#22261F] hover:bg-[#F7F3E8]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reconciliation Split-Matching View Table */}
      <div className="rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#EFE7D6] text-[#66695C] font-semibold border-b border-[#E3DCC8]">
              <tr>
                <th className="p-3.5 pl-5">Date &amp; Statement Line</th>
                <th className="p-3.5">Channel / UTR</th>
                <th className="p-3.5">Matched Supporter</th>
                <th className="p-3.5">Match Rationale &amp; Confidence</th>
                <th className="p-3.5 text-right">Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE1]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#F7F3E8]/60 transition-colors">
                  {/* Statement Line */}
                  <td className="p-3.5 pl-5 max-w-[240px]">
                    <div className="text-[11px] text-[#66695C]">{formatDate(item.statementDate)}</div>
                    <div className="font-mono text-[11px] text-[#22261F] truncate" title={item.statementDescription}>
                      {item.statementDescription}
                    </div>
                  </td>

                  {/* Channel & UTR */}
                  <td className="p-3.5 whitespace-nowrap">
                    <span className="font-semibold text-[#1F4D3A]">{item.channel}</span>
                    <div className="font-mono text-[10px] text-[#66695C]">{item.referenceUTR}</div>
                  </td>

                  {/* Matched Supporter */}
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="font-semibold text-sm text-[#22261F]">
                      {item.suggestedDonorName || "—"}
                    </div>
                    {item.matchedGiftId && (
                      <span className="text-[10px] text-[#4A7338]">Linked to {item.matchedGiftId}</span>
                    )}
                  </td>

                  {/* Rationale & Score */}
                  <td className="p-3.5 max-w-[260px]">
                    <div className="text-[11px] text-[#22261F] leading-snug">
                      {item.matchRationale}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <div className="w-16 h-1.5 rounded-full bg-[#EFE7D6] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.confidenceScore}%`,
                            backgroundColor:
                              item.confidenceScore >= 90
                                ? "#4A7338"
                                : item.confidenceScore >= 70
                                ? "#B88220"
                                : "#C8643C",
                          }}
                        />
                      </div>
                      <span className="font-bold text-[10px] text-[#66695C]">{item.confidenceScore}%</span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="p-3.5 text-right font-serif font-bold text-sm text-[#1F4D3A] tabular-nums whitespace-nowrap">
                    {formatINR(item.amountINR)}
                  </td>

                  {/* Status */}
                  <td className="p-3.5 whitespace-nowrap">
                    {getStatusBadge(item)}
                  </td>

                  {/* Action */}
                  <td className="p-3.5 pr-5 text-right whitespace-nowrap">
                    {item.isApproved ? (
                      <span className="text-[11px] text-[#4A7338] font-medium flex items-center justify-end gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Reconciled</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => approveReconciliation(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#1F4D3A] hover:bg-[#173B2C] text-[#FFFDF8] text-xs font-semibold transition-colors shadow-soft"
                      >
                        Approve Match
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-[#EFE7D6]/40 border-t border-[#E3DCC8] flex items-center justify-between text-xs text-[#66695C]">
          <span>Reconciliation ledger synced with UPAY bank statements and Razorpay settlement webhooks.</span>
          <span className="font-semibold text-[#1F4D3A]">99.2% Balanced Ledger Integrity</span>
        </div>
      </div>
    </div>
  );
}

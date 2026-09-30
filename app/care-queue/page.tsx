"use client";

import React, { useState } from "react";
import { useDaanPayti } from "@/lib/store";
import { formatINR } from "@/lib/utils";
import { GrowthBadge } from "@/components/ui/GrowthBadge";
import {
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Send,
  Check,
  ToggleLeft,
  ToggleRight,
  MessageSquare,
  FileText,
  PhoneCall,
  Download,
  Eye,
  X,
} from "lucide-react";

export default function CareQueuePage() {
  const { careRules, careTasks, toggleCareRule, completeCareTask } = useDaanPayti();
  const [activeTab, setActiveTab] = useState<"tasks" | "rules" | "receipts">("tasks");
  const [preview80G, setPreview80G] = useState<boolean>(false);

  const pendingTasks = careTasks.filter((t) => !t.completed);
  const completedTasks = careTasks.filter((t) => t.completed);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#C7DAC0] mb-2">
            <Bell className="w-3.5 h-3.5 text-[#1F4D3A]" />
            <span>Layer 3: Automation &amp; Supporter Nurturing</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-[#1F4D3A]">
            Care Queue <span className="font-devanagari font-normal text-2xl text-[#66695C]">(देखभाल कतार)</span>
          </h1>
          <p className="text-sm text-[#66695C] mt-1 max-w-2xl">
            Gentle automations and timely personal touches so no supporter feels forgotten.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#FFFDF8] rounded-xl border border-[#E3DCC8] shadow-soft">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "tasks"
                ? "bg-[#1F4D3A] text-[#FFFDF8] shadow-soft"
                : "text-[#66695C] hover:text-[#22261F]"
            }`}
          >
            Follow-Up Queue ({pendingTasks.length})
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "rules"
                ? "bg-[#1F4D3A] text-[#FFFDF8] shadow-soft"
                : "text-[#66695C] hover:text-[#22261F]"
            }`}
          >
            Automation Rules ({careRules.length})
          </button>
          <button
            onClick={() => setActiveTab("receipts")}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "receipts"
                ? "bg-[#1F4D3A] text-[#FFFDF8] shadow-soft"
                : "text-[#66695C] hover:text-[#22261F]"
            }`}
          >
            80G Receipts
          </button>
        </div>
      </div>

      {/* Tab 1: Tasks / Follow-Up Queue */}
      {activeTab === "tasks" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#E6EEDC]/60 border border-[#C7DAC0] text-xs text-[#1F4D3A] flex items-center justify-between">
            <span className="font-medium">
              Sorted by who most needs a thank-you or gentle care touch.
            </span>
            <span className="font-bold">{pendingTasks.length} pending items</span>
          </div>

          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#22261F]">
                      {task.donorName}
                    </span>
                    <GrowthBadge stage={task.donorStage} size="sm" />
                    {task.priority === "immediate" && (
                      <span className="px-2 py-0.2 rounded-full bg-[#F9ECE7] text-[#C8643C] text-[10px] font-bold">
                        Priority
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#22261F] font-medium leading-relaxed">
                    {task.reason}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-[#66695C] pt-1">
                    <span className="flex items-center gap-1 text-[#1F4D3A] font-semibold">
                      {task.channel === "WhatsApp" ? (
                        <MessageSquare className="w-3.5 h-3.5 text-[#4A7338]" />
                      ) : task.channel === "Phone Call" ? (
                        <PhoneCall className="w-3.5 h-3.5 text-[#1F4D3A]" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-[#D9A441]" />
                      )}
                      <span>{task.channel}</span>
                    </span>
                    <span>•</span>
                    <span>Due: {task.dueDate}</span>
                    <span>•</span>
                    <span className="italic">{task.suggestedAction}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => completeCareTask(task.id)}
                    className="px-4 py-2 rounded-xl bg-[#1F4D3A] hover:bg-[#173B2C] text-[#FFFDF8] text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-soft"
                  >
                    <Check className="w-4 h-4" />
                    <span>Acknowledge &amp; Send</span>
                  </button>
                </div>
              </div>
            ))}

            {pendingTasks.length === 0 && (
              <div className="p-8 text-center bg-[#FFFDF8] rounded-2xl border border-[#E3DCC8] text-sm text-[#4A7338] font-medium">
                &ldquo;Every supporter is acknowledged and cared for! The grove is flourishing peacefully.&rdquo;
              </div>
            )}
          </div>

          {/* Completed History Accordion */}
          {completedTasks.length > 0 && (
            <div className="pt-4">
              <h3 className="text-xs font-semibold text-[#66695C] uppercase tracking-wider mb-2">
                Completed this week ({completedTasks.length})
              </h3>
              <div className="space-y-2 opacity-70">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] text-xs flex items-center justify-between"
                  >
                    <span className="text-[#22261F] line-through">{task.donorName} — {task.suggestedAction}</span>
                    <span className="text-[#4A7338] font-semibold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Done
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Plain Language Automation Rules */}
      {activeTab === "rules" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] text-xs text-[#66695C]">
            Rules are expressed in plain, warm language. Non-technical staff can toggle triggers without writing scripts or workflows.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careRules.map((rule) => (
              <div
                key={rule.id}
                className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-[10px] font-bold border border-[#C7DAC0]">
                      {rule.category}
                    </span>
                    <button
                      onClick={() => toggleCareRule(rule.id)}
                      className="text-[#1F4D3A] hover:text-[#173B2C] transition-transform active:scale-95"
                    >
                      {rule.isActive ? (
                        <ToggleRight className="w-8 h-8 text-[#1F4D3A]" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-[#A4C78B]" />
                      )}
                    </button>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#22261F]">
                    {rule.title}
                  </h3>
                  <p className="text-[11px] text-[#66695C] font-devanagari mt-0.5">
                    {rule.hindiSummary}
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-[#F7F3E8] border border-[#F0EAE1] space-y-1 text-xs">
                    <div>
                      <span className="text-[#66695C]">Trigger:</span>{" "}
                      <strong className="text-[#22261F]">{rule.trigger}</strong>
                    </div>
                    <div>
                      <span className="text-[#66695C]">Action:</span>{" "}
                      <strong className="text-[#1F4D3A]">{rule.action}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-[11px] text-[#66695C]">
                  <span>Dispatched via {rule.channel}</span>
                  <span className="font-semibold text-[#1F4D3A]">
                    {rule.timesFiredThisMonth} sent this month
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: 80G Receipts Engine */}
      {activeTab === "receipts" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3DCC8]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1F4D3A]">
                  80G Income Tax Exemption Dispatch
                </h3>
                <p className="text-xs text-[#66695C]">
                  Compliant with Income Tax Rule 18AB &amp; Form 10BD electronic filing
                </p>
              </div>
              <button
                onClick={() => setPreview80G(true)}
                className="px-4 py-2 rounded-xl bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#C7DAC0] flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview Standard 80G PDF</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8]">
                <div className="text-[#66695C]">Receipts Issued (FY 26-27)</div>
                <div className="font-serif font-bold text-2xl text-[#1F4D3A] tabular-nums mt-1">
                  148 Receipts
                </div>
                <div className="text-[11px] text-[#4A7338] mt-1">100% digitally signed</div>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8]">
                <div className="text-[#66695C]">Total Tax-Deductible Value</div>
                <div className="font-serif font-bold text-2xl text-[#1F4D3A] tabular-nums mt-1">
                  ₹42,10,000
                </div>
                <div className="text-[11px] text-[#4A7338] mt-1">Under 80G(5)(vi) registration</div>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8]">
                <div className="text-[#66695C]">Form 10BD Filing Status</div>
                <div className="font-serif font-bold text-lg text-[#1F4D3A] mt-1">
                  Synced &amp; Ready
                </div>
                <div className="text-[11px] text-[#66695C] mt-1">Annual filing due May 31, 2027</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 80G Sample Preview Modal */}
      {preview80G && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22261F]/60 backdrop-blur-[2px] animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#FFFDF8] rounded-2xl border border-[#E3DCC8] shadow-2xl p-6 overflow-hidden">
            <button
              onClick={() => setPreview80G(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#66695C] hover:text-[#22261F]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-4 border-b border-[#E3DCC8]">
              <div className="text-xs uppercase font-bold text-[#6B4F3A] tracking-wider">
                Official Donation Receipt
              </div>
              <h2 className="font-serif font-bold text-xl text-[#1F4D3A] mt-1">
                UPAY (Underprivileged Peoples Association Youth)
              </h2>
              <p className="text-[11px] text-[#66695C]">
                Reg. No: 12A/80G/NAG/2012 • PAN: AAATU1902E
              </p>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#66695C]">Receipt Number:</span>
                <span className="font-mono font-bold text-[#1F4D3A]">UPAY/80G/26-27/0819</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66695C]">Received With Thanks From:</span>
                <span className="font-bold text-[#22261F]">Dr. Ananya Deshmukh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66695C]">Donor PAN:</span>
                <span className="font-mono font-bold text-[#22261F]">ABCPD1234M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66695C]">Gift Amount:</span>
                <span className="font-serif font-bold text-base text-[#1F4D3A] tabular-nums">₹15,000 (Fifteen Thousand Only)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66695C]">Purpose:</span>
                <span className="text-[#22261F]">Footpath Pathshala Street Education</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#E6EEDC] text-[11px] text-[#1F4D3A] border border-[#C7DAC0] text-center">
              Donations are exempt under Section 80G of the Indian Income Tax Act 1961.
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setPreview80G(false)}
                className="px-4 py-2 rounded-xl bg-[#1F4D3A] text-[#FFFDF8] text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

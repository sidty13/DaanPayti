"use client";

import React, { useState } from "react";
import {
  Shield,
  CheckCircle2,
  Users,
  FileCheck,
  Lock,
  Zap,
  MessageSquare,
  FileSpreadsheet,
} from "lucide-react";

export default function BarkSettingsPage() {
  const [activeRole, setActiveRole] = useState<"admin" | "fundraiser" | "viewer">("admin");

  const auditLogs = [
    {
      id: "log-1",
      action: "Duplicate Merged",
      detail: "Merged duplicate record dn-026 into dn-006 (Aaditya Sharma)",
      actor: "Siddhi (Fundraiser)",
      time: "24 mins ago",
    },
    {
      id: "log-2",
      action: "Reconciliation Approved",
      detail: "Approved UTR NEFT/NAGP98201944 for ₹15,000 (Dr. Ananya Deshmukh)",
      actor: "Finance Desk",
      time: "1 hour ago",
    },
    {
      id: "log-3",
      action: "80G Certificate Dispatched",
      detail: "Generated UPAY/80G/26-27/0819 for ₹2,100 (Nikhil Ranade)",
      actor: "System Automation",
      time: "3 hours ago",
    },
    {
      id: "log-4",
      action: "Google Sheets Synced",
      detail: "Pulled 4 offline collection entries from Nagpur register",
      actor: "Scheduled Cron",
      time: "Yesterday at 07:15 PM",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#C7DAC0] mb-2">
            <Shield className="w-3.5 h-3.5 text-[#1F4D3A]" />
            <span>Layer 3: Security, Governance &amp; Bark Protection</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-[#1F4D3A]">
            Bark <span className="font-devanagari font-normal text-2xl text-[#66695C]">(छाल)</span> — Settings &amp; Governance
          </h1>
          <p className="text-sm text-[#66695C] mt-1 max-w-2xl">
            The protective outer bark that shields the grove: role permissions, compliance audit trails, DPDP privacy, and integration health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#C7DAC0] flex items-center gap-1.5 shadow-soft">
            <CheckCircle2 className="w-4 h-4 text-[#4A7338]" />
            <span>Bark Health: 96% Pristine</span>
          </span>
        </div>
      </div>

      {/* Row 1: Data Quality Score & Privacy Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Data Quality Card */}
        <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-[#1F4D3A]">
              Grove Data Health
            </h3>
            <span className="font-serif font-bold text-xl text-[#4A7338] tabular-nums">96%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#EFE7D6] overflow-hidden">
            <div className="w-[96%] h-full bg-[#4A7338] rounded-full" />
          </div>
          <ul className="text-xs text-[#66695C] space-y-1 pt-1">
            <li className="flex items-center justify-between">
              <span>Verified PANs (for 80G):</span>
              <strong className="text-[#22261F]">26 of 30 supporters</strong>
            </li>
            <li className="flex items-center justify-between">
              <span>Standardised Phone (+91):</span>
              <strong className="text-[#22261F]">30 of 30 (100%)</strong>
            </li>
            <li className="flex items-center justify-between">
              <span>Resolved Duplicate Pairs:</span>
              <strong className="text-[#4A7338]">1 pending merge</strong>
            </li>
          </ul>
        </div>

        {/* DPDP Act 2023 Compliance */}
        <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#1F4D3A]" />
            <h3 className="font-serif font-bold text-base text-[#1F4D3A]">
              DPDP Privacy Act 2023
            </h3>
          </div>
          <p className="text-xs text-[#66695C] leading-relaxed">
            Supporter consent records are immutable and timestamped. Personal phone numbers and PAN details are encrypted at rest with zero data sharing.
          </p>
          <div className="p-2.5 rounded-xl bg-[#E6EEDC] text-[11px] text-[#1F4D3A] font-medium border border-[#C7DAC0]">
            Consent notice active on all UPI and Razorpay gift checkout forms.
          </div>
        </div>

        {/* Income Tax Rule 18AB Status */}
        <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft space-y-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#1F4D3A]" />
            <h3 className="font-serif font-bold text-base text-[#1F4D3A]">
              80G Form 10BD Engine
            </h3>
          </div>
          <p className="text-xs text-[#66695C] leading-relaxed">
            Automated schema mapping for Central Board of Direct Taxes (CBDT) annual return of donations filing.
          </p>
          <div className="text-xs text-[#4A7338] font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4A7338]" />
            <span>Ready for Annual Export (AY 2027-28)</span>
          </div>
        </div>
      </div>

      {/* Row 2: Role-Based Access Control (RBAC) */}
      <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1F4D3A]">
              Role-Based Access &amp; Permissions
            </h3>
            <p className="text-xs text-[#66695C]">
              Tailored for non-technical NGO staff and trustees
            </p>
          </div>
          {/* Role Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#F7F3E8] rounded-xl border border-[#E3DCC8] text-xs">
            {(["admin", "fundraiser", "viewer"] as const).map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                  activeRole === role
                    ? "bg-[#1F4D3A] text-white shadow-soft"
                    : "text-[#66695C] hover:text-[#22261F]"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className={`p-4 rounded-xl border ${activeRole === "admin" ? "bg-[#E6EEDC] border-[#1F4D3A]" : "bg-[#F7F3E8] border-[#E3DCC8]"}`}>
            <h4 className="font-bold text-sm text-[#1F4D3A] mb-1">Admin (Trustee &amp; Leadership)</h4>
            <p className="text-[#66695C] mb-3">Full control over bank reconciliation, data imports, system settings, and 80G filings.</p>
            <span className="text-[11px] font-semibold text-[#1F4D3A]">4 Active Admins</span>
          </div>

          <div className={`p-4 rounded-xl border ${activeRole === "fundraiser" ? "bg-[#E6EEDC] border-[#1F4D3A]" : "bg-[#F7F3E8] border-[#E3DCC8]"}`}>
            <h4 className="font-bold text-sm text-[#1F4D3A] mb-1">Fundraiser (Donor Care Staff)</h4>
            <p className="text-[#66695C] mb-3">Can record gifts, manage Care Queue, dispatch AI gratitude letters, and resolve duplicates.</p>
            <span className="text-[11px] font-semibold text-[#1F4D3A]">7 Active Fundraisers</span>
          </div>

          <div className={`p-4 rounded-xl border ${activeRole === "viewer" ? "bg-[#E6EEDC] border-[#1F4D3A]" : "bg-[#F7F3E8] border-[#E3DCC8]"}`}>
            <h4 className="font-bold text-sm text-[#1F4D3A] mb-1">Viewer (Auditor / Field Intern)</h4>
            <p className="text-[#66695C] mb-3">Read-only access to impact stats, reports, and campaign tree-rings without editing rights.</p>
            <span className="text-[11px] font-semibold text-[#1F4D3A]">12 Active Viewers</span>
          </div>
        </div>
      </div>

      {/* Row 3: Integrations & Live Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Integrations Health */}
        <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
            <h3 className="font-serif font-bold text-lg text-[#1F4D3A]">
              Root Connectors
            </h3>
            <span className="text-xs text-[#4A7338] font-semibold">4 Active APIs</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-[#D9A441]" />
                <div>
                  <div className="font-semibold text-[#22261F]">Razorpay Subscriptions &amp; Webhooks</div>
                  <div className="text-[11px] text-[#66695C]">Key ID: rzp_live_***8921</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-[10px] font-bold">Connected</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#4A7338]" />
                <div>
                  <div className="font-semibold text-[#22261F]">WhatsApp Cloud Business API</div>
                  <div className="text-[11px] text-[#66695C]">Automated 24h gratitude notes &amp; receipts</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-[10px] font-bold">Connected</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-4 h-4 text-[#1F4D3A]" />
                <div>
                  <div className="font-semibold text-[#22261F]">Google Sheets Ingest Hook</div>
                  <div className="text-[11px] text-[#66695C]">Offline field collections auto-sync</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-[10px] font-bold">Connected</span>
            </div>
          </div>
        </div>

        {/* Immutable Audit Log */}
        <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
            <h3 className="font-serif font-bold text-lg text-[#1F4D3A]">
              Immutable Audit Log
            </h3>
            <span className="text-xs text-[#66695C]">Real-time trail</span>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-[#F7F3E8]/60 border border-[#F0EAE1] text-xs space-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#1F4D3A]">{log.action}</span>
                  <span className="text-[10px] text-[#66695C]">{log.time}</span>
                </div>
                <p className="text-[#22261F] text-[11px]">{log.detail}</p>
                <div className="text-[10px] text-[#8FB573] font-medium">By: {log.actor}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

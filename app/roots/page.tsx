"use client";

import React, { useState } from "react";
import { useDaanPayti } from "@/lib/store";
import { formatINR } from "@/lib/utils";
import { SAMPLE_INGESTION_BATCH, IngestionBatchRecord } from "@/data/mockRoots";
import {
  Network,
  CheckCircle2,
  Upload,
  FileSpreadsheet,
  Zap,
  Landmark,
  Globe,
  Mail,
  ShieldCheck,
  Check,
  ArrowRight,
  Database,
} from "lucide-react";

export default function RootsPage() {
  const { roots } = useDaanPayti();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [batchData] = useState<IngestionBatchRecord[]>(SAMPLE_INGESTION_BATCH);
  const [importSuccess, setImportSuccess] = useState<boolean>(false);

  const getSourceIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-5 h-5 text-[#D9A441]" />;
      case "Landmark":
        return <Landmark className="w-5 h-5 text-[#1F4D3A]" />;
      case "FileSpreadsheet":
        return <FileSpreadsheet className="w-5 h-5 text-[#4A7338]" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-[#6B4F3A]" />;
      case "Mail":
        return <Mail className="w-5 h-5 text-[#8FB573]" />;
      default:
        return <Database className="w-5 h-5 text-[#1F4D3A]" />;
    }
  };

  const handleRunStep = (stepNumber: number) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveStep(stepNumber);
    }, 450);
  };

  const handleFinishImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setImportSuccess(true);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#C7DAC0] mb-2">
            <Network className="w-3.5 h-3.5 text-[#1F4D3A]" />
            <span>Layers 1 & 2: Ingest, Clean & Unify</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-[#1F4D3A]">
            Roots <span className="font-devanagari font-normal text-2xl text-[#66695C]">(मूल)</span> — Data Sources &amp; Unification
          </h1>
          <p className="text-sm text-[#66695C] mt-1 max-w-2xl">
            Every connected channel feeds nutrients to the banyan. Cleaned, unified, and deduplicated into one single source of truth.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#FFFDF8] border border-[#E3DCC8] text-xs font-semibold text-[#1F4D3A] flex items-center gap-2 shadow-soft">
            <span className="w-2 h-2 rounded-full bg-[#8FB573] animate-pulse" />
            <span>5 Root Channels Healthy</span>
          </span>
        </div>
      </div>

      {/* Connected Roots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roots.map((source) => (
          <div
            key={source.id}
            className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-soft hover:shadow-card hover:border-[#8FB573]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8]">
                  {getSourceIcon(source.iconName)}
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-[11px] font-semibold border border-[#C7DAC0]">
                  <CheckCircle2 className="w-3 h-3 text-[#4A7338]" />
                  <span>{source.status === "connected" ? "Connected" : "Syncing"}</span>
                </span>
              </div>

              <h3 className="font-serif font-bold text-base text-[#22261F]">
                {source.name}
              </h3>
              <p className="text-xs text-[#66695C] mt-1">
                {source.category} • {source.syncFrequency}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
              <span className="text-[#66695C]">Records imported:</span>
              <span className="font-serif font-bold text-[#1F4D3A] tabular-nums text-sm">
                {source.recordsCount} records
              </span>
            </div>
            <div className="text-[11px] text-[#8FB573] mt-1 font-medium">
              Last sync: {source.lastSync}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Import Data Pipeline Stepper */}
      <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E3DCC8]">
          <div>
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#1F4D3A]" />
              <h2 className="font-serif font-bold text-xl text-[#1F4D3A]">
                Unified Ingestion Pipeline
              </h2>
            </div>
            <p className="text-xs text-[#66695C] mt-0.5">
              Four automated stages to transform messy spreadsheets and bank statements into pristine donor records
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveStep(1);
                setImportSuccess(false);
              }}
              className="text-xs text-[#66695C] hover:text-[#1F4D3A] font-medium"
            >
              Reset Simulation
            </button>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { step: 1, label: "1. Ingest", sub: "Fetch & parse raw lines" },
            { step: 2, label: "2. Clean & Normalise", sub: "PAN & +91 format" },
            { step: 3, label: "3. Deduplicate", sub: "Fuzzy match & alerts" },
            { step: 4, label: "4. Match & Unify", sub: "Ready for the grove" },
          ].map((item) => {
            const isCurrent = activeStep === item.step;
            const isDone = activeStep > item.step || importSuccess;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? "bg-[#E6EEDC] border-[#1F4D3A] ring-1 ring-[#1F4D3A]"
                    : isDone
                    ? "bg-[#F7F3E8] border-[#8FB573]/50 text-[#22261F]"
                    : "bg-[#FFFDF8] border-[#E3DCC8] opacity-60 text-[#66695C]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs text-[#1F4D3A]">
                    {item.label}
                  </span>
                  {isDone && <Check className="w-3.5 h-3.5 text-[#4A7338]" />}
                </div>
                <p className="text-[11px] text-[#66695C] mt-1">{item.sub}</p>
              </button>
            );
          })}
        </div>

        {/* Step Body Content */}
        {importSuccess ? (
          <div className="py-10 text-center bg-[#F7F3E8]/60 rounded-xl border border-[#C7DAC0] animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-[#E6EEDC] border-2 border-[#8FB573] flex items-center justify-center text-[#1F4D3A] mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-[#4A7338]" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#1F4D3A]">
              Batch Successfully Unified &amp; Planted!
            </h3>
            <p className="text-xs text-[#66695C] mt-1 max-w-md mx-auto">
              All 4 transactions have been safely merged into the central database. Duplicate alerts have been flagged for donor care review.
            </p>
            <button
              onClick={() => {
                setActiveStep(1);
                setImportSuccess(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#1F4D3A] text-[#FFFDF8] text-xs font-semibold shadow-soft"
            >
              Start Another Ingest
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {activeStep === 1 && (
              <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-[#22261F]">
                    Raw Batch Received (Volunteer Offline Sheet + UPI Webhook)
                  </h4>
                  <span className="text-[11px] text-[#66695C]">4 raw records awaiting processing</span>
                </div>
                <div className="bg-[#FFFDF8] rounded-lg border border-[#E3DCC8] overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#EFE7D6] text-[#66695C] font-semibold border-b border-[#E3DCC8]">
                      <tr>
                        <th className="p-2.5">Raw Name</th>
                        <th className="p-2.5">Raw Phone</th>
                        <th className="p-2.5">Raw PAN</th>
                        <th className="p-2.5">Amount</th>
                        <th className="p-2.5">Channel</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EAE1]">
                      {batchData.map((row) => (
                        <tr key={row.id}>
                          <td className="p-2.5 font-mono text-[11px]">{row.rawName}</td>
                          <td className="p-2.5 font-mono text-[11px]">{row.rawPhone}</td>
                          <td className="p-2.5 font-mono text-[11px]">{row.rawPan}</td>
                          <td className="p-2.5 font-serif font-bold text-[#1F4D3A] tabular-nums">{formatINR(row.amountINR)}</td>
                          <td className="p-2.5">{row.channel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleRunStep(2)}
                    disabled={isProcessing}
                    className="px-4 py-2 rounded-xl bg-[#1F4D3A] hover:bg-[#173B2C] text-[#FFFDF8] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-soft"
                  >
                    <span>Run Clean &amp; Normalise</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-[#22261F]">
                    Cleaned &amp; Standardised Fields
                  </h4>
                  <span className="text-[11px] text-[#4A7338] font-medium">Names trimmed, Indian +91 phone format applied, PAN checksum validated</span>
                </div>
                <div className="bg-[#FFFDF8] rounded-lg border border-[#E3DCC8] overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#EFE7D6] text-[#66695C] font-semibold border-b border-[#E3DCC8]">
                      <tr>
                        <th className="p-2.5">Standardised Name</th>
                        <th className="p-2.5">Formatted Phone</th>
                        <th className="p-2.5">PAN Status</th>
                        <th className="p-2.5">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EAE1]">
                      {batchData.map((row) => (
                        <tr key={row.id}>
                          <td className="p-2.5 font-medium text-[#22261F]">{row.cleanedName}</td>
                          <td className="p-2.5 font-mono text-[11px] text-[#1F4D3A]">{row.normalizedPhone}</td>
                          <td className="p-2.5">
                            {row.panValid ? (
                              <span className="inline-flex items-center gap-1 text-[11px] text-[#4A7338] font-semibold">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>{row.rawPan.toUpperCase()} (Valid 80G)</span>
                              </span>
                            ) : (
                              <span className="text-[11px] text-[#C8643C]">Missing / Invalid</span>
                            )}
                          </td>
                          <td className="p-2.5 font-serif font-bold text-[#1F4D3A] tabular-nums">{formatINR(row.amountINR)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-xs text-[#66695C] hover:text-[#22261F]"
                  >
                    Back to Ingest
                  </button>
                  <button
                    onClick={() => handleRunStep(3)}
                    disabled={isProcessing}
                    className="px-4 py-2 rounded-xl bg-[#1F4D3A] hover:bg-[#173B2C] text-[#FFFDF8] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-soft"
                  >
                    <span>Run Deduplication Engine</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-[#22261F]">
                    Deduplication &amp; Grove Matching
                  </h4>
                  <span className="text-[11px] text-[#C8643C] font-medium">1 potential duplicate detected (Aditya Sharma vs Aaditya Sharma)</span>
                </div>
                <div className="bg-[#FFFDF8] rounded-lg border border-[#E3DCC8] overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#EFE7D6] text-[#66695C] font-semibold border-b border-[#E3DCC8]">
                      <tr>
                        <th className="p-2.5">Incoming Person</th>
                        <th className="p-2.5">Match Type</th>
                        <th className="p-2.5">Matched Profile</th>
                        <th className="p-2.5">Recommended Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EAE1]">
                      {batchData.map((row) => (
                        <tr key={row.id}>
                          <td className="p-2.5 font-semibold text-[#22261F]">{row.cleanedName}</td>
                          <td className="p-2.5">
                            {row.dedupStatus === "potential_duplicate" ? (
                              <span className="px-2 py-0.5 rounded-full bg-[#F9ECE7] text-[#C8643C] text-[10px] font-bold border border-[#F2D4C8]">
                                Potential Duplicate
                              </span>
                            ) : row.dedupStatus === "matched_existing" ? (
                              <span className="px-2 py-0.5 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-[10px] font-semibold border border-[#C7DAC0]">
                                Existing Supporter
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-[#F5EFE6] text-[#6B4F3A] text-[10px] font-semibold">
                                New Seed
                              </span>
                            )}
                          </td>
                          <td className="p-2.5 text-[#66695C]">{row.matchedDonorName || "—"}</td>
                          <td className="p-2.5 text-[#22261F] font-medium">{row.actionRequired}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="text-xs text-[#66695C] hover:text-[#22261F]"
                  >
                    Back to Normalisation
                  </button>
                  <button
                    onClick={() => handleRunStep(4)}
                    disabled={isProcessing}
                    className="px-4 py-2 rounded-xl bg-[#1F4D3A] hover:bg-[#173B2C] text-[#FFFDF8] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-soft"
                  >
                    <span>Proceed to Final Match Preview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-[#22261F]">
                    Step 4: Final Match &amp; Database Commit
                  </h4>
                  <span className="text-[11px] text-[#4A7338] font-bold">Total Batch Value: ₹30,000 INR</span>
                </div>
                <p className="text-xs text-[#66695C]">
                  Review the normalized ledger before committing records into the central grove database. 80G certificates will be staged for compliant records.
                </p>
                <div className="bg-[#FFFDF8] rounded-lg border border-[#E3DCC8] p-3 text-xs space-y-2">
                  <div className="flex items-center justify-between py-1 border-b border-[#F0EAE1]">
                    <span>1 New Seed supporter to welcome (Tarun Choudhary)</span>
                    <span className="text-[#4A7338] font-semibold">Ready</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#F0EAE1]">
                    <span>2 Existing supporters with recurring/repeat gifts (Dr. Ananya, Kavita Sen)</span>
                    <span className="text-[#1F4D3A] font-semibold">Matched</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>1 Duplicate flagged for side-by-side merge (Aditya Sharma)</span>
                    <span className="text-[#C8643C] font-semibold">Care Alert Staged</span>
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="text-xs text-[#66695C] hover:text-[#22261F]"
                  >
                    Back to Deduplication
                  </button>
                  <button
                    onClick={handleFinishImport}
                    disabled={isProcessing}
                    className="px-5 py-2.5 rounded-xl bg-[#D9A441] hover:bg-[#C59232] text-[#22261F] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-soft"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#22261F]" />
                    <span>Import to Grove Central Database</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Calming Central Database Guarantee */}
        <div className="pt-4 border-t border-[#E3DCC8] text-center">
          <p className="font-serif italic text-sm text-[#1F4D3A]">
            &ldquo;One source of truth: your central database.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

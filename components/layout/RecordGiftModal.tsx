"use client";

import React, { useState } from "react";
import { useDaanPayti } from "@/lib/store";
import { formatINR } from "@/lib/utils";
import { X, Sprout, Heart, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface RecordGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecordGiftModal({ isOpen, onClose }: RecordGiftModalProps) {
  const { donors, recordGift } = useDaanPayti();

  const [donorId, setDonorId] = useState<string>("dn-001");
  const [donorName, setDonorName] = useState<string>("Dr. Ananya Deshmukh");
  const [amountINR, setAmountINR] = useState<number>(5000);
  const [channel, setChannel] = useState<"UPI" | "Razorpay" | "Bank Transfer" | "Cheque" | "Online Form" | "Google Sheets">("UPI");
  const [campaign, setCampaign] = useState<string>("Footpath Pathshala - Nagpur");
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [needs80G, setNeeds80G] = useState<boolean>(true);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDonorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = donors.find((d) => d.id === e.target.value);
    if (selected) {
      setDonorId(selected.id);
      setDonorName(selected.name);
      setCampaign(selected.primaryCampaign || "Footpath Pathshala - Nagpur");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordGift({
      donorId,
      donorName,
      amountINR: Number(amountINR),
      date: new Date().toISOString().split("T")[0],
      channel,
      campaign,
      referenceNumber: referenceNumber || `${channel.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      receiptStatus: needs80G ? "issued" : "exempt_not_needed",
      receiptNumber: needs80G ? `UPAY/80G/26-27/${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      isRecurring,
      notes: notes || "Gift recorded via DaanPayti staff portal",
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22261F]/60 backdrop-blur-[2px] animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FFFDF8] rounded-2xl border border-[#E3DCC8] shadow-2xl p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#66695C] hover:text-[#22261F] hover:bg-[#F7F3E8] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Micro-interaction: Tender Sprouting Leaf Animation */
          <div className="py-12 flex flex-col items-center justify-center text-center animate-leaf-sprout">
            <div className="w-16 h-16 rounded-full bg-[#E6EEDC] border-2 border-[#8FB573] flex items-center justify-center text-[#1F4D3A] shadow-soft mb-4">
              <Sprout className="w-9 h-9 text-[#1F4D3A] animate-gentle-pulse" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#1F4D3A]">
              New Leaf Added to the Grove!
            </h3>
            <p className="text-sm text-[#4A7338] font-medium mt-1">
              {formatINR(amountINR)} gift successfully recorded for {donorName}
            </p>
            <p className="text-xs text-[#66695C] mt-2 italic">
              &ldquo;One more drop of nourishment for UPAY learners.&rdquo;
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Modal Header */}
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E3DCC8]">
              <div className="w-8 h-8 rounded-lg bg-[#E6EEDC] text-[#1F4D3A] flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-xl text-[#1F4D3A]">
                  Record a Gift received
                </h2>
                <p className="text-xs text-[#66695C]">
                  Plant a new leaf in UPAY&apos;s banyan grove
                </p>
              </div>
            </div>

            {/* Donor Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#22261F] mb-1">
                Supporter / Donor
              </label>
              <select
                value={donorId}
                onChange={handleDonorSelect}
                className="w-full px-3 py-2 text-sm rounded-xl border border-[#E3DCC8] bg-[#F7F3E8] text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]"
              >
                {donors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.city} • {d.growthStage.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            {/* Amount & Currency */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#22261F] mb-1">
                  Gift Amount (INR ₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-sm font-semibold text-[#66695C]">₹</span>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    required
                    value={amountINR}
                    onChange={(e) => setAmountINR(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 text-sm font-serif font-bold rounded-xl border border-[#E3DCC8] bg-[#F7F3E8] text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3A] tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#22261F] mb-1">
                  Giving Channel
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E3DCC8] bg-[#F7F3E8] text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]"
                >
                  <option value="UPI">UPI (GPay / PhonePe / QR)</option>
                  <option value="Razorpay">Razorpay Gateway</option>
                  <option value="Bank Transfer">Bank Transfer (NEFT/RTGS)</option>
                  <option value="Cheque">Cheque Deposit</option>
                  <option value="Online Form">Milaap / Online Form</option>
                  <option value="Google Sheets">Google Sheets Sync</option>
                </select>
              </div>
            </div>

            {/* Campaign Branch Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#22261F] mb-1">
                Campaign / Branch of Care
              </label>
              <select
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-[#E3DCC8] bg-[#F7F3E8] text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]"
              >
                <option value="Footpath Pathshala - Nagpur">Footpath Pathshala - Nagpur</option>
                <option value="Footpath Pathshala - Mumbai">Footpath Pathshala - Mumbai</option>
                <option value="Footpath Pathshala - Delhi NCR">Footpath Pathshala - Delhi NCR</option>
                <option value="Girl Child STEM Labs">Girl Child STEM Labs</option>
                <option value="UPAY Gurukul Residential Wing">UPAY Gurukul Residential Wing</option>
                <option value="Digital Learning Tabs">Digital Learning Tabs</option>
                <option value="Warmth Winter Blanket Drive">Warmth Winter Blanket Drive</option>
                <option value="Malnutrition & Health Camps">Malnutrition & Health Camps</option>
              </select>
            </div>

            {/* UTR / Transaction Ref */}
            <div>
              <label className="block text-xs font-semibold text-[#22261F] mb-1">
                Reference UTR / Receipt No. (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. UPI/626511029104 or NEFT-NAGP"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E3DCC8] bg-[#F7F3E8] text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]"
              />
            </div>

            {/* Toggles: 80G Receipt & Recurring */}
            <div className="p-3 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] space-y-2">
              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span className="flex items-center gap-1.5 font-medium text-[#22261F]">
                  <ShieldCheck className="w-4 h-4 text-[#1F4D3A]" />
                  Issue 80G Tax Exemption Receipt immediately
                </span>
                <input
                  type="checkbox"
                  checked={needs80G}
                  onChange={(e) => setNeeds80G(e.target.checked)}
                  className="rounded text-[#1F4D3A] focus:ring-[#1F4D3A] h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span className="flex items-center gap-1.5 font-medium text-[#22261F]">
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  Part of Monthly Recurring Mandate
                </span>
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="rounded text-[#1F4D3A] focus:ring-[#1F4D3A] h-4 w-4"
                />
              </label>
            </div>

            {/* Submit Sunlit Gold Action Button */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#66695C] hover:text-[#22261F] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#D9A441] hover:bg-[#C59232] text-[#22261F] font-semibold text-xs shadow-soft transition-all duration-150 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current text-[#22261F]" />
                <span>Plant Gift in Grove</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useDaanPayti } from "@/lib/store";
import { formatINR, formatDate } from "@/lib/utils";
import {
  Sparkles,
  Send,
  CheckCircle2,
  FileText,
  User,
  Trees,
  Bot,
  MessageCircle,
  Copy,
  Check,
  Edit3,
  ThumbsUp,
  Tag,
} from "lucide-react";

export default function SeedsOfWordsPage() {
  const { donors } = useDaanPayti();

  // Generator State
  const [selectedDonorId, setSelectedDonorId] = useState<string>("dn-001");
  const [messageType, setMessageType] = useState<"thank_you" | "impact_update" | "proposal" | "festival">("thank_you");
  const [draftStep, setDraftStep] = useState<"review" | "edit" | "approved">("review");
  const [copied, setCopied] = useState<boolean>(false);

  const selectedDonor = donors.find((d) => d.id === selectedDonorId) || donors[0];

  // Dynamic grounded text based on selected supporter and intent
  const initialDrafts: Record<string, string> = {
    thank_you: `Dear ${selectedDonor.name},

Warm greetings from the children and teachers at UPAY.

We are writing with sincere gratitude for your recent gift of ${formatINR(
      selectedDonor.recurringAmountINR || 15000
    )} towards ${selectedDonor.primaryCampaign}. 

Because of your steadfast care as a ${selectedDonor.growthStage.toUpperCase()} supporter since ${formatDate(
      selectedDonor.firstGiftDate
    )}, our learning pod in ${selectedDonor.city.split(",")[0]} has provided continuous evening study support, nutritious milk, and solar lighting for 45 street-connected learners.

As we always say at UPAY: from every seed planted with love, a protective banyan grows.

With heartfelt gratitude and care,
The UPAY Learning Family, Nagpur`,

    impact_update: `Dear ${selectedDonor.name},

A quick window into the difference your support has brought this monsoon:

At the ${selectedDonor.primaryCampaign} centre, 38 children appeared for their first quarterly reading assessment. 82% demonstrated fluent Hindi and Marathi story reading—a milestone made possible through the textbooks and study kits your gifts supported.

Your total contribution of ${formatINR(
      selectedDonor.lifetimeGivingINR
    )} over ${selectedDonor.totalGiftsCount} gifts continues to anchor these children in formal schooling.

Thank you for being the sturdy branch that shelters these young dreams.

Warm regards,
Field Team • UPAY NGO`,

    proposal: `Dear ${selectedDonor.name},

We hope this note finds you well.

Building on the foundation you have helped create at ${selectedDonor.primaryCampaign}, UPAY is expanding our STEM and digital tablet learning pods to two additional railway station communities.

Given your enduring guidance as a long-term patron, we would be deeply honoured to share our 2-page project brief and invite your thoughts on shaping this next cohort of learners.

Warm regards,
Executive Director, UPAY`,

    festival: `Dear ${selectedDonor.name},

As the festive season approaches, we at UPAY send you and your loved ones our warmest wishes.

May the light you bring into the lives of footpath learners return to your home manifold. Thank you for brightening our classroom corners with your kindness.

With affection and prayers,
The Children & Volunteers of UPAY`,
  };

  const [draftContent, setDraftContent] = useState<string>(initialDrafts.thank_you);

  const handleTypeChange = (type: any) => {
    setMessageType(type);
    setDraftContent(initialDrafts[type] || initialDrafts.thank_you);
    setDraftStep("review");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draftContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Chat RAG Assistant State
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: "user" | "ai"; text: string; citations?: string[] }>
  >([
    {
      sender: "ai",
      text: "Namaste! I am your Seeds of Words assistant, grounded in UPAY's verified donor records and campaign logs. Ask me anything about supporter history or giving patterns.",
    },
    {
      sender: "user",
      text: "Which campaigns saw the most repeat supporters this monsoon?",
    },
    {
      sender: "ai",
      text: "Based on FY 2026-27 records, the Footpath Pathshala campaign has the highest repeat rate with 17 active supporters, closely followed by Girl Child STEM Labs with 9 recurring supporters (+34% growth).",
      citations: ["Footpath Pathshala Ledger (17 donors)", "STEM Labs Branch Report", "Q2 Growth telemetry"],
    },
  ]);
  const [chatInput, setChatInput] = useState<string>("");

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatInput("");
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);

    setTimeout(() => {
      let aiResponse = "";
      let citations: string[] = [];

      if (userText.toLowerCase().includes("banyan") || userText.toLowerCase().includes("patron")) {
        aiResponse = "Currently, UPAY has 8 foundational Banyan-stage supporters (including Dr. Ananya Deshmukh, Ashok & Chitra Lele, and Tata Trusts Care Initiative). Their retention rate is 94% across 4+ years.";
        citations = ["Banyan Cohort Register", "Nagpur Foundational Ledger"];
      } else if (userText.toLowerCase().includes("unacknowledged") || userText.toLowerCase().includes("care")) {
        aiResponse = "There is currently 1 new first-time supporter (Kavita Sen, ₹2,500) awaiting a 24-hour welcome note, and 2 long-term supporters needing gentle seasonal touchpoints.";
        citations = ["Care Queue Task-01", "Supporter Care Health Index"];
      } else {
        aiResponse = `Regarding "${userText}": Based on our unified central database, UPAY has recorded 30 active supporters across 5 campaigns this fiscal year, with ₹48.65 L in total gifts received.`;
        citations = ["Central Grove Ledger FY26-27", "Razorpay & Bank Reconciled Data"];
      }

      setChatMessages((prev) => [...prev, { sender: "ai", text: aiResponse, citations }]);
    }, 700);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#C7DAC0] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>AI Layer • Human-in-the-Loop</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-[#1F4D3A]">
            Seeds of Words <span className="font-devanagari font-normal text-2xl text-[#66695C]">(शब्द-बीज)</span>
          </h1>
          <p className="text-sm text-[#66695C] mt-1 max-w-2xl">
            Grounded AI drafting for personal gratitude, campaign updates, and intelligent grove queries. A human always approves.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: RAG Grounded Composer */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-card space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3DCC8]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D9A441]" />
              <h2 className="font-serif font-bold text-lg text-[#1F4D3A]">
                Grounded Care Composer
              </h2>
            </div>
            {/* Step Badges */}
            <div className="flex items-center gap-1.5 text-[11px] font-semibold">
              <span
                className={`px-2 py-0.5 rounded-full ${
                  draftStep === "review" ? "bg-[#1F4D3A] text-white" : "bg-[#F7F3E8] text-[#66695C]"
                }`}
              >
                1. Review
              </span>
              <span>&rarr;</span>
              <span
                className={`px-2 py-0.5 rounded-full ${
                  draftStep === "edit" ? "bg-[#1F4D3A] text-white" : "bg-[#F7F3E8] text-[#66695C]"
                }`}
              >
                2. Edit
              </span>
              <span>&rarr;</span>
              <span
                className={`px-2 py-0.5 rounded-full ${
                  draftStep === "approved" ? "bg-[#4A7338] text-white" : "bg-[#F7F3E8] text-[#66695C]"
                }`}
              >
                3. Approved
              </span>
            </div>
          </div>

          {/* Selector Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-[#22261F] mb-1">
                Choose Supporter
              </label>
              <select
                value={selectedDonorId}
                onChange={(e) => {
                  setSelectedDonorId(e.target.value);
                  const d = donors.find((item) => item.id === e.target.value);
                  if (d) {
                    setDraftContent(
                      initialDrafts[messageType].replace(/Dr. Ananya Deshmukh/g, d.name)
                    );
                  }
                }}
                className="w-full px-3 py-2 rounded-xl border border-[#E3DCC8] bg-[#F7F3E8] text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]"
              >
                {donors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.growthStage.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#22261F] mb-1">
                Message Intent
              </label>
              <select
                value={messageType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E3DCC8] bg-[#F7F3E8] text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]"
              >
                <option value="thank_you">Personalized Gratitude Note</option>
                <option value="impact_update">Quarterly Learning Update</option>
                <option value="proposal">Patron Advisory / Brief</option>
                <option value="festival">Warm Festival Greeting</option>
              </select>
            </div>
          </div>

          {/* Grounded Source Citations Chips */}
          <div className="p-3 rounded-xl bg-[#F7F3E8] border border-[#E3DCC8] space-y-1.5">
            <span className="text-[11px] font-semibold text-[#1F4D3A] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#8FB573]" />
              <span>Grounded in verified records:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-[#FFFDF8] border border-[#C7DAC0] text-[10px] text-[#22261F]">
                Lifetime: <strong>{formatINR(selectedDonor.lifetimeGivingINR)}</strong>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFFDF8] border border-[#C7DAC0] text-[10px] text-[#22261F]">
                Campaign: <strong>{selectedDonor.primaryCampaign}</strong>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFFDF8] border border-[#C7DAC0] text-[10px] text-[#22261F]">
                Stage: <strong>{selectedDonor.growthStage.toUpperCase()}</strong>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFFDF8] border border-[#C7DAC0] text-[10px] text-[#22261F]">
                First gift: <strong>{formatDate(selectedDonor.firstGiftDate)}</strong>
              </span>
            </div>
          </div>

          {/* Draft Body (Editable Textarea) */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs text-[#66695C]">
              <span>Editable Draft (Warm, human, non-profit tone):</span>
              <button
                onClick={() => setDraftStep("edit")}
                className="text-[#1F4D3A] font-semibold hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit directly</span>
              </button>
            </div>
            <textarea
              rows={9}
              value={draftContent}
              onChange={(e) => {
                setDraftContent(e.target.value);
                setDraftStep("edit");
              }}
              className="w-full p-4 rounded-xl border border-[#E3DCC8] bg-[#FFFDF8] text-[#22261F] text-xs font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg border border-[#E3DCC8] text-xs text-[#66695C] hover:text-[#22261F] hover:bg-[#F7F3E8] flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#4A7338]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy to Clipboard"}</span>
            </button>

            <div className="flex items-center gap-2">
              {draftStep === "approved" ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E6EEDC] text-[#1F4D3A] text-xs font-semibold border border-[#8FB573]">
                  <CheckCircle2 className="w-4 h-4 text-[#4A7338]" />
                  <span>Approved &amp; Dispatched via WhatsApp</span>
                </div>
              ) : (
                <button
                  onClick={() => setDraftStep("approved")}
                  className="px-5 py-2.5 rounded-xl bg-[#D9A441] hover:bg-[#C59232] text-[#22261F] font-semibold text-xs transition-all shadow-soft flex items-center gap-2"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Approve &amp; Send Care Note</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Grove Q&A Assistant Chat */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FFFDF8] border border-[#E3DCC8] shadow-card flex flex-col justify-between h-[640px]">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3DCC8]">
              <div className="w-7 h-7 rounded-lg bg-[#E6EEDC] text-[#1F4D3A] flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#1F4D3A]">
                  Grove Intelligence Q&amp;A
                </h3>
                <p className="text-[11px] text-[#66695C]">
                  Ask questions about campaigns, retention rings, or giving patterns
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="py-4 space-y-3.5 max-h-[440px] overflow-y-auto pr-1">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#1F4D3A] text-[#FFFDF8] rounded-br-none"
                        : "bg-[#F7F3E8] text-[#22261F] border border-[#E3DCC8] rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Citations */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1 max-w-[88%]">
                      {msg.citations.map((cite, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.2 rounded bg-[#E6EEDC] text-[#1F4D3A] text-[9px] font-semibold border border-[#C7DAC0]"
                        >
                          [Grounded: {cite}]
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendChat} className="pt-3 border-t border-[#E3DCC8] flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask e.g. Who needs a thank-you this week?"
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E3DCC8] bg-[#F7F3E8] text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#1F4D3A]"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#1F4D3A] hover:bg-[#173B2C] text-[#FFFDF8] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

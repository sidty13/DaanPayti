export interface ReconciliationItem {
  id: string;
  statementDate: string;
  statementDescription: string;
  channel: "Bank Transfer" | "Razorpay" | "UPI" | "Cheque";
  amountINR: number;
  referenceUTR: string;
  matchStatus: "matched" | "unmatched" | "needs_review" | "possible_duplicate";
  confidenceScore: number;
  suggestedDonorId?: string;
  suggestedDonorName?: string;
  matchedGiftId?: string;
  matchRationale: string;
  isApproved: boolean;
}

export const INITIAL_RECONCILIATION_ITEMS: ReconciliationItem[] = [
  {
    id: "recon-01",
    statementDate: "2026-09-12",
    statementDescription: "NEFT-NAGP98201944-DR ANANYA DESHMUKH-HDFC0001",
    channel: "Bank Transfer",
    amountINR: 15000,
    referenceUTR: "NEFT/NAGP98201944",
    matchStatus: "matched",
    confidenceScore: 99,
    suggestedDonorId: "dn-001",
    suggestedDonorName: "Dr. Ananya Deshmukh",
    matchedGiftId: "gft-1008",
    matchRationale: "Exact UTR match & identical amount with recurring monthly gift",
    isApproved: true,
  },
  {
    id: "recon-02",
    statementDate: "2026-09-22",
    statementDescription: "UPI/626511029104/PAYMENT FROM ADITYA SHARMA/AXIS",
    channel: "UPI",
    amountINR: 5000,
    referenceUTR: "UPI/626511029104",
    matchStatus: "matched",
    confidenceScore: 98,
    suggestedDonorId: "dn-026",
    suggestedDonorName: "Aditya Sharma",
    matchedGiftId: "gft-1003",
    matchRationale: "UPI Ref matches exactly with recorded gift",
    isApproved: true,
  },
  {
    id: "recon-03",
    statementDate: "2026-09-18",
    statementDescription: "UPI/626201883902/AMIT BANSAL INDORE/PYTM",
    channel: "UPI",
    amountINR: 5000,
    referenceUTR: "UPI/626201883902",
    matchStatus: "matched",
    confidenceScore: 96,
    suggestedDonorId: "dn-016",
    suggestedDonorName: "Amit Bansal",
    matchedGiftId: "gft-1004",
    matchRationale: "Matched name & UPI transaction ID",
    isApproved: true,
  },
  {
    id: "recon-04",
    statementDate: "2026-09-10",
    statementDescription: "NEFT-AXIS88192041-ASHOK CHITRA LELE NAGPUR",
    channel: "Bank Transfer",
    amountINR: 20000,
    referenceUTR: "NEFT/AXIS88192041",
    matchStatus: "matched",
    confidenceScore: 97,
    suggestedDonorId: "dn-029",
    suggestedDonorName: "Ashok & Chitra Lele",
    matchedGiftId: "gft-1012",
    matchRationale: "Matched recurring bank mandate ref",
    isApproved: false,
  },
  {
    id: "recon-05",
    statementDate: "2026-09-27",
    statementDescription: "IMPS/627011928014/S KUMAR/CENTRAL BANK OF INDIA",
    channel: "Bank Transfer",
    amountINR: 7500,
    referenceUTR: "IMPS/627011928014",
    matchStatus: "needs_review",
    confidenceScore: 68,
    suggestedDonorName: "Unknown / S Kumar",
    matchRationale: "No matching recorded gift; 2 supporters with surname Kumar found in grove",
    isApproved: false,
  },
  {
    id: "recon-06",
    statementDate: "2026-09-25",
    statementDescription: "CHQ-000412-CLEARING MUMBAI TATA TRUSTS",
    channel: "Cheque",
    amountINR: 500000,
    referenceUTR: "CHQ/000412",
    matchStatus: "needs_review",
    confidenceScore: 84,
    suggestedDonorId: "dn-009",
    suggestedDonorName: "Tata Trusts Care Initiative",
    matchRationale: "Matched institutional supporter; requires linking to Q2 milestone ledger",
    isApproved: false,
  },
  {
    id: "recon-07",
    statementDate: "2026-09-29",
    statementDescription: "UPI/627290119200/ANONYMOUS/ICIC",
    channel: "UPI",
    amountINR: 1100,
    referenceUTR: "UPI/627290119200",
    matchStatus: "unmatched",
    confidenceScore: 20,
    matchRationale: "Direct QR scan payment without supporter contact or PAN",
    isApproved: false,
  },
  {
    id: "recon-08",
    statementDate: "2026-09-14",
    statementDescription: "UPI/625781902049/POOJA VERMA/SBI",
    channel: "UPI",
    amountINR: 10000,
    referenceUTR: "UPI/625781902049",
    matchStatus: "possible_duplicate",
    confidenceScore: 78,
    suggestedDonorId: "dn-027",
    suggestedDonorName: "Pooja Verma (Possible duplicate of dn-019 Pooja Varma)",
    matchedGiftId: "gft-1007",
    matchRationale: "Matched recorded gift, but supporter has duplicate profile pending merge",
    isApproved: false,
  },
];

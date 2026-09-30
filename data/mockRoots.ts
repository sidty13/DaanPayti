export interface RootSource {
  id: string;
  name: string;
  category: "Payment Gateway" | "Bank Ledger" | "Spreadsheet" | "Online Form" | "Email & Messaging";
  status: "connected" | "syncing" | "needs_reauth" | "paused";
  lastSync: string;
  recordsCount: number;
  syncFrequency: string;
  healthNote: string;
  iconName: string;
}

export const INITIAL_ROOTS: RootSource[] = [
  {
    id: "root-rzp",
    name: "Razorpay Subscriptions & UPI Gateway",
    category: "Payment Gateway",
    status: "connected",
    lastSync: "12 mins ago",
    recordsCount: 428,
    syncFrequency: "Real-time Webhook",
    healthNote: "Auto-sync active; 14 recurring mandates processed this week",
    iconName: "Zap",
  },
  {
    id: "root-hdfc",
    name: "HDFC Bank Main Account (NEFT / RTGS / Cheques)",
    category: "Bank Ledger",
    status: "connected",
    lastSync: "Today at 09:30 AM",
    recordsCount: 312,
    syncFrequency: "Daily Statement Sync",
    healthNote: "3 pending deposits awaiting donor identification",
    iconName: "Landmark",
  },
  {
    id: "root-sheets",
    name: "Google Sheets - Volunteer Offline Collections",
    category: "Spreadsheet",
    status: "connected",
    lastSync: "Yesterday at 07:15 PM",
    recordsCount: 184,
    syncFrequency: "Hourly Poll",
    healthNote: "Footpath Pathshala Nagpur offline register synced",
    iconName: "FileSpreadsheet",
  },
  {
    id: "root-milaap",
    name: "Milaap & GiveIndia Crowdfunding Forms",
    category: "Online Form",
    status: "connected",
    lastSync: "3 hours ago",
    recordsCount: 142,
    syncFrequency: "Every 4 Hours",
    healthNote: "Monsoon education campaign forms connected",
    iconName: "Globe",
  },
  {
    id: "root-email",
    name: "Email & WhatsApp Care Inbox Sync",
    category: "Email & Messaging",
    status: "connected",
    lastSync: "5 mins ago",
    recordsCount: 650,
    syncFrequency: "Real-time",
    healthNote: "Tracking 80G receipt delivery confirmations",
    iconName: "Mail",
  },
];

export interface IngestionBatchRecord {
  id: string;
  rawName: string;
  cleanedName: string;
  rawPhone: string;
  normalizedPhone: string;
  rawPan: string;
  panValid: boolean;
  amountINR: number;
  channel: string;
  dedupStatus: "new_supporter" | "matched_existing" | "potential_duplicate";
  matchedDonorName?: string;
  actionRequired?: string;
}

export const SAMPLE_INGESTION_BATCH: IngestionBatchRecord[] = [
  {
    id: "rec-01",
    rawName: "  aditya sharma  ",
    cleanedName: "Aditya Sharma",
    rawPhone: "9820111492",
    normalizedPhone: "+91 98201 11492",
    rawPan: "bexps9920f",
    panValid: true,
    amountINR: 5000,
    channel: "UPI",
    dedupStatus: "potential_duplicate",
    matchedDonorName: "Aaditya Sharma (dn-006)",
    actionRequired: "Review duplicate merge suggestion",
  },
  {
    id: "rec-02",
    rawName: "Kavita Sen",
    cleanedName: "Kavita Sen",
    rawPhone: "+919810344521",
    normalizedPhone: "+91 98103 44521",
    rawPan: "--",
    panValid: false,
    amountINR: 2500,
    channel: "UPI",
    dedupStatus: "matched_existing",
    matchedDonorName: "Kavita Sen (dn-010)",
    actionRequired: "Link to existing Seed profile",
  },
  {
    id: "rec-03",
    rawName: "TARUN CHOUDHARY",
    cleanedName: "Tarun Choudhary",
    rawPhone: "9820012398",
    normalizedPhone: "+91 98200 12398",
    rawPan: "AFCPT9918K",
    panValid: true,
    amountINR: 7500,
    channel: "Razorpay",
    dedupStatus: "new_supporter",
    actionRequired: "Plant new Seed profile and send welcome",
  },
  {
    id: "rec-04",
    rawName: "dr. ananya deshmukh",
    cleanedName: "Dr. Ananya Deshmukh",
    rawPhone: "9823044120",
    normalizedPhone: "+91 98230 44120",
    rawPan: "ABCPD1234M",
    panValid: true,
    amountINR: 15000,
    channel: "Bank Transfer",
    dedupStatus: "matched_existing",
    matchedDonorName: "Dr. Ananya Deshmukh (dn-001)",
    actionRequired: "Link to Banyan monthly cadence",
  },
];

export interface CareRule {
  id: string;
  title: string;
  hindiSummary: string;
  trigger: string;
  action: string;
  category: "Acknowledgements" | "80G Receipts" | "Recurring Care" | "At-Risk Retention";
  channel: "WhatsApp" | "Email" | "Staff Task" | "SMS";
  isActive: boolean;
  timesFiredThisMonth: number;
}

export const INITIAL_CARE_RULES: CareRule[] = [
  {
    id: "rule-01",
    title: "Thank every first-time supporter within 24 hours",
    hindiSummary: "पहले उपहार के 24 घंटे के भीतर आभार संदेश",
    trigger: "First gift recorded in any channel",
    action: "Send personalized WhatsApp note with child artwork & welcome kit",
    category: "Acknowledgements",
    channel: "WhatsApp",
    isActive: true,
    timesFiredThisMonth: 12,
  },
  {
    id: "rule-02",
    title: "Generate 80G tax receipt automatically when PAN is present",
    hindiSummary: "पैन नंबर उपलब्ध होने पर तुरंत 80G रसीद जारी करें",
    trigger: "Gift above ₹500 recorded with valid PAN",
    action: "Generate signed digital 80G PDF and email link to supporter",
    category: "80G Receipts",
    channel: "Email",
    isActive: true,
    timesFiredThisMonth: 44,
  },
  {
    id: "rule-03",
    title: "Gentle reminder 3 days before recurring monthly mandate",
    hindiSummary: "मासिक दान से 3 दिन पहले सौम्य सूचना",
    trigger: "3 days before recurring gift date",
    action: "Send gratitude WhatsApp message with impact snapshot of previous month",
    category: "Recurring Care",
    channel: "WhatsApp",
    isActive: true,
    timesFiredThisMonth: 18,
  },
  {
    id: "rule-04",
    title: "Gentle care alert when a Banyan supporter lapses past 90 days",
    hindiSummary: "वटवृक्ष समर्थक यदि 90 दिनों से शांत हैं तो सौम्य संपर्क",
    trigger: "No gift recorded in 90 days for Banyan stage",
    action: "Assign follow-up task to Executive Director for a warm phone check-in",
    category: "At-Risk Retention",
    channel: "Staff Task",
    isActive: true,
    timesFiredThisMonth: 3,
  },
  {
    id: "rule-05",
    title: "Celebrate 1st Year Giving Anniversary (Sprouting Tree Ring)",
    hindiSummary: "समर्थक की पहली वर्षगांठ पर डिजिटल स्मृति चिन्ह",
    trigger: "365 days since first recorded gift",
    action: "Send digital commemorative Tree Ring certificate via WhatsApp & Email",
    category: "Milestones" as any,
    channel: "WhatsApp",
    isActive: true,
    timesFiredThisMonth: 7,
  },
  {
    id: "rule-06",
    title: "Send quarterly classroom photo story to campaign supporters",
    hindiSummary: "अभियान समर्थकों को कक्षा की तस्वीरें साझा करें",
    trigger: "End of academic quarter",
    action: "Dispatch photo journal of learning progress to campaign donors",
    category: "Acknowledgements",
    channel: "Email",
    isActive: false,
    timesFiredThisMonth: 0,
  },
];

export interface CareTask {
  id: string;
  donorId: string;
  donorName: string;
  donorStage: "seed" | "sapling" | "young_tree" | "banyan";
  priority: "immediate" | "upcoming" | "routine";
  reason: string;
  suggestedAction: string;
  channel: "WhatsApp" | "Email" | "Phone Call" | "80G Dispatch";
  dueDate: string;
  completed: boolean;
}

export const INITIAL_CARE_TASKS: CareTask[] = [
  {
    id: "task-01",
    donorId: "dn-010",
    donorName: "Kavita Sen",
    donorStage: "seed",
    priority: "immediate",
    reason: "Planted first gift of ₹2,500 on 24 Sep; awaiting 24-hr personal welcome",
    suggestedAction: "Send personalized WhatsApp welcome message with Delhi NCR learning pod photo",
    channel: "WhatsApp",
    dueDate: "Today",
    completed: false,
  },
  {
    id: "task-02",
    donorId: "dn-002",
    donorName: "Vikramaditya Singhania",
    donorStage: "banyan",
    priority: "immediate",
    reason: "Banyan supporter (₹8.5L lifetime) has not given since April 2026",
    suggestedAction: "Executive Director courtesy call with Gurukul Class 10 academic report",
    channel: "Phone Call",
    dueDate: "Tomorrow",
    completed: false,
  },
  {
    id: "task-03",
    donorId: "dn-026",
    donorName: "Aditya Sharma",
    donorStage: "seed",
    priority: "upcoming",
    reason: "New gift of ₹5,000 received; pending 80G tax receipt dispatch",
    suggestedAction: "Generate and email 80G certificate once PAN is confirmed",
    channel: "80G Dispatch",
    dueDate: "2 Oct 2026",
    completed: false,
  },
  {
    id: "task-04",
    donorId: "dn-025",
    donorName: "Vandana Hegde",
    donorStage: "banyan",
    priority: "upcoming",
    reason: "Long-term supporter dormant for 7 months; needs gentle touch",
    suggestedAction: "Send warm handwritten note sharing impact of 120 girls in STEM labs",
    channel: "Email",
    dueDate: "3 Oct 2026",
    completed: false,
  },
  {
    id: "task-05",
    donorId: "dn-004",
    donorName: "Priya Sundaram",
    donorStage: "young_tree",
    priority: "routine",
    reason: "Completing 24 continuous monthly contributions next week",
    suggestedAction: "Issue 2-Year Milestone Banyan Ring token via email",
    channel: "WhatsApp",
    dueDate: "7 Oct 2026",
    completed: false,
  },
];

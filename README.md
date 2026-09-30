# DaanPayti (दान-PayTi)

Unified Donor Intelligence Platform for UPAY (Underprivileged Peoples Association Youth)

Tagline: "From every seed, a banyan."

---

## Overview

DaanPayti is a purpose-built donor intelligence and care platform designed for non-technical fundraising staff at grassroots Indian non-profits. Built for UPAY, the platform unifies fragmented donor records across UPI, Razorpay, direct bank transfers (NEFT/RTGS), cheques, and volunteer spreadsheets into a single, clean source of truth.

The system is designed with a fundamental principle: clarity beats decoration. Grounded in the central metaphor of the banyan tree, the platform tracks the journey of every supporter from an initial seed to an enduring, rooted banyan providing shade for thousands of street-connected children.

---

## Non-Profit Terminology

In alignment with non-profit ethics, the platform strictly avoids commercial or transactional jargon:
- Instead of "revenue" or "sales" -> "gifts received"
- Instead of "customers" or "users" -> "supporters"
- Instead of "profits" -> "impact" and "reach"
- Instead of "churn" -> "supporters who need care" (gentle, never blaming)
- Instead of "leads" -> "seeds"

---

## The Banyan Metaphor

- Donor: Seed -> Sapling -> Branch -> Banyan
- Donation: A leaf or drop of water
- Retention: Concentric tree rings
- Campaign: A branch of shade
- Lapsed Donor: A yellowing leaf requiring gentle nourishment
- Impact: Shade, shelter, and educational fruit

---

## Core Screens & Architecture

### 1. The Grove (Dashboard - Layer 4: Action & Impact)
- Dynamic Illustrated Banyan Canopy: Dynamic SVG artwork whose foliage and aerial roots grow as active supporter density increases.
- Key Metrics: Gifts received this FY (INR), active supporters count, cohort retention rate, average gift size, and administrative hours saved.
- Visualizations: Monthly gifts received area chart, campaign-wise branch distribution, gentle care queue for at-risk supporters, and real-time incoming gifts feed.

### 2. Roots (Data Sources & Ingestion - Layers 1 & 2)
- Connected Roots: Razorpay webhook gateway, HDFC bank statement sync, volunteer Google Sheets sync, Milaap/GiveIndia forms, and care inbox.
- 4-Stage Ingestion Pipeline:
  1. Ingest: Parse raw incoming statement lines and spreadsheets.
  2. Clean & Normalise: Indian phone number standardisation (+91), name trimming, and PAN checksum validation for 80G tax certificates.
  3. Deduplicate: Fuzzy matching algorithm that identifies duplicate entries (e.g., spelling differences or UPI handles).
  4. Match & Unify: Preview reconciled records before committing to the grove database.

### 3. Supporters (Core Directory)
- Searchable and filterable database supporting filters by growth stage, giving channel, recurring cadence, and care status.
- Reusable GrowthBadge component displaying supporter maturity (Seed, Sapling, Young Tree, Banyan).
- Side-by-Side Duplicate Merge: Interactive resolution dialog allowing staff to compare records, select canonical fields, and merge gift histories with one click.

### 4. Donor 360 (Supporter Profile - Layer 3)
- Consolidated Supporter Dossier: Name, contact details, verified PAN, city, tags, and lifetime giving summary.
- Tree Ring Giving Timeline: Chronological visualization of seasonal and recurring contributions across all channels.
- Interaction Memory: Communication history across WhatsApp, email, 80G tax receipts, and field visits.
- AI-Suggested Next Step: Contextual recommendations grounded in historical giving patterns.

### 5. Balancing the Ledger (Smart Reconciliation - Layer 3)
- Split-Matching Ledger: Direct comparison between incoming bank/Razorpay statement lines and recorded donor gifts.
- Status Indicators: Matched, Needs Review, Unmatched, and Possible Duplicate.
- Automated Confidence Scoring: Matches based on UTR numbers, amounts, and donor metadata.
- One-Click & Bulk Approvals: Instant reconciliation for high-confidence matches (90%+).

### 6. Care Queue (Automation Engine - Layer 3)
- Prioritised outreach queue sorted by supporters who most need personal gratitude or check-ins.
- Plain-Language Automation Rules: Non-technical toggles for recurring reminders, 24-hour first-time welcome messages, and lapsed supporter alerts.
- 80G Receipts Engine: Automated tax certificate generation compliant with Income Tax Rule 18AB and Form 10BD electronic reporting.

### 7. Seeds of Words (AI Care Assistant - Human-in-the-Loop)
- Grounded Care Composer: RAG-style drafting tool for personal thank-you letters, quarterly learning updates, and project proposals.
- Grounded In Citations: Displays exact source records used (e.g., gift amount, campaign, tenure) to eliminate hallucinations.
- Review -> Edit -> Approve Workflow: Requires staff approval before any message is sent.
- Grove Intelligence Q&A: Natural language interface for querying campaign metrics and giving patterns with cited database records.

### 8. Tree Rings (Reports & Insights - Layer 3)
- Concentric Cohort Retention: Visualizes annual retention rates across Year 1 to Year 4 cohorts.
- Branch Performance: Detailed breakdown of gifts across Footpath Pathshala, Girl Child STEM, Gurukul, Digital Tabs, and Winter Blanket drives.
- One-Click Export: Client-side generation of structured CSV/Excel reports for trustees and statutory audits.

### 9. Bark (Settings & Governance - Security Layer)
- Role-Based Access Control: Granular permissions for Admin, Fundraiser, and Viewer roles.
- Grove Data Health: Live quality metric tracking verified PANs, phone formatting, and duplicate resolution.
- Privacy & Compliance: Digital Personal Data Protection (DPDP) Act 2023 compliance logging and consent tracking.
- Immutable Audit Trail: Chronological logging of all merges, approvals, and dispatches.

---

## Design System & Tokens

- Background: #F7F3E8 (Parchment)
- Surface: #FFFDF8 (Warm Cream)
- Primary: #1F4D3A (Forest Green)
- Primary Hover: #173B2C
- Moss: #8FB573 (Fresh Leaf Green)
- Soft Tint: #E6EEDC (Sprout Wash)
- Accent: #D9A441 (Sunlit Gold, maximum one primary action per screen)
- Bark: #6B4F3A (Earthy Branch Brown)
- Attention: #C8643C (Warm Terracotta / Autumn Leaf, never harsh red)
- Text: #22261F (Deep Charcoal-Green)
- Muted: #66695C (Slate Moss)
- Border: #E3DCC8 (Parchment Border)

### Typography
- Headings & Big Stat Numbers: Fraunces (Warm, literary serif)
- Body & Interface: Mukta (Humanist sans-serif with native Devanagari support)
- Currency Figures: tabular-nums with standard Indian numbering format (e.g., INR 1,25,000)

---

## Tech Stack

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Visualizations: Recharts and Custom SVG Generators
- Icons: Lucide React
- State Management: React Context Provider with Central Store

---

## Getting Started

### Prerequisites
- Node.js version 18.17.0 or higher
- npm version 9.0.0 or higher

### Installation

1. Navigate to the project directory:
```bash
cd /home/siddhid26/Documents/DaanPayti
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open the application:
Visit [http://localhost:3000](http://localhost:3000) in your web browser.

### Building for Production

To create an optimized production build:
```bash
npm run build
npm run start
```

---

## Verification & Code Quality

- Production Build: Successfully compiled and statically generated across all 13 routes with zero TypeScript errors.
- Linting: Verified against standard ESLint and Next.js guidelines.
- Accessibility: WCAG AA color contrast, visible focus outlines, and full keyboard navigation support.

---

## Organization & Attribution

Developed for UPAY (Underprivileged Peoples Association Youth), Nagpur, Maharashtra, India.
"From every seed, a banyan."

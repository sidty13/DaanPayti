import type { Metadata } from "next";
import { Fraunces, Mukta } from "next/font/google";
import "./globals.css";
import { DaanPaytiProvider } from "@/lib/store";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "दान-PayTi (DaanPayti) — Unified Donor Intelligence Platform",
  description: "Unified Donor Intelligence Platform for UPAY NGO. From every seed, a banyan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${mukta.variable}`}>
      <body className="min-h-screen bg-[#F7F3E8] text-[#22261F] flex flex-row overflow-x-hidden">
        <DaanPaytiProvider>
          {/* Collapsible Left Sidebar */}
          <Sidebar />

          {/* Main Work Area */}
          <div className="flex-1 flex flex-col min-w-0 min-h-screen">
            <Topbar />
            <main className="flex-1 p-6 md:p-8 max-w-[1280px] w-full mx-auto">
              {children}
            </main>
          </div>
        </DaanPaytiProvider>
      </body>
    </html>
  );
}

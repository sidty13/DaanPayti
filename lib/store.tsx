"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Donor, INITIAL_DONORS } from "@/data/mockDonors";
import { Gift, INITIAL_GIFTS } from "@/data/mockGifts";
import { RootSource, INITIAL_ROOTS } from "@/data/mockRoots";
import { ReconciliationItem, INITIAL_RECONCILIATION_ITEMS } from "@/data/mockReconciliation";
import { CareRule, CareTask, INITIAL_CARE_RULES, INITIAL_CARE_TASKS } from "@/data/mockRules";

interface DaanPaytiContextType {
  donors: Donor[];
  gifts: Gift[];
  roots: RootSource[];
  reconciliationItems: ReconciliationItem[];
  careRules: CareRule[];
  careTasks: CareTask[];
  selectedDonorId: string | null;
  setSelectedDonorId: (id: string | null) => void;
  // Actions
  recordGift: (newGift: Omit<Gift, "id">) => void;
  mergeDonors: (primaryId: string, duplicateId: string) => void;
  approveReconciliation: (itemId: string) => void;
  bulkApproveReconciliation: () => void;
  toggleCareRule: (ruleId: string) => void;
  completeCareTask: (taskId: string) => void;
  // Recent action notice for animation
  recentGiftAnimation: boolean;
  setRecentGiftAnimation: (active: boolean) => void;
}

const DaanPaytiContext = createContext<DaanPaytiContextType | undefined>(undefined);

export function DaanPaytiProvider({ children }: { children: React.ReactNode }) {
  const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS);
  const [gifts, setGifts] = useState<Gift[]>(INITIAL_GIFTS);
  const [roots] = useState<RootSource[]>(INITIAL_ROOTS);
  const [reconciliationItems, setReconciliationItems] = useState<ReconciliationItem[]>(INITIAL_RECONCILIATION_ITEMS);
  const [careRules, setCareRules] = useState<CareRule[]>(INITIAL_CARE_RULES);
  const [careTasks, setCareTasks] = useState<CareTask[]>(INITIAL_CARE_TASKS);
  const [selectedDonorId, setSelectedDonorId] = useState<string | null>("dn-001");
  const [recentGiftAnimation, setRecentGiftAnimation] = useState<boolean>(false);

  // Action: Record a new gift
  const recordGift = (newGiftData: Omit<Gift, "id">) => {
    const newId = `gft-${Date.now().toString().slice(-4)}`;
    const newGift: Gift = {
      ...newGiftData,
      id: newId,
    };

    setGifts((prev) => [newGift, ...prev]);

    // Update donor stats if donor exists
    setDonors((prevDonors) =>
      prevDonors.map((d) => {
        if (d.id === newGift.donorId || d.name.toLowerCase() === newGift.donorName.toLowerCase()) {
          const updatedGiftsCount = d.totalGiftsCount + 1;
          const updatedLifetime = d.lifetimeGivingINR + newGift.amountINR;
          // Determine stage growth
          let newStage = d.growthStage;
          if (updatedGiftsCount >= 10 || updatedLifetime >= 100000) {
            newStage = "banyan";
          } else if (d.recurringActive || updatedGiftsCount >= 4) {
            newStage = "young_tree";
          } else if (updatedGiftsCount >= 2) {
            newStage = "sapling";
          }

          return {
            ...d,
            totalGiftsCount: updatedGiftsCount,
            lifetimeGivingINR: updatedLifetime,
            lastGiftDate: newGift.date,
            growthStage: newStage,
            careStatus: "thriving",
          };
        }
        return d;
      })
    );

    // Trigger celebration micro-interaction
    setRecentGiftAnimation(true);
    setTimeout(() => {
      setRecentGiftAnimation(false);
    }, 3500);
  };

  // Action: Merge duplicate donors
  const mergeDonors = (primaryId: string, duplicateId: string) => {
    const primary = donors.find((d) => d.id === primaryId);
    const duplicate = donors.find((d) => d.id === duplicateId);
    if (!primary || !duplicate) return;

    // Consolidate values
    const mergedDonor: Donor = {
      ...primary,
      email: primary.email || duplicate.email,
      phone: primary.phone || duplicate.phone,
      pan: primary.pan || duplicate.pan,
      lifetimeGivingINR: primary.lifetimeGivingINR + duplicate.lifetimeGivingINR,
      totalGiftsCount: primary.totalGiftsCount + duplicate.totalGiftsCount,
      possibleDuplicateId: undefined,
      tags: Array.from(new Set([...primary.tags, ...duplicate.tags])).filter((t) => !t.includes("Duplicate")),
      communications: [...primary.communications, ...duplicate.communications],
    };

    // Update donors: replace primary with mergedDonor, remove duplicate
    setDonors((prev) =>
      prev
        .filter((d) => d.id !== duplicateId)
        .map((d) => (d.id === primaryId ? mergedDonor : d.possibleDuplicateId === duplicateId ? { ...d, possibleDuplicateId: undefined } : d))
    );

    // Re-assign any gifts from duplicate to primary
    setGifts((prevGifts) =>
      prevGifts.map((g) =>
        g.donorId === duplicateId ? { ...g, donorId: primary.id, donorName: primary.name } : g
      )
    );
  };

  // Action: Approve reconciliation
  const approveReconciliation = (itemId: string) => {
    setReconciliationItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, isApproved: true, matchStatus: "matched" } : item))
    );
  };

  // Action: Bulk approve all high confidence items (>= 90%)
  const bulkApproveReconciliation = () => {
    setReconciliationItems((prev) =>
      prev.map((item) => (item.confidenceScore >= 90 ? { ...item, isApproved: true, matchStatus: "matched" } : item))
    );
  };

  // Action: Toggle care rule
  const toggleCareRule = (ruleId: string) => {
    setCareRules((prev) =>
      prev.map((rule) => (rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule))
    );
  };

  // Action: Complete care task
  const completeCareTask = (taskId: string) => {
    setCareTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, completed: true } : task))
    );
  };

  return (
    <DaanPaytiContext.Provider
      value={{
        donors,
        gifts,
        roots,
        reconciliationItems,
        careRules,
        careTasks,
        selectedDonorId,
        setSelectedDonorId,
        recordGift,
        mergeDonors,
        approveReconciliation,
        bulkApproveReconciliation,
        toggleCareRule,
        completeCareTask,
        recentGiftAnimation,
        setRecentGiftAnimation,
      }}
    >
      {children}
    </DaanPaytiContext.Provider>
  );
}

export function useDaanPayti() {
  const context = useContext(DaanPaytiContext);
  if (!context) {
    throw new Error("useDaanPayti must be used within a DaanPaytiProvider");
  }
  return context;
}

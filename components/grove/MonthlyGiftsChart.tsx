"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MONTHLY_GIFTS_DATA } from "@/data/mockGifts";
import { formatCompactINR, formatINR } from "@/lib/utils";

export function MonthlyGiftsChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-[#FFFDF8] border border-[#E3DCC8] rounded-xl shadow-card text-xs">
          <p className="font-semibold text-[#1F4D3A] mb-1">{label}</p>
          <p className="text-[#22261F]">
            Gifts Received: <span className="font-serif font-bold tabular-nums text-[#1F4D3A]">{formatINR(payload[0].value)}</span>
          </p>
          <p className="text-[#66695C] mt-0.5">
            Active Supporters: <span className="font-semibold text-[#8FB573]">{payload[0].payload.donors}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={MONTHLY_GIFTS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="mossFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8FB573" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8FB573" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            stroke="#66695C"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#E3DCC8" }}
          />
          <YAxis
            stroke="#66695C"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => formatCompactINR(val)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#1F4D3A"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#mossFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

import React from "react";

export default function StatCard({ icon: Icon, label, value, trend, tone = "maroon" }) {
  const toneMap = {
    maroon: "bg-maroon-50 text-maroon-700",
    success: "bg-successBg text-success",
    warning: "bg-warningBg text-warning",
    danger: "bg-dangerBg text-danger",
  };
  return (
    <div className="bg-white border border-border rounded-xl2 shadow-card p-5 flex flex-col gap-4 min-w-0">
      <div className="flex items-center justify-between">
        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${toneMap[tone]}`}>
          <Icon size={18} />
        </span>
        {trend && (
          <span className="text-xs font-medium text-success bg-successBg rounded-full px-2 py-1">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-ink-soft">{label}</p>
        <p className="text-2xl font-semibold text-ink mt-1 tabular-nums">{value}</p>
      </div>
    </div>
  );
}

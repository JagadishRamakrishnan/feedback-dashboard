import React from "react";

const STYLES = {
  Pending: "bg-warningBg text-warning",
  Submitted: "bg-successBg text-success",
  Completed: "bg-successBg text-success",
  Active: "bg-successBg text-success",
  Inactive: "bg-neutralBg text-ink-soft",
  Rejected: "bg-dangerBg text-danger",
  Cancelled: "bg-neutralBg text-ink-soft",
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || "bg-neutralBg text-ink-soft";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

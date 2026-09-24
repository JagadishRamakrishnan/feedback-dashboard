import React from "react";
import { ChevronDown } from "lucide-react";

export default function FilterDropdown({ value, onChange, options, label }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="appearance-none w-full rounded-lg border border-border bg-white pl-3 pr-8 py-2 text-sm text-ink focus-ring focus:border-maroon-500 cursor-pointer"
      >
        <option value="All">{label || "All"}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="md:block hidden pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint"
      />
    </div>
  );
}

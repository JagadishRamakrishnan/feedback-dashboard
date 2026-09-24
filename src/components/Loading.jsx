import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-soft">
      <Loader2 size={22} className="animate-spin text-maroon-600" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

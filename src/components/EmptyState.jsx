import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", description, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 px-4 text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutralBg text-ink-faint mb-1">
        <Icon size={20} />
      </span>
      <p className="text-sm font-medium text-ink">{title}</p>
      {description && <p className="text-sm text-ink-soft max-w-sm">{description}</p>}
    </div>
  );
}

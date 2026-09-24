import React, { useState } from "react";
import { Menu, ChevronDown, User, LogOut } from "lucide-react";

export default function Navbar({ roleLabel, name, email, onMenuClick, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 sm:px-6 bg-cream-100/90 backdrop-blur border-b border-border">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-ink-soft"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <span className="hidden sm:inline-flex text-xs font-medium text-maroon-700 bg-maroon-50 rounded-full px-3 py-1">
          {roleLabel}
        </span>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2.5 rounded-full pl-1 pr-2.5 py-1 hover:bg-white/70 transition-colors"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-maroon-700 text-white text-xs font-semibold">
            {name?.[0] ?? "U"}
          </span>
          <span className="hidden sm:block text-left leading-tight">
            <span className="block text-sm font-medium text-ink">{name}</span>
            <span className="block text-[11px] text-ink-faint">{email}</span>
          </span>
          <ChevronDown size={14} className="text-ink-faint hidden sm:block" />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-card py-1.5 z-20">
              <button className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-ink hover:bg-neutralBg">
                <User size={15} /> Profile
              </button>
              <button
                onClick={onLogout}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-sm text-danger hover:bg-dangerBg"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

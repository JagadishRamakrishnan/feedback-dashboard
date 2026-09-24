import React from "react";
import { NavLink } from "react-router-dom";
import { ClipboardList, X } from "lucide-react";

export default function Sidebar({ items, roleLabel, open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-64 shrink-0 bg-white border-r border-border flex flex-col transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-border">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-maroon-700 text-white">
              <ClipboardList size={16} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">Ascent Feedback</p>
              <p className="text-[11px] text-ink-faint">{roleLabel}</p>
            </div>
          </div>
          <button className="lg:hidden text-ink-faint" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
          {items.map((item) =>
            item.action ? (
              <button
                key={item.label}
                onClick={item.action}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-dangerBg hover:text-danger transition-colors text-left"
              >
                <item.icon size={17} />
                {item.label}
              </button>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-maroon-700 text-white shadow-sm"
                      : "text-ink-soft hover:bg-cream-100"
                  }`
                }
              >
                <item.icon size={17} />
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="px-4 py-4 border-t border-border">
          <p className="text-[11px] text-ink-faint">© 2026 Ascent Feedback</p>
        </div>
      </aside>
    </>
  );
}

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EmptyState from "./EmptyState.jsx";

export default function DataTable({
  columns,
  rows,
  page = 1,
  pageSize = 5,
  totalCount,
  onPageChange,
  emptyTitle = "No records found",
  emptyDescription = "Try adjusting your search or filters.",
}) {
  const total = totalCount ?? rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="bg-white border border-border rounded-xl2 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-border bg-cream-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left font-medium text-ink-soft px-5 py-3 whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                className="border-b border-border last:border-0 hover:bg-cream-50/60 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3.5 text-ink align-middle whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}

      {rows.length > 0 && onPageChange && (
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-border">
          <p className="text-xs text-ink-soft">
            Showing <span className="font-medium text-ink">{start}-{end}</span> of{" "}
            <span className="font-medium text-ink">{total}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink-soft hover:bg-neutralBg disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-xs text-ink-soft px-1.5">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink-soft hover:bg-neutralBg disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

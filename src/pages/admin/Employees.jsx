import React, { useMemo, useState } from "react";
import { Eye } from "lucide-react";
import DataTable from "../../components/DataTable.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import FilterDropdown from "../../components/FilterDropdown.jsx";
import Modal from "../../components/Modal.jsx";
import { employees } from "../../data/mockData.js";

const PAGE_SIZE = 5;

export default function Employees() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let rows = employees.filter(
      (e) =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase())
    );
    if (status !== "All") rows = rows.filter((e) => e.status === status);
    return rows;
  }, [search, status]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { key: "name", header: "Employee Name" },
    { key: "id", header: "Employee ID" },
    { key: "email", header: "Email" },
    { key: "designation", header: "Designation" },
    { key: "assignedFeedback", header: "Assigned Feedback" },
    { key: "completedFeedback", header: "Completed Feedback" },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <button
          onClick={() => setSelected(row)}
          className="inline-flex items-center gap-1.5 text-maroon-700 hover:underline text-sm font-medium"
        >
          <Eye size={14} /> View
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink">Employees</h1>
        <p className="text-sm text-ink-soft mt-1">Manage employees and their feedback activity</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search employees" />
        <FilterDropdown
          value={status}
          onChange={(v) => { setStatus(v); setPage(1); }}
          options={["Active", "Inactive"]}
          label="Status"
        />
      </div>

      <DataTable
        columns={columns}
        rows={paged}
        page={page}
        pageSize={PAGE_SIZE}
        totalCount={filtered.length}
        onPageChange={setPage}
        emptyTitle="No employees found"
        emptyDescription="Try a different search term or filter."
      />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Employee Details">
        {selected && (
          <div className="grid grid-cols-2 gap-y-4 gap-x-4">
            <div>
              <p className="text-xs text-ink-faint mb-1">Name</p>
              <p className="text-sm font-medium text-ink">{selected.name}</p>
            </div>
            <div>
              <p className="text-xs text-ink-faint mb-1">Employee ID</p>
              <p className="text-sm font-medium text-ink">{selected.id}</p>
            </div>
            <div>
              <p className="text-xs text-ink-faint mb-1">Email</p>
              <p className="text-sm font-medium text-ink">{selected.email}</p>
            </div>
            <div>
              <p className="text-xs text-ink-faint mb-1">Designation</p>
              <p className="text-sm font-medium text-ink">{selected.designation}</p>
            </div>
            <div>
              <p className="text-xs text-ink-faint mb-1">Assigned Feedback</p>
              <p className="text-sm font-medium text-ink">{selected.assignedFeedback}</p>
            </div>
            <div>
              <p className="text-xs text-ink-faint mb-1">Completed Feedback</p>
              <p className="text-sm font-medium text-ink">{selected.completedFeedback}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

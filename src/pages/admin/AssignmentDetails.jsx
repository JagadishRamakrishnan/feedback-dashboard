import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../../components/StatusBadge.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import { assignments } from "../../data/mockData.js";
import { useToast } from "../../components/Toast.jsx";

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-ink-faint mb-1">{label}</p>
      <p className="text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

export default function AssignmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const record = assignments.find((a) => a.id === id);

  if (!record) {
    return <EmptyState title="Assignment not found" description="It may have been removed." />;
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <button
        onClick={() => navigate("/admin/assignments")}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink w-fit"
      >
        <ArrowLeft size={15} /> Back
      </button>

      <div className="bg-white border border-border rounded-xl2 shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-ink">Feedback Assignment</h1>
          <StatusBadge status={record.status} />
        </div>

        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
          <Field label="Employee" value={record.employee} />
          <Field label="Employee ID" value={record.employeeId} />
          <Field label="Designation" value={record.designation} />
          <Field label="Feedback Title" value={record.title} />
          <Field label="Assigned Date" value={record.date} />
          <Field label="Assigned By" value={record.assignedBy} />
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <button
            onClick={() => navigate(`/admin/assignments/${id}/edit`)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink hover:bg-neutralBg"
          >
            <Pencil size={14} /> Edit Assignment
          </button>
          <button
            onClick={() => setConfirmOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-dangerBg px-4 py-2.5 text-sm font-medium text-danger hover:bg-danger/10"
          >
            <Trash2 size={14} /> Delete Assignment
          </button>
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          showToast(`Assignment "${record.title}" deleted.`);
          navigate("/admin/assignments");
        }}
        title="Delete assignment"
        message={`This will permanently remove "${record.title}" for ${record.employee}.`}
      />
    </div>
  );
}

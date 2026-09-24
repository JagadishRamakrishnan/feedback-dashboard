import React from "react";
import Modal from "./Modal.jsx";
import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-neutralBg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-danger/90 transition-colors"
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dangerBg text-danger">
          <AlertTriangle size={16} />
        </span>
        <p>{message}</p>
      </div>
    </Modal>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../components/Toast.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import {
  getAssignmentById,
  updateAssignment,
} from "../../services/assignmentApi.js";

export default function EditAssignment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Get assignment by ID
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setLoading(true);

        const response = await getAssignmentById(id);

        console.log("Assignment details:", response);

        // Handle different possible backend response structures
        const assignment = response?.assignment || response;

        if (!assignment) {
          setNotFound(true);
          return;
        }

        setForm({
          employee: assignment.assignedPerson || "",
          date: assignment.date || "",
          title: assignment.title || "",
          assignedPerson: assignment.assignedPerson || "",
        });
      } catch (error) {
        console.error("Failed to fetch assignment:", error);

        setNotFound(true);

        showToast(
          error.response?.data?.message ||
            "Failed to load assignment.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAssignment();
    }
  }, [id]);

  const update = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  // Update assignment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.date || !form.title || !form.assignedPerson) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    try {
      setSaving(true);

      const updateData = {
        date: form.date,
        title: form.title,
        assignedPerson: form.assignedPerson,
      };

      console.log("Updating assignment:", updateData);

      const response = await updateAssignment(id, updateData);

      console.log("Assignment updated:", response);

      showToast("Changes saved successfully.");

      navigate(`/admin/assignments`);
    } catch (error) {
      console.error("Update assignment error:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to update assignment.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <EmptyState
        title="Loading assignment..."
        description="Please wait while the assignment is being loaded."
      />
    );
  }

  // Not found state
  if (notFound || !form) {
    return (
      <EmptyState
        title="Assignment not found"
        description="It may have been removed."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold text-ink">
          Edit Assignment
        </h1>

        <p className="text-sm text-ink-soft mt-1">
          Update details for this feedback assignment
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-border rounded-xl2 shadow-card p-6 flex flex-col gap-4"
      >

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Date
          </label>

          <input
            type="date"
            value={form.date}
            onChange={update("date")}
            className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm focus-ring focus:border-maroon-500"
          />
        </div>

        {/* Feedback Title */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Feedback Title
          </label>

          <input
            type="text"
            value={form.title}
            onChange={update("title")}
            className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm focus-ring focus:border-maroon-500"
          />
        </div>

        {/* Assigned Person */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Assigned Person
          </label>

          <input
            type="text"
            value={form.assignedPerson}
            onChange={update("assignedPerson")}
            className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm focus-ring focus:border-maroon-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-maroon-700 text-white text-sm font-medium px-6 py-2.5 hover:bg-maroon-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/assignments")}
            disabled={saving}
            className="rounded-lg border border-border text-sm font-medium px-6 py-2.5 text-ink hover:bg-neutralBg disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
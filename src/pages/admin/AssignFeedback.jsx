import React, { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "../../components/Toast.jsx";
import { createAssignment } from "../../services/assignmentApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AssignFeedback() {
  const { showToast } = useToast();
  const { user } = useAuth();

  const [form, setForm] = useState({
    date: "",
    title: "",
    assignedPerson: "",
  });

  const [loading, setLoading] = useState(false);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.date || !form.title || !form.assignedPerson) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    try {
      setLoading(true);

      const userId = user?._id || user?.id;

      if (!userId) {
        showToast("User ID is missing. Please login again.", "error");
        return;
      }

      const assignmentData = {
        userId,
        date: form.date,
        title: form.title,
        assignedPerson: form.assignedPerson,
      };

      const data = await createAssignment(assignmentData);

      showToast(`Feedback "${form.title}" assigned to ${form.assignedPerson}.`);

      setForm({
        date: "",
        title: "",
        assignedPerson: "",
      });
    } catch (error) {
      console.error("Assignment error:", error);
      console.error("Backend response:", error.response?.data);

      showToast(
        error.response?.data?.message ||
          "Failed to create feedback assignment.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold text-ink">Assign Feedback</h1>

        <p className="text-sm text-ink-soft mt-1">
          Create a new feedback assignment for an employee
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-border rounded-xl2 shadow-card p-6 flex flex-col gap-4"
      >
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

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Feedback Title
          </label>

          <input
            type="text"
            value={form.title}
            onChange={update("title")}
            placeholder="Employee Annual Feedback"
            className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm focus-ring focus:border-maroon-500"
          />
        </div>

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

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-maroon-700 text-white text-sm font-medium py-2.5 hover:bg-maroon-800 transition-colors w-full sm:w-auto sm:px-6 self-start disabled:opacity-60"
        >
          <Send size={15} />

          {loading ? "Assigning..." : "Assign Feedback"}
        </button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import EmptyState from "../../components/EmptyState.jsx";
import { useToast } from "../../components/Toast.jsx";
import { getFeedbackById } from "../../services/feedbackApi.js";

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-ink-faint mb-1">{label}</p>
      <p className="text-sm font-medium text-ink">
        {value || "-"}
      </p>
    </div>
  );
}

export default function FeedbackDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);

        const response = await getFeedbackById(id);

        console.log("Feedback details response:", response);

        const feedback =
          response?.feedback ||
          response?.data ||
          response;

        if (!feedback) {
          setRecord(null);
          return;
        }

        const formattedFeedback = {
          id: feedback._id,

          employee:
            feedback.employeeName ||
            feedback.employee ||
            "",

          employeeId:
            feedback.employeeId ||
            "",

          designation:
            feedback.designation ||
            feedback.Designation ||
            "",

          title:
            feedback.feedbackTitle ||
            feedback.title ||
            feedback.assignedTitleId?.title ||
            feedback.assignedTitleId?.feedbackTitle ||
            "",

          assignedDate:
            feedback.assignedDate ||
            feedback.assignedTitleId?.assignedDate ||
            feedback.assignedTitleId?.feedbackDate ||
            feedback.assignedTitleId?.date ||
            "",

          feedback:
            feedback.feedback ||
            "",
        };

        setRecord(formattedFeedback);
      } catch (error) {
        console.error(
          "Failed to fetch feedback details:",
          error
        );

        showToast(
          error.response?.data?.message ||
            "Failed to load feedback details.",
          "error"
        );

        setRecord(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFeedback();
    }
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <EmptyState
        title="Loading feedback..."
        description="Please wait while the feedback details are loading."
      />
    );
  }

  if (!record) {
    return (
      <EmptyState
        title="Feedback not found"
        description="The feedback may have been removed or the ID is invalid."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Back */}
      <button
        onClick={() =>
          navigate("/admin/submitted-feedback")
        }
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink w-fit"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      {/* Details Card */}
      <div className="bg-white border border-border rounded-xl2 shadow-card p-6">
        <h1 className="text-lg font-semibold text-ink mb-6">
          Employee Feedback
        </h1>

        <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-6">
          <Field
            label="Employee Name"
            value={record.employee}
          />

          <Field
            label="Employee ID"
            value={record.employeeId}
          />

          <Field
            label="Designation"
            value={record.designation}
          />

          <Field
            label="Feedback Title"
            value={record.title}
          />

          <Field
            label="Assigned Date"
            value={formatDate(record.assignedDate)}
          />
        </div>

        {/* Feedback */}
        <div className="border-t border-border pt-5">
          <p className="text-xs text-ink-faint mb-2">
            Feedback
          </p>

          <p className="text-sm text-ink leading-relaxed bg-cream-100 rounded-lg p-4 whitespace-pre-wrap">
            {record.feedback || "No feedback submitted."}
          </p>
        </div>
      </div>
    </div>
  );
}
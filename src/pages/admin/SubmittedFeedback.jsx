import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import DataTable from "../../components/DataTable.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import FilterDropdown from "../../components/FilterDropdown.jsx";
import { getFeedbacks } from "../../services/feedbackApi.js";
import { useToast } from "../../components/Toast.jsx";

const PAGE_SIZE = 5;

export default function SubmittedFeedback() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [employee, setEmployee] = useState("All");
  const [dateSort, setDateSort] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch submitted feedback
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);

        const response = await getFeedbacks();

        console.log("Feedback response:", response);

        const feedbacks = response?.feedbacks || [];

        const formattedFeedbacks = feedbacks.map((feedback) => ({
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
            feedback.assignedTitleId.title ||
            "",
          feedback: feedback.feedback || "",
          createdAt: feedback.createdAt,
          updatedAt: feedback.updatedAt,
        }));

        setData(formattedFeedbacks);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);

        showToast(
          error.response?.data?.message ||
            "Failed to load submitted feedback.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Get employee names dynamically
  const employeeOptions = useMemo(() => {
    const names = data
      .map((item) => item.employee)
      .filter(Boolean);

    return [...new Set(names)];
  }, [data]);

  // Search, filter and sort
  const filtered = useMemo(() => {
    let rows = data.filter(
      (f) =>
        f.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        f.employee
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    if (employee !== "All") {
      rows = rows.filter(
        (f) => f.employee === employee
      );
    }

    if (dateSort === "Newest") {
      rows = [...rows].sort(
        (a, b) =>
          new Date(b.submittedDate) -
          new Date(a.submittedDate)
      );
    } else if (dateSort === "Oldest") {
      rows = [...rows].sort(
        (a, b) =>
          new Date(a.submittedDate) -
          new Date(b.submittedDate)
      );
    }

    return rows;
  }, [data, search, employee, dateSort]);

  // Pagination
  const paged = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const columns = [
    {
      key: "employee",
      header: "Employee",
    },
    {
      key: "employeeId",
      header: "Employee ID",
    },
    {
      key: "designation",
      header: "Designation",
    },
    {
      key: "title",
      header: "Feedback Title",
    },
    {
      key: "action",
      header: "Action",
      render: (row) => (
        <button
          onClick={() =>
            navigate(
              `/admin/submitted-feedback/${row.id}`
            )
          }
          className="inline-flex items-center gap-1.5 bg-maroon-700 text-white p-1.5 rounded-md hover:underline text-sm font-medium"
        >
          <Eye size={14} />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink">
          Submitted Feedback
        </h1>

        <p className="text-sm text-ink-soft mt-1">
          Review feedback submitted by employees
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search */}
        <SearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          placeholder="Search by employee or title"
        />

        {/* Employee Filter */}
        <FilterDropdown
          value={employee}
          onChange={(v) => {
            setEmployee(v);
            setPage(1);
          }}
          options={employeeOptions}
          label="Employee"
        />

        {/* Date Filter */}
        <FilterDropdown
          value={dateSort}
          onChange={(v) => {
            setDateSort(v);
            setPage(1);
          }}
          options={["Newest", "Oldest"]}
          label="Date"
        />
      </div>

      <DataTable
        columns={columns}
        rows={paged}
        page={page}
        pageSize={PAGE_SIZE}
        totalCount={filtered.length}
        onPageChange={setPage}
        emptyTitle={
          loading
            ? "Loading submitted feedback..."
            : "No submitted feedback found"
        }
        emptyDescription={
          loading
            ? "Please wait while feedback is loading."
            : "Try a different search term or filter."
        }
      />
    </div>
  );
}
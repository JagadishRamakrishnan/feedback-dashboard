import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import DataTable from "../../components/DataTable.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import FilterDropdown from "../../components/FilterDropdown.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import { useToast } from "../../components/Toast.jsx";
import {
  getAssignments,
  deleteAssignment,
} from "../../services/assignmentApi.js";

const PAGE_SIZE = 5;

export default function Assignments() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [dateSort, setDateSort] = useState("All");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);

        const response = await getAssignments();

        console.log("Assignments response:", response);

        const assignments = response?.assignments || [];

        const formattedAssignments = assignments.map((assignment) => ({
          id: assignment._id,
          date: assignment.date,
          title: assignment.title,
          assignedBy: assignment.assignedPerson,
          status: assignment.status || "Pending",
          userId: assignment.userId,
          createdAt: assignment.createdAt,
          updatedAt: assignment.updatedAt,
        }));

        setData(formattedAssignments);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);

        showToast(
          error.response?.data?.message ||
            "Failed to load assignments.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Search, filter and sort
  const filtered = useMemo(() => {
    let rows = data.filter(
      (a) =>
        a.employee?.toLowerCase().includes(search.toLowerCase()) ||
        a.title?.toLowerCase().includes(search.toLowerCase())
    );

    if (status !== "All") {
      rows = rows.filter((a) => a.status === status);
    }

    if (dateSort === "Newest") {
      rows = [...rows].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (dateSort === "Oldest") {
      rows = [...rows].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }

    return rows;
  }, [data, search, status, dateSort]);

  // Pagination
  const paged = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const columns = [
    {
      key: "date",
      header: "Date",
    },
    {
      key: "title",
      header: "Feedback Title",
    },
    {
      key: "assignedBy",
      header: "Assigned Person",
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-3 text-sm font-medium">
          <button
            onClick={() =>
              navigate(`/admin/assignments/${row.id}`)
            }
            className="inline-flex items-center gap-1 bg-maroon-700 text-white p-1.5 rounded-md hover:underline"
          >
            <Eye size={14} />
          </button>

          <button
            onClick={() =>
              navigate(`/admin/assignments/${row.id}/edit`)
            }
            className="inline-flex items-center gap-1 border border-gray-400 p-1.5 rounded-md text-black hover:text-ink"
          >
            <Pencil size={14} />
          </button>

          <button
            onClick={() => setDeleteTarget(row)}
            className="inline-flex items-center gap-1 bg-danger text-white rounded-md p-1.5 hover:underline"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  // Delete assignment
  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteAssignment(deleteTarget.id);

      setData((prev) =>
        prev.filter((a) => a.id !== deleteTarget.id)
      );

      showToast(
        `Assignment "${deleteTarget.title}" deleted.`
      );

      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete assignment error:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to delete assignment.",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink">
          Assignments
        </h1>

        <p className="text-sm text-ink-soft mt-1">
          All feedback assignments across employees
        </p>
      </div>

      <div className="flex md:flex-row flex-col justify-between md:items-center">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <SearchBar
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder="Search by employee or title"
          />

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

        <button
          onClick={() => navigate("/admin/assign-feedback")}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-maroon-700 text-white text-sm font-medium py-2.5 hover:bg-maroon-800 transition-colors w-full sm:w-auto sm:px-6 self-start"
        >
          <Plus size={15} />
          Assign Feedback
        </button>
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
            ? "Loading assignments..."
            : "No assignments found"
        }
        emptyDescription={
          loading
            ? "Please wait while assignments are loading."
            : "Try a different search term or filter."
        }
      />

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete assignment"
        message={`This will permanently remove "${deleteTarget?.title}" for ${deleteTarget?.employee}.`}
      />
    </div>
  );
}
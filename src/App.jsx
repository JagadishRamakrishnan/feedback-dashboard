import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";

import AdminLayout from "./components/AdminLayout.jsx";
import AssignFeedback from "./pages/admin/AssignFeedback.jsx";
import Assignments from "./pages/admin/Assignments.jsx";
import AssignmentDetails from "./pages/admin/AssignmentDetails.jsx";
import EditAssignment from "./pages/admin/EditAssignment.jsx";
import SubmittedFeedback from "./pages/admin/SubmittedFeedback.jsx";
import FeedbackDetails from "./pages/admin/FeedbackDetails.jsx";
import Employees from "./pages/admin/Employees.jsx";

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to="/admin" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AssignFeedback />} />
        <Route path="assign-feedback" element={<AssignFeedback />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="assignments/:id" element={<AssignmentDetails />} />
        <Route path="assignments/:id/edit" element={<EditAssignment />} />
        <Route path="submitted-feedback" element={<SubmittedFeedback />} />
        <Route path="submitted-feedback/:id" element={<FeedbackDetails />} />
        <Route path="employees" element={<Employees />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

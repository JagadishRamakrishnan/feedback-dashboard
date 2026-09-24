import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { LayoutGrid, MessageSquareText, LogOut } from "lucide-react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const NAV_ITEMS = (onLogout) => [
  { label: "Dashboard", to: "/employee", end: true, icon: LayoutGrid },
  { label: "My Feedback", to: "/employee/my-feedback", icon: MessageSquareText },
  { label: "Logout", action: onLogout, icon: LogOut },
];

export default function EmployeeLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-cream-100">
      <Sidebar
        items={NAV_ITEMS(logout)}
        roleLabel="Employee Panel"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar
          roleLabel="Employee"
          name={user?.name}
          email={user?.email}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={logout}
        />
        <main className="flex-1 p-4 sm:p-6 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

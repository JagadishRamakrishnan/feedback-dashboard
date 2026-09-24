// Centralized mock data. Backend APIs will replace these later.

export const employees = [
  {
    id: "EMP001",
    name: "Prabu",
    email: "prabu@gmail.com",
    designation: "Software Developer",
    assignedFeedback: 3,
    completedFeedback: 2,
    status: "Active",
  },
  {
    id: "EMP002",
    name: "Karthik",
    email: "karthik@gmail.com",
    designation: "UI/UX Designer",
    assignedFeedback: 2,
    completedFeedback: 2,
    status: "Active",
  },
  {
    id: "EMP003",
    name: "Suresh",
    email: "suresh@gmail.com",
    designation: "QA Engineer",
    assignedFeedback: 4,
    completedFeedback: 3,
    status: "Active",
  },
  {
    id: "EMP004",
    name: "Priya",
    email: "priya@gmail.com",
    designation: "Backend Developer",
    assignedFeedback: 1,
    completedFeedback: 0,
    status: "Inactive",
  },
  {
    id: "EMP005",
    name: "Divya",
    email: "divya@gmail.com",
    designation: "Product Analyst",
    assignedFeedback: 2,
    completedFeedback: 1,
    status: "Active",
  },
];

export const assignments = [
  {
    id: "AS001",
    date: "23 Sep 2026",
    title: "Employee Annual Feedback",
    employee: "Prabu",
    employeeId: "EMP001",
    designation: "Software Developer",
    assignedBy: "Admin",
    status: "Pending",
  },
  {
    id: "AS002",
    date: "20 Sep 2026",
    title: "Q3 Performance Review",
    employee: "Karthik",
    employeeId: "EMP002",
    designation: "UI/UX Designer",
    assignedBy: "Admin",
    status: "Submitted",
  },
  {
    id: "AS003",
    date: "18 Sep 2026",
    title: "Peer Collaboration Feedback",
    employee: "Suresh",
    employeeId: "EMP003",
    designation: "QA Engineer",
    assignedBy: "Admin",
    status: "Pending",
  },
  {
    id: "AS004",
    date: "15 Sep 2026",
    title: "Project Delivery Feedback",
    employee: "Priya",
    employeeId: "EMP004",
    designation: "Backend Developer",
    assignedBy: "Admin",
    status: "Submitted",
  },
  {
    id: "AS005",
    date: "12 Sep 2026",
    title: "Client Communication Review",
    employee: "Divya",
    employeeId: "EMP005",
    designation: "Product Analyst",
    assignedBy: "Admin",
    status: "Pending",
  },
  {
    id: "AS006",
    date: "05 Sep 2026",
    title: "Mid-Year Self Assessment",
    employee: "Prabu",
    employeeId: "EMP001",
    designation: "Software Developer",
    assignedBy: "Admin",
    status: "Submitted",
  },
];

export const submittedFeedback = [
  {
    id: "FB001",
    employee: "Karthik",
    employeeId: "EMP002",
    designation: "UI/UX Designer",
    title: "Q3 Performance Review",
    assignedDate: "20 Sep 2026",
    submittedDate: "22 Sep 2026",
    status: "Submitted",
    feedback:
      "Consistently delivers high-quality design work and collaborates well with the engineering team. Could improve on documenting design decisions for handoff.",
  },
  {
    id: "FB002",
    employee: "Priya",
    employeeId: "EMP004",
    designation: "Backend Developer",
    title: "Project Delivery Feedback",
    assignedDate: "15 Sep 2026",
    submittedDate: "17 Sep 2026",
    status: "Submitted",
    feedback:
      "Delivered the payments module ahead of schedule with clean, well-tested code. Communication during blockers could be more proactive.",
  },
  {
    id: "FB003",
    employee: "Prabu",
    employeeId: "EMP001",
    designation: "Software Developer",
    title: "Mid-Year Self Assessment",
    assignedDate: "05 Sep 2026",
    submittedDate: "08 Sep 2026",
    status: "Submitted",
    feedback:
      "Employee has performed well and completed assigned tasks on time. Shows strong ownership on the frontend rewrite initiative.",
  },
];

export const dashboardStats = {
  totalEmployees: 25,
  totalAssignments: 32,
  pendingFeedback: 8,
  submittedFeedback: 24,
};

export const employeeDashboardStats = {
  assigned: 3,
  pending: 1,
  completed: 2,
};

export const employeeDirectoryNames = employees.map((e) => e.name);

# PulseCheck — Employee Feedback Management Dashboard (Frontend Only)

A frontend-only React dashboard for managing employee feedback assignments, built with React, React Router, and Tailwind CSS. All data is mock/local — no backend, database, or authentication API is included. Wire up your real APIs later by replacing the contents of `src/data/mockData.js` and the mock `login()` call in `src/context/AuthContext.jsx`.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

## Demo logins

| Role     | Email               | Password    |
|----------|---------------------|-------------|
| Admin    | admin@gmail.com     | admin123    |
| Employee | employee@gmail.com  | employee123 |

(Click "Use Admin" / "Use Employee" on the login screen to autofill.)

## Structure

```
src/
├── components/   # Sidebar, Navbar, StatCard, StatusBadge, SearchBar,
│                 # FilterDropdown, DataTable, Modal, ConfirmModal,
│                 # Toast, Loading, EmptyState, AdminLayout, EmployeeLayout
├── context/      # AuthContext (mock login/logout)
├── data/         # mockData.js — employees, assignments, feedback, stats
└── pages/
    ├── Login.jsx
    ├── admin/    # Dashboard, AssignFeedback, Assignments, AssignmentDetails,
    │             # EditAssignment, SubmittedFeedback, FeedbackDetails, Employees
    └── employee/ # Dashboard, MyFeedback, GiveFeedback, ViewFeedback
```

## Design

Color palette matches the reference dashboard screenshot (warm cream background, deep maroon primary accent, rounded cards, soft shadows). Fully responsive — sidebar collapses to a hamburger menu, tables scroll horizontally, forms stack to a single column on mobile.

## Build

```bash
npm run build
```

Outputs a production build to `dist/`.

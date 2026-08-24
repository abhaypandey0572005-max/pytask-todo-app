# 🗺️ Project Phases & Roadmap (`phases.doc.md`)

This document outlines the evolutionary milestones, completed deliverables, and future roadmap for the **PyTask (TaskFlow)** application.

---

## 📌 Milestone Overview

```mermaid
gantt
    title PyTask Development Phases
    dateFormat  YYYY-MM-DD
    section Phase 1 (Completed)
    CLI Tool & File Storage       :done, 2026-08-01, 2026-08-05
    Flask REST API Backend        :done, 2026-08-06, 2026-08-10
    section Phase 2 (Completed)
    React SPA & Vite Setup        :done, 2026-08-15, 2026-08-20
    Tailwind CSS & API Service    :done, 2026-08-21, 2026-08-23
    section Phase 3 (Completed)
    Stitch Design Integration     :done, 2026-08-24, 2026-08-24
    Rich Metadata & Modals        :done, 2026-08-24, 2026-08-24
    section Phase 4 (Next)
    Advanced Filters & Sorting    :active, 2026-08-25, 2026-09-01
    Data Export & Import          :2026-09-02, 2026-09-08
    section Phase 5 (Future)
    SQLite / PostgreSQL Engine    :2026-09-10, 2026-09-20
    Auth & Multi-User Support     :2026-09-21, 2026-10-01
```

---

## ✅ Phase 1: Foundation & Backend (Completed)
- [x] **CLI To-Do Tool (`todo.py`)**: Terminal-based interactive menu with task addition, completion, editing, searching, and deletion.
- [x] **JSON Storage Engine (`database.py`)**: Robust JSON read/write handler with automatic file creation and error handling.
- [x] **Flask REST API (`app.py`)**:
  - `GET /tasks`
  - `POST /tasks`
  - `PUT /tasks/<index>/complete`
  - `PUT /tasks/<index>`
  - `DELETE /tasks/<index>`
- [x] **Initial Template View**: Basic Jinja template (`index.html`) in `Backend/templates/`.

---

## ✅ Phase 2: Modern Frontend & React Decoupling (Completed)
- [x] **React 19 + Vite Scaffolding**: Structured project setup under `frontend/`.
- [x] **Tailwind CSS v4 & Lucide Icons**: Modern dark-theme typography (Inter font) and iconography.
- [x] **Centralized API Service (`src/api.js`)**: Encapsulated HTTP request handlers.
- [x] **Vite Dev Server Proxy**: Zero-CORS development proxy forwarding `/tasks` to `http://127.0.0.1:5000`.
- [x] **Dashboard State & Live Progress**:
  - `StatsBar.jsx` with completion percentage and counters.
  - `FilterBar.jsx` with instant real-time search and status tabs.
  - Toast notification system for user feedback.

---

## ✅ Phase 3: Stitch Design System Integration (Completed)
- [x] **Stitch Screen Integration (`c0a7f56645064495b73b635a5ed0457d`)**:
  - `CreateTaskModal.jsx` matching the Stitch design specifications.
  - PyTask header badge, clean input boxes, and custom maroon `#782522` button.
- [x] **Rich Task Attributes**:
  - `TASK_TITLE`: Primary task description.
  - `DESCRIPTION`: Detailed multi-line notes.
  - `DUE_DATE`: Date picker integration.
  - `CATEGORY`: Dropdown (*Work, Personal, Study, Project, Health, Finance*).
  - `PRIORITY_LEVEL`: Selectable pill buttons (🟢 Low, 🟡 Medium, 🔴 High).
- [x] **Enhanced Task Cards (`TaskItem.jsx`)**:
  - Priority badge with colored status dots.
  - Category tag with folder icon.
  - Due date tag with calendar icon.
  - Expandable "View Notes / Hide Notes" drawer.
- [x] **Backend Support**: Extended `app.py` and `database.py` to persist rich attributes with backward compatibility.

---

## 🚀 Phase 4: Advanced Productivity & Enhancements (In Progress / Next)
- [ ] **Sorting Controls**:
  - Sort by Due Date (Earliest / Latest).
  - Sort by Priority (High to Low / Low to High).
  - Sort Alphabetically (A-Z / Z-A).
- [ ] **Category Filtering Tabs**:
  - Filter tasks by specific category pills (*Work, Personal, Study, etc.*).
- [ ] **Data Export & Backup**:
  - Export tasks to JSON / CSV file.
  - Import tasks from JSON backup.
- [ ] **Keyboard Shortcuts**:
  - `Ctrl + N` / `Cmd + N` to open the Create Task modal.
  - `Esc` to close any active modal.
  - `/` to focus the search bar immediately.

---

## 🔮 Phase 5: Production Readiness & Enterprise Features (Future)
- [ ] **Database Migration**:
  - Optional SQLite / PostgreSQL database layer via SQLAlchemy or Tortoise ORM.
- [ ] **User Authentication**:
  - User signup/login with JWT token authentication.
  - Multi-tenant data segregation.
- [ ] **Docker Containerization**:
  - Multi-stage `Dockerfile` building both React assets and Python Flask server into a single lightweight production container.

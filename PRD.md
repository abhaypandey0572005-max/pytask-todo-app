# 📄 Product Requirements Document (PRD) — PyTask (TaskFlow)

---

## 1. Executive Summary
**PyTask** (also referred to as **TaskFlow**) is a high-performance, minimalist, and responsive full-stack task management application. It couples a lightweight Python Flask REST API backend with a modern React 19 (Vite + Tailwind CSS) Single Page Application (SPA). The application emphasizes zero-friction task capture, rich metadata categorization (categories, priority levels, due dates), real-time filtering, visual productivity analytics, and persistent storage.

---

## 2. Objectives & Goals

### 2.1 Primary Goals
- **Seamless Task Capture**: Enable users to quickly add tasks either via a quick one-line input bar or through a detailed, Stitch-styled modal with rich metadata.
- **Rich Metadata Support**: Categorize tasks by `Category` (Work, Personal, Study, Project, Health, Finance), set `Priority` (Low, Medium, High), attach `Due Date`, and add multi-line `Description` notes.
- **Real-Time Productivity**: Provide instant client-side search, status filters (All, Active, Completed), and live progress tracking with completion percentage.
- **Decoupled Architecture**: Maintain a clean separation between the Python backend (data persistence & REST API) and the React frontend (presentation & client state).
- **Zero Complex Setup**: Run seamlessly locally using a file-based JSON database with zero SQL database configuration required.

### 2.2 Non-Goals
- Multi-user authentication & team workspace sharing (scoped for future phases).
- Cloud database syncing (currently offline-first and locally persistent).
- Complex third-party calendar synchronizations (Google Calendar, Outlook).

---

## 3. User Personas

| Persona | Description | Needs & Pain Points |
|---|---|---|
| **Software Engineer / Tech Professional** | Wants a quick, distraction-free tool to organize daily dev tasks, database optimizations, and sprint items. | Fast keyboard interaction, clean dark mode UI, zero bloat, persistent storage. |
| **Student / Learner** | Organizes study schedules, assignment due dates, and learning milestones. | Clear priority tags, due date tracking, category filtering (e.g., Study vs Personal). |
| **Productivity Enthusiast** | Seeks visual feedback on daily progress and clear task completion metrics. | Progress bars, completion counters, quick search, expandable notes. |

---

## 4. Core Features & User Stories

### 4.1 Task Creation & Stitch UI Modal
- **User Story**: *As a user, I want to create tasks with titles, descriptions, due dates, categories, and priority levels so that I can organize my work effectively.*
- **Features**:
  - **Quick Add Bar**: One-click / Enter-key input for rapid task addition.
  - **Stitch Design Modal (`CreateTaskModal`)**:
    - `TASK_TITLE` (Required, text input).
    - `DESCRIPTION` (Optional, multi-line notes textarea).
    - `DUE_DATE` (Optional, date picker).
    - `CATEGORY` (Dropdown: Work, Personal, Study, Project, Health, Finance).
    - `PRIORITY_LEVEL` (Interactive selectable pills: 🟢 Low, 🟡 Medium, 🔴 High).
    - Custom styled action buttons (Cancel & Maroon `#782522` Save Task button).

### 4.2 Task Lifecycle & State Management
- **User Story**: *As a user, I want to complete, edit, and delete tasks with immediate visual confirmation.*
- **Features**:
  - **Complete Toggle**: Single-click checkmark marks task complete with strikethrough styling and status transition.
  - **Edit Modal**: Modify any existing task's title, notes, priority, date, or category.
  - **Delete Action**: Instant task deletion with server synchronization.
  - **Expandable Notes**: Toggleable "View Notes / Hide Notes" on task cards to read multi-line descriptions.

### 4.3 Search, Filtering & Analytics
- **User Story**: *As a user, I want to quickly locate specific tasks and see an overview of my daily progress.*
- **Features**:
  - **Real-Time Search**: Instant filtering by task title, description, or category keyword.
  - **Status Tabs**: Filter by `All`, `Active / Pending`, and `Completed` with dynamic counts.
  - **Progress Tracker**: Visual progress bar displaying percentage completed and total vs completed metrics.
  - **Live Server Status Indicator**: Real-time connection feedback to the Flask API.

---

## 5. Functional Requirements

1. **FR-1**: The system must persist all tasks to `tasks.json` upon any mutation (`POST`, `PUT`, `DELETE`).
2. **FR-2**: The backend must expose standard REST endpoints (`GET /tasks`, `POST /tasks`, `PUT /tasks/<id>`, `PUT /tasks/<id>/complete`, `DELETE /tasks/<id>`).
3. **FR-3**: The system must support legacy tasks with only `task` and `completed` fields while gracefully populating default metadata.
4. **FR-4**: The frontend must validate empty input strings and prevent empty submissions.
5. **FR-5**: The frontend must proxy API requests through the Vite development server to eliminate CORS friction during development.

---

## 6. Non-Functional Requirements

- **Performance**: API responses and file reads/writes under 50ms for typical list sizes (<1,000 tasks).
- **Usability**: Responsive design supporting mobile, tablet, and desktop viewports.
- **Accessibility**: Keyboard navigable forms, clear focus rings, and high contrast dark theme colors.
- **Reliability**: Atomic file write operations in the database layer to avoid JSON corruption during concurrent operations.

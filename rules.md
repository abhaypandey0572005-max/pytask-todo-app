# 📐 Engineering Rules & Coding Standards (`rules.md`)

This document defines the architectural conventions, coding rules, API design standards, and constraints for maintaining and extending the **PyTask** codebase.

---

## 1. Architectural Principles

1. **Separation of Concerns**:
   - **Frontend (`frontend/`)**: Pure presentation, UI state management, user interactions, and client-side formatting. Must NEVER perform direct file I/O or assume local file paths.
   - **Backend (`Backend/`)**: REST API routing, request validation, business logic, and database operations. Must remain framework-agnostic regarding the frontend client.
   - **Storage (`tasks.json`)**: Plain JSON storage file acting as the single source of truth.

2. **Decoupled Client-Server Communication**:
   - All communication between React and Flask must occur over standard HTTP JSON REST endpoints.
   - Development routing should utilize the Vite dev proxy (`/tasks` -> `http://127.0.0.1:5000`) to avoid hardcoding localhost ports inside React components.

---

## 2. Backend Coding Standards (Python & Flask)

### 2.1 API Route Conventions
- **HTTP Methods**:
  - `GET /tasks`: Retrieve all tasks. Never mutate state in a GET route.
  - `POST /tasks`: Create a new task. Return HTTP `201 Created` with a confirmation message on success.
  - `PUT /tasks/<int:index>`: Update task content/metadata. Return HTTP `200 OK` on success, `404 Not Found` if index is out of bounds.
  - `PUT /tasks/<int:index>/complete`: Mark task completed.
  - `DELETE /tasks/<int:index>`: Remove task. Return HTTP `200 OK` on success.
- **Request Validation**:
  - Always validate incoming JSON payloads using `request.get_json()`.
  - Return explicit `400 Bad Request` with an `{ "error": "<reason>" }` payload if required fields (`task`) are missing or empty strings.
- **Error Handling**:
  - Return JSON errors exclusively: `jsonify({"error": "Description"}), <status_code>`. Do not return raw HTML error pages.

### 2.2 Data Layer Rules (`database.py`)
- **File Safety**:
  - Always handle `FileNotFoundError` and `json.JSONDecodeError` with fallback to `[]` when reading `tasks.json`.
  - When saving, write JSON with `indent=4` for human readability and clean Git diffs.
- **Backward Compatibility**:
  - Never break older task items that only contain `task` and `completed`. Provide default values (`category="Work"`, `priority="Low"`, `due_date=""`, `description=""`) when accessing extended fields.

---

## 3. Frontend Coding Standards (React 19 + Tailwind CSS)

### 3.1 Component Architecture
- **Single Responsibility Principle**: Each UI component must be in its own file under `src/components/`.
- **Props Validation**: Explicitly destructure required props at the component declaration.
- **Controlled Components**: All forms and inputs (e.g. `TaskInput`, `CreateTaskModal`, `EditModal`) must be controlled using React state.

### 3.2 State Management & Hooks
- **Centralized API Service**: All API calls must go through `src/api.js`. Never write raw `fetch()` calls inside UI component files.
- **Performance Optimization**: Use `useMemo` for derived states such as search filtering and category counts to prevent unnecessary re-computations on render.
- **No Native Browser Dialogs**: Never use `window.alert()` or `window.prompt()`. Use the custom `EditModal`, `CreateTaskModal`, or toast notifications.

### 3.3 Styling & Design Guidelines
- **Tailwind CSS v4**: Use utility classes for all layouts, paddings, borders, and transitions.
- **Color Standards**:
  - Brand Primary: Maroon/Burgundy `#782522` / `#661e1b`.
  - Brand Accent: Cyan `#22d3ee` and Indigo `#6366f1`.
  - Status Indicators: Emerald (Low / Done), Amber (Medium / Pending), Rose (High / Error).
- **Responsive Layout**: Design mobile-first using Tailwind responsive prefixes (`sm:`, `md:`, `lg:`).

---

## 4. Git & Commit Guidelines

1. **Commit Messages**: Follow standard conventional commits:
   - `feat: add category filter to task list`
   - `fix: correct task index out of bounds in edit_task`
   - `docs: update PRD with Stitch design screen specifications`
   - `style: adjust maroon button hover state in CreateTaskModal`
2. **Clean Working Tree**: Do not commit build artifacts (`frontend/dist/`, `__pycache__/`, `node_modules/`).

# 📝 PyTask (TaskFlow) — Full-Stack Python & React To-Do Application

A modern, high-performance, and responsive task management application combining a lightweight **Python Flask REST API** backend with a modern **React 19 (Vite + Tailwind CSS + Framer Motion)** frontend.

---

## 🌟 Key Features

- ⚛️ **Modern React 19 Frontend**: Lightning-fast UI powered by Vite and Tailwind CSS.
- 🎨 **Stitch Design System**: High-fidelity Task Creation modal with custom maroon accents, PyTask branding, and priority buttons.
- 🏷️ **Rich Metadata**: Categorize tasks by `Category` (*Work, Personal, Study, Project, Health, Finance*), assign `Priority` (*Low 🟢, Medium 🟡, High 🔴*), set `Due Date`, and add multi-line `Notes`.
- 🪄 **Fluid Physics & Animations**: Powered by `framer-motion` with layout animations and spring modals.
- 🎉 **Celebratory Confetti**: Interactive completion bursts and all-done fireworks celebration using `canvas-confetti`.
- ☀️/🌙 **Adaptive Light & Dark Theme**: 1-click theme switcher with persistent local storage.
- 🔍 **Instant Search & Filters**: Real-time filtering by status (*All, Active, Done*), category chips, and live sorting (*Priority, Due Date, Alphabetical*).
- 💾 **Persistent File Storage**: JSON file database (`tasks.json`) with zero SQL database setup required.
- 💻 **CLI Tool**: Standalone terminal-based interactive to-do manager (`todo.py`).

---

## 📁 Project Structure

```
Pyhton-ToDo-List/
├── Backend/
│   ├── app.py             # Flask REST API server (Port 5000)
│   ├── database.py        # JSON database CRUD controller
│   ├── requirements.txt   # Python dependencies (Flask)
│   └── templates/
│       └── index.html     # Fallback template
├── frontend/              # ⚛️ React Frontend (Port 5173)
│   ├── src/
│   │   ├── api.js         # Centralized API service
│   │   ├── components/
│   │   │   ├── Header.jsx          # Header with theme switcher & greeting
│   │   │   ├── StatsBar.jsx        # Live progress bar & metric counters
│   │   │   ├── TaskInput.jsx       # Quick task addition input
│   │   │   ├── FilterBar.jsx       # Real-time search, sort & category filters
│   │   │   ├── TaskItem.jsx        # Rich task card with notes drawer & glow
│   │   │   ├── TaskList.jsx        # Task list container & celebratory card
│   │   │   ├── CreateTaskModal.jsx # Stitch design task creation modal
│   │   │   └── EditModal.jsx       # Task edit modal
│   │   ├── utils/
│   │   │   └── confetti.js         # Confetti celebration triggers
│   │   ├── App.jsx        # Main application state & theme provider
│   │   └── index.css      # Tailwind CSS styling
│   ├── vite.config.js     # Dev server proxy configuration
│   └── package.json       # Frontend dependencies
├── tasks.json             # Persistent tasks data store
├── todo.py                # Standalone CLI To-Do application
├── PRD.md                 # Product Requirements Document
├── rules.md               # Engineering rules & standards
├── phases.doc.md          # Roadmap & milestones
├── architecture.md        # System architecture & API specs
├── design.md              # UI/UX design specifications
└── README.md              # Quickstart guide
```

---

## 🚀 Quickstart Guide

### Prerequisites
- **Python 3.8+**
- **Node.js 18+ & npm**

---

### Step 1: Start the Backend (Flask API)

1. Open a terminal in the project root directory:
   ```bash
   pip install -r Backend/requirements.txt
   ```
2. Start the Flask server:
   ```bash
   python Backend/app.py
   ```
   *The backend API will run on `http://127.0.0.1:5000/`.*

---

### Step 2: Start the Frontend (React + Vite)

1. Open a second terminal window in the `frontend` folder:
   ```bash
   cd frontend
   npm install
   ```
2. Launch the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

---

## 📖 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks` | Retrieve all tasks |
| `POST` | `/tasks` | Add a new task (supports title, description, due date, category, priority) |
| `PUT` | `/tasks/<index>/complete` | Mark task as completed |
| `PUT` | `/tasks/<index>` | Update task title and metadata |
| `DELETE` | `/tasks/<index>` | Delete a task |

---

## 💻 Running the CLI Version

If you prefer using the terminal-only version:
```bash
python todo.py
```

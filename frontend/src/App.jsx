import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import TaskInput from './components/TaskInput';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import CreateTaskModal from './components/CreateTaskModal';
import EditModal from './components/EditModal';
import * as api from './api';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, index: null, taskData: null });
  const [toast, setToast] = useState(null);

  // Theme Management (Default to Light Mode, with localStorage persistence)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('pytask_theme');
    return saved ? saved === 'dark' : false; // Default: Light Mode
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pytask_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pytask_theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const loadTasks = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      setError(null);
      const data = await api.fetchTasks();
      setTasks(data || []);
      if (isManualRefresh) showToast('Tasks refreshed', 'info');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not connect to Flask backend.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Add Task
  const handleAddTask = async (taskPayload) => {
    await api.addTask(taskPayload);
    await loadTasks();
    showToast('Task added successfully! ✨');
  };

  // Mark Completed
  const handleToggleComplete = async (index) => {
    await api.completeTask(index);
    await loadTasks();
    showToast('Task marked as completed! 🎉');
  };

  // Open Edit Modal
  const handleOpenEdit = (index, taskData) => {
    setEditModal({ isOpen: true, index, taskData });
  };

  // Save Edit
  const handleSaveEdit = async (updatedTaskPayload) => {
    if (editModal.index !== null) {
      await api.editTask(editModal.index, updatedTaskPayload);
      await loadTasks();
      showToast('Task updated successfully! ✏️');
    }
  };

  // Delete Task
  const handleDeleteTask = async (index) => {
    await api.deleteTask(index);
    await loadTasks();
    showToast('Task removed', 'info');
  };

  // Filter, Category, Search & Sort Logic
  const filteredTasks = useMemo(() => {
    const priorityWeight = { High: 3, Medium: 2, Low: 1 };

    let result = tasks
      .map((task, originalIndex) => ({ task, originalIndex }))
      .filter(({ task }) => {
        // Status filter
        if (filter === 'pending' && task.completed) return false;
        if (filter === 'completed' && !task.completed) return false;

        // Category filter
        if (selectedCategory !== 'All' && (task.category || 'Work') !== selectedCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (task.task || '').toLowerCase().includes(q);
          const matchDesc = (task.description || '').toLowerCase().includes(q);
          const matchCat = (task.category || '').toLowerCase().includes(q);
          return matchTitle || matchDesc || matchCat;
        }

        return true;
      });

    // Sorting
    if (sortBy === 'priority') {
      result.sort((a, b) => {
        const weightA = priorityWeight[a.task.priority] || 1;
        const weightB = priorityWeight[b.task.priority] || 1;
        return weightB - weightA;
      });
    } else if (sortBy === 'dueDate') {
      result.sort((a, b) => {
        if (!a.task.due_date) return 1;
        if (!b.task.due_date) return -1;
        return a.task.due_date.localeCompare(b.task.due_date);
      });
    } else if (sortBy === 'name') {
      result.sort((a, b) => (a.task.task || '').localeCompare(b.task.task || ''));
    }

    return result;
  }, [tasks, filter, selectedCategory, searchQuery, sortBy]);

  const counts = useMemo(() => {
    return {
      all: tasks.length,
      pending: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center py-4 sm:py-10 px-3 sm:px-6 relative overflow-x-hidden transition-colors duration-300">
      {/* Dynamic Ambient Glowing Mesh */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-br from-rose-500/10 via-indigo-500/10 to-cyan-500/10 dark:from-[#782522]/20 dark:via-indigo-600/15 dark:to-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Main App Container */}
      <main className="w-full max-w-xl sm:max-w-2xl relative z-10 space-y-4 sm:space-y-6">
        {/* Animated Header with Theme Switcher */}
        <Header
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          tasksCount={counts.all}
          completedCount={counts.completed}
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
        />

        {/* Stats and Shimmer Progress Bar */}
        <StatsBar tasks={tasks} />

        {/* Glowing Quick Input Bar */}
        <TaskInput onAddTask={handleAddTask} loading={loading} />

        {/* Search, Sort, Category & Status Filters */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>Tasks</span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                ({filteredTasks.length})
              </span>
            </h2>

            <button
              onClick={() => loadTasks(true)}
              disabled={refreshing}
              title="Refresh tasks from backend"
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${refreshing ? 'animate-spin text-indigo-600 dark:text-indigo-400' : ''}`} />
              Refresh
            </button>
          </div>

          <FilterBar
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            counts={counts}
          />
        </div>

        {/* Animated Task List */}
        <TaskList
          filteredTasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onOpenEdit={handleOpenEdit}
          onDelete={handleDeleteTask}
          loading={loading}
          error={error}
          totalTasks={counts.all}
          completedTasks={counts.completed}
        />
      </main>

      {/* Stitch Design: Create Task Modal with Spring Animation */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddTask={handleAddTask}
      />

      {/* Edit Task Modal */}
      <EditModal
        isOpen={editModal.isOpen}
        taskData={editModal.taskData}
        onSave={handleSaveEdit}
        onClose={() => setEditModal({ isOpen: false, index: null, taskData: null })}
      />

      {/* Animated Toast Feedback */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 px-3.5 py-2.5 rounded-xl text-xs font-bold shadow-xl backdrop-blur-xl border flex items-center gap-2 ${
              toast.type === 'info'
                ? 'bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                : 'bg-emerald-50/95 dark:bg-emerald-950/95 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

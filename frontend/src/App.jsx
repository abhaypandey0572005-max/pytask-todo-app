import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import TaskInput from './components/TaskInput';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import CreateTaskModal from './components/CreateTaskModal';
import EditModal from './components/EditModal';
import * as api from './api';
import { RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editModal, setEditModal] = useState({
    isOpen: false,
    index: null,
    taskData: null,
  });
  const [toast, setToast] = useState(null);

  const cursorGlowRef = useRef(null);

  // Theme Management
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('pytask_theme');
    return saved ? saved === 'dark' : false;
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

  // Smooth cinematic cursor glow
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!cursorGlowRef.current) return;

      cursorGlowRef.current.style.setProperty(
        '--mouse-x',
        `${event.clientX}px`
      );

      cursorGlowRef.current.style.setProperty(
        '--mouse-y',
        `${event.clientY}px`
      );
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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

      if (isManualRefresh) {
        showToast('Tasks refreshed', 'info');
      }
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
    setEditModal({
      isOpen: true,
      index,
      taskData,
    });
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
    const priorityWeight = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    let result = tasks
      .map((task, originalIndex) => ({
        task,
        originalIndex,
      }))
      .filter(({ task }) => {
        if (filter === 'pending' && task.completed) return false;

        if (filter === 'completed' && !task.completed) return false;

        if (
          selectedCategory !== 'All' &&
          (task.category || 'Work') !== selectedCategory
        ) {
          return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();

          const matchTitle = (task.task || '')
            .toLowerCase()
            .includes(q);

          const matchDesc = (task.description || '')
            .toLowerCase()
            .includes(q);

          const matchCat = (task.category || '')
            .toLowerCase()
            .includes(q);

          return matchTitle || matchDesc || matchCat;
        }

        return true;
      });

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
      result.sort((a, b) =>
        (a.task.task || '').localeCompare(b.task.task || '')
      );
    }

    return result;
  }, [
    tasks,
    filter,
    selectedCategory,
    searchQuery,
    sortBy,
  ]);

  const counts = useMemo(() => {
    return {
      all: tasks.length,
      pending: tasks.filter((task) => !task.completed).length,
      completed: tasks.filter((task) => task.completed).length,
    };
  }, [tasks]);

  return (
    <div
      ref={cursorGlowRef}
      className="pytask-page min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-x-hidden transition-colors duration-500"
    >
      {/* Premium animated background */}
      <div className="pytask-grid pointer-events-none" />

      <div className="pytask-orb pytask-orb-one pointer-events-none" />
      <div className="pytask-orb pytask-orb-two pointer-events-none" />
      <div className="pytask-orb pytask-orb-three pointer-events-none" />

      {/* Mouse-follow glow */}
      <div className="pytask-cursor-glow pointer-events-none" />

      {/* Top cinematic light */}
      <div className="pytask-top-light pointer-events-none" />

      <motion.div
        className="w-full flex flex-col items-center py-4 sm:py-10 px-3 sm:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <main className="w-full max-w-xl sm:max-w-2xl relative">
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="pytask-section pytask-header-section"
          >
            <Header
              on

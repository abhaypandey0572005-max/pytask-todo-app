import React, { useState } from 'react';
import { Check, Edit2, Trash2, Calendar, Folder, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerTaskConfetti } from '../utils/confetti';

export default function TaskItem({
  task,
  originalIndex,
  onToggleComplete,
  onOpenEdit,
  onDelete,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = async () => {
    if (task.completed) return;
    setIsCompleting(true);
    try {
      await onToggleComplete(originalIndex);
      triggerTaskConfetti();
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(originalIndex);
    } finally {
      setIsDeleting(false);
    }
  };

  const priority = task.priority || 'Low';
  const category = task.category || 'Work';
  const dueDate = task.due_date;
  const description = task.description;

  // Dynamic priority styles for both light & dark mode
  const priorityConfig = {
    Low: {
      badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      dot: 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
    },
    Medium: {
      badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
      dot: 'bg-amber-500 dark:bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
    },
    High: {
      badge: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/35',
      dot: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)] animate-pulse',
    },
  }[priority] || {
    badge: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    dot: 'bg-slate-400',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 p-4 sm:p-5 ${
        task.completed
          ? 'bg-slate-50/60 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-800/60 opacity-70'
          : 'bg-white/95 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900/90 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 shadow-md hover:shadow-xl shadow-slate-200/40 dark:shadow-black/30'
      }`}
    >
      {/* Top card highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-700/30 to-transparent" />

      <div className="flex items-start justify-between gap-3.5">
        {/* Checkbox button with bouncy animation */}
        <motion.button
          type="button"
          onClick={handleToggle}
          disabled={task.completed || isCompleting}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          title={task.completed ? 'Task completed' : 'Mark as complete'}
          className={`w-6 h-6 rounded-xl shrink-0 mt-0.5 flex items-center justify-center transition-all cursor-pointer ${
            task.completed
              ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white cursor-default shadow-md shadow-emerald-500/20'
              : 'border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-cyan-400 hover:bg-indigo-50 dark:hover:bg-cyan-500/10 text-transparent hover:text-indigo-600 dark:hover:text-cyan-400'
          }`}
        >
          {isCompleting ? (
            <Loader2 className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400 animate-spin" />
          ) : (
            <Check className={`w-3.5 h-3.5 ${task.completed ? 'opacity-100 stroke-[3]' : 'opacity-0 group-hover:opacity-100'}`} />
          )}
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Task Headline */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h4
              className={`text-sm sm:text-base font-semibold leading-snug transition-all ${
                task.completed
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-800 dark:text-slate-100 group-hover:text-slate-950 dark:group-hover:text-white'
              }`}
            >
              {task.task}
            </h4>
          </div>

          {/* Metadata Badges */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
            {/* Priority with Glow */}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${priorityConfig.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priorityConfig.dot}`} />
              {priority}
            </span>

            {/* Category */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 text-[11px] font-medium shadow-sm">
              <Folder className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
              {category}
            </span>

            {/* Due Date */}
            {dueDate && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 text-[11px] font-medium shadow-sm">
                <Calendar className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                {dueDate}
              </span>
            )}

            {/* Notes Toggle Button */}
            {description && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-[11px] ml-1 cursor-pointer transition-colors"
              >
                {isExpanded ? (
                  <>
                    <span>Hide Notes</span>
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <span>View Notes</span>
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Expandable Notes Drawer with Framer Motion */}
          <AnimatePresence>
            {isExpanded && description && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/90 text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap shadow-inner">
                  {description}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions (Edit & Delete) */}
        <div className="flex items-center gap-1 shrink-0">
          <motion.button
            type="button"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onOpenEdit(originalIndex, task)}
            title="Edit task"
            className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/15 transition-all cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete task"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/15 transition-all cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 text-rose-500 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

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

  const priorityConfig = {
    Low: {
      badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      dot: 'bg-emerald-500 dark:bg-emerald-400',
    },
    Medium: {
      badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
      dot: 'bg-amber-500 dark:bg-amber-400',
    },
    High: {
      badge: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/35',
      dot: 'bg-rose-500 animate-pulse',
    },
  }[priority] || {
    badge: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    dot: 'bg-slate-400',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 p-3.5 sm:p-4 ${
        task.completed
          ? 'bg-slate-50/60 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-800/60 opacity-70'
          : 'bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm sm:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Checkbox button */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={task.completed || isCompleting}
          title={task.completed ? 'Task completed' : 'Mark as complete'}
          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg shrink-0 mt-0.5 flex items-center justify-center transition-all cursor-pointer ${
            task.completed
              ? 'bg-emerald-600 text-white cursor-default shadow-sm'
              : 'border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-500 text-transparent hover:text-indigo-600'
          }`}
        >
          {isCompleting ? (
            <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-600 animate-spin" />
          ) : (
            <Check className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${task.completed ? 'opacity-100 stroke-[3]' : 'opacity-0'}`} />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {/* Headline */}
          <h4
            className={`text-xs sm:text-sm font-semibold leading-snug break-words mb-1.5 ${
              task.completed
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {task.task}
          </h4>

          {/* Badges Row */}
          <div className="flex items-center gap-1.5 flex-wrap text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
            {/* Priority */}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-bold ${priorityConfig.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priorityConfig.dot}`} />
              {priority}
            </span>

            {/* Category */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
              <Folder className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-500 dark:text-indigo-400" />
              {category}
            </span>

            {/* Due Date */}
            {dueDate && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-600 dark:text-cyan-400" />
                {dueDate}
              </span>
            )}

            {/* Notes Toggle */}
            {description && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400 font-medium ml-0.5 cursor-pointer"
              >
                {isExpanded ? (
                  <>
                    <span>Hide</span>
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <span>Notes</span>
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Expanded Notes */}
          <AnimatePresence>
            {isExpanded && description && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {description}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            type="button"
            onClick={() => onOpenEdit(originalIndex, task)}
            title="Edit task"
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete task"
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="w-3.5 h-3.5 text-rose-500 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

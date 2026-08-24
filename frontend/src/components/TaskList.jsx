import React from 'react';
import TaskItem from './TaskItem';
import { ClipboardList, AlertCircle, Trophy, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerGrandCelebration } from '../utils/confetti';

export default function TaskList({
  filteredTasks,
  onToggleComplete,
  onOpenEdit,
  onDelete,
  loading,
  error,
  totalTasks,
  completedTasks,
}) {
  if (loading) {
    return (
      <div className="py-20 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-3 border-indigo-500/20 border-t-indigo-600 dark:border-t-indigo-500 border-r-cyan-500 dark:border-r-cyan-400 rounded-full mx-auto mb-4"
        />
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Synchronizing with Flask API...</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Fetching your latest tasks</p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/25 text-center my-4 shadow-xl"
      >
        <AlertCircle className="w-9 h-9 text-rose-500 dark:text-rose-400 mx-auto mb-2" />
        <p className="text-sm font-bold text-rose-700 dark:text-rose-300 mb-1">{error}</p>
        <p className="text-xs text-rose-600/80 dark:text-rose-400/80">Make sure your Python Flask backend is running on port 5000.</p>
      </motion.div>
    );
  }

  // Celebratory 100% completion card
  if (totalTasks > 0 && completedTasks === totalTasks) {
    return (
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-indigo-950/60 dark:via-slate-900/90 dark:to-emerald-950/60 border border-emerald-500/30 text-center shadow-xl dark:shadow-2xl"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 p-0.5 mx-auto mb-3 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Trophy className="w-8 h-8 text-amber-500 dark:text-amber-400 animate-bounce" />
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-1">
            Woohoo! All Tasks Completed! 🎉
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-4">
            You've crushed every single goal on your to-do list. Take a breather or create new challenges.
          </p>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerGrandCelebration}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 cursor-pointer"
          >
            <PartyPopper className="w-4 h-4" />
            <span>Celebrate Again! 🎊</span>
          </motion.button>
        </motion.div>

        {/* Still render list below */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map(({ task, originalIndex }) => (
              <TaskItem
                key={originalIndex}
                task={task}
                originalIndex={originalIndex}
                onToggleComplete={onToggleComplete}
                onOpenEdit={onOpenEdit}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 bg-slate-50/50 dark:bg-slate-900/20"
      >
        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/50 flex items-center justify-center mx-auto mb-4 text-slate-400 shadow-sm dark:shadow-inner">
          <ClipboardList className="w-8 h-8 text-indigo-500 dark:text-indigo-400/80" />
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">No tasks match your criteria</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
          Add a new task or adjust your search filters above.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map(({ task, originalIndex }) => (
          <TaskItem
            key={originalIndex}
            task={task}
            originalIndex={originalIndex}
            onToggleComplete={onToggleComplete}
            onOpenEdit={onOpenEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

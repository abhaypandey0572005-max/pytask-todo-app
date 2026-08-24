import React, { useMemo } from 'react';
import { CheckSquare, Plus, Flame, Calendar as CalendarIcon, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ onOpenCreateModal, tasksCount, completedCount, darkMode, onToggleTheme }) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good morning', icon: '☀️' };
    if (hour < 17) return { text: 'Good afternoon', icon: '✨' };
    if (hour < 21) return { text: 'Good evening', icon: '🌆' };
    return { text: 'Night focus', icon: '🌙' };
  }, []);

  const todayStr = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(new Date());
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800/80"
    >
      {/* Brand & Greeting */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group cursor-pointer shrink-0"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-600 via-indigo-600 to-cyan-400 rounded-2xl blur opacity-50" />
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 flex items-center justify-center shadow-md">
            <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-cyan-400" />
          </div>
        </motion.div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Py<span className="text-indigo-600 dark:text-cyan-400">Task</span>
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
            <span>{greeting.icon} {greeting.text}</span>
            <span>&bull;</span>
            <span className="truncate">{todayStr}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Theme Switcher */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={onToggleTheme}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all cursor-pointer"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
          )}
        </motion.button>

        {/* Create Task Button */}
        <motion.button
          type="button"
          onClick={onOpenCreateModal}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#782522] hover:bg-[#661e1b] text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-950/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-rose-200" />
          <span className="hidden xs:inline">New Task</span>
          <span className="xs:hidden">New</span>
        </motion.button>
      </div>
    </motion.header>
  );
}

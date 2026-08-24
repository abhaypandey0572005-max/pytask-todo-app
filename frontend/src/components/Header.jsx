import React, { useMemo } from 'react';
import { CheckSquare, Plus, Flame, Calendar as CalendarIcon, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ onOpenCreateModal, tasksCount, completedCount, darkMode, onToggleTheme }) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good morning', icon: '☀️' };
    if (hour < 17) return { text: 'Good afternoon', icon: '✨' };
    if (hour < 21) return { text: 'Good evening', icon: '🌆' };
    return { text: 'Night mode focus', icon: '🌙' };
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
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800/80 relative"
    >
      {/* Brand & Greeting */}
      <div className="flex items-center gap-3.5">
        <motion.div
          whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.3 }}
          className="relative group cursor-pointer"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 via-indigo-600 to-cyan-400 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500" />
          <div className="relative w-12 h-12 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 flex items-center justify-center shadow-md dark:shadow-xl">
            <CheckSquare className="w-6 h-6 text-indigo-600 dark:text-cyan-400" />
          </div>
        </motion.div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              Py<span className="text-indigo-600 dark:text-cyan-400">Task</span>
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              Live API
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            <span>{greeting.icon} {greeting.text}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              {todayStr}
            </span>
          </div>
        </div>
      </div>

      {/* Action Area & Theme Switcher */}
      <div className="flex items-center gap-2.5">
        {/* Theme Toggle Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleTheme}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all cursor-pointer"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
          )}
        </motion.button>

        {completedCount > 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-300 text-xs font-semibold"
          >
            <Flame className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-amber-400/20 animate-bounce" />
            <span>{completedCount} Done</span>
          </motion.div>
        )}

        <motion.button
          type="button"
          onClick={onOpenCreateModal}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.96 }}
          className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#782522] hover:bg-[#661e1b] text-white text-sm font-bold shadow-md hover:shadow-lg shadow-rose-950/20 transition-all cursor-pointer overflow-hidden group"
        >
          <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out" />
          <Plus className="w-4 h-4 text-rose-200" />
          <span>Create Task</span>
        </motion.button>
      </div>
    </motion.header>
  );
}

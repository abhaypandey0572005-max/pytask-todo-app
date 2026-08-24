import React from 'react';
import { ListTodo, CheckCircle2, Clock, Zap, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const progressPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const statusFeedback = () => {
    if (total === 0) return 'Add your first task to get started';
    if (progressPercent === 100) return 'Outstanding! All tasks completed 🏆';
    if (progressPercent >= 75) return 'Almost there, finish strong! 🚀';
    if (progressPercent >= 50) return 'Over halfway through! Keep going 💪';
    if (progressPercent > 0) return 'Great start, keep up the momentum ✨';
    return 'Ready to crush your goals today! 🎯';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="relative overflow-hidden bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/40 group transition-colors duration-300"
    >
      {/* Background glow spot */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-rose-500/10 dark:bg-rose-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-rose-500/20 transition-all duration-700" />

      {/* Grid of 3 Stat Metric Cards */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 mb-5 relative z-10">
        {/* Total Tasks */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center sm:items-start gap-2.5 transition-all shadow-sm dark:shadow-inner"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <ListTodo className="w-5 h-5" />
          </div>
          <div className="text-center sm:text-left min-w-0">
            <div className="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100">{total}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">Total Tasks</div>
          </div>
        </motion.div>

        {/* Completed */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/30 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center sm:items-start gap-2.5 transition-all shadow-sm dark:shadow-inner"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-center sm:text-left min-w-0">
            <div className="text-lg sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">{completed}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">Completed</div>
          </div>
        </motion.div>

        {/* Pending */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 hover:border-amber-500/30 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center sm:items-start gap-2.5 transition-all shadow-sm dark:shadow-inner"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-center sm:text-left min-w-0">
            <div className="text-lg sm:text-2xl font-black text-amber-600 dark:text-amber-400">{pending}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">Pending</div>
          </div>
        </motion.div>
      </div>

      {/* Progress Bar with Shimmer Animation */}
      <div className="relative z-10">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            {progressPercent === 100 ? (
              <Trophy className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-bounce" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            )}
            <span className="text-xs font-medium">{statusFeedback()}</span>
          </span>
          <span className="text-slate-800 dark:text-slate-100 font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700/50">
            {progressPercent}%
          </span>
        </div>

        <div className="w-full h-3 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-800 relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#782522] via-indigo-600 to-cyan-400 rounded-full relative overflow-hidden"
          >
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

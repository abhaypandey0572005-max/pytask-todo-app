import React from 'react';
import { ListTodo, CheckCircle2, Clock, Zap, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const progressPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const statusFeedback = () => {
    if (total === 0) return 'Add your first task to start';
    if (progressPercent === 100) return 'All tasks completed 🏆';
    if (progressPercent >= 50) return 'Over halfway! Keep going 💪';
    if (progressPercent > 0) return 'Great start! ✨';
    return 'Ready to crush goals 🎯';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden bg-white/95 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-lg shadow-slate-200/50 dark:shadow-black/40 transition-colors duration-300"
    >
      {/* Grid of 3 Stat Metric Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3.5 mb-4 relative z-10">
        {/* Total Tasks */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2.5 text-center sm:text-left transition-all">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <ListTodo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-base sm:text-2xl font-black text-slate-900 dark:text-slate-100 leading-none mb-0.5">{total}</div>
            <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">Total</div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2.5 text-center sm:text-left transition-all">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-base sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none mb-0.5">{completed}</div>
            <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">Done</div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2.5 text-center sm:text-left transition-all">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-base sm:text-2xl font-black text-amber-600 dark:text-amber-400 leading-none mb-0.5">{pending}</div>
            <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">Pending</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10">
        <div className="flex justify-between items-center text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 truncate">
            {progressPercent === 100 ? (
              <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            )}
            <span className="truncate">{statusFeedback()}</span>
          </span>
          <span className="text-slate-800 dark:text-slate-100 font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-[10px] sm:text-xs shrink-0 ml-2">
            {progressPercent}%
          </span>
        </div>

        <div className="w-full h-2.5 sm:h-3 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-800 relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#782522] via-indigo-600 to-cyan-400 rounded-full relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

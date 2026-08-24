import React, { useState } from 'react';
import { Plus, Loader2, Sparkles, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskInput({ onAddTask, loading }) {
  const [taskText, setTaskText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = taskText.trim();
    if (!trimmed) {
      setError('Please enter a task description');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      await onAddTask(trimmed);
      setTaskText('');
    } catch (err) {
      setError(err.message || 'Failed to add task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative group"
      >
        {/* Glow border on hover/focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-[#782522] to-cyan-500 rounded-3xl blur opacity-20 dark:opacity-30 group-focus-within:opacity-60 dark:group-focus-within:opacity-75 transition duration-500 -z-10" />

        <div className="flex items-center gap-2 p-2 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 focus-within:border-indigo-500/50 rounded-2xl transition-all shadow-lg shadow-slate-200/50 dark:shadow-black/40">
          <div className="pl-3 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
            <Sparkles className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={taskText}
            onChange={(e) => {
              setTaskText(e.target.value);
              if (error) setError('');
            }}
            placeholder="What do you want to accomplish next?"
            className="flex-1 bg-transparent px-2 py-2.5 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium focus:outline-none"
            disabled={submitting || loading}
          />

          {/* Quick Enter Indicator */}
          {taskText.trim() && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              <span>Enter</span>
              <CornerDownLeft className="w-3 h-3" />
            </span>
          )}

          <motion.button
            type="submit"
            disabled={submitting || loading || !taskText.trim()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 disabled:opacity-40 disabled:pointer-events-none text-white text-sm font-bold shadow-md hover:shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.form>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-6 left-3 text-xs font-semibold text-rose-500 dark:text-rose-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

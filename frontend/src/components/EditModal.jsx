import React, { useState, useEffect } from 'react';
import { X, Calendar, Folder, Save, Loader2, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EditModal({ isOpen, taskData, onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Low');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskData) {
      setTitle(taskData.task || '');
      setDescription(taskData.description || '');
      setDueDate(taskData.due_date || '');
      setCategory(taskData.category || 'Work');
      setPriority(taskData.priority || 'Low');
      setError('');
    }
  }, [taskData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Task title is required');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await onSave({
        task: trimmedTitle,
        description: description.trim(),
        due_date: dueDate,
        category: category,
        priority: priority,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update task');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Top Header */}
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Edit3 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
                  Edit Task
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* TASK_TITLE */}
              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  TASK_TITLE
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g., Optimize database queries"
                  className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all"
                  autoFocus
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add detailed notes or requirements..."
                  className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none resize-none transition-all"
                />
              </div>

              {/* DUE_DATE & CATEGORY */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* DUE_DATE */}
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    DUE_DATE
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 rounded-xl px-2.5 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none transition-all"
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    CATEGORY
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 rounded-xl pl-3 pr-6 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="Work">Work</option>
                      <option value="Personal">Personal</option>
                      <option value="Study">Study</option>
                      <option value="Project">Project</option>
                      <option value="Health">Health</option>
                      <option value="Finance">Finance</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRIORITY_LEVEL */}
              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  PRIORITY_LEVEL
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Low */}
                  <button
                    type="button"
                    onClick={() => setPriority('Low')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      priority === 'Low'
                        ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 text-slate-900 dark:text-white shadow-sm'
                        : 'border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Low</span>
                  </button>

                  {/* Medium */}
                  <button
                    type="button"
                    onClick={() => setPriority('Medium')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      priority === 'Medium'
                        ? 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-950/50 text-slate-900 dark:text-white shadow-sm'
                        : 'border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Medium</span>
                  </button>

                  {/* High */}
                  <button
                    type="button"
                    onClick={() => setPriority('High')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      priority === 'High'
                        ? 'border-rose-600 dark:border-rose-400 bg-rose-50 dark:bg-rose-950/50 text-slate-900 dark:text-white shadow-sm'
                        : 'border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>High</span>
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                  {error}
                </p>
              )}

              <hr className="border-slate-200 dark:border-slate-800 pt-1" />

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={saving}
                  className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-[#782522] dark:text-rose-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer disabled:opacity-50 text-center"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || !title.trim()}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#782522] hover:bg-[#661e1b] transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

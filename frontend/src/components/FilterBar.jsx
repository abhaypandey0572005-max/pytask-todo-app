import React from 'react';
import { Search, X, Layers, Clock, CheckCircle2, ArrowUpDown, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FilterBar({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
  counts,
}) {
  const tabs = [
    { id: 'all', label: 'All', count: counts.all, icon: Layers },
    { id: 'pending', label: 'Active', count: counts.pending, icon: Clock },
    { id: 'completed', label: 'Done', count: counts.completed, icon: CheckCircle2 },
  ];

  const categories = ['All', 'Work', 'Personal', 'Study', 'Project', 'Health', 'Finance'];

  return (
    <div className="space-y-2.5 pt-1">
      {/* Search & Sort Controls */}
      <div className="flex items-center gap-2">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-white/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 pl-9 pr-8 py-2 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Selector Dropdown */}
        <div className="relative shrink-0">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
            <ArrowUpDown className="w-3 h-3" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-xl pl-7 pr-6 py-2 focus:border-indigo-500 focus:outline-none appearance-none cursor-pointer shadow-sm"
          >
            <option value="default">Sort</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="name">A-Z</option>
          </select>
        </div>
      </div>

      {/* Status Segmented Control (Full Width on Mobile) */}
      <div className="grid grid-cols-3 bg-slate-100/90 dark:bg-slate-900/80 p-1 border border-slate-200 dark:border-slate-800 rounded-xl relative gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`relative flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer z-10 ${
                isActive ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterTab"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg shadow-sm -z-10"
                />
              )}
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category Pills (Horizontal Scroll on Mobile) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1 mr-0.5 shrink-0">
          <Filter className="w-2.5 h-2.5" />
        </span>
        {categories.map((cat) => {
          const isCatActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                isCatActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800/80'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

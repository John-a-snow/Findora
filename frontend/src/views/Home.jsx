import React, { useState } from "react";
import * as Icons from "lucide-react";
import WorkflowCard from "../components/WorkflowCard";
import ToolCard from "../components/ToolCard";

export default function Home({
  categories,
  tools,
  workflows,
  activeProfile,
  onSearch,
  onSelectCategory,
  onSelectWorkflow,
  onSeeAllWorkflows,
  onSeeAbout,
  favorites,
  toggleFavorite,
  compareList,
  toggleCompare
}) {
  const [query, setQuery] = useState("");
  const sampleQueries = [
    "Best free tools for editing reels",
    "I want to create presentations",
    "Best logo maker for gaming channel",
    "Tools for coding interview preparation"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const trendingTools = tools.filter(t => t.isTrending).slice(0, 4);
  const editorPicks = tools.filter(t => t.isEditorPick).slice(0, 4);
  const trendingWorkflows = workflows.filter(w => w.isPopular).slice(0, 3);
  const hiddenGems = tools.filter(t => t.isHiddenGem).slice(0, 4);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 z-10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-16 relative">
        <div className="md:col-span-7 space-y-6 text-left">
          <div className="relative inline-block group cursor-pointer">
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl tracking-tight text-white leading-tight transition duration-300 hover:text-indigo-500 dark:hover:text-indigo-400">
              Welcome <span className="text-indigo-500 dark:text-indigo-400 inline-block group-hover:animate-bounce">!</span>
            </h1>
            <div className="absolute left-0 top-full mt-3 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 origin-top-left flex flex-col items-start bg-[var(--bg-card)] border border-indigo-500/20 text-[var(--text-main)] rounded-xl p-3.5 shadow-2xl backdrop-blur-md w-64 z-50">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icons.Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span className="font-bold text-indigo-500 dark:text-indigo-400 font-display">Glad you're here! 👋</span>
              </div>
              <p className="text-2xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Discover smart workflow pipelines, compare specs side-by-side, and find the perfect tools to power your productivity!
              </p>
              <div className="absolute -top-1.5 left-8 w-3 h-3 bg-[var(--bg-card)] border-l border-t border-indigo-500/20 rotate-45"></div>
            </div>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-700 dark:text-zinc-200 leading-tight">
            To Findora Discovery Platform
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl">
            Findora helps you discover, compare, and review the best tools, apps, and software online. Find the right digital solutions for work, business, and productivity—all in one place.
          </p>
          <div>
            <button
              onClick={onSeeAbout}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm rounded-full transition duration-300 shadow-md shadow-indigo-600/10 cursor-pointer"
            >
              About
            </button>
          </div>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <img
            src="/hero-illustration.png"
            alt="Findora Illustration"
            className="w-full max-w-md object-contain hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        </div>
      </div>

      <div id="search-section" className="glass-card rounded-3xl p-6 sm:p-8 mb-16 relative overflow-hidden">
        <div className="text-left mb-6">
          <span className="text-2xs font-bold text-indigo-500 dark:text-indigo-400 tracking-wider uppercase">
            DISCOVER FASTER
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Find Tools In Seconds
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="relative flex items-center bg-gray-950/40 border border-gray-850 rounded-2xl p-2 z-20">
          <Icons.Search className="w-5.5 h-5.5 text-gray-500 ml-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI tools, business software, developer apps..."
            className="flex-1 bg-transparent border-0 outline-none text-white placeholder-zinc-500 px-3 py-2.5 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm rounded-xl transition duration-200 cursor-pointer"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 mt-4 z-20 relative text-left">
          <span className="text-2xs text-gray-500 font-medium">Try searching:</span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(q);
                onSearch(q);
              }}
              className="text-3xs font-medium bg-gray-900/60 border border-gray-800/80 hover:border-indigo-500/30 text-gray-400 hover:text-indigo-300 rounded-lg px-2.5 py-1.5 transition duration-200 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-20 relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-white">
              Explore Categories
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Browse professional digital tools sorted by category
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map(cat => {
            let iconName = cat.icon || "Folder";
            let CatIcon = Icons[iconName] || Icons.Folder;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="glass-card rounded-2xl p-5 text-center cursor-pointer hover:-translate-y-1"
              >
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-4">
                  <CatIcon className="w-5 h-5" />
                </div>
                <h4 className="font-display font-semibold text-sm text-white mb-1">
                  {cat.name}
                </h4>
                <p className="text-3xs text-gray-500 tracking-wider uppercase font-semibold">
                  {cat.count} curated tools
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-20 relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-white">
              Popular Integrated Pipelines
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Sequence tools into cohesive high-throughput workflows
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {trendingWorkflows.slice(0, 1).map(flow => (
            <WorkflowCard
              key={flow.id}
              workflow={flow}
              toolsData={tools}
              onSelect={onSelectWorkflow}
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onSeeAllWorkflows}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-800 bg-gray-950/40 hover:bg-gray-950 text-xs font-semibold text-gray-400 hover:text-white transition duration-200 cursor-pointer"
          >
            <span>See More Pipelines</span>
            <Icons.ChevronRight className="w-4 h-4 text-indigo-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg bg-pink-500/15 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <Icons.TrendingUp className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Trending Spotlight
            </h3>
          </div>
          <div className="space-y-4">
            {trendingTools.map(t => (
              <ToolCard
                key={t.id}
                tool={t}
                isFavorite={favorites.includes(t.id)}
                toggleFavorite={toggleFavorite}
                isCompared={compareList.includes(t.id)}
                toggleCompare={toggleCompare}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Icons.Award className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Editor Picks
            </h3>
          </div>
          <div className="space-y-4">
            {editorPicks.map(t => (
              <ToolCard
                key={t.id}
                tool={t}
                isFavorite={favorites.includes(t.id)}
                toggleFavorite={toggleFavorite}
                isCompared={compareList.includes(t.id)}
                toggleCompare={toggleCompare}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg bg-teal-500/15 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Icons.Gem className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Niche Gems
            </h3>
          </div>
          <div className="space-y-4">
            {hiddenGems.map(t => (
              <ToolCard
                key={t.id}
                tool={t}
                isFavorite={favorites.includes(t.id)}
                toggleFavorite={toggleFavorite}
                isCompared={compareList.includes(t.id)}
                toggleCompare={toggleCompare}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-900 pt-10 pb-6 text-center text-xs text-gray-600">
        <p className="mb-2">Findora Discovery Portal - SaaS MVP Dashboard</p>
        <p>&copy; {new Date().getFullYear()} Findora Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
import React from "react";
import * as Icons from "lucide-react";
import ToolCard from "../components/ToolCard";
import WorkflowCard from "../components/WorkflowCard";

export default function SearchResults({
  searchQuery,
  searchCategory,
  parsedCriteria,
  resultsTools,
  resultsWorkflows,
  filters,
  setFilters,
  allTools,
  onSelectWorkflow,
  favorites,
  toggleFavorite,
  compareList,
  toggleCompare,
  onBackToHome
}) {
  const toggleFilter = (key) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredTools = resultsTools.filter(t => {
    if (filters.freeOnly && t.pricing !== "Free" && t.pricing !== "Freemium") return false;
    if (filters.beginnerFriendly && t.difficulty !== "Beginner") return false;
    if (filters.professionalTools && t.difficulty !== "Professional") return false;
    if (filters.aiBased && !t.isAi) return false;
    if (filters.mobileFriendly && !t.isMobile) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-800 bg-gray-950/40 text-xs text-gray-400 hover:text-white transition duration-200 cursor-pointer"
        >
          <Icons.ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
        <span className="text-gray-600">/</span>
        <span className="text-xs text-gray-500 font-medium font-display">Discovery Results</span>
      </div>

      <div className="mb-10">
        <h2 className="font-display font-extrabold text-3xl text-white">
          {searchCategory ? `Category: ${searchCategory}` : `Search Results for "${searchQuery}"`}
        </h2>
        {parsedCriteria && (
          <div className="flex flex-wrap gap-2 mt-3">
            {parsedCriteria.category && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/15">
                <Icons.FolderOpen className="w-3 h-3" />
                Category: {parsedCriteria.category}
              </span>
            )}
            {parsedCriteria.freeOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/15">
                <Icons.Check className="w-3 h-3" />
                Free/Freemium Only
              </span>
            )}
            {parsedCriteria.difficulty && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/15">
                <Icons.Sliders className="w-3 h-3" />
                Difficulty: {parsedCriteria.difficulty}
              </span>
            )}
            {parsedCriteria.isAi && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/15">
                <Icons.Cpu className="w-3 h-3" />
                AI-Driven
              </span>
            )}
            {parsedCriteria.isMobile && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/15">
                <Icons.Smartphone className="w-3 h-3" />
                Mobile Support
              </span>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="glass-card rounded-2xl p-5 self-start h-auto">
          <h3 className="font-display font-bold text-base text-white mb-4 pb-3 border-b border-gray-800/80 flex items-center gap-2">
            <Icons.Filter className="w-4.5 h-4.5 text-indigo-400" />
            <span>Refine Search</span>
          </h3>

          <div className="space-y-4">
            <label className="flex items-center justify-between group cursor-pointer">
              <span className="text-sm text-gray-400 group-hover:text-white transition">Free Only</span>
              <input
                type="checkbox"
                checked={filters.freeOnly}
                onChange={() => toggleFilter("freeOnly")}
                className="w-4 h-4 rounded border-gray-800 bg-gray-950 text-indigo-600 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between group cursor-pointer">
              <span className="text-sm text-gray-400 group-hover:text-white transition">Beginner Friendly</span>
              <input
                type="checkbox"
                checked={filters.beginnerFriendly}
                onChange={() => toggleFilter("beginnerFriendly")}
                className="w-4 h-4 rounded border-gray-800 bg-gray-950 text-indigo-600 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between group cursor-pointer">
              <span className="text-sm text-gray-400 group-hover:text-white transition">Professional Tools</span>
              <input
                type="checkbox"
                checked={filters.professionalTools}
                onChange={() => toggleFilter("professionalTools")}
                className="w-4 h-4 rounded border-gray-800 bg-gray-950 text-indigo-600 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between group cursor-pointer">
              <span className="text-sm text-gray-400 group-hover:text-white transition">AI-Based Only</span>
              <input
                type="checkbox"
                checked={filters.aiBased}
                onChange={() => toggleFilter("aiBased")}
                className="w-4 h-4 rounded border-gray-800 bg-gray-950 text-indigo-600 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between group cursor-pointer">
              <span className="text-sm text-gray-400 group-hover:text-white transition">Mobile Friendly</span>
              <input
                type="checkbox"
                checked={filters.mobileFriendly}
                onChange={() => toggleFilter("mobileFriendly")}
                className="w-4 h-4 rounded border-gray-800 bg-gray-950 text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          </div>

          <button
            onClick={() => setFilters({
              freeOnly: false,
              beginnerFriendly: false,
              professionalTools: false,
              aiBased: false,
              mobileFriendly: false
            })}
            className="w-full mt-6 py-2 bg-gray-950/60 hover:bg-gray-950 border border-gray-800 text-xs font-semibold text-gray-400 hover:text-white rounded-xl transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>

        <div className="lg:col-span-3 space-y-8">
          {resultsWorkflows && resultsWorkflows.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <Icons.Layers className="w-4.5 h-4.5 text-pink-400" />
                <span>Recommended Pipelines</span>
              </h3>
              <div className="space-y-4">
                {resultsWorkflows.map(flow => (
                  <WorkflowCard
                    key={flow.id}
                    workflow={flow}
                    toolsData={allTools}
                    onSelect={onSelectWorkflow}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Icons.Grid className="w-4.5 h-4.5 text-indigo-400" />
              <span>Recommended Tools ({filteredTools.length})</span>
            </h3>

            {filteredTools.length === 0 ? (
              <div className="glass-card rounded-2xl p-10 text-center">
                <Icons.Info className="w-10 h-10 text-gray-500 mx-auto mb-4" />
                <h4 className="font-display font-semibold text-lg text-white mb-1">
                  No matching tools found
                </h4>
                <p className="text-sm text-gray-400 max-w-sm mx-auto mb-4">
                  We parsed your search query but your current active sidebar filters filtered out all results.
                </p>
                <button
                  onClick={() => setFilters({
                    freeOnly: false,
                    beginnerFriendly: false,
                    professionalTools: false,
                    aiBased: false,
                    mobileFriendly: false
                  })}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white rounded-lg transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTools.map(t => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
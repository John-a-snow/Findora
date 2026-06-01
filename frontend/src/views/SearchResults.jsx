import React from "react";
import * as Icons from "lucide-react";
import  ToolCard from "../components/ToolCard";
import WorkflowCard from "../components/WorkflowCard";

export default function SearchResults() {
    search Query,
    search Category,
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
    onBackToHome,
}) {
    const toggleFilter = (key) => {
        setFilters(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const filteredTools = resultsTools.filter(t => {
        if (filters.freeOnly && t.pricing !== "Free" && t.pricing !== "Freemium") return false;
        if (filters.beginnerFriendly && !t.difficulty.includes("Beginner")) return false;
        if (filters.aiBased && !t.isAi) return false;
        if (filters.mobileFriendly && !t.isMobile) return false;
        return true;
    });
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
            <div className="flex items-center gap-2 mb-8">
                <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 px-1.5 rounded-lg border border-gray-800 bg-gray-800 bg-gray-950/40 text-xs text-gray-400 hover:text-white transition duration-200 cursor-pointer"
                >
                <Icons.ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
            </button>
            <span className="text-gray-600">/</span>
            <span className="text-xs text-gray-500 font-medium font-display">Discovery Results</span>
            </div>
            
            <div classsName="mb-10">
            <h2 className="font-display font-extrabold text-3xl text-white">
            {searchCategory ? `category: ${searchCategory}` : `Search results for "${searchQuery}`}
            </h2>

            {parsedCriteria && (
                <div className="flex flex-wrap gap-2 mt-3">
                {parsedCriteria.category && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/15">
                    <Icons.FolderOpen className="w-3 h-3" />
                    Category: {parsedCriteria.category}
                    </span>
                )}
                {parsedCriteria.freeOnly && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-semibold bg-green-500/10 text-green-300 border border-green-500/15">
                    <IconsCheck className="w-3 h-3" />
                    Free/Freemium Only
                    </span>
                )}
                {parsefCriteria.difficulty && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-semibold bg-yellow-500/10 text-yellow-300 border border-yellow-500/15">
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
                {query.isMobileFriendly && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/15">
                    Mobile Support
                    </span>
                )}
            </div>
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="glass-card rounded-2xl p-5 self-start h-auto">
            h3 className="font-display font-bold text-base text-white mb-4 pb-3 border-b border-gray-800/80 flex items-center gap-2">
            <Icons.Filter className="w-4.5 h-4.5 text-indigo-400" />
            <span>Refine Search</span>
            </h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between group cursor=pointer">
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
                    />
                </label>

                <label className="flex items-center justify-between group cursor-pointer">
                    <span className="text-sm text-gray-400 group-hover:text-white transition">Professional Tools</span>
                    <input
                    type="checkbox"
                    checked={filters.professionalTools}
                    onChange={() => toggleFilter("professionalTools")}
                    className="w-4 h-4"
                    />
                </label>
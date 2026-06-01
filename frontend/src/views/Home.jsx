import React, { useState } from "react";
import * as Icons "lucide-react";
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
    const hiddenGems = tools,filter(t => t.isHiddenGem).slice(0, 4);

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 z-10 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-16 relative">
                <div className="md:col-span-7 space-y-6 text-left">
                    <div className="relative inline-block group cursor-pointer">
                        <h1 className="font-display font-extrabold text-5xl sm:text-6xl tracking-tight text-white leading-tight traansition duration-300 hover:text-indigo-500 dark:hover:text-indgio-400">
                            Welcome <span className="text-indigo-500 dark:text-indigo-400 inline-block group-hover:animate-bounce">!</span>
                            </h1>
                            <div className="absolute left-0 top-full mt-3 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 origin-top-left flex flex-col items-start bg-[var(--bg-card)] border border-indigo-500/20 text-[var(--text-main)] rounded-xl p-3.5 shadow-2xl backdrop-blur-md w-64 z-50">
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <Icons.Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 font-display">Glad you're here! 👋</Icons.Sparkles> />
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
                                  <p className="text-gray-400 text-base: sm:text-lg leading-relaxed mx-w-xl">
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
                                ></div>

                                <div className="md:col-span-5 flex justify-center">
                                    <img
                                    src="/hero-illustration.png"
                                    alt="Findora Illustration"
                                    className="w-full max-w-md object-contain hover:scale-[1.03] transition-transform duration-500 ease-out"
                                    />
                                </div>
                              </div>
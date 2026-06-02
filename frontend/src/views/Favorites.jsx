import React, { useState } from "react";
import * as Icons from "lucide-react";
import ToolCard from "../components/ToolCard";
import WorkflowCard from "../components/WorkflowCard";

export default function Favorites({
  favorites,
  savedWorkflows,
  allTools,
  allWorkflows,
  toggleFavorite,
  compareList,
  toggleCompare,
  onSelectWorkflow,
  onBackToHome
}) {
  const [activeTab, setActiveTab] = useState("tools");

  const favoritedTools = allTools.filter(t => favorites.includes(t.id));
  const favoritedWorkflows = allWorkflows.filter(w => savedWorkflows.includes(w.id));

  const renderEmptyState = (iconName, title, desc, btnText, btnColorClass) => {
    const Icon = Icons[iconName] || Icons.HelpCircle;
    return (
      <div className="glass-card rounded-3xl p-16 text-center max-w-xl mx-auto">
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-${btnColorClass}-500/10 border border-${btnColorClass}-500/20 text-${btnColorClass}-400`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-display font-bold text-xl text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">{desc}</p>
        <button
          onClick={onBackToHome}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition cursor-pointer bg-${btnColorClass}-600 hover:bg-${btnColorClass}-500`}
        >
          <span>{btnText}</span>
        </button>
      </div>
    );
  };

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
        <span className="text-xs text-gray-500 font-medium font-display">My Bookmarks</span>
      </div>

      <div className="mb-10">
        <h2 className="font-display font-extrabold text-3xl text-white">My Saved Modules</h2>
        <p className="text-sm text-gray-500 mt-1">Access your saved tools and custom pipelines</p>
      </div>

      <div className="flex border-b border-gray-800/80 mb-8 gap-4">
        {["tools", "workflows"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold tracking-wide border-b-2 capitalize transition duration-200 ${
              activeTab === tab
                ? tab === "tools" ? "border-indigo-500 text-indigo-400" : "border-pink-500 text-pink-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Saved {tab} ({tab === "tools" ? favoritedTools.length : favoritedWorkflows.length})
          </button>
        ))}
      </div>

      {activeTab === "tools" ? (
        favoritedTools.length === 0 ? (
          renderEmptyState("Bookmark", "No saved tools yet", "Bookmark digital tools to store them here.", "Browse Catalog", "indigo")
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favoritedTools.map(t => (
              <ToolCard key={t.id} tool={t} isFavorite={true} toggleFavorite={toggleFavorite} isCompared={compareList.includes(t.id)} toggleCompare={toggleCompare} />
            ))}
          </div>
        )
      ) : (
        favoritedWorkflows.length === 0 ? (
          renderEmptyState("Layers", "No saved workflows yet", "Bookmark customized pipelines to view them here.", "Explore Pipelines", "pink")
        ) : (
          <div className="space-y-6">
            {favoritedWorkflows.map(flow => (
              <WorkflowCard key={flow.id} workflow={flow} toolsData={allTools} onSelect={onSelectWorkflow} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
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
  onBackToHome,
  user,
  onOpenAuth
}) {
  const [activeTab, setActiveTab] = useState("tools");

  const favoritedTools = allTools.filter(t => favorites.includes(t.id));
  const favoritedWorkflows = allWorkflows.filter(w => savedWorkflows.includes(w.id));

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

      {!user && (
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/15 text-indigo-400">
          <div className="flex items-center gap-3">
            <Icons.CloudLightning className="w-5 h-5 shrink-0" />
            <p className="text-xs sm:text-sm text-indigo-300">
              You are viewing guest bookmarks. Sign in to save these to your account and sync them across all your devices.
            </p>
          </div>
          <button
            onClick={onOpenAuth}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition duration-200 cursor-pointer shrink-0"
          >
            Sign In Now
          </button>
        </div>
      )}

      <div className="mb-10">
        <h2 className="font-display font-extrabold text-3xl text-white">
          My Saved Modules
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Access your saved tools, customized workflow sequences, and collection setups
        </p>
      </div>

      <div className="flex border-b border-gray-800/80 mb-8 gap-4">
        <button
          onClick={() => setActiveTab("tools")}
          className={`pb-3 text-sm font-semibold tracking-wide border-b-2 transition ${
            activeTab === "tools"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Saved Tools ({favoritedTools.length})
        </button>
        <button
          onClick={() => setActiveTab("workflows")}
          className={`pb-3 text-sm font-semibold tracking-wide border-b-2 transition ${
            activeTab === "workflows"
              ? "border-pink-500 text-pink-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Saved Pipelines ({favoritedWorkflows.length})
        </button>
      </div>

      {activeTab === "tools" ? (
        favoritedTools.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center max-w-xl mx-auto">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-6">
              <Icons.Bookmark className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              No saved tools yet
            </h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Explore best-in-class digital tools and save them to your custom toolkit by clicking the bookmark icon on any card.
            </p>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition cursor-pointer"
            >
              <span>Browse Catalog</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favoritedTools.map(t => (
              <ToolCard
                key={t.id}
                tool={t}
                isFavorite={true}
                toggleFavorite={toggleFavorite}
                isCompared={compareList.includes(t.id)}
                toggleCompare={toggleCompare}
              />
            ))}
          </div>
        )
      ) : (
        favoritedWorkflows.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center max-w-xl mx-auto">
            <div className="h-12 w-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mx-auto mb-6">
              <Icons.Layers className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              No saved workflows yet
            </h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Sequence multiple digital tools into efficient pipelines, then bookmark them to store them here for quick launch.
            </p>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-xs font-semibold text-white transition cursor-pointer"
            >
              <span>Explore Pipelines</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {favoritedWorkflows.map(flow => (
              <WorkflowCard
                key={flow.id}
                workflow={flow}
                toolsData={allTools}
                onSelect={onSelectWorkflow}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
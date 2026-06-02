import React from "react";
import * as Icons from "lucide-react";
import ToolCard from "../components/ToolCard";

export default function WorkflowDetails({ workflowId, workflowsData, toolsData, favorites, toggleFavorite, compareList, toggleCompare, onBack }) {
  const workflow = workflowsData.find(w => w.id === workflowId);
  if (!workflow) return (
    <div className="max-w-3xl mx-auto py-20 px-4 text-center text-white">
      <Icons.AlertTriangle className="w-12 h-12 text-pink-500 mx-auto mb-4" />
      <h3 className="font-display font-bold text-xl">Workflow Not Found</h3>
      <button onClick={onBack} className="mt-4 px-4 py-2 bg-indigo-600 rounded-xl text-xs">Go Back</button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 relative z-10">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-800 bg-gray-950/40 text-xs text-gray-400 hover:text-white transition mb-8 cursor-pointer"><Icons.ArrowLeft className="w-3.5 h-3.5" />Go Back</button>

      <div className="glass-card rounded-3xl p-8 mb-12 relative overflow-hidden">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-pink-500/10 text-pink-300 border border-pink-500/20 mb-4">{workflow.userType} Pipeline</span>
        <h2 className="font-display font-extrabold text-3xl text-white mb-4">{workflow.name}</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{workflow.description}</p>
        <div className="border-t border-gray-800/80 pt-6 flex items-start gap-4 bg-indigo-500/5 border border-indigo-500/15 rounded-2xl p-5">
          <Icons.Zap className="w-5 h-5 text-indigo-400 mt-1 shrink-0" />
          <div>
            <h4 className="font-display font-bold text-sm text-indigo-300">Productivity Multiplier</h4>
            <p className="text-sm text-gray-300 mt-1">{workflow.productivityBoost}</p>
          </div>
        </div>
      </div>

      <h3 className="font-display font-bold text-xl text-white mb-8 flex items-center gap-2"><Icons.GitCommit className="w-5 h-5 text-pink-400" />Pipeline Sequence</h3>
      <div className="space-y-12 relative before:absolute before:top-2 before:bottom-2 before:left-[21px] before:w-[2px] before:bg-gray-800/80">
        {workflow.steps.map((step, idx) => {
          const tool = toolsData.find(t => t.id === step.toolId);
          return (
            <div key={idx} className="relative pl-12 md:pl-16">
              <div className="absolute top-0.5 left-0.5 w-10 h-10 rounded-full bg-gray-950 border-2 border-indigo-500 flex items-center justify-center text-xs font-bold text-indigo-300 z-10 shadow-lg shadow-indigo-500/20">{idx + 1}</div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <p className="text-2xs text-gray-500 font-semibold uppercase mb-1">Role & Action</p>
                  <h4 className="font-display font-extrabold text-lg text-white mb-2">{step.role}</h4>
                  <p className="text-sm text-gray-400 bg-gray-950/20 border border-gray-900 rounded-xl p-4">{step.description}</p>
                </div>
                <div className="lg:col-span-3">
                  {tool ? <ToolCard tool={tool} isFavorite={favorites.includes(tool.id)} toggleFavorite={toggleFavorite} isCompared={compareList.includes(tool.id)} toggleCompare={toggleCompare} /> : <div className="glass-card rounded-2xl p-5 border-dashed border-gray-800 text-center text-gray-500 text-xs">Missing tool ref: {step.toolId}</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
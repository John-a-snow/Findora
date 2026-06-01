import React from "react";
import * as Icons from "lucide-react";

export default function WorkflowCard({ workflow, toolsData, onSelect }) {
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-pink-500/10 transition-all duration-300"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-2xs font-semibold uppercase tracking-wider bg-pink-500/15 text-pink-300 border border-pink-500/20 mb-2">
            {workflow.userType} Workflow
          </span>
          <h3 className="font-display font-bold text-xl text-white group-hover:text-pink-300 transition duration-300">
            {workflow.name}
          </h3>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl">
            {workflow.description}
          </p>
        </div>

        <button
          onClick={() => onSelect(workflow.id)}
          className="inline-flex items-center justify-center gap-2 px-4.5 py-2.5 text-xs font-bold text-gray-950 bg-gradient-to-r from-pink-400 to-indigo-400 hover:from-pink-300 hover:to-indigo-300 rounded-xl transition duration-300 shadow-lg shadow-pink-500/10 whitespace-nowrap self-start md:self-center cursor-pointer"
        >
          <span>Explore Pipeline</span>
          <Icons.ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="relative mt-4 bg-gray-950/20 border border-gray-800/40 rounded-xl p-4.5">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-2 justify-between">
          {workflow.steps.map((step, idx) => {
            const matchedTool = toolsData.find(t => t.id === step.toolId);
            const ToolIcon = matchedTool ? (Icons[matchedTool.logo] || Icons.HelpCircle) : Icons.HelpCircle;

            return (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-3 bg-gray-950/40 border border-gray-800/60 rounded-xl p-3 flex-1 w-full md:w-auto">
                  <div className="h-9 w-9 rounded-lg bg-gray-900 flex items-center justify-center text-pink-400 border border-gray-800">
                    <ToolIcon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-2xs text-gray-500 font-semibold tracking-wide uppercase">
                      {step.role}
                    </p>
                    <p className="text-xs text-white font-medium">
                      {matchedTool ? matchedTool.name : step.toolId}
                    </p>
                  </div>
                </div>

                {idx < workflow.steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center text-gray-600">
                    <Icons.ChevronRight className="w-5 h-5 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
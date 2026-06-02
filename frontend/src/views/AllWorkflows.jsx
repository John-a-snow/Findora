import React from "react";
import * as Icons from "lucide-react";
import WorkflowCard from "../components/WorkflowCard";

export default function AllWorkflows({ workflowsData, toolsData, onSelectWorkflow, onBackToHome }) {
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
        <span className="text-xs text-gray-500 font-medium font-display">All Pipelines</span>
      </div>

      <div className="mb-10">
        <h2 className="font-display font-extrabold text-3xl text-white">
          Productivity Pipelines Catalogue
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Explore all integrated multi-tool sequences designed to accelerate creator, developer, and student workspaces
        </p>
      </div>

      <div className="space-y-6">
        {workflowsData.map(flow => (
          <WorkflowCard
            key={flow.id}
            workflow={flow}
            toolsData={toolsData}
            onSelect={onSelectWorkflow}
          />
        ))}
      </div>
    </div>
  );
}
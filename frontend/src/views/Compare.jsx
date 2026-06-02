import React from "react";
import * as Icons from "lucide-react";

export default function Compare({
  compareList,
  allTools,
  toggleCompare,
  favorites,
  toggleFavorite,
  onBackToHome
}) {
  const comparedTools = allTools.filter(t => compareList.includes(t.id));

  const specs = [
    { label: "Description", getValue: t => t.description },
    { label: "Pricing", getValue: t => `${t.pricing} (${t.pricingDetails})` },
    { label: "Difficulty", getValue: t => t.difficulty },
    { label: "Best For", getValue: t => t.bestUseCase },
    { label: "Platforms", getValue: t => t.platformSupport.join(", ") },
    { label: "Strengths", getValue: t => t.strengths.join(", ") }
  ];

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
        <span className="text-xs text-gray-500 font-medium font-display">Comparison Board</span>
      </div>

      <div className="mb-10">
        <h2 className="font-display font-extrabold text-3xl text-white">Compare Tools</h2>
        <p className="text-sm text-gray-500 mt-1">Review core specifications side-by-side</p>
      </div>

      {comparedTools.length < 2 ? (
        <div className="glass-card rounded-3xl p-16 text-center max-w-xl mx-auto">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-6">
            <Icons.GitCompare className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-white mb-2">Select tools to compare</h3>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Please add at least 2 tools from the dashboard catalog to enable side-by-side comparison.
          </p>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition cursor-pointer"
          >
            <span>Explore Catalog</span>
          </button>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden border border-gray-800/80">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-950/60 border-b border-gray-850">
                  <th className="p-6 text-sm font-semibold text-gray-400 w-1/4">Specs Matrix</th>
                  {comparedTools.map(t => {
                    const ToolIcon = Icons[t.logo] || Icons.HelpCircle;
                    return (
                      <th key={t.id} className="p-6 w-1/3 min-w-[280px]">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-indigo-400">
                              <ToolIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-display font-bold text-base text-white">{t.name}</h4>
                              <p className="text-3xs text-gray-500 uppercase tracking-wider">{t.category}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleCompare(t.id)}
                            className="p-1 rounded-lg hover:bg-gray-900 text-gray-500 hover:text-white transition cursor-pointer"
                          >
                            <Icons.X className="w-4 h-4" />
                          </button>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {specs.map((spec, idx) => (
                  <tr key={idx}>
                    <td className="p-6 text-xs font-semibold uppercase tracking-wider text-gray-500">{spec.label}</td>
                    {comparedTools.map(t => (
                      <td key={t.id} className="p-6 text-sm text-gray-300 leading-relaxed">{spec.getValue(t)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
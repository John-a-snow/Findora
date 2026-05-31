import React, { useState } from "react";
import * as Icons from "lucide-react";

export default function ToolCard({ tool, isFavorite, toggleFavorite, isCompared, toggleCompare }) {
  const [imgError, setImgError] = useState(false);
  const IconComponent = Icons[tool.logo] || Icons.HelpCircle;

  const getDomain = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace("www.", "");
    } catch (e) {
      return "";
    }
  };

  const domain = getDomain(tool.websiteUrl);
  const logoUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col justify-between h-full relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-indigo-500/20 transition-all duration-300"></div>

      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gray-900/60 border border-gray-800 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 group-hover:border-indigo-500/30 transition-all duration-300 overflow-hidden p-1.5 bg-white dark:bg-zinc-950">
              {!imgError && logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${tool.name} logo`}
                  className="w-full h-full object-contain rounded-lg"
                  onError={() => setImgError(true)}
                />
              ) : (
                <IconComponent className="w-5.5 h-5.5" />
              )}
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-white group-hover:text-indigo-300 transition duration-300">
                {tool.name}
              </h3>
              <p className="text-2xs text-gray-500 font-medium tracking-wide uppercase">
                {tool.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 z-10">
            <button
              onClick={() => toggleCompare(tool.id)}
              className={`p-1.5 rounded-lg border transition ${
                isCompared
                  ? "bg-pink-500/20 border-pink-500/40 text-pink-300"
                  : "bg-gray-950/40 border-gray-800 text-gray-400 hover:text-white"
              }`}
              title="Add to comparison"
            >
              <Icons.GitCompare className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleFavorite(tool.id)}
              className={`p-1.5 rounded-lg border transition ${
                isFavorite
                  ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                  : "bg-gray-950/40 border-gray-800 text-gray-400 hover:text-white"
              }`}
              title="Save to favorites"
            >
              <Icons.Bookmark className={`w-4 h-4 ${isFavorite ? "fill-indigo-400/20" : ""}`} />
            </button>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 min-h-[48px]">
          {tool.description}
        </p>

        <div className="bg-gray-950/30 border border-gray-800/40 rounded-xl p-3 mb-4">
          <p className="text-2xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
            Best Use Case
          </p>
          <p className="text-xs text-gray-300 font-medium">
            {tool.bestUseCase}
          </p>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium border border-zinc-200 dark:border-zinc-800/60 bg-zinc-100/80 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400">
            {tool.pricing}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium border border-zinc-200 dark:border-zinc-800/60 bg-zinc-100/80 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400">
            {tool.difficulty}
          </span>
          {tool.isAi && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium border border-zinc-200 dark:border-zinc-800/60 bg-zinc-100/80 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400">
              AI
            </span>
          )}
          {tool.isMobile && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium border border-zinc-200 dark:border-zinc-800/60 bg-zinc-100/80 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400">
              Mobile
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition duration-300 shadow-md shadow-indigo-600/15 glowing-btn"
          >
            <span>Visit Website</span>
            <Icons.ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
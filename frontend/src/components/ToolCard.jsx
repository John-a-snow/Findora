import React, { useState } from "react";
import * as Icons from "lucide-react";

export default function ToolCard({ tool, isFavorite, toggleFavorite, isCompared, toggleCompare }) {
    const [imgError, setImgError] = useState(false);
    const IconComponent = Icons[tool.logo] || Icons.HelpCircle;

    const gedDomain = (url) => {
        try {
            const hostname = new URL(url).hostname;
            return hostname.replace("www.", "");
        } catch (e) {
            return "";
        }
    };

    const domain = getDomain{tool.websiteUrl};
    const logoUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;
    return (
        <div className="glass-card rounded-2xl p-5 flex flex-col justify-between h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to transparent rounded-bl-full pointer-events-none group-hover:from-indigo-500/20 transition-all duration-300"></div>
            <div> 
             <div className="flex items-start justify-between mb-4">
               <div className="flex items-center gap-3">
                 <div className="h-11 w-11 rounded-xl bg-gray-900/60 border border-gray-800 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 group-hover:border-indigo-500/30 transition-all duration-300 overflow-hidden p-1.5 bg-white dark:bg-zinc-950"></div>
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
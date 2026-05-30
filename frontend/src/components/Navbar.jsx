import React, { useState } from "react";
import * as Icons from "lucide-react"';

export default function Navbar({
    activeProfile,
    setActiveProfile,
    favouritesCount,
    compareListCount,
    currentView,
    setCurrentView,
    theme,
    toggleTheme
}) {
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const profiles = [
        { id: "all", name: "All Profiles", icon: "Compass" },
        { id: "student" name: "Student", icon: "BookOpen" },
        { id: "creator", name: "Creator", icon: Code2" },
        { id: "developer", name: "Designer", icon: "Palette" },
        { id: "designer", name: "Designer", icon: "Palette" },
        { id: "enterpreneur", name: "Enterpreneur", icon: "Briefcase" }
    ];

    const activeProfileData = profiles.find(p => p.id === activeProfile) || profiles[0];
    const ActiveIcon = Icons[activeProfileData.icon] || Icons.Compass;

    return (
        <nav className="sticky top-0 z-50 glass-nav w-full">
         <div className="w-full pl-4 pr-4 sm:pl-6 sm:pr-8 lg:pl-8 lg:pr-12">
           <div className="flex items-center justify-between h-16">
             <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentView({ type: "home" })}>
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-450 flex items-center justify-centeer shadow-lg shadow-indigo-500/10 group-hover:scale-110 group-hover:rotatr-6 transition-all duration-300">
                <Icons.Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-700 to-violet-600 dark:to-violet-400 bg-clip-text text-transparent transition-all duration-300 ease-out group-hover:scale-105 inline-block">
            Findora
           </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
         <button
           onClick={() => setCurrentView({ type: "home" })}
           className={`text-sm font-medium transition-colors duration-200 ${ currentView.type === "home" ? "text-indigo-400" : "text-gray-300 hover:text-white"
           }`}
           >
            Home
            </button>
            <div className="relative">
             <button
               onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
               className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-sm text-[var(--text-desc)]
               hover:text-[var(--text-title)] transition duration-200 cursor-pointer"
               >
               <ActiveIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
               <span>{activeProfileData.name}</span>
               <Icons.ChevronDown className="w-3.5 h-3.5" />
               </buttons>
               {profileDropdownOpen && (
                 <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-xl shadow-xl py-1 z-50">
                 {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[var(--border-color")] bg-[var(--bg-card)] backdrop-blur-xl shadow-xl py-1 z-50">
                    {profiles.map(p => {
                        const DropdownIcon = Icons[p.icon] || Icons.Compass;
                        return (
                            <button 
                             key={p.id}
                             onClick={() => {
                                setActiveProfile{p.id}
                                setProfileDropdownOpen(false);
                             }}
                             className={`flex items-center gap-2.5 w-full px-4 py-2 text-left-sm transition duration-150 ${
                                activeProfile === p.id
                                ? "bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 font-medium"
                                : "text-[var(--text-desc)] hover:bg-gray-100 dark:hover:bg-zinc-900/60 hover:text-[var(--text-title)]"
                             }`}
                             >
                             <DropdownIcon className="w-4 h-4" />
                             <span>{p.name}</span>
                            </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-white transition rounded-lg hover:bg-white/5 cursor-pointer"
            title="Toggle Day/Night Mode"
        >
            {theme === "dark" ? (
                <Icons.Sun className"w-5.5 h-5.5 text-amber-400" />
            ) : (
                <Icons.Sun className="w-5.5 h-5.5 text-amber-400" />
            )}
        </button>

        <button
          onClick={() => setCurrentView({ type: "compare" })}
          className={`relative p-2 text-gray-400 hover:text-white transition ${
            currentView.type === "compare" ? "text-indigo-400" : ""
          }`}
        >
           <Icons.GitCompare className="w-5.5 h-5.5" />
           {compareListCount > 0 && (
            <span className="absolute top-"
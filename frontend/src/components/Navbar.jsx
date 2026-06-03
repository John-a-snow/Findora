import React, { useState } from "react";
import * as Icons from "lucide-react";

export default function Navbar({
  activeProfile,
  setActiveProfile,
  favoritesCount,
  compareListCount,
  currentView,
  setCurrentView,
  theme,
  toggleTheme,
  user,
  onSignOut,
  onOpenAuthModal
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const profiles = [
    { id: "all", name: "All Profiles", icon: "Compass" },
    { id: "student", name: "Student", icon: "BookOpen" },
    { id: "creator", name: "Creator", icon: "Video" },
    { id: "developer", name: "Developer", icon: "Code2" },
    { id: "designer", name: "Designer", icon: "Palette" },
    { id: "entrepreneur", name: "Entrepreneur", icon: "Briefcase" }
  ];

  const activeProfileData = profiles.find(p => p.id === activeProfile) || profiles[0];
  const ActiveIcon = Icons[activeProfileData.icon] || Icons.Compass;

  return (
    <nav className="sticky top-0 z-50 glass-nav w-full">
      <div className="w-full pl-4 pr-4 sm:pl-6 sm:pr-8 lg:pl-8 lg:pr-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentView({ type: "home" })}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-450 flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Icons.Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-700 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent transition-all duration-300 ease-out group-hover:scale-105 inline-block">
              Findora
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setCurrentView({ type: "home" })}
              className={`text-sm font-medium transition-colors duration-200 ${
                currentView.type === "home" ? "text-indigo-400" : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </button>
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-sm text-[var(--text-desc)] hover:text-[var(--text-title)] transition duration-200 cursor-pointer"
              >
                <ActiveIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span>{activeProfileData.name}</span>
                <Icons.ChevronDown className="w-3.5 h-3.5" />
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-xl shadow-xl py-1 z-50">
                  {profiles.map(p => {
                    const DropdownIcon = Icons[p.icon] || Icons.Compass;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setActiveProfile(p.id);
                          setProfileDropdownOpen(false);
                        }}
                        className={`flex items-center gap-2.5 w-full px-4 py-2 text-left text-sm transition duration-150 ${
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
                <Icons.Sun className="w-5.5 h-5.5 text-amber-400" />
              ) : (
                <Icons.Moon className="w-5.5 h-5.5 text-indigo-500" />
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
                <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-2xs font-bold leading-none text-white bg-pink-500 rounded-full">
                  {compareListCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView({ type: "favorites" })}
              className={`relative p-2 text-gray-400 hover:text-white transition ${
                currentView.type === "favorites" ? "text-indigo-400" : ""
              }`}
            >
              <Icons.Bookmark className="w-5.5 h-5.5" />
              {favoritesCount > 0 && (
                <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-2xs font-bold leading-none text-white bg-indigo-500 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-550 flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-md select-none"
                >
                  {user.username.charAt(0).toUpperCase()}
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-52 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-[var(--border-color)]">
                      <p className="text-xs font-semibold text-[var(--text-title)] truncate">
                        {user.username}
                      </p>
                      <p className="text-3xs text-[var(--text-desc)] uppercase font-bold tracking-wider mt-0.5">
                        {user.occupation}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onSignOut();
                        setUserDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-500/5 transition duration-150 cursor-pointer"
                    >
                      <Icons.LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="inline-flex items-center justify-center px-5 py-1.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs sm:text-sm rounded-full transition duration-300 shadow-md shadow-indigo-600/10 cursor-pointer shrink-0"
              >
                Sign In
              </button>
            )}

            <div className="md:hidden">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <Icons.Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {profileDropdownOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2 space-y-1">
          {profiles.map(p => {
            const DropdownIcon = Icons[p.icon] || Icons.Compass;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActiveProfile(p.id);
                  setProfileDropdownOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-sm transition duration-150 ${
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
    </nav>
  );
}
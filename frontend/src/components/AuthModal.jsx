import React, { useState } from "react";
import * as Icons from "lucide-react";

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("Student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/register";
    const body = isLogin ? { username, password } : { username, password, occupation };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      onLoginSuccess(data);
      onClose();
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden z-10">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display font-extrabold text-2xl text-zinc-900 dark:text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition duration-200 cursor-pointer"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3.5 mb-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium rounded-xl">
            <Icons.AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-2xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Username
            </label>
            <div className="relative">
              <Icons.User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 text-zinc-900 dark:text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 transition duration-200 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-2xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Icons.Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 text-zinc-900 dark:text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 transition duration-200 text-sm"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-2xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Profile Occupation
              </label>
              <div className="relative">
                <Icons.Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <select
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 text-zinc-900 dark:text-white outline-none focus:border-indigo-500/50 transition duration-200 text-sm appearance-none"
                >
                  <option value="Student">Student</option>
                  <option value="Creator">Creator</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm rounded-xl transition duration-200 shadow-md shadow-indigo-600/10 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Authenticating..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-zinc-500 dark:text-zinc-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-indigo-500 hover:text-indigo-400 font-semibold cursor-pointer"
          >
            {isLogin ? "Sign up here" : "Login here"}
          </button>
        </div>
      </div>
    </div>
  );
}
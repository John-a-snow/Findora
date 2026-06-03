import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import Home from "./views/Home";
import SearchResults from "./views/SearchResults";
import WorkflowDetails from "./views/WorkflowDetails";
import Favorites from "./views/Favorites";
import Compare from "./views/Compare";
import AllWorkflows from "./views/AllWorkflows";
import About from "./views/About";

const API_BASE = "http://localhost:5000/api";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("findora_theme") || "dark";
  });
  const [activeProfile, setActiveProfile] = useState("all");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("findora_favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [savedWorkflows, setSavedWorkflows] = useState(() => {
    const saved = localStorage.getItem("findora_saved_workflows");
    return saved ? JSON.parse(saved) : [];
  });
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem("findora_compare");
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("findora_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentView, setCurrentView] = useState({ type: "home" });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [parsedCriteria, setParsedCriteria] = useState(null);
  const [resultsTools, setResultsTools] = useState([]);
  const [resultsWorkflows, setResultsWorkflows] = useState([]);

  const [filters, setFilters] = useState({
    freeOnly: false,
    beginnerFriendly: false,
    professionalTools: false,
    aiBased: false,
    mobileFriendly: false
  });

  useEffect(() => {
    localStorage.setItem("findora_theme", theme);
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("findora_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("findora_saved_workflows", JSON.stringify(savedWorkflows));
  }, [savedWorkflows]);

  useEffect(() => {
    localStorage.setItem("findora_compare", JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    if (user) {
      const syncFavorites = async () => {
        try {
          await fetch(`${API_BASE}/users/${user.username}/favorites`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ favorites, savedWorkflows })
          });
        } catch (err) {
          console.error("Failed to sync favorites with server:", err);
        }
      };
      syncFavorites();
    }
  }, [favorites, savedWorkflows, user]);

  useEffect(() => {
    const loadAppData = async () => {
      try {
        setLoading(true);
        const [catRes, toolsRes, workflowsRes] = await Promise.all([
          fetch(`${API_BASE}/categories`),
          fetch(`${API_BASE}/tools`),
          fetch(`${API_BASE}/workflows`)
        ]);
        const catData = await catRes.json();
        const toolsData = await toolsRes.json();
        const workflowsData = await workflowsRes.json();

        setCategories(catData);
        setTools(toolsData);
        setWorkflows(workflowsData);
      } catch (err) {
        console.error("Failed to load initial Findora database:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAppData();
  }, []);

  useEffect(() => {
    if (activeProfile && activeProfile !== "all") {
      const loadProfileTools = async () => {
        try {
          const res = await fetch(`${API_BASE}/tools?userType=${activeProfile}`);
          const data = await res.json();
          setTools(data);
        } catch (err) {
          console.error("Failed to load profile adaptive tools:", err);
        }
      };
      loadProfileTools();
    }
  }, [activeProfile]);

  const handleSearch = async (queryText) => {
    try {
      setLoading(true);
      setSearchQuery(queryText);
      setSearchCategory("");
      const res = await fetch(`${API_BASE}/search-intel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText })
      });
      const data = await res.json();
      setParsedCriteria(data.parsedCriteria);
      setResultsTools(data.tools);
      setResultsWorkflows(data.workflows);
      setCurrentView({ type: "search" });
    } catch (err) {
      console.error("Discovery search intelligence failure:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = async (catId) => {
    try {
      setLoading(true);
      const categoryData = categories.find(c => c.id === catId);
      setSearchCategory(categoryData ? categoryData.name : catId);
      setSearchQuery("");
      setParsedCriteria(null);

      const res = await fetch(`${API_BASE}/tools?category=${catId}`);
      const data = await res.json();
      setResultsTools(data);
      setResultsWorkflows([]);
      setCurrentView({ type: "search" });
    } catch (err) {
      console.error("Failed to fetch category tools:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (toolId) => {
    setFavorites(prev =>
      prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]
    );
  };

  const toggleWorkflowFavorite = (flowId) => {
    setSavedWorkflows(prev =>
      prev.includes(flowId) ? prev.filter(id => id !== flowId) : [...prev, flowId]
    );
  };

  const toggleCompare = (toolId) => {
    setCompareList(prev => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 tools at the same time.");
        return prev;
      }
      return [...prev, toolId];
    });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("findora_user", JSON.stringify(userData));
    setFavorites(userData.favorites || []);
    setSavedWorkflows(userData.savedWorkflows || []);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("findora_user");
    setFavorites([]);
    setSavedWorkflows([]);
  };

  const renderView = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin"></div>
          </div>
          <p className="text-sm text-gray-400 font-medium font-display tracking-wider animate-pulse">
            Analyzing database assets...
          </p>
        </div>
      );
    }

    switch (currentView.type) {
      case "home":
        return (
          <Home
            categories={categories}
            tools={tools}
            workflows={workflows}
            activeProfile={activeProfile}
            onSearch={handleSearch}
            onSelectCategory={handleSelectCategory}
            onSelectWorkflow={(id) => setCurrentView({ type: "workflow", id })}
            onSeeAllWorkflows={() => setCurrentView({ type: "all-workflows" })}
            onSeeAbout={() => setCurrentView({ type: "about" })}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            compareList={compareList}
            toggleCompare={toggleCompare}
          />
        );
      case "search":
        return (
          <SearchResults
            searchQuery={searchQuery}
            searchCategory={searchCategory}
            parsedCriteria={parsedCriteria}
            resultsTools={resultsTools}
            resultsWorkflows={resultsWorkflows}
            filters={filters}
            setFilters={setFilters}
            allTools={tools}
            onSelectWorkflow={(id) => setCurrentView({ type: "workflow", id })}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            compareList={compareList}
            toggleCompare={toggleCompare}
            onBackToHome={() => setCurrentView({ type: "home" })}
          />
        );
      case "workflow":
        return (
          <WorkflowDetails
            workflowId={currentView.id}
            workflowsData={workflows}
            toolsData={tools}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            compareList={compareList}
            toggleCompare={toggleCompare}
            onBack={() => setCurrentView({ type: "home" })}
          />
        );
      case "favorites":
        return (
          <Favorites
            favorites={favorites}
            savedWorkflows={savedWorkflows}
            allTools={tools}
            allWorkflows={workflows}
            toggleFavorite={toggleFavorite}
            compareList={compareList}
            toggleCompare={toggleCompare}
            onSelectWorkflow={(id) => setCurrentView({ type: "workflow", id })}
            onBackToHome={() => setCurrentView({ type: "home" })}
            user={user}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        );
      case "compare":
        return (
          <Compare
            compareList={compareList}
            allTools={tools}
            toggleCompare={toggleCompare}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onBackToHome={() => setCurrentView({ type: "home" })}
          />
        );
      case "all-workflows":
        return (
          <AllWorkflows
            workflowsData={workflows}
            toolsData={tools}
            onSelectWorkflow={(id) => setCurrentView({ type: "workflow", id })}
            onBackToHome={() => setCurrentView({ type: "home" })}
          />
        );
      case "about":
        return (
          <About
            onBackToHome={() => setCurrentView({ type: "home" })}
          />
        );
      default:
        return <div>View error</div>;
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-200 relative overflow-hidden flex flex-col">
      <Navbar
        activeProfile={activeProfile}
        setActiveProfile={setActiveProfile}
        favoritesCount={favorites.length + savedWorkflows.length}
        compareListCount={compareList.length}
        currentView={currentView}
        setCurrentView={setCurrentView}
        theme={theme}
        toggleTheme={toggleTheme}
        user={user}
        onSignOut={handleSignOut}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />
      <main className="flex-1 w-full relative">
        {renderView()}
      </main>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import Navbar from "/components/Navbar";
import Home from "/views/Home";
import SearchResults from "/views/SearchResults";
import WorkflowDetails from "./views/WorkflowDetails";
import Favourites from "./views/Favourites";
import Compare from "./views/Compare";
import AllWorkflows from "./views/AllWorkflows";
import About from "./views/About";

const API_BASE = "http://localhost:5000/api";

export default function App() {
    const [theme, setTheme] = useState(( => {
        return localStorage,getItem("findora_theme") || "dark";
    });
    const [activeProfile, setActiveProfile] = useState("all");
    const [favourites, setFavourites] = useState(() => {
        const saved = localStorage.getItem("findora_favourites");
        return saved ? JSON.parse(saved) : [];
    });
    const [savedWorkflows, setSavedWorkflows] = useState(() => {
        const saved = localStorage.getItem("finfora_saved_workflows");
        return saved ? JSON.parse(saved) : [];
    });
    const [comparelist, setCompareList] = useState(() => {
        const saved = localStorage.getItem("findora_compare");
        return saved ? JSON.parse(saved) : [];
    });

    const [categories, setCategories] = useState([]);
    const [tools, setTools] = useState([]);
    const [workflows, setWorkflows] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentView, setCurrentView] = useState({ type: "home" });
    const [searchQuery, setSearchQuery] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [parsedCriteria, setParsedCriteria] = useState();
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
        localStorage.setItem("findora_favourites", JSON.stringify(favourites));
    }, [favourites]);

    useEffect(() => {
        localStorage.setItem("findora_saved_workflows", JSON.stringify(savedWorkflows));
    }, [savedWorkflows]);

    useEffect(() => {
        localStorage.setItem("findora_compare", JSON.stringify(comparelist));
    }, [comparelist]);
    
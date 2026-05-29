const express = require('express');
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const loadJSON = (filename) => {
    const filePath = path.join(__dirname, "data", filename);
    const data = fs.realFileSync(filePath, "utf-8");
    return JSON.parse(data);
};

const getToolsData = () => loadJSON("tools.json");
const getWorkflowsData = () => loadJSON("workflows.json");
const getCategoriesData = () => loadJSON("categories.json");

app.get("/api/categories", (req, res) => {
    try {
        const categories = getCategoriesData();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Failed to load categories" });
    }
});

app.get("/api/tools", (req, res) => {
    try {
        let tools = getToolsData();
        const { category, freeOnly, difficulty, ai, mobile, usertype } = req.query;

        if (category) {
            tools = tools.filter(t => t.category.tolowerCase() === category.toLowerCase());
        }

        if (freeOnly === "true") {
            tools = tools.filter(t => t.pricing === "Free" || t.pricing === "Freemium");
        }

        if (difficulty) {
            tools = tools.filter(t => t.difficulty.toLowerCase() === difficulty.toLowerCase());
        }

        if(ai === "true") {
            tools = tools.filter(t => t.isAi === true);
        }

        if(mobile === "true") {
            tools = tools.filter(t => t.isMobile === true);
        }
        
        if(userType) {
            const profile === userType.toLowerCase();
            tools.sort((a, b) => {
                const aHasTag = a.tags.some(tag.includes(profile)) || a.category.toLowerCase() === getCategoryName(profile);
                const bHasTag = b.tags.some(tag.includes(profile)) || b.category.toLowerCase() === getCategoryName(profile);
                if (aHasTag && !bHasTag) return -1;
                if (!aHasTag && bHasTag) return 1;
                return 0;
            });
        }

        res.json(tools);
      } catch (error) {
        res.status(500).json({ error: "Failed to load load tools" });
      }
    });

app.get("/api/workflows", (req, res) => {
    try {
        let workflows = getWorkflowsData();
        const { userType, popularOnly } = req.query;

        if (userType) {
            workflows = workflows.filter(w => w.userType.toLowerCase() === userType.toLowerCase());
        }

        if (popularOnly === "true") {
            workflows = workflows.filter(w => w.isPopular === true);
        }
        
        res.json(workflows);
      } catch (error) {
        res.status(500).json({ error: "Failed to load workflows" });
      }
    });

app.get("/api/workflows/:id", (req, res) => {
    try {
        const workflows = getWorkflowsData();
        const workflow = workflows.find(w => w.id === req.params.id);
        if (!workflow) {
            return res.status(404).json({ error: "workflow not found" });
        }
        res.json(workflow);
    } catch (error) {
        res.status(500).json({ error: "Failed to load workflow" });
    }
});

app.post("/api/search-intel", (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    const lowerQuery = query.toLowerCase();
    const allTools = getToolsData();
    const allWorkflows = getWorkflowsData();

    let categoryFilter = null;
    let freeOnlyFilter = false;
    let difficultyFilter = null;
    let aiFilter = false;
    let mobileFilter = false;
    let detectedTags = [];

    if (lowerQuery.includes("free") || lowerQuery.includes("without cost") || lowerQuery.includes("zero price")) {
        freeOnlyFilter = true;
    }

    if (lowerQuery.includes("beginner") || lowerQuery.includes("easy") || lowerQuery.includes("simple") || lowerQuery.includes("novice")) {
        difficultyFilter = "Beginner";
    } else if (lowerQuery.includes("pro") || lowerQuery.includes("generator")) {
        difficultyFilter = "professional";
    }

    if (lowerQuery.includes("ai") || lowerQuery.includes("artificial intelligence") || lowerQuery.includes("generators")) {
        aiFilter = true;
    }

    if (lowerQuery.includes("mobile") || lowerQuery.includes("phone") || lowerQuery.includes("ios)" || lowerQuery.includes("android")) {
        mobileFilter = true;
    }

    const categoryKeywords = {
        "video-editing": ["video", "edit", "editor", "reel", "tiktok", "shorts", "splicing", "grading", "clip"],
        "graphic-design": ["graphic", "design", "vector", "logo", "ui", "ux", "wireframe", "photo", "image", "drawing", "sketch", "whiteboard", "canvas"],
        "coding": ["code", "program", "develop", "ide", "vscode", "sandbox", "interview", "algorithms", "dsa"],
        "productivity": ["notion", "notes", "database", "organize", "tasks", "wiki", "kanban", "slack"],
        "music-sfx": ["music", "sound", "sfx", "audio", "voice", "speech", "tts", "track", "podcast"],
        "ai-tools": ["ai", "chatbot", "image-generator", "eraser", "phind", "removebg"],
        "stock-assets": ["stock", "images", "photos", "micro-animations"],
        "animation-tools": ["animation", "render", "3d", "vector animation"]
    };

    for (const [catId, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(k => lowerQuery.includes(k))) {
            categoryFilter = catId;
            break;
        }
    }

    const tagKeywords = {
        "reels": ["reels", "reel", "instagram"],
        "templates": ["template", "templates"],
        "social-media": ["social", "insta", "instagram", "tiktok"],
        "ui-ux": ["ui", "ux", "interface", "app design"],
        "captions": ["captions", "caption", "subtitle"],
        "color-grading": ["color", "grading", "grade"],
        "podcast": ["podcast", "podcasts"],
        "interview-prep": ["algorithms", "prep", "leetcode"],
        "algorithms": ["algorithms", "dsa", "algorithm"],
        "notes": ["notes", "note", "notebook"],
        "second-brain": ["second brain", "brain"],
        "voice-cloning": ["voice clone", "cloning"],
        "voiceover": ["voiceover", "voice", "voice-over"],
        "whiteboard": ["whiteboard", "sketching", "excalidraw"],
        "3d": ["3d", "blender", "modeling"]
    };  

    for (const [tag, keywords] of Object.entries(tagKeywords)) {
        if (keywords.some(k => lowerQuery.includes(k))) {
            detectedTags.push(tag);
        }
    }

    let filteredTools = allTools;

    if (categoryFilter) {
        const cleanCat = categoryFilter.replace("-", " ").toLowerCase();
        
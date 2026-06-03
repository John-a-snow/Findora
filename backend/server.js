const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const loadJSON = (filename) => {
  const filePath = path.join(__dirname, "data", filename);
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const getToolsData = () => loadJSON("tools.json");
const getWorkflowsData = () => loadJSON("workflows.json");
const getCategoriesData = () => loadJSON("categories.json");
const getUsersData = () => loadJSON("users.json");

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
    const { category, freeOnly, difficulty, ai, mobile, userType } = req.query;

    if (category) {
      tools = tools.filter(t => t.category.toLowerCase().replace(/[\s/]/g, "-") === category.toLowerCase());
    }

    if (freeOnly === "true") {
      tools = tools.filter(t => t.pricing === "Free" || t.pricing === "Freemium");
    }

    if (difficulty) {
      tools = tools.filter(t => t.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (ai === "true") {
      tools = tools.filter(t => t.isAi === true);
    }

    if (mobile === "true") {
      tools = tools.filter(t => t.isMobile === true);
    }

    if (userType) {
      const profile = userType.toLowerCase();
      tools.sort((a, b) => {
        const aHasTag = a.tags.some(tag => tag.includes(profile)) || a.category.toLowerCase() === getCategoryByProfile(profile);
        const bHasTag = b.tags.some(tag => tag.includes(profile)) || b.category.toLowerCase() === getCategoryByProfile(profile);
        if (aHasTag && !bHasTag) return -1;
        if (!aHasTag && bHasTag) return 1;
        return 0;
      });
    }

    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: "Failed to load tools" });
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
      return res.status(404).json({ error: "Workflow not found" });
    }
    res.json(workflow);
  } catch (error) {
    res.status(500).json({ error: "Failed to load workflow" });
  }
});

app.get("/api/compare", (req, res) => {
  try {
    const tools = getToolsData();
    const ids = req.query.ids ? req.query.ids.split(",") : [];
    const matched = tools.filter(t => ids.includes(t.id));
    res.json(matched);
  } catch (error) {
    res.status(500).json({ error: "Failed to compile comparison" });
  }
});

app.post("/api/auth/register", (req, res) => {
  try {
    const { username, password, occupation } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    const users = getUsersData();
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      return res.status(400).json({ error: "Username is already taken" });
    }
    const newUser = { username, password, occupation, favorites: [], savedWorkflows: [] };
    users.push(newUser);
    fs.writeFileSync(path.join(__dirname, "data", "users.json"), JSON.stringify(users, null, 2), "utf8");
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/auth/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const users = getUsersData();
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/api/users/:username/favorites", (req, res) => {
  try {
    const users = getUsersData();
    const user = users.find(u => u.username.toLowerCase() === req.params.username.toLowerCase());
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ favorites: user.favorites || [], savedWorkflows: user.savedWorkflows || [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to load user favorites" });
  }
});

app.post("/api/users/:username/favorites", (req, res) => {
  try {
    const { favorites, savedWorkflows } = req.body;
    const users = getUsersData();
    const userIndex = users.findIndex(u => u.username.toLowerCase() === req.params.username.toLowerCase());
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }
    users[userIndex].favorites = favorites || [];
    users[userIndex].savedWorkflows = savedWorkflows || [];
    fs.writeFileSync(path.join(__dirname, "data", "users.json"), JSON.stringify(users, null, 2), "utf8");
    res.json({ message: "Favorites updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save user favorites" });
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
      difficultyFilter = "beginner";
    } else if (lowerQuery.includes("pro") || lowerQuery.includes("professional") || lowerQuery.includes("expert") || lowerQuery.includes("advanced")) {
      difficultyFilter = "professional";
    }

    if (lowerQuery.includes("ai") || lowerQuery.includes("smart") || lowerQuery.includes("artificial intelligence") || lowerQuery.includes("generator")) {
      aiFilter = true;
    }

    if (lowerQuery.includes("mobile") || lowerQuery.includes("phone") || lowerQuery.includes("ios") || lowerQuery.includes("android")) {
      mobileFilter = true;
    }

    const categoryKeywords = {
      "video-editing": ["video", "edit", "editor", "reel", "youtube", "tiktok", "shorts", "splicing", "grading", "clip"],
      "graphic-design": ["graphic", "design", "vector", "logo", "ui", "ux", "wireframe", "photo", "image", "drawing", "sketch", "whiteboard", "canvas"],
      "coding": ["code", "program", "develop", "ide", "vscode", "sandbox", "interview", "algorithms", "dsa"],
      "productivity": ["notion", "notes", "database", "organize", "tasks", "wiki", "kanban", "slack"],
      "music-sfx": ["music", "sound", "sfx", "audio", "voice", "speech", "tts", "track", "podcast"],
      "ai-tools": ["ai", "chatbot", "image-generator", "eraser", "phind", "removebg"],
      "presentation-tools": ["presentation", "ppt", "slide", "pitch"],
      "resume-builders": ["resume", "cv", "job", "cover letter"],
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
      "interview-prep": ["interview", "prep", "leetcode"],
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
      filteredTools = filteredTools.filter(t => t.category.toLowerCase().includes(cleanCat) || t.category.toLowerCase() === categoryFilter);
    }

    if (freeOnlyFilter) {
      filteredTools = filteredTools.filter(t => t.pricing === "Free" || t.pricing === "Freemium");
    }

    if (difficultyFilter) {
      filteredTools = filteredTools.filter(t => t.difficulty.toLowerCase() === difficultyFilter);
    }

    if (aiFilter) {
      filteredTools = filteredTools.filter(t => t.isAi === true);
    }

    if (mobileFilter) {
      filteredTools = filteredTools.filter(t => t.isMobile === true);
    }

    if (detectedTags.length > 0) {
      filteredTools = filteredTools.filter(t => t.tags.some(tag => detectedTags.includes(tag)));
    }

    if (filteredTools.length === 0 && (categoryFilter || detectedTags.length > 0 || freeOnlyFilter || difficultyFilter || aiFilter || mobileFilter)) {
      filteredTools = allTools.filter(t => {
        let score = 0;
        if (categoryFilter && t.category.toLowerCase().replace("-", " ").includes(categoryFilter.replace("-", " "))) score += 5;
        if (freeOnlyFilter && (t.pricing === "Free" || t.pricing === "Freemium")) score += 3;
        if (difficultyFilter && t.difficulty.toLowerCase() === difficultyFilter) score += 2;
        if (aiFilter && t.isAi) score += 3;
        if (mobileFilter && t.isMobile) score += 2;
        if (t.tags.some(tag => detectedTags.includes(tag))) score += 4;
        if (t.name.toLowerCase().includes(lowerQuery) || t.description.toLowerCase().includes(lowerQuery)) score += 6;
        t.searchScore = score;
        return score > 0;
      });
      filteredTools.sort((a, b) => b.searchScore - a.searchScore);
    } else if (filteredTools.length === allTools.length) {
      filteredTools = allTools.filter(t => {
        let score = 0;
        if (t.name.toLowerCase().includes(lowerQuery)) score += 10;
        if (t.description.toLowerCase().includes(lowerQuery)) score += 5;
        if (t.category.toLowerCase().includes(lowerQuery)) score += 4;
        if (t.tags.some(tag => lowerQuery.includes(tag))) score += 3;
        t.searchScore = score;
        return score > 0;
      });
      filteredTools.sort((a, b) => b.searchScore - a.searchScore);
    }

    let filteredWorkflows = allWorkflows;
    if (categoryFilter || detectedTags.length > 0) {
      filteredWorkflows = allWorkflows.filter(w => {
        return w.steps.some(step => {
          const stepTool = allTools.find(t => t.id === step.toolId);
          if (!stepTool) return false;
          const matchCategory = categoryFilter && stepTool.category.toLowerCase().replace("-", " ").includes(categoryFilter.replace("-", " "));
          const matchTag = stepTool.tags.some(tag => detectedTags.includes(tag));
          return matchCategory || matchTag;
        }) || w.name.toLowerCase().includes(lowerQuery) || w.description.toLowerCase().includes(lowerQuery);
      });
    } else {
      filteredWorkflows = allWorkflows.filter(w => {
        return w.name.toLowerCase().includes(lowerQuery) || w.description.toLowerCase().includes(lowerQuery);
      });
    }

    res.json({
      parsedCriteria: {
        category: categoryFilter,
        freeOnly: freeOnlyFilter,
        difficulty: difficultyFilter,
        isAi: aiFilter,
        isMobile: mobileFilter,
        tags: detectedTags
      },
      tools: filteredTools.slice(0, 12),
      workflows: filteredWorkflows.slice(0, 4)
    });
  } catch (error) {
    res.status(500).json({ error: "Search query intelligence failure" });
  }
});

const getCategoryByProfile = (profile) => {
  switch (profile) {
    case "student": return "productivity";
    case "creator": return "video editing";
    case "developer": return "coding";
    case "designer": return "graphic design";
    case "entrepreneur": return "productivity";
    default: return "";
  }
};

app.listen(PORT, () => {
  console.log(`Findora backend active on port ${PORT}`);
});
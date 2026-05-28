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
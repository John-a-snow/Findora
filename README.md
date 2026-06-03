

<p align="center">
  <img src="frontend/public/favicon.svg" alt="Findora Logo" width="120" height="120" />
</p>
Findora is a smart workflow and tool discovery engine I built to help creators, students, developers, designers, and entrepreneurs find the best websites, software, and interconnected productivity pipelines. "I built this with a modern dark theme, helpful career filters, a side-by-side spec comparison table, and a smart search bar that understands natural search terms.

## Features
* **Intelligent Search Bar:**
  * **Natural Language Matching:** You can type queries naturally (like *"best free tools for editing reels"*) instead of typing exact keywords. Under the hood, the server parses the query, scores matching entries, and ranks tools based on price, difficulty, AI tags, and platforms.
  * **Smart Synonym Tags:** The search automatically detects related categories and tags (like templates, UI-UX, podcasts, and digital whiteboards) to show relevant results.
* **Side-by-Side Tool Comparison:**
  * **Interactive Spec Grid:** You can select up to 3 tools to compare side-by-side. It builds a comparison table detailing pricing models, operating systems, main advantages, and difficulty levels.
* **Curated Productivity Pipelines:**
  * **Step-by-Step Workflows:** I built sequential tool roadmaps (like the *YouTube Content Factory* or *Next-Gen Software Builder*) to show you exactly how multiple apps can connect to complete a task.
* **User Accounts & Bookmarks Sync:**
  * **Account Profiles:** You can register a personal profile and log in. Once logged in, your bookmarked tools and workflows sync with a local backend database so you don't lose your favorites.
* **Sleek Light & Dark Themes:**
  * **Instant Theme Toggle:** I used custom CSS variables to create a smooth Day/Night switch. It dynamically transitions all layout cards, inputs, and borders between a clean light mode and a glassmorphic dark theme.

## Technologies Used
* **Frontend:** React (v19), Vite, Tailwind CSS (v4), Framer Motion, Lucide Icons
* **Backend:** Node.js, Express, CORS
* **Database:** Local JSON File Schemas


## Local Setup and Installation
Follow these steps to get the application running on your local machine.
### 1. Prerequisites
* Node.js (v18.0.0 or higher)
* npm (Node package manager)
### 2. Clone the Repository
Clone this repository to your local machine using Git:
```bash
git clone https://github.com/takshnegi/Findora.git
cd Findora
```

### 3. Run the Backend API Server
Navigate to the backend directory, install the server dependencies, and start the listener:
```bash
cd backend
npm install
npm start
```
The Express server will start up and listen on `http://localhost:5000`.
### 4. Run the Frontend Development Server
Open a second terminal window, navigate to the frontend directory, install the packages, and launch the dev builder:
```bash
cd frontend
npm install
npm run dev
```
Now, open your web browser and navigate to the local address:
```text
http://localhost:5173/
```
You should see the Findora application running!

## Author

- Email: [arushv115@gmail.com](mailto:arushv115@gmail.com)

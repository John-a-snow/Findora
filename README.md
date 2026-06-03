
<p align="center">
  <img src="frontend/public/favicon.svg" alt="Findora Logo" width="120" height="120" />
</p>
Findora is a smart workflow and tool discovery engine I built to help creators, students, developers, designers, and entrepreneurs find the best websites, software, and interconnected productivity pipelines. You can also sign up for an account to save your bookmarked tools and pipelines directly to a database, and switch between light and dark mode instantly.

## Live Link
- Live link is [here](https://findora-u3ag.onrender.com/).

## Demo video
- Demo link [here](https://drive.google.com/file/d/1E7G578Z4Fm6KtFhWQtjV7fefnDOoPqqT/view?usp=drive_link)

* **Smart Search:**
  * **Search with sentences:** You can type normal search questions (like *"free tools to edit reels"*) instead of guessing exact keywords. The backend automatically ranks and finds the best tools for you.
  * **Auto tag matching:** The search automatically finds related tags like templates, UI design, podcasts, and whiteboards.
* **Tool Comparison:**
  * **Side-by-side comparison:** You can choose up to 3 tools to compare side-by-side. The site builds a simple table showing their prices, supported systems, and main strengths.
* **Prebuilt Workflows:**
  * **Step-by-step setups:** I created ready-to-use guides showing how to connect different tools together (like a setup for a YouTube Creator or a Software Developer) to get things done faster.
* **Accounts & Bookmarks:**
  * **Save to your profile:** You can register a username and log in. Once signed in, all your bookmarked tools and workflows are saved to a database so they do not disappear when you refresh or switch computers.
* **Light & Dark Mode:**
* **Instant theme switch:** You can switch between a clean light mode and dark theme instantly.

## Technologies Used
* **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Lucide Icons
* **Backend:** Node.js, Express,
* **Database:** Local JSON File Schemas


## Local Setup and its Installation
Follow these steps to get the project run on your local machine.
### 1. Prerequisites
* Node.js 
* npm 
### 2. Clone the Repository
Clone this repository to your local machine using Git:
```bash
git clone https://github.com/takshnegi/Findora.git
cd Findora
```

### 3. Run the Backend API Server
Go to the backend directory, install the server dependencies, and start the listener:
```bash
cd backend
npm install
npm start
```
The Express server will start up and listen on `http://localhost:5000`.
### 4. Run the Frontend Development Server
Open a second terminal window, go to the frontend directory, install the packages, and launch the builder:
```bash
cd frontend
npm install
npm run dev
```
Now, open your web browser and launch to the local address:
```text
http://localhost:5173/
```
You should see the Findora application running!

## Author

- Email: [arushv115@gmail.com](mailto:arushv115@gmail.com)

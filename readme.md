# CV2Job - AI-Powered Resume Analyzer & Job Matcher 🚀

**CV2Job** is an intelligent web application designed to bridge the gap between job seekers and their dream roles. By leveraging advanced Generative AI and real-time job data, it analyzes resumes, provides personalized role recommendations, and instantly fetches relevant job listings from top platforms.

---

## 🌟 Key Features

*   **Smart Resume Analysis**: Upload your resume (PDF), and our Llama-3 powered AI parses skills, experience, and professional summaries with high accuracy.
*   **Role Recommendations**: Get AI-generated suggestions for the **Top 5 Job Roles** that best match your profile, complete with match compatibility scores.
*   **Real-Time Job Search**: Integrated **JSearch API** aggregates live job listings from LinkedIn, Naukri, Indeed, Glassdoor, and more.
*   **Direct Application**: One-click "Apply" buttons take you directly to the job posting.
*   **User Dashboard**: Secure login/signup system with persisting user profiles.
*   **Interactive UI**: A modern, dark-themed responsive interface with drag-and-drop file uploads and smooth animations.

---

## 🛠️ Tech Stack

### Frontend
*   **React.js**: Core framework for building a dynamic and responsive UI.
*   **CSS3**: Custom styling with glassmorphism effects and animations.
*   **Vite**: Fast build tool and development server.

### Backend
*   **Node.js & Express**: API orchestration and server-side logic.
*   **Multer**: Handling file uploads and buffer processing.
*   **Groq SDK**: Interface for running the Llama 3.3 70B AI model.
*   **Axios**: Making HTTP requests to external job search APIs.

---

## 👥 Contributors & Work Distribution

This project was made by **Ujjwal** and **Himanshu**. The development was divided equally between both contributors, demonstrating expertise in both Frontend and Backend technologies.

### **[Ujjwal](https://github.com/usy8189)**
**Frontend:**
*   Implemented the **Home Interface** and responsive Hero section.
*   Developed the **Drag & Drop Modal** for intuitive resume uploads.

**Backend:**
*   Setup **core server architecture** and API routing.
*   Implemented file storage and handling logic for uploaded CVs.

### **[Himanshu (Dexter)](https://github.com/Dexter-2005)**
**Frontend:**
*   Developed the **Authentication UI** (Login/Logout modes) and User Dashboard.
*   Integrated **real-time status updates** and notifications for the user.

**Backend:**
*   Implemented **Authentication Logic** using JWT/Sessions.
*   Developed the **Resume Parsing Algorithm** and database integration logic.

---

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/usy8189/CV2job_.git
    cd CV2job_
    ```

2.  **Install dependencies:**
    ```bash
    # Install root dependencies
    npm install

    # Install server dependencies
    cd server
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the `server/` directory:
    ```env
    GROQ_API_KEY=your_groq_api_key
    RAPIDAPI_KEY=your_rapidapi_key
    ```

4.  **Run the application:**
    ```bash
    # Start Backend (from server/ directory)
    node server.js

    # Start Frontend (from root directory in a new terminal)
    npm run dev
    ```

5.  **Open in Browser:**
    Navigate to `http://localhost:5173` to start using CV2Job!

---

© 2026 CV2Job. Made with ❤️ by Himanshu & Ujjwal.
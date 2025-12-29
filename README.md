# WebSpark-AI

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![AI Powered](https://img.shields.io/badge/AI-Powered-ff69b4)

> **Build websites at the speed of thought.**
> *WebSpark-AI is an open-source AI-powered website generator that turns your text prompts into fully functional, modern web applications in seconds.*

---

## Overview

**WebSpark-AI** is a next-generation development tool inspired by **Bolt.new** and **v0.dev**. It bridges the gap between idea and reality by allowing users to describe their dream website in plain English and watching it come to life instantly.

Whether you are a developer looking to scaffold UI quickly or a non-coder wanting to build a landing page, WebSpark-AI handles the heavy lifting—writing the code, styling the components, and setting up the structure.

## Key Features

-   ** Text-to-UI Generation**: Just describe it. "A modern landing page for a coffee shop with a dark theme." WebSpark-AI generates the React components and Tailwind CSS automatically.
-   ** Real-Time Preview**: Watch your code render instantly as the AI writes it. No more context switching.
-   ** Full-Stack Capabilities**: Generates both the frontend (React/Vite) and backend scaffolds (Node.js) needed to run your app.
-   ** Intelligent Context**: Powered by advanced LLMs to understand design patterns, responsiveness, and modern web standards.
-   ** Sandbox Environment**: Securely runs generated code in a browser-based environment.

## Tech Stack

**Frontend:**
-   **Framework**: React (Vite)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React

**Backend:**
-   **Runtime**: Node.js
-   **AI Integration**: LLM API Handling (OpenAI/Anthropic)

## Getting Started

### Prerequisites
-   Node.js (v18+)
-   npm or yarn
-   An API Key (Anthropic)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/wakeupguruu/WebSpark-AI.git](https://github.com/wakeupguruu/WebSpark-AI.git)
    cd WebSpark-AI
    ```

2.  **Install Dependencies**
    ```bash
    # Install frontend dependencies
    cd frontend
    npm install

    # Install backend dependencies
    cd ../backend
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `backend` directory:
    ```env
    AI_API_KEY=your_api_key_here
    PORT=3000
    ```

4.  **Run the App**
    ```bash
    # Start the backend
    cd backend
    npm start

    # Start the frontend (in a new terminal)
    cd frontend
    npm run dev
    ```

5.  **Ignite the Spark**
    Open `http://localhost:5173` in your browser and start building!

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## Author

**Guru Vyas (wakeupguruu)**
-   GitHub: [@wakeupguruu](https://github.com/wakeupguruu)

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

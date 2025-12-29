import { useState } from 'react';
import { FileViewer } from './components/FileViewer';
import { Sidebar } from './components/Sidebar';
import { Preview } from './components/Preview';
import { ChatInterface } from './components/ChatInterface';
import { Play, Menu } from 'lucide-react';

// Mock files for demonstration
const INITIAL_FILES = [
    {
        name: 'App.tsx',
        content: `import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;`
    },
    {
        name: 'main.tsx',
        content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
    },
    {
        name: 'index.css',
        content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}
`
    },
    {
        name: 'package.json',
        content: `{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`
    }
];

function App() {
    const [selectedFile, setSelectedFile] = useState(INITIAL_FILES[0]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="h-screen w-screen bg-gray-950 text-white flex flex-col overflow-hidden">
            {/* Minimal Header */}
            <header className="h-12 border-b border-gray-800 bg-gray-950 flex items-center justify-between px-4 shrink-0 z-50">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1.5 hover:bg-gray-800 rounded-md text-gray-400 hover:text-white transition-colors"
                    >
                        <Menu size={18} />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">W</div>
                        <span className="font-semibold tracking-tight text-sm text-gray-200">WebSpark AI</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-medium transition-colors shadow-lg shadow-indigo-500/20">
                        <Play size={12} fill="currentColor" />
                        <span>Run</span>
                    </button>
                </div>
            </header>

            {/* Main 3-Pane Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* 1. Left Sidebar: Chat & Files */}
                <div className={`flex transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-0'} bg-gray-950 border-r border-gray-800 overflow-hidden`}>
                    {/* 
                   Ideally, we would toggle between File Tree and Chat here, 
                   or have them stacked. For now, let's keep Chat as the main focus 
                   as requested ("Where I can write the prompt"), and maybe put the 
                   Files in a collapsible section or just separate?
                   
                   Let's put Chat on top/main and Files in a hidden mode for now 
                   to prioritize the request. Or better yet, a true 3-col layout 
                   with Chat as the 1st col, Files as a drawer or part of 2nd col?
                   
                   Based on "similar to Bolt.new", the Chat is often a dedicated sidebar.
                */}
                    <ChatInterface />
                </div>

                {/* 2. Middle Pane: Editor + (Optional) File Explorer Sidebar */}
                {/* We'll put the file explorer in a narrow strip or integrated here so it's not totally lost */}
                <div className="flex-1 flex flex-col min-w-0 bg-gray-900 relative">
                    <div className="flex flex-1 overflow-hidden">
                        {/* File Tree (Narrow) */}
                        <div className="w-56 border-r border-gray-800 hidden md:block">
                            <Sidebar
                                files={INITIAL_FILES}
                                onSelectFile={setSelectedFile}
                            />
                        </div>

                        {/* Monaco Editor */}
                        <div className="flex-1 flex flex-col min-w-0">
                            <FileViewer file={selectedFile} />
                        </div>
                    </div>
                </div>

                {/* 3. Right Pane: Preview */}
                <div className="w-[45%] min-w-[320px] bg-gray-950 border-l border-gray-800">
                    <Preview />
                </div>
            </div>
        </div>
    );
}

export default App;

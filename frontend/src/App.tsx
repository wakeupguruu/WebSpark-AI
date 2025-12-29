import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { Play, Menu } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { Workspace } from './components/Workspace';

// Mock files for demonstration
const INITIAL_FILES = [
    {
        name: 'App.tsx',
        content: `import { useState } from 'react';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Review WebSpark AI design', completed: true },
    { id: 2, text: 'Implement visual overhaul', completed: true },
    { id: 3, text: 'Add AI Chat Interface', completed: false },
  ]);
  const [input, setInput] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Tasks
        </h1>
        
        <form onSubmit={addTodo} className="mb-6 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 p-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-colors"
          >
            <Plus size={20} />
          </button>
        </form>

        <div className="space-y-3">
          {todos.map(todo => (
            <div 
              key={todo.id}
              className="flex items-center gap-3 bg-gray-900/50 border border-gray-800 p-3 rounded-xl group hover:border-gray-700 transition-all"
            >
              <button 
                onClick={() => toggleTodo(todo.id)}
                className={\`flex-shrink-0 \${todo.completed ? 'text-emerald-500' : 'text-gray-600 hover:text-gray-400'}\`}
              >
                {todo.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
              </button>
              
              <span className={\`flex-1 \${todo.completed ? 'text-gray-500 line-through' : 'text-gray-200'}\`}>
                {todo.text}
              </span>
              
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
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

body {
  background-color: #030712; /* gray-950 */
  color: white;
}
`
    },
    {
        name: 'package.json',
        content: `{
  "name": "react-todo-demo",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.344.0"
  }
}`
    }
];

// ... (keep Mock files) ...

function App() {
    const [files, setFiles] = useState(INITIAL_FILES);
    const [selectedFile, setSelectedFile] = useState(INITIAL_FILES[0]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Builder State
    const [isBuilderActive, setIsBuilderActive] = useState(false);
    const [initialPrompt, setInitialPrompt] = useState('');

    const startBuild = (prompt: string, templateData?: { prompts: string[]; uiPrompts: string[] }) => {
        setInitialPrompt(prompt);
        setIsBuilderActive(true);
        // templateData can be used in the future if needed for initial project setup
    };

    if (!isBuilderActive) {
        return <LandingPage onStart={startBuild} />;
    }

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

            {/* Main Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* 1. Left Sidebar: Chat */}
                <div className={`flex transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-0'} bg-gray-950 border-r border-gray-800 overflow-hidden`}>
                    <ChatInterface
                        files={files}
                        setFiles={setFiles}
                        initialPrompt={initialPrompt}
                    />
                </div>

                {/* 2. Main Workspace (Tabs: Code | Preview) */}
                <div className="flex-1 flex flex-col min-w-0 bg-gray-900 relative">
                    {/* We can temporarily hide the Sidebar for this minimalist Plan->Builder view, or keep it depending on preference. 
                         For now, let's keep it simple as requested: "editor and real terminal and preview".
                         If we really want "code and preview at one place", the Workspace component handles that via tabs.
                         The FileExplorer/Sidebar can be another tab or a collapsible panel. 
                         Let's keep the legacy Sidebar for file navigation if needed, or hide it to maximize space. 
                         Given "preview and code should be at one place only", I'll infer the layout is:
                         [Chat] | [Workspace (Tabs: Code, Preview)]
                     */}
                    <div className="flex flex-1 overflow-hidden">
                        {/* 
                           Optional: Keep Sidebar? 
                           The user said "sidebar where you can see editor and real terminal and preview". 
                           Wait, user said "show them the builder page where you an see the editor and real terminal and preview".
                           And "preview and code should be at one place only and you can switch between them".
                           So Workspace handles the switch. 
                           I will HIDE the old file sidebar for now to be cleaner, 
                           OR keep it as a very narrow strip if file switching is needed.
                           Let's keep it but make it collapsible/small.
                        */}
                        <div className="w-56 border-r border-gray-800 hidden md:block">
                            <Sidebar
                                files={files}
                                onSelectFile={setSelectedFile}
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <Workspace
                                files={files}
                                selectedFile={files.find(f => f.name === selectedFile.name) || files[0]}
                                onSelectFile={setSelectedFile}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

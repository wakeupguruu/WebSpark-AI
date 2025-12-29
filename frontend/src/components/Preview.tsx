import { RefreshCw, Globe, ExternalLink } from 'lucide-react';
import React, { useState } from 'react';

// Todo App Logic for Preview (Simulated to match the code in Editor)
// We are re-implementing the Todo logic here so it actually runs inside the 'iframe' (or div in this case for smoother interaction)
// In a real WebContainer, this would run the actual code. Here we mock "Running".

const PreviewContent = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Review WebSpark AI design', completed: true },
        { id: 2, text: 'Implement visual overhaul', completed: true },
        { id: 3, text: 'Add AI Chat Interface', completed: true },
    ]);
    const [input, setInput] = useState('');

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
        setInput('');
    };

    return (
        <div className="w-full h-full bg-gray-950 font-sans text-gray-100 p-6 overflow-y-auto">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Tasks
                </h1>

                <form onSubmit={addTodo} className="mb-6 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add a new task..."
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:border-indigo-500 transition-colors placeholder-gray-600"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 p-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    </button>
                </form>

                <div className="space-y-3">
                    {todos.map(todo => (
                        <div
                            key={todo.id}
                            className="flex items-center gap-3 bg-gray-900/50 border border-gray-800 p-3 rounded-xl group hover:border-gray-700 transition-all"
                        >
                            <button
                                onClick={() => setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))}
                                className={`flex-shrink-0 ${todo.completed ? 'text-emerald-500' : 'text-gray-600 hover:text-gray-400'}`}
                            >
                                {todo.completed ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>
                                }
                            </button>

                            <span className={`flex-1 ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                                {todo.text}
                            </span>

                            <button
                                onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}
                                className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    )
}

export function Preview() {
    return (
        <div className="h-full flex flex-col bg-gray-950 border-l border-gray-800">
            {/* Mock Browser Header */}
            <div className="bg-gray-900 p-2 border-b border-gray-800 flex items-center gap-3">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
                </div>

                <div className="flex-1 bg-gray-950 rounded-md py-1 px-3 flex items-center gap-2 text-xs text-gray-400 border border-gray-800">
                    <Globe size={12} className="text-gray-500" />
                    <span>localhost:3000</span>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors">
                        <RefreshCw size={14} />
                    </button>
                    <button className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors">
                        <ExternalLink size={14} />
                    </button>
                </div>
            </div>

            {/* Preview Content Area */}
            <div className="flex-1 bg-gray-950 relative overflow-hidden">
                {/* We render the component directly instead of iframe for this demo to support interaction without complex message passing */}
                <PreviewContent />
            </div>

            {/* Terminal Toggle (Mock) */}
            <div className="h-32 bg-gray-900 border-t border-gray-800 p-2 font-mono text-xs overflow-hidden">
                <div className="flex items-center justify-between mb-2 text-gray-500 px-2">
                    <span className="font-bold text-gray-300">TERMINAL</span>
                    <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded border border-gray-700">Node v18.17.0</span>
                </div>
                <div className="space-y-1 px-2 text-gray-300">
                    <div className="flex gap-2">
                        <span className="text-green-500">➜</span>
                        <span className="text-blue-400">~</span>
                        <span>npm install</span>
                    </div>
                    <div className="text-gray-500">added 142 packages in 3s</div>
                    <div className="flex gap-2">
                        <span className="text-green-500">➜</span>
                        <span className="text-blue-400">~</span>
                        <span>npm run dev</span>
                    </div>
                    <div className="text-green-400">  VITE v5.4.2  ready in 245 ms</div>
                    <div></div>
                    <div className="flex gap-2 animate-pulse">
                        <span className="text-green-500">➜</span>
                        <span className="text-blue-400">~</span>
                        <span className="w-2 h-4 bg-gray-500 inline-block align-middle"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

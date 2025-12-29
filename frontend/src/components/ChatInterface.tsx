import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Paperclip, X } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm WebSpark AI. How can I help you improve your application today?",
            timestamp: Date.now()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        // Mock AI response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm processing your request. In a real application, this would trigger an AI agent to modify your code.",
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsLoading(false);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-950 border-r border-gray-800">
            {/* Header */}
            <div className="p-3 border-b border-gray-800 flex items-center justify-between bg-gray-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-2 text-gray-200">
                    <Sparkles size={16} className="text-indigo-400" />
                    <span className="font-semibold text-sm tracking-wide">AI Assistant</span>
                </div>
                <button className="text-gray-500 hover:text-gray-300 transition-colors">
                    <X size={14} />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>

                        {/* Avatar */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1
              ${msg.role === 'assistant' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-gray-800 text-gray-400'}`}>
                            {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                        </div>

                        {/* Bubble */}
                        <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`px-3 py-2.5 rounded-2xl text-sm leading-relaxed
                ${msg.role === 'user'
                                    ? 'bg-indigo-600 text-white rounded-tr-sm'
                                    : 'bg-gray-900 border border-gray-800 text-gray-300 rounded-tl-sm'}`}>
                                {msg.content}
                            </div>
                            <span className="text-[10px] text-gray-600 mt-1 px-1">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                            <Bot size={14} />
                        </div>
                        <div className="bg-gray-900 border border-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gray-950 border-t border-gray-800">
                <div className="relative bg-gray-900 border border-gray-800 rounded-xl focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20 transition-all shadow-lg shadow-black/20">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask AI to change code..."
                        className="w-full bg-transparent text-sm text-gray-200 placeholder-gray-500 px-4 py-3 min-h-[50px] max-h-[200px] outline-none resize-none"
                        rows={1}
                    />

                    <div className="flex items-center justify-between px-2 pb-2">
                        <button className="p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                            <Paperclip size={16} />
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-lg transition-all shadow-lg shadow-indigo-900/20">
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

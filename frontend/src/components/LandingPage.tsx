import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { postTemplate, ApiError } from '../api';

interface LandingPageProps {
    onStart: (prompt: string, templateData?: { prompts: string[]; uiPrompts: string[] }) => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const templateData = await postTemplate(prompt);
            setIsLoading(false);
            onStart(prompt, templateData);
        } catch (err) {
            setIsLoading(false);
            const apiError = err as ApiError;
            setError(apiError.message || 'Failed to initialize project. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 text-gray-100 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-2xl z-10 flex flex-col items-center text-center space-y-8">

                {/* Header */}
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-400 mb-4">
                        <Sparkles size={14} className="text-amber-400" />
                        <span>AI-Powered Full Stack Builder</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent pb-2">
                        What do you want to build?
                    </h1>
                    <p className="text-lg text-gray-400 max-w-lg mx-auto">
                        Describe your dream web app, and we'll generate the code, file structure, and live preview instantly.
                    </p>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="w-full relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                    <div className="relative bg-gray-900 rounded-xl p-2 flex flex-col md:flex-row gap-2 border border-gray-800">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    if (prompt.trim() && !isLoading) handleSubmit(e);
                                }
                            }}
                            placeholder="e.g., A personal portfolio with a dark theme and masonry gallery..."
                            className="w-full bg-transparent text-lg p-4 outline-none text-gray-200 placeholder-gray-600 resize-none h-32 md:h-16 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
                        />
                        <button
                            type="submit"
                            disabled={!prompt.trim() || isLoading}
                            className="md:self-center shrink-0 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Building...</span>
                                </>
                            ) : (
                                <>
                                    <span>Build</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </div>
                    {error && (
                        <div className="mt-3 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}
                </form>

                {/* Templates / suggestions */}
                <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
                    <span className="text-gray-600">Try:</span>
                    <button onClick={() => setPrompt("A modern todo app with dark mode")} className="hover:text-indigo-400 transition-colors">Todo App</button>
                    <span className="text-gray-700">•</span>
                    <button onClick={() => setPrompt("A landing page for a SaaS startup")} className="hover:text-indigo-400 transition-colors">SaaS Landing</button>
                    <span className="text-gray-700">•</span>
                    <button onClick={() => setPrompt("A minimal blog with markdown support")} className="hover:text-indigo-400 transition-colors">Blog</button>
                </div>

            </div>
        </div>
    );
}

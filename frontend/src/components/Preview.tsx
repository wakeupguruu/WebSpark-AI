import { RefreshCw, Globe, ExternalLink } from 'lucide-react';

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
            <div className="flex-1 bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-sm text-gray-500 font-medium">Starting Dev Server...</p>
                    </div>
                </div>
                <iframe
                    className="w-full h-full border-none relative z-10"
                    title="Preview"
                    srcDoc="<!DOCTYPE html><html><body style='margin:0; font-family: sans-serif; padding: 20px; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f8fafc;'><h1 style='color: #0f172a;'>WebContainer Preview</h1></body></html>"
                />
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

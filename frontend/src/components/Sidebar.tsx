import React from 'react';
import { Folder, FileCode, FileJson, FileType, ChevronRight, ChevronDown } from 'lucide-react';

interface SidebarProps {
    files: { name: string; content: string }[];
    onSelectFile: (file: { name: string; content: string }) => void;
}

const FileIcon = ({ name }: { name: string }) => {
    if (name.endsWith('.tsx') || name.endsWith('.ts')) return <FileCode size={16} className="text-blue-400" />;
    if (name.endsWith('.css')) return <FileType size={16} className="text-sky-300" />;
    if (name.endsWith('.json')) return <FileJson size={16} className="text-yellow-400" />;
    return <FileType size={16} className="text-gray-400" />;
};

export function Sidebar({ files, onSelectFile }: SidebarProps) {
    return (
        <div className="h-full w-64 bg-gray-950 border-r border-gray-800 flex flex-col font-sans">
            <div className="p-3 border-b border-gray-800 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                <span className="ml-2 text-xs text-gray-500 font-medium tracking-wider">PROJECT</span>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
                <div className="px-2">
                    <div className="flex items-center gap-1.5 py-1 px-2 text-gray-400 hover:text-gray-100 hover:bg-gray-800/50 rounded cursor-pointer transition-colors group">
                        <ChevronDown size={14} />
                        <Folder size={16} className="text-indigo-400 group-hover:text-indigo-300" />
                        <span className="text-sm">src</span>
                    </div>

                    <div className="pl-6">
                        {files.map((file) => (
                            <div
                                key={file.name}
                                onClick={() => onSelectFile(file)}
                                className="flex items-center gap-1.5 py-1 px-2 text-gray-400 hover:text-gray-100 hover:bg-gray-800/50 rounded cursor-pointer transition-colors"
                            >
                                <FileIcon name={file.name} />
                                <span className="text-sm">{file.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

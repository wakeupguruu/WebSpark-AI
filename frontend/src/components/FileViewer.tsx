import React from 'react';

interface FileViewerProps {
    file: { name: string; content: string } | null;
}

export function FileViewer({ file }: FileViewerProps) {
    if (!file) return <div className="p-4 text-gray-400">Select a file to view</div>;
    return (
        <div className="h-full flex flex-col">
            <div className="bg-gray-800 p-2 text-sm text-gray-300 border-b border-gray-700">
                {file.name}
            </div>
            <pre className="flex-1 p-4 overflow-auto text-sm text-gray-100 font-mono">
                {file.content}
            </pre>
        </div>
    );
}

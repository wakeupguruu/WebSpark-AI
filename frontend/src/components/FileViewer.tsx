import React from 'react';
import Editor from '@monaco-editor/react';

interface FileViewerProps {
    file: { name: string; content: string } | null;
}

export function FileViewer({ file }: FileViewerProps) {
    if (!file) {
        return (
            <div className="h-full flex items-center justify-center text-gray-500 bg-gray-900">
                <div className="text-center">
                    <p className="mb-2">Select a file to view its content</p>
                    <span className="text-xs px-2 py-1 bg-gray-800 rounded border border-gray-700">⌘ + P to search</span>
                </div>
            </div>
        );
    };

    // Simple language detection based on extension
    const getLanguage = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'tsx':
            case 'ts':
                return 'typescript';
            case 'jsx':
            case 'js':
                return 'javascript';
            case 'css':
                return 'css';
            case 'html':
                return 'html';
            case 'json':
                return 'json';
            default:
                return 'plaintext';
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-900">
            <div className="bg-gray-950 p-2 text-sm text-gray-400 border-b border-gray-800 flex justify-between items-center">
                <span className="px-3 py-1 bg-gray-800 rounded-t-md text-gray-200 border-t border-x border-gray-700">{file.name}</span>
                <span className="text-xs text-gray-600 pr-2">Read Only</span>
            </div>
            <div className="flex-1 overflow-hidden pt-2">
                <Editor
                    height="100%"
                    language={getLanguage(file.name)}
                    value={file.content}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: 'JetBrains Mono',
                        lineHeight: 24,
                        scrollBeyondLastLine: false,
                        padding: { top: 16, bottom: 16 },
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        cursorSmoothCaretAnimation: "on",
                        renderLineHighlight: "all",
                    }}
                />
            </div>
        </div>
    );
}

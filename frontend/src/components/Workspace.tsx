import { useState } from 'react';
import { Eye, Code2 } from 'lucide-react';
import { FileViewer } from './FileViewer';
import { Preview } from './Preview';

interface WorkspaceProps {
    files: any[];
    selectedFile: any;
    onSelectFile: (file: any) => void;
}

export function Workspace({ files, selectedFile }: WorkspaceProps) {
    const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');

    return (
        <div className="h-full flex flex-col bg-gray-900">
            {/* Tabs Header */}
            <div className="flex items-center px-4 h-12 border-b border-gray-800 bg-gray-950 shrink-0">
                <div className="flex items-center p-1 bg-gray-900 rounded-lg border border-gray-800">
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'preview'
                                ? 'bg-gray-800 text-white shadow-sm'
                                : 'text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        <Eye size={16} />
                        <span>Preview</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'code'
                                ? 'bg-gray-800 text-white shadow-sm'
                                : 'text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        <Code2 size={16} />
                        <span>Code</span>
                    </button>
                </div>

                <div className="ml-auto text-xs text-gray-500">
                    {activeTab === 'preview' ? 'Live Interactive Preview' : 'Read-only Editor'}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">

                {/* Code Tab */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'code' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <FileViewer file={selectedFile} />
                </div>

                {/* Preview Tab */}
                <div className={`absolute inset-0 transition-opacity duration-300 bg-gray-950 ${activeTab === 'preview' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <Preview />
                </div>

            </div>
        </div>
    );
}

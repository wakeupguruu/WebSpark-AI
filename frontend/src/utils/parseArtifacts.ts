// Utility to parse boltArtifact XML from LLM response and extract file changes

export interface FileChange {
  filePath: string;
  content: string;
}

/**
 * Parses LLM response text to extract <boltArtifact> and <boltAction> tags
 * Returns array of file changes with filePath and content
 */
export function parseArtifacts(responseText: string): FileChange[] {
  const changes: FileChange[] = [];
  
  // Match <boltArtifact> blocks
  const artifactRegex = /<boltArtifact[^>]*>([\s\S]*?)<\/boltArtifact>/gi;
  const artifacts = responseText.match(artifactRegex);
  
  if (!artifacts) {
    return changes;
  }
  
  // For each artifact, find all <boltAction type="file"> blocks
  artifacts.forEach(artifact => {
    const actionRegex = /<boltAction\s+type="file"\s+filePath="([^"]+)"\s*>([\s\S]*?)<\/boltAction>/gi;
    let match;
    
    while ((match = actionRegex.exec(artifact)) !== null) {
      const filePath = match[1].trim();
      let content = match[2].trim();
      
      // Remove leading/trailing whitespace and normalize
      content = content.replace(/^\s+|\s+$/g, '');
      
      if (filePath && content) {
        changes.push({ filePath, content });
      }
    }
  });
  
  return changes;
}

/**
 * Applies file changes to the current files array
 * Updates existing files or creates new ones
 */
export function applyFileChanges(
  currentFiles: Array<{ name: string; content: string }>,
  changes: FileChange[]
): Array<{ name: string; content: string }> {
  const newFiles = [...currentFiles];
  
  changes.forEach(change => {
    // Extract filename from filePath (e.g., "src/App.tsx" -> "App.tsx")
    const fileName = change.filePath.split('/').pop() || change.filePath;
    
    // Find if file already exists
    const existingIndex = newFiles.findIndex(f => f.name === fileName);
    
    if (existingIndex >= 0) {
      // Update existing file
      newFiles[existingIndex] = {
        ...newFiles[existingIndex],
        content: change.content,
      };
    } else {
      // Create new file
      newFiles.push({
        name: fileName,
        content: change.content,
      });
    }
  });
  
  return newFiles;
}


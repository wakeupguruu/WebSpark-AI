import { useState, useEffect } from 'react';
import { WebContainer } from '@webcontainer/api';

export function useWebContainer() {
  const [webcontainerInstance, setWebcontainerInstance] = useState<WebContainer | null>(null);

  useEffect(() => {
    async function boot() {
      const instance = await WebContainer.boot();
      setWebcontainerInstance(instance);
    }
    if (!webcontainerInstance) boot();
  }, []);

  return webcontainerInstance;
}

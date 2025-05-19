import { v4 as uuidv4 } from 'uuid';

interface MemoryItem {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  tags?: string[];
}

/**
 * Stores an interaction in the assistant's memory and returns its id.
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function storeMemory(memory: Omit<MemoryItem, 'timestamp' | 'id'>): Promise<string> {
  const memorySigned = {
    ...memory,
    timestamp: Date.now(),
    id: uuidv4(),
  };

  // TODO:
  // 1. Store in IndexedDB
  // 2. Sync with a server when online
  // 3. Apply some forgetting mechanism for older memories (?)

  console.log('Storing memory:', memorySigned);

  const existingMemories = JSON.parse(localStorage.getItem('memories') || '[]') as MemoryItem[];

  const updatedMemories = [...existingMemories, memorySigned];
  localStorage.setItem('memories', JSON.stringify(updatedMemories));

  return memorySigned.id;
}

/**
 * Retrieves all memories, or memories that have any of the tags specified in the parameter.
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function retrieveMemories(tags?: string[]): Promise<MemoryItem[]> {
  const allMemories = JSON.parse(localStorage.getItem('memories') || '[]') as MemoryItem[];

  return !tags
    ? allMemories
    : allMemories.filter((memory) => {
        for (const tag of tags) {
          if (memory.tags?.indexOf(tag) !== -1) {
            return true;
          }
        }
        return false;
      });
}

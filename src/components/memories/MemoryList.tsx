import { MemoryBlock } from '@/lib/types';
import MemoryCard from './MemoryCard';

export interface MemoryListProps {
  memories: MemoryBlock[];
}

const MemoryList = ({ memories }: MemoryListProps) => {
  if (!memories || memories.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-muted-foreground">No memory blocks found</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {memories.map((memory) => (
        <MemoryCard key={memory.label} memory={memory} />
      ))}
    </div>
  );
};

export default MemoryList;

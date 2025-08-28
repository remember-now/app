import { MemoryBlock } from '@/lib/types';

export interface MemoryCardProps {
  memory: MemoryBlock;
}

const MemoryCard = ({ memory }: MemoryCardProps) => (
  <div className="border rounded-lg p-4 bg-card">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-semibold">{memory.label}</h3>
      {memory.readOnly && (
        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Read-only</span>
      )}
    </div>

    {memory.description && (
      <p className="text-sm text-muted-foreground mb-3">{memory.description}</p>
    )}

    <div className="text-sm bg-muted p-3 rounded font-mono whitespace-pre-wrap">
      {memory.value.trim() || 'No content'}
    </div>

    <div className="flex justify-between text-xs text-muted-foreground mt-2">
      <span>Limit: {memory.limit} chars</span>
    </div>
  </div>
);

export default MemoryCard;

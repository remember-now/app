import { ScrollArea } from '@/components/ui/scroll-area';
import { useMemories } from '@/hooks/use-memories';
import MemoryList from '@/components/memories/MemoryList';

const Memories = () => {
  const { data: memories, isLoading, error } = useMemories();

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <div className="text-muted-foreground">Loading memories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full justify-center items-center">
        <div className="text-red-500">Error loading memories: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[auto_1fr] h-full max-h-screen">
      {/* Header */}
      <div className="pt-15">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="text-2xl font-bold mb-4">Memory Blocks</h1>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-93 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-3xl mx-auto px-5">
            <MemoryList memories={memories || []} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Memories;

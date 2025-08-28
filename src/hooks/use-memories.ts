import { useQuery } from '@tanstack/react-query';
import { memoryService } from '@/services';
import { MemoryBlock } from '@/lib/types';

export const useMemories = () => {
  return useQuery<MemoryBlock[], Error>({
    queryKey: ['memories'],
    queryFn: async () => {
      const { request } = memoryService.listMemoryBlocks();
      return (await request).data;
    },
  });
};

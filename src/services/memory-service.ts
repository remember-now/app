import { MemoryBlock, CreateMemoryBlockRequest, UpdateMemoryBlockRequest } from '@/lib/types';
import createHttpService from './http-service';

class MemoryService {
  private httpService = createHttpService('/agent/blocks');

  listMemoryBlocks() {
    return this.httpService.getAll<MemoryBlock>();
  }

  getMemoryBlock(blockLabel: string) {
    return this.httpService.getById<MemoryBlock>(blockLabel);
  }

  createMemoryBlock(data: CreateMemoryBlockRequest) {
    return this.httpService.create<MemoryBlock>(data);
  }

  updateMemoryBlock(blockLabel: string, data: UpdateMemoryBlockRequest) {
    return this.httpService.put<MemoryBlock>(blockLabel, data);
  }

  deleteMemoryBlock(blockLabel: string) {
    return this.httpService.deleteById(blockLabel);
  }
}

export const memoryService = new MemoryService();

export interface MemoryBlock {
  label: string;
  value: string;
  description?: string;
  limit: number;
  readOnly: boolean;
}

export interface CreateMemoryBlockRequest {
  label: string;
  value?: string;
  description?: string;
  limit?: number;
  readOnly?: boolean;
}

export interface UpdateMemoryBlockRequest {
  value?: string;
  description?: string;
  limit?: number;
  readOnly?: boolean;
}

export interface GetMemoryBlockParams {
  blockLabel: string;
}

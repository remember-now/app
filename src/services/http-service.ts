import { apiClient } from '@/lib/http';
import { Entity } from './types';

class HttpService {
  constructor(private readonly endpoint: string) {}

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    const controller = new AbortController();
    const request = apiClient.delete(`${this.endpoint}/${id}`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  create<T>(entity: unknown) {
    const controller = new AbortController();
    const request = apiClient.post<T>(this.endpoint, entity, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  update<T extends Entity>(entity: T) {
    const controller = new AbortController();
    const request = apiClient.patch<T>(`${this.endpoint}/${entity.id}`, entity, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;

import { apiClient } from '@/lib/http';

class HttpService {
  constructor(private readonly endpoint: string) {}

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getById<T>(id: string | number) {
    const controller = new AbortController();
    const request = apiClient.get<T>(`${this.endpoint}/${id}`, {
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

  put<T>(id: string | number, entity: unknown) {
    const controller = new AbortController();
    const request = apiClient.put<T>(`${this.endpoint}/${id}`, entity, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  deleteById(id: string | number) {
    const controller = new AbortController();
    const request = apiClient.delete(`${this.endpoint}/${id}`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;

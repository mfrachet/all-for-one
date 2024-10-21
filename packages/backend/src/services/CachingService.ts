export class CachingService<T> {
  private cache: Record<string, T> = {};

  async get(key: string) {
    return this.cache[key];
  }

  async set(key: string, value: T) {
    this.cache[key] = value;
  }
}

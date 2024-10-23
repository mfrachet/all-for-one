export class CachingService {
  private cache: Record<string, any> = {};

  async get(key: string) {
    return this.cache[key];
  }

  async set(key: string, value: any) {
    this.cache[key] = value;
  }

  async getEntries(startWith?: string) {
    return Object.entries(this.cache)
      .filter(([key]) => key.startsWith(startWith || ""))
      .map(([key, value]) => ({
        key,
        value,
      }));
  }
}

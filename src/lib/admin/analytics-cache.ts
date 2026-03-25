interface CacheEntry<T> {
  data: T
  timestamp: number
}

const CACHE_TTL = 15 * 60 * 1000 // 15 minutes

const cache = (globalThis as any).__analyticsCache ||= new Map<string, CacheEntry<any>>()

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key)
    return null
  }
  return entry.data
}

export function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() })
}

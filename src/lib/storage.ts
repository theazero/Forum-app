export function createLocalStorage<T>(key: string) {
    return {
      get(): T | null {
        const raw = localStorage.getItem(key)
        return raw ? (JSON.parse(raw) as T) : null
      },
      set(value: T) { localStorage.setItem(key, JSON.stringify(value)) }
    }
  }
  
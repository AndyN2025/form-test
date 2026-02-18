export const storage = {
  get: <T>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key)
      if (!item) return fallback
      return JSON.parse(item)
    } catch (e) {
      console.error(`Storage read error: ${key}`, e)
      localStorage.removeItem(key)
      return fallback
    }
  },

  set: <T>(key: string, data: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error(`Storage write error: ${key}`, e)
    }
  },
}

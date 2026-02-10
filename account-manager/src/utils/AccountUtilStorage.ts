export const load = <T>(key: string): T | null => {
  const v = localStorage.getItem(key)
  return v ? JSON.parse(v) : null
}

export const save = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data))
}

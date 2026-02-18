import type { Label } from '@/types/accountType'

export function parseLabels(value: string): Label[] {
  return value
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}

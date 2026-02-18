import type { AccountType } from '@/constants/account'

export interface Label {
  text: string
}

export interface Account {
  id: string
  labels: Label[]
  type: AccountType
  login: string
  password: string | null
  isValid: boolean
}

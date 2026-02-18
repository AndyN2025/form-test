export const ACCOUNT_TYPES = {
  LDAP: 'LDAP',
  LOCAL: 'LOCAL',
} as const

export type AccountType =
  typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES]

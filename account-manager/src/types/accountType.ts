export type AccType = 'LDAP' | 'LOCAL'

export interface Label {
  text: string
}

export interface Acc {
  id: string
  labels: Label[]
  type: AccType | null
  login: string
  pass: string | null
  ok: boolean
}

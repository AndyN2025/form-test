export const BUTTON_TYPES = {
  PRIMARY: 'primary',
  DANGER: 'danger',
  DEFAULT: 'default',
} as const

export type ButtonType =
  typeof BUTTON_TYPES[keyof typeof BUTTON_TYPES]

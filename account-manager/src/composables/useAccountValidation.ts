import { computed, type Ref } from 'vue'
import type { Account } from '@/types/accountType'
import { ACCOUNT_TYPES } from '@/constants/account'

export function useAccountValidation(
  form: Account,
  labelsInput: Ref<string>
) {
  const labelsRegex = /^[\p{Script=Latin}\p{Script=Cyrillic}\s;]*$/u

  const isLabelsValid = computed(() => {
    if (!labelsInput.value.trim()) return true
    return labelsRegex.test(labelsInput.value)
  })

  const isValid = computed(() => {
    const loginOk = !!form.login
    const passOk =
      form.type === ACCOUNT_TYPES.LDAP ||
      !!form.password

    return loginOk && passOk && isLabelsValid.value
  })

  return {
    isValid,
    isLabelsValid,
  }
}

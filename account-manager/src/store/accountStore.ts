import { defineStore } from 'pinia'
import type { Account } from '@/types/accountType'
import { storage } from '@/utils/storage'
import { STORAGE_KEYS } from '@/constants/storage'
import { STORE_NAMES } from '@/constants/store'
import { ACCOUNT_TYPES } from '@/constants/account'

export const useAccountStore = defineStore(STORE_NAMES.ACCOUNT, {
  state: () => ({
    accounts: storage.get<Account[]>(STORAGE_KEYS.ACCOUNTS, []),
  }),

  getters: {
    list: (state) => state.accounts,
  },

  actions: {
    addAccount() {
      const newAccount: Account = {
        id: crypto?.randomUUID?.() ?? String(Date.now()),
        labels: [],
        type: ACCOUNT_TYPES.LOCAL,
        login: '',
        password: null,
        isValid: false,
      }

      this.accounts.push(newAccount)
      this.persist()
    },

    updateAccount(updated: Account) {
      const index = this.accounts.findIndex(
        (a) => a.id === updated.id
      )

      if (index === -1) return

      this.accounts[index] = {
        ...updated,
        isValid: this.validate(updated),
      }

      this.persist()
    },

    removeAccount(id: string) {
      this.accounts = this.accounts.filter(
        (a) => a.id !== id
      )
      this.persist()
    },

    validate(account: Account): boolean {
      const loginOk = !!account.login
      const passOk =
        account.type === ACCOUNT_TYPES.LDAP ||
        !!account.password

      return loginOk && passOk
    },

    persist() {
      storage.set(STORAGE_KEYS.ACCOUNTS, this.accounts)
    },
  },
})

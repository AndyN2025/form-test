import { defineStore } from 'pinia'
import type { Acc } from '@/types/accountType'
import { load, save } from '@/utils/AccountUtilStorage'

const KEY = 'accs'

export const useAccStore = defineStore('acc', {
  state: () => ({
    list: load<Acc[]>(KEY) ?? [],
  }),

  actions: {
    add: () => {
      const s = useAccStore()
      s.list.push({
        id: crypto.randomUUID(),
        labels: [],
        type: null,
        login: '',
        pass: null,
        ok: false,
      })
      save(KEY, s.list)
    },

    update: (acc: Acc) => {
      const s = useAccStore()
      const i = s.list.findIndex(v => v.id === acc.id)
      if (i !== -1) s.list[i] = acc
      save(KEY, s.list)
    },

    remove: (id: string) => {
      const s = useAccStore()
      s.list = s.list.filter(v => v.id !== id)
      save(KEY, s.list)
    },
  },
})

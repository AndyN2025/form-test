<template>
  <section class="content">
    <div class="content__top">
      <h2>Учетные записи</h2>
      <UiButton
        :type="BUTTON_TYPES.PRIMARY"
        :icon="Plus"
        @click="add"
      />
    </div>

    <Hint />
    <AccountList />
  </section>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/store/accountStore'
import UiButton from '@/components/UIButton.vue'
import Hint from '@/components/Hint.vue'
import AccountList from '@/components/AccountList.vue'
import { Plus } from '@element-plus/icons-vue'
import { BUTTON_TYPES } from '@/constants/ui'

const store = useAccountStore()

const add = () => store.addAccount()
</script>

<style scoped>
.content {
  margin: 0 auto;
  max-width: 740px;
  padding: 20px;
}

.content__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<template>
  <section class="content">
    <div class="content__top">
      <h2>Учетные записи</h2>
      <UiButton type="primary" :icon="Plus" @click="add"></UiButton>
    </div>

    <Hint />
    <AccountList/>
  </section>
</template>

<script setup lang="ts">
import { useAccStore } from '@/store/accountStore'
import UiButton from '@/components/UIButton.vue'
import Hint from '@/components/Hint.vue'
import { Plus } from '@element-plus/icons-vue'
import AccountList from '@/components/AccountList.vue'

const store = useAccStore()
const add = () => store.add()
</script>

<style lang="scss" scoped>
.content{
  margin: 0 auto;
  max-width: 740px;
  padding: 20px;

  &__top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

<template>
  <div class="accounts">

    <el-row class="header" :gutter="10">
      <el-col :span="8">Метки</el-col>
      <el-col :span="6">Тип записи</el-col>
      <el-col :span="5">Логин</el-col>
      <el-col :span="5">Пароль</el-col>
      <el-col :span="2"></el-col>
    </el-row>

    <AccountRow
      v-for="acc in accounts"
      :key="acc.id"
      :acc="acc"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAccStore } from '@/store/accountStore'
import AccountRow from './AccountRow.vue'

const store = useAccStore()
const accounts = computed(() => store.list)
</script>

<style scoped>
.header {
  font-weight: 500;
  font-size: 14px;
  color: gray;
  margin-bottom: 10px;
}
</style>

<template>
  <p class="hint-block" >
    <el-icon><Warning /></el-icon> Для указания нескольких меток для одной пары логин\пароль используйте разделитель ;
  </p>
</template>

<script setup lang="ts">
  import { Warning } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
  .hint-block{
    margin: 10px 0 ;
    padding: 8px;
    background-color: rgb(236, 236, 236);
    color: grey;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

</style>

<template>
  <p class="hint-block">
    <el-icon><Warning /></el-icon>
    Для указания нескольких меток используйте разделитель ;
  </p>
</template>

<script setup lang="ts">
import { Warning } from '@element-plus/icons-vue'
</script>

<style scoped>
.hint-block {
  margin: 10px 0;
  padding: 8px;
  background-color: #ececec;
  color: grey;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>

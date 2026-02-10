<template>
  <el-button
    :type="props.type"
    :icon="props.icon"
    @click="$emit('click')"
    >
  </el-button>
</template>

<script setup lang="ts">
import type { IconComponent } from 'element-plus/es/utils/index.mjs';

const props = defineProps<{
  type?: 'primary' | 'danger' | 'default'
  icon?: IconComponent
}>()

defineEmits(['click'])
</script>

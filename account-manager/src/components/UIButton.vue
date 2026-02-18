<template>
  <el-button
    :type="type"
    :icon="icon"
    @click="$emit('click')"
  />
</template>

<script setup lang="ts">
import type { IconComponent } from 'element-plus/es/utils'
import type { ButtonType } from '@/constants/ui'


defineProps<{
  type?: ButtonType
  icon?: IconComponent
}>()

defineEmits(['click'])
</script>

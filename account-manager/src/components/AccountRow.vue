<template>
  <el-row :gutter="10" class="row">
    <el-col :span="8">
      <el-input
        v-model="lbl"
        placeholder="Значение"
        @blur="onBlur"
        maxlength="50"
        :class="{ err: !!lbl && !isLabelsValid }"
      />
    </el-col>

    <el-col :span="5">
      <el-select v-model="loc.type" placeholder="Тип" @change="onType">
        <el-option label="LDAP" value="LDAP" />
        <el-option label="Локальная" value="LOCAL" />
      </el-select>
    </el-col>

   <el-col :span="loc.type === 'LOCAL' ? 4 : 9">
      <el-input
        v-model="loc.login"
        placeholder="Логин"
        @blur="onBlur"
        :class="{ err: !loc.ok && !loc.login }"
      />
    </el-col>

    <el-col :span="5" v-if="loc.type === 'LOCAL'">
     <el-input
        v-model="loc.pass"
        :type="showPass ? 'text' : 'password'"
        placeholder="Пароль"
        maxlength="100"
        @blur="onBlur"
        :class="{ err: !loc.ok && !loc.pass }"
        >
        <template #suffix>
          <el-icon class="eye" @click="togPass" style="cursor: pointer;">
            <component :is="showPass ? Hide : View" />
          </el-icon>
        </template>
      </el-input>
    </el-col>

    <el-col :span="2">
      <UiButton type="danger" :icon="Delete" @click="removeElement" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { Acc } from '@/types/accountType'
import { useAccStore } from '@/store/accountStore'
import UiButton from './UIButton.vue'
import { Delete, View, Hide } from '@element-plus/icons-vue'

const props = defineProps<{ acc: Acc }>()
const state = useAccStore()

const loc = reactive({ ...props.acc })
const lbl = ref(props.acc.labels.map(v => v.text).join('; '))

const showPass = ref(false)

const togPass = () => {
  showPass.value = !showPass.value
}

const labelsRegex = /^[\p{Script=Latin}\p{Script=Cyrillic}\s;]*$/u
const isLabelsValid = computed(() => {
  if (!lbl.value.trim()) return true 
  return labelsRegex.test(lbl.value)
})

const parseLbl = (v: string) =>
  v.split(';').map(s => s.trim()).filter(Boolean).map(text => ({ text }))

const chk = () => {
  const lOk = !!loc.login
  const pOk = loc.type === 'LDAP' || !!loc.pass
  loc.ok = lOk && pOk && isLabelsValid.value
}

const onBlur = () => {
  loc.labels = parseLbl(lbl.value)
  chk()
  state.update({ ...loc })
}

const onType = () => {
  if (loc.type === 'LDAP') loc.pass = null
  onBlur()
}

const removeElement = () => state.remove(loc.id)
</script>

<style scoped>
.row { margin-bottom: 12px; }
.err :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset !important;
}
</style>

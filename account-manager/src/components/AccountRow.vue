<template>
  <el-row :gutter="10" class="account-row">
    <el-col :span="8">
      <el-input
        v-model="labelsInput"
        placeholder="Метки (через ;)"
        @blur="handleBlur"
        :class="{ 'input-error': labelsInput && !isLabelsValid }"
      />
    </el-col>

    <el-col :span="5">
      <el-select
        v-model="form.type"
        placeholder="Тип"
        @change="handleTypeChange"
      >
        <el-option label="LDAP" :value="ACCOUNT_TYPES.LDAP" />
        <el-option label="Локальная" :value="ACCOUNT_TYPES.LOCAL" />
      </el-select>
    </el-col>

    <el-col :span="form.type === ACCOUNT_TYPES.LOCAL ? 4 : 9">
      <el-input
        v-model="form.login"
        placeholder="Логин"
        @blur="handleBlur"
      />
    </el-col>

    <el-col
      v-if="form.type === ACCOUNT_TYPES.LOCAL"
      :span="5"
    >
      <el-input
        v-model="form.password"
        :type="isPasswordVisible ? 'text' : 'password'"
        placeholder="Пароль"
        @blur="handleBlur"
      >
        <template #suffix>
          <el-icon @click="togglePassword">
            <component
              :is="isPasswordVisible ? Hide : View"
            />
          </el-icon>
        </template>
      </el-input>
    </el-col>

    <el-col :span="2">
      <UiButton
        :type="BUTTON_TYPES.DANGER"
        :icon="Delete"
        @click="handleRemove"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Account } from '@/types/accountType'
import { useAccountStore } from '@/store/accountStore'
import { ACCOUNT_TYPES } from '@/constants/account'
import { BUTTON_TYPES } from '@/constants/ui'
import { parseLabels } from '@/utils/labelParser'
import { useAccountValidation } from '@/composables/useAccountValidation'
import UiButton from './UIButton.vue'
import { Delete, View, Hide } from '@element-plus/icons-vue'

const props = defineProps<{ account: Account }>()
const store = useAccountStore()

const form = reactive({ ...props.account })
const labelsInput = ref(
  props.account.labels.map((l) => l.text).join('; ')
)

const isPasswordVisible = ref(false)

const { isValid, isLabelsValid } =
  useAccountValidation(form, labelsInput)

const handleBlur = () => {
  form.labels = parseLabels(labelsInput.value)
  form.isValid = isValid.value
  store.updateAccount({ ...form })
}

const handleTypeChange = () => {
  if (form.type === ACCOUNT_TYPES.LDAP) {
    form.password = null
  }
  handleBlur()
}

const togglePassword = () => {
  isPasswordVisible.value =
    !isPasswordVisible.value
}

const handleRemove = () => {
  store.removeAccount(form.id)
}
</script>

<style scoped>
.account-row {
  margin-bottom: 12px;
}
.input-error :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset !important;
}
</style>

<script lang="ts" setup>
import { RecaptchaV2 } from 'vue3-recaptcha-v2'

const props = defineProps<{ reCaptchaReceive: string | null }>()

defineEmits([
  'handleErrorCallback',
  'handleExpiredCallback',
  'handleLoadCallback',
])

const reCaptcha: Ref<string | null> = ref(props.reCaptchaReceive)

// Ham goi khi khoi tao
const handleWidgetId = (widgetId: number) => {}

// Ham goi khi loi
const handleErrorCallback = () => {
  reCaptcha.value = null

  return reCaptcha.value
}

// Ham duoc goi khi het han
const handleExpiredCallback = () => {
  reCaptcha.value = null

  return reCaptcha.value
}

// Ham duoc goi khi click
const handleLoadCallback = (response: unknown) => {
  if (typeof response === 'string')
    reCaptcha.value = response
  else if (response !== null && response !== undefined)
    reCaptcha.value = JSON.stringify(response)
  else
    reCaptcha.value = ''

  return reCaptcha.value
}
</script>

<template>
  <RecaptchaV2
    @widget-id="handleWidgetId"
    @error-callback="() => $emit('handleErrorCallback', handleErrorCallback())"
    @expired-callback="() => $emit('handleExpiredCallback', handleExpiredCallback())"
    @load-callback="(response) => $emit('handleLoadCallback', handleLoadCallback(response))"
  />
</template>

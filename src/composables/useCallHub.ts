import type CallHub from '@/plugins/callHub/callHub'

export function useCallHub() {
  const callHub: Ref<typeof CallHub | null> = ref(null)

  onMounted(() => {
    const instance = getCurrentInstance()
    if (instance) {
      callHub.value
        = instance.appContext.config.globalProperties.$callHub || null
    }
  })

  return { callHub }
}

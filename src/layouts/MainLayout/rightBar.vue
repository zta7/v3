<template>
  <q-btn-group flat>
    <q-btn icon='minimize' flat round @click='minimize()' />
    <q-btn :icon='isMaximized ? "mdi-window-restore" : "mdi-window-maximize"' flat round @click='toggleMaximize()' />
    <q-btn icon='close' flat round @click='close()' />
  </q-btn-group>
</template>
<script>
import { ref, onMounted, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const isMaximized = ref(undefined)

    const minimize = () => {
      window.electron.minimize()
    }

    const toggleMaximize = () => {
      window.electron.toggleMaximize()
    }

    const close = () => {
      const allWindows = window.electron.allWindows()
      console.log(allWindows)
      if (allWindows.length > 1) confirm.value = true

      // window.electron.close()
    }

    onMounted(() => {
      isMaximized.value = window.electron.isMaximized()
      window.electron.$on('maximize', () => isMaximized.value = true)
      window.electron.$on('unmaximize', () => isMaximized.value = false)
    })

    return {
      minimize,
      toggleMaximize,
      close,
      isMaximized
    }
  }
})
</script>

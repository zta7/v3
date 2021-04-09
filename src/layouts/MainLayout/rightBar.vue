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
      window.electron.closeAll()

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

<template>
  <q-btn-group flat>
    <q-btn icon='minimize' flat round @click='minimize()' />
    <q-btn :icon='isMaximized ? "mdi-window-restore" : "mdi-window-maximize"' flat round @click='toggleMaximize()' />
    <q-btn icon='close' flat round @click='close()' />
    <q-dialog v-model='confirm' persistent>
      <q-card>
        <q-card-section class='row items-center'>
          <q-avatar icon='signal_wifi_off' color='primary' text-color='white' />
          <span class='q-ml-sm'>You are currently not connected to any network.</span>
        </q-card-section>

        <q-card-actions align='right'>
          <q-btn v-close-popup flat label='Cancel' color='primary' />
          <q-btn v-close-popup flat label='Turn on Wifi' color='primary' />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-btn-group>
</template>
<script>
import { ref, onMounted, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const isMaximized = ref(undefined)

    onMounted(() => {
      isMaximized.value = window.electron.isMaximized()
    })

    const minimize = () => {
      window.electron.minimize()
    }

    const toggleMaximize = () => {
      window.electron.toggleMaximize()
    }

    const close = () => {
      // const allWindows = window.electron.allWindows()
      // console.log(allWindows)
      // if (allWindows.length > 1) confirm.value = true

      window.electron.close()
    }

    window.electron.$on('maximize', () => isMaximized.value = true)
    window.electron.$on('unmaximize', () => isMaximized.value = false)

    return {
      minimize,
      toggleMaximize,
      close,
      isMaximized
    }
  }
})
</script>

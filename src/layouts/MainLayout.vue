<template>
  <q-layout view='lHh Lpr lFf'>
    <q-header>
      <q-bar dense class='bg-teal text-white row no-wrap justify-between'>
        <div id='_header' class='col-grow full-height' />
        <q-btn-group flat>
          <q-btn icon='minimize' flat round @click='minimize()' />
          <q-btn :icon='isMaximized ? "mdi-window-restore" : "mdi-window-maximize"' flat round @click='toggleMaximize()' />
          <q-btn icon='close' flat round @click='close()' />
        </q-btn-group>
      </q-bar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'MainLayout',
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

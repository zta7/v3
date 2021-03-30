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
    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'MainLayout',
  setup(props, context) {
    const isMaximized = ref(window.electron.isMaximized())

    const minimize = () => {
      window.electron.minimize()
    }

    function toggleMaximize() {
      window.electron.toggleMaximize()
    }

    function close() {
      window.electron.close()
    }

    window.electron.$on('maximize', () => isMaximized.value = true)
    window.electron.$on('unmaximize', () => isMaximized.value = false)

    // const $q = useQuasar()
    // window.electron.$on('resized', (evt, { newBounds }) => {
    //   console.log(newBounds)
    //   $q.localStorage.set('width', newBounds.width)
    //   $q.localStorage.set('height', newBounds.height)
    // })
    // window.electron.$on('moved', (evt, { newBounds }) => {
    //   console.log(newBounds)
    //   $q.localStorage.set('x', newBounds.x)
    //   $q.localStorage.set('y', newBounds.y)
    // })

    return {
      minimize,
      toggleMaximize,
      close,
      isMaximized
    }
  }
})
</script>

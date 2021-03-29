<template>
  <q-layout view='lHh Lpr lFf'>
    <q-header elevated>
      <q-bar dense class='bg-teal text-white'>
        <q-space />123
        <q-btn icon='minimize' flat round @click='minimize()' />
        <!-- <q-btn :icon='isMaximized() ? "mdi-window-restore" : "mdi-window-maximize"' flat round @click='toggleMaximize()' /> -->
        <q-btn icon='close' flat round @click='close()' />
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

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    function minimize() {
      if (process.env.MODE === 'electron') window.WindowAPI.minimize()
    }

    function toggleMaximize() {
      if (process.env.MODE === 'electron') window.WindowAPI.toggleMaximize()
    }

    function close() {
      if (process.env.MODE === 'electron') window.WindowAPI.close()
    }

    // function isMaximized() {
    //   if (process.env.MODE === 'electron') return window.WindowAPI.isMaximized()
    // }

    return {
      minimize,
      toggleMaximize,
      close
      // isMaximized
    }
  }
})
</script>

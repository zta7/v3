<template>
  <q-layout view='lHh Lpr lFf'>
    <q-header>
      <q-bar dense class='bg-teal text-white row no-wrap justify-between'>
        <left-bar v-model='drawerLeft' />
        <div id='_header' class='col-grow full-height' />
        <right-bar />
      </q-bar>
    </q-header>
    <left-drawer v-model='drawerLeft' />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { LocalStorage } from 'quasar'
import rightBar from './MainLayout/rightBar'
import leftBar from './MainLayout/leftBar'
import LeftDrawer from './MainLayout/leftDrawer'

export default defineComponent({
  name: 'MainLayout',
  components: {
    rightBar,
    leftBar,
    LeftDrawer
  },
  setup() {
    const confirm = ref(false)
    const drawerLeft = ref(false)
    const isNightMode = ref(LocalStorage.getItem('isNightMode') || false)

    return {
      close,
      isNightMode,
      drawerLeft,
      confirm
    }
  }
})
</script>

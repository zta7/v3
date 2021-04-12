<template>
  <q-layout view='lHh Lpr lFf'>
    <q-header>
      <q-bar dense class='bg-teal text-white row no-wrap justify-between'>
        <left-bar />
        <div id='_header' class='col-grow full-height' />
        <right-bar />
      </q-bar>
    </q-header>
    <left-drawer />
    <q-page-container>
      <default-layout />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, provide } from 'vue'
import rightBar from './MainLayout/RightBar'
import leftBar from './MainLayout/LeftBar'
import leftDrawer from './MainLayout/LeftDrawer'
import defaultLayout from './MainLayout/Layouts/Default'

export default defineComponent({
  name: 'MainLayout',
  components: {
    rightBar,
    leftBar,
    leftDrawer,
    defaultLayout
  },
  setup() {
    const confirm = ref(false)
    const drawerLeft = ref(false)

    provide('drawerLeft', drawerLeft)
    return {
      close,
      drawerLeft,
      confirm
    }
  }
})
</script>

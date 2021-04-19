<template>
  <q-layout view='lHh Lpr lFf'>
    <q-header>
      <q-bar dense class='bg-teal text-white row no-wrap justify-between'>
        <div id='_header' class='col-grow full-height' />
        <right-bar />
      </q-bar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import rightBar from './MainLayout/RightBar'
// import defaultLayout from './MainLayout/Layouts/Default'

export default defineComponent({
  name: 'MainLayout',
  components: {
    rightBar
    // defaultLayout
  }
})
</script>

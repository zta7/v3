<template>
  <q-list>
    <night-mode />
    <user-settings />
  </q-list>
</template>
<script>
import { defineComponent } from 'vue'
import nightMode from './LeftDrawerList/NightMode'
import userSettings from './LeftDrawerList/UserSettings'

export default defineComponent({
  components: {
    nightMode,
    userSettings
  }
})
</script>

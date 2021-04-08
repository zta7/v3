<template lang='pug'>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import { Dark } from 'quasar'
import LocalStorageUtil from 'utils/LocalStorage'

export default defineComponent({
  name: 'App',
  setup() {
    LocalStorageUtil('isNightMode', v => {
      Dark.set(v)
    })
  }
})
</script>

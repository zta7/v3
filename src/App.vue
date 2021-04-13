<template>
  <router-view class='no-scroll' />
</template>
<script>
import { defineComponent } from 'vue'
import { Dark } from 'quasar'
import LocalStorageUtil from 'utils/LocalStorage'
import Mousetrap from 'mousetrap'
export default defineComponent({
  name: 'App',
  setup() {
    LocalStorageUtil('isNightMode', v => {
      Dark.set(v)
    })
    LocalStorageUtil('selectedFolder')
    Mousetrap.bind('ctrl+-', () => { console.log('4') })
    Mousetrap.bind('ctrl+=', () => { console.log('4') })
  }
})
</script>

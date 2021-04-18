<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import { Dark } from 'quasar'
import LocalStorageUtil from 'utils/LocalStorage'
import Mousetrap from 'mousetrap'

export default defineComponent({
  name: 'App',
  setup() {
    LocalStorageUtil({
      key: 'isNightMode',
      validateFn: v => /^true|false$/.test(v),
      toValue: false
    }, v => {
      Dark.set(v)
    })
    LocalStorageUtil({
      key: 'selectedFolderId'
    })
    Mousetrap.bind('ctrl+-', () => { console.log('4') })
    Mousetrap.bind('ctrl+=', () => { console.log('4') })
  }
})
</script>

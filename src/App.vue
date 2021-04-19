<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { Dark } from 'quasar'
import LocalStorageUtil from 'utils/LocalStorage'
import Mousetrap from 'mousetrap'
import { $db } from 'boot/dexie'

export default defineComponent({
  name: 'App',
  setup() {
    const $store = useStore()
    $db.folders.toArray(arr => {
      $store.commit('app/SetFolders', arr)
      console.log($store.state.app.folders)
    })

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

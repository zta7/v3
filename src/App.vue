<template lang='pug'>
  <router-view />
</template>
<script>
import { defineComponent, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { LocalStorage as ls } from 'quasar'

export default defineComponent({
  name: 'App',
  setup() {
    const $store = useStore()
    const cfgs = ls.getAll()
    $store.commit('app/init', cfgs)
    onBeforeUnmount(() => {
      for (const [k, v] of Object.entries($store.state.app)) ls.set(k, v)
    })
    return {
    }
  }
})
</script>

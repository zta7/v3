<template>
  <q-list bordered>
    <q-item v-ripple clickable>
      <q-item-section avatar>
        <q-icon name='mdi-weather-night' />
      </q-item-section>
      <q-item-section>Night Mode</q-item-section>
      <q-item-section side>
        <q-toggle v-model='isNightMode' />
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup(props) {
    const $store = useStore()
    const isNightMode = computed({
      get: () => Boolean($store.state.app.isNightMode),
      set: v => {
        $store.commit('app/set', {
          key: 'isNightMode',
          value: v
        })
      }
    })
    return {
      isNightMode
    }
  }
})
</script>

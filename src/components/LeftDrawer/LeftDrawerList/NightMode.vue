<template>
  <q-item v-ripple tag='label'>
    <q-item-section avatar>
      <q-icon name='mdi-weather-night' />
    </q-item-section>
    <q-item-section>Night Mode</q-item-section>
    <q-item-section side>
      <q-toggle v-model='isNightMode' />
    </q-item-section>
  </q-item>
</template>
<script>
import { defineComponent, inject } from 'vue'
export default defineComponent({
  setup() {
    const isNightMode = inject('isNightMode')
    return {
      isNightMode
    }
  }
})
</script>

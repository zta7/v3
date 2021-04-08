<template>
  <q-btn-group flat>
    <q-btn icon='menu' flat round @click='drawerLeft = !drawerLeft' />
  </q-btn-group>
</template>
<script>
import { defineComponent, inject } from 'vue'
export default defineComponent({
  setup() {
    const drawerLeft = inject('drawerLeft')
    return {
      drawerLeft
    }
  }
})
</script>

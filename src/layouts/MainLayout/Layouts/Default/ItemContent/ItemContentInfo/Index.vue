<template>
  <div>
    <q-item>
      <q-item-section>{{ selectedItem }}</q-item-section>
    </q-item>
  </div>
</template>
<script>
import { defineComponent, inject } from 'vue'
export default defineComponent({
  setup() {
    return {
      selectedItem: inject('selectedItem')
    }
  }
})
</script>

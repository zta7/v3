<template>
  <q-btn-group flat>
    <q-btn icon='menu' flat round @click='toogleDrawerLeft()' />
  </q-btn-group>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    drawerLeft: {
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const toogleDrawerLeft = () => {
      emit('update:modelValue', !props.drawerLeft.value)
    }
    return {
      toogleDrawerLeft
    }
  }
})
</script>

<template>
  <q-page class='flex flex-center'>
    {{ a ? '1' : '2' }}
    <q-btn @click='fn()' />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  setup(props, context) {
    console.log(context)
    let a = ref(true)
    const fn = function() {
      a = !a
    }
    return {
      a,
      fn
    }
  }
})
</script>

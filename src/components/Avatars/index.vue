<template>
  <q-avatar color='teal' text-color='white'>
    <img v-if='avatar' :src='avatar'>
    <span v-else>{{ name[0] }}</span>
    <q-badge v-show='badge' color='info' class='absolute' style='bottom: -4px;right: -3px'>
      <span class='ellipsis' style='max-width: 24px'>1324</span>
    </q-badge>
  </q-avatar>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    avatar: {
      type: String,
      required: false,
      default: null
    },
    name: {
      type: String,
      required: true,
      validator: v => v.length > 0
    },
    badge: {
      type: Boolean,
      required: false,
      default: null
    }
  }
})
</script>

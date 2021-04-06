<template>
  <q-drawer
    :model-value='drawerLeft'
    :width='280'
    no-swipe-open
    no-swipe-close
    behavior='mobile'
    overlay
    @update:model-value='updateModelValue'>
    <user-profile />
    <left-drawer-list />
  </q-drawer>
</template>
<script>
import { defineComponent } from 'vue'
import userProfile from './leftDrawer/userProfile'
import leftDrawerList from './leftDrawer/leftDrawerList'

export default defineComponent({
  components: {
    userProfile,
    leftDrawerList
  },
  props: {
    drawerLeft: {
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateModelValue = v => emit('update:modelValue', v)
    return {
      updateModelValue
    }
  }
})
</script>

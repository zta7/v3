<template>
  <q-drawer
    v-model='drawerLeft'
    behavior='mobile'
    overlay>
    <user-profile />
    <left-drawer-list />
  </q-drawer>
</template>
<script>
import { defineComponent, inject } from 'vue'
import userProfile from './UserProfile'
import leftDrawerList from './LeftDrawerList'

export default defineComponent({
  components: {
    userProfile,
    leftDrawerList
  },
  setup() {
    const drawerLeft = inject('drawerLeft')
    return {
      drawerLeft
    }
  }
})
</script>

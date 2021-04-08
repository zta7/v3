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
import userProfile from './LeftDrawer/UserProfile'
import leftDrawerList from './LeftDrawer/LeftDrawerList'

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

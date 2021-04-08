<template>
  <q-item v-ripple tag='label' @click='drawerLeft = false; visible = true'>
    <q-item-section avatar>
      <q-icon name='mdi-cog' />
    </q-item-section>
    <q-item-section>Settings</q-item-section>
  </q-item>

  <box-dialog :visible='visible' :title='title' />
</template>
<script>
import { defineComponent, inject, ref } from 'vue'
import BoxDialog from 'components/Dialogs/Box'
export default defineComponent({
  components: {
    BoxDialog
  },
  setup(props, context) {
    const drawerLeft = inject('drawerLeft')
    const visible = ref(false)
    const title = 'Settings'

    return {
      drawerLeft,
      visible,
      title
    }
  }
})
</script>

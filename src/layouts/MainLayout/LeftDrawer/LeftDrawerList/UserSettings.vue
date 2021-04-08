<template>
  <q-item v-ripple tag='label' @click='click()'>
    <q-item-section avatar>
      <q-icon name='mdi-cog' />
    </q-item-section>
    <q-item-section>Settings</q-item-section>
  </q-item>

  <box-dialog v-model='visible' :title='title'>
    <!-- <template #btn>
    </template> -->
    123
  </box-dialog>
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

    const click = () => {
      drawerLeft.value = false
      visible.value = true
    }

    return {
      drawerLeft,
      visible,
      title,
      click
    }
  }
})
</script>

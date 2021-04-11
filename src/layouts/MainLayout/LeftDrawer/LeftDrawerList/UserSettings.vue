<template>
  <q-item v-ripple tag='label' @click='click()'>
    <q-item-section avatar>
      <q-icon name='mdi-cog' />
    </q-item-section>
    <q-item-section>Settings</q-item-section>
  </q-item>

  <box-dialog v-model='visible' :title='title'>
    <q-list dense>
      <scale-item />
    </q-list>
  </box-dialog>
</template>
<script>
import { defineComponent, inject, ref } from 'vue'
import boxDialog from 'components/Dialogs/Box'
import scaleItem from 'components/Items/Scale'
export default defineComponent({
  components: {
    boxDialog,
    scaleItem
  },
  setup(props, context) {
    const drawerLeft = inject('drawerLeft')
    const visible = ref(false)
    const title = 'Settings'
    const standard = ref({
      min: 0,
      max: 1
    })

    const click = () => {
      drawerLeft.value = false
      visible.value = true
    }

    return {
      drawerLeft,
      visible,
      title,
      click,
      standard
    }
  }
})
</script>

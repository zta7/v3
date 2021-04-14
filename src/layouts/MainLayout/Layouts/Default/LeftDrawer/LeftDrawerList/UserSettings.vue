<template>
  <q-item v-ripple tag='label' @click='click()'>
    <q-item-section avatar>
      <q-icon name='mdi-cog' />
    </q-item-section>
    <q-item-section>Settings</q-item-section>
  </q-item>
</template>
<script>
import { defineComponent, inject, ref } from 'vue'
import { Dialog } from 'quasar'

import settingsDialog from 'components/Dialogs/Settings'

export default defineComponent({
  setup(props, context) {
    const drawerLeft = inject('drawerLeft')
    const title = 'Settings'
    const standard = ref({
      min: 0,
      max: 1
    })

    const click = () => {
      drawerLeft.value = false

      Dialog.create({
        component: settingsDialog
      })
    }

    return {
      drawerLeft,
      title,
      click,
      standard
    }
  }
})
</script>

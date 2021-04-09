<template>
  <q-item v-ripple tag='label' @click='click()'>
    <q-item-section avatar>
      <q-icon name='mdi-cog' />
    </q-item-section>
    <q-item-section>Settings</q-item-section>
  </q-item>

  <box-dialog v-model='visible' :title='title'>
    <q-list dense>
      <q-item v-ripple dense tag='label'>
        <q-item-section thumbnail>
          <q-icon name='aspect_ratio' />
        </q-item-section>
        <q-item-section>
          Default interface scale
        </q-item-section>
        <q-item-section side>
          <q-toggle />
        </q-item-section>
      </q-item>
      <q-item dense>
        <q-item-section thumbnail>
          <q-icon />
        </q-item-section>
        <q-item-section>
          <q-range
            v-model='standard'
            drag-only-range
            markers
            thumb-path=''
            dense
            :step='1'
            :min='0'
            :max='5'
            @pan='pan' />
        </q-item-section>
      </q-item>
      <q-item dense>
        <q-item-section thumbnail>
          <q-icon />
        </q-item-section>
        <q-item-section>
          <div class='row justify-between'>
            <span v-for='i in (0+5)/1' :key='i' class='col-grow text-center text-caption'>{{ i*100 }}%</span>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
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

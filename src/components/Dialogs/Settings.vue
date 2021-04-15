<template>
  <q-dialog ref='dialogRef'>
    <q-card style='width: 420px'>
      <q-card-section>
        <q-item class='no-padding' dense>
          <q-item-section class='text-h6'>
            Settings {{ a }}
          </q-item-section>
          <q-item-section side>
            <q-btn-group flat>
              <slot name='btn' />
              <q-btn v-close-popup icon='close' flat round dense />
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
      <q-card-section style='max-height: 80vh' class='scroll'>
        <scale-item />
      </q-card-section>
      <q-separator />
    </q-card>
  </q-dialog>
</template>

<script>
import scaleItem from 'components/Items/Scale'
import { useDialogPluginComponent } from 'quasar'
import { computed, toRef, watch } from 'vue'
export default {
  components: {
    scaleItem
  },
  props: ['xxxx'],
  emits: [...useDialogPluginComponent.emits],
  setup(props, { emit }) {
    console.log(props)
    // const propXxxx = toRef(props, 'xxxx')
    const a = computed(() => `${props.xxxx}fk`)
    console.log(a)
    // watch(propXxxx, n => {
    //   console.log(n)
    // })
    watch(props.xxxx, n => {
      console.log(n)
    })

    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      a
    }
  }
}
</script>

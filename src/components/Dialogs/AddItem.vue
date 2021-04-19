<template>
  <q-dialog ref='dialogRef' @hide='onDialogHide'>
    <q-card class='q-dialog-plugin'>
      <q-card-actions align='right'>
        <q-btn label='Cancel' flat @click='onDialogHide' />
        <q-btn label='Create' flat @click='onOKClick' />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
    folder: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },

  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

    return {
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK()
      }
    }
  }
}
</script>

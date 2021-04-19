<template>
  <q-dialog ref='dialogRef' @hide='onDialogHide'>
    <q-card class='q-dialog-plugin' style='width: 320px'>
      <q-card-section />
      <q-card-section>
        {{ content }}
      </q-card-section>
      <q-card-actions align='right'>
        <q-btn label='Cancel' flat @click='onDialogHide' />
        <q-btn :label='confirmBtnLabel' flat @click='onOKClick' />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
    content: {
      type: String,
      required: true
    },
    confirmBtnLabel: {
      type: String,
      required: false,
      default: 'Confirm'
    }
  },

  emits: [...useDialogPluginComponent.emits],

  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

    return {
      ...props,
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK(true)
      }
    }
  }
}
</script>

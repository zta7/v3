<template>
  <q-dialog ref='dialogRef'>
    <q-card style='width: 420px' class='no-scroll'>
      <q-card-section>
        <q-item class='no-padding' dense>
          <q-item-section class='text-h6'>
            Folders
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
      <q-card-section style='max-height: 80vh' class='scroll no-padding'>
        <q-list>
          <q-item-label header>My folders</q-item-label>
          <q-item v-for='f in folders' :key='f.id' clickable>
            <q-item-section avatar>
              <q-icon name='mdi-folder-outline' />
            </q-item-section>
            <q-item-section>
              <q-item-label lines='1'>Single line item</q-item-label>
              <q-item-label caption lines='1'>Secondary line text.</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name='mdi-delete-outline' />
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              CREATE NEW FOLDER
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator />
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'

export default {
  emits: [...useDialogPluginComponent.emits],
  setup(props, { emit }) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const folder = {
      icon: 'mdi-folder-outline',
      label: 'Single line',
      caption: 'Second line'
    }
    const folders = Array.from({ length: 5 }, (e, i) => {
      return {
        id: i,
        folder
      }
    })
    return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      folders
    }
  }
}
</script>

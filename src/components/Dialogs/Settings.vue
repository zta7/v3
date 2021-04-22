<template>
  <q-dialog ref='dialogRef'>
    <q-card style='width: 420px'>
      <q-card-section>
        <q-item class='no-padding' dense>
          <q-item-section class='text-h6'>
            Settings
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
      <q-card-section>
        <!-- <q-list>
          <q-item clickable @click='onFoldersClick()'>
            <q-item-section thumbnail>
              <q-icon name='mdi-folder-outline' />
            </q-item-section>
            <q-item-section>Folders</q-item-section>
          </q-item>
        </q-list> -->
      </q-card-section>

      <q-card-section style='max-height: 80vh' class='scroll'>
        <scale-item />
      </q-card-section>
      <q-separator />
    </q-card>
  </q-dialog>
</template>

<script>
import scaleItem from 'components/Items/Scale'
import { useDialogPluginComponent, Dialog } from 'quasar'
import foldersDialog from 'components/Dialogs/Folders'

export default {
  components: {
    scaleItem
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props, { emit }) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel
    }
  }
}
</script>

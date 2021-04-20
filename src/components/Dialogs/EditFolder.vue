<template>
  <q-dialog ref='dialogRef' class='non-selectable no-pointer-events' persistent @hide='onDialogHide'>
    <q-card class='q-dialog-plugin'>
      <q-card-section class='q-px-none'>
        <q-item dense>
          <q-item-section class='text-h6'>
            Edit Folder
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-section class='q-py-none'>
        <q-input ref='nameRef' v-model='editFolder.name' label='name' autofocus :lazy-rules='true' :rules='[v => v.length > 0 && v.length < 10]'>
          <template #append>
            <q-icon name='mdi-folder-outline' />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class='no-padding'>
        <q-list>
          <q-item-label header>Includes Items</q-item-label>

          <q-item clickable @click='onAddItems()'>
            <q-item-section>
              Add Items
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section class='q-px-none'>
        <q-banner dense class='bg-grey-3 text-grey q-px-md'>
          Create folders for different groups of chats and quickly switch between them.
        </q-banner>
      </q-card-section>

      <q-card-actions align='right'>
        <q-btn label='Cancel' flat @click='onCancelClick' />
        <q-btn label='OK' flat @click='onOKClick' />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent, Dialog } from 'quasar'
import addItemsDialog from 'components/Dialogs/AddItems'
import { reactive, ref } from 'vue'
import { cloneDeep } from 'lodash'

export default {
  props: {
    folder: {
      type: Object,
      required: true
    }
  },

  emits: [...useDialogPluginComponent.emits],
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup(props, context) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const editFolder = reactive(cloneDeep(props.folder))
    const nameRef = ref(null)
    const onAddItems = folder => {
      Dialog.create({
        component: addItemsDialog,
        componentProps: {
          folder: editFolder
        }
      }).onOk(d => {
        console.log(d)
      })
    }
    return {
      onAddItems,
      nameRef,
      editFolder,
      dialogRef,
      onDialogHide,
      async onOKClick() {
        const r = await nameRef.value.validate()
        if (r) onDialogOK(cloneDeep(editFolder))
      },
      onCancelClick: onDialogCancel
    }
  }
}
</script>

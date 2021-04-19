<template>
  <q-dialog ref='dialogRef' @hide='ok'>
    <q-card style='width: 420px' class='q-dialog-plugin no-scroll'>
      <q-card-section class='q-px-none'>
        <q-item dense>
          <q-item-section class='text-h6'>
            Folders
          </q-item-section>
          <q-item-section side>
            <q-btn-group flat>
              <slot name='btn' />
              <q-btn icon='close' flat round dense @click='ok' />
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
      <q-card-section style='max-height: 80vh' class='scroll no-padding'>
        <q-list>
          <q-item-label header>My Folders</q-item-label>
          <q-item v-for='(f, i) in editFolders' :key='i' clickable @click='editFolder(f)'>
            <q-item-section avatar>
              <q-icon :name='f.icon || "mdi-folder-outline"' />
            </q-item-section>
            <q-item-section>
              <q-item-label lines='1'>{{ f.name }}</q-item-label>
              <q-item-label caption lines='1'>{{ f.items.length }} items</q-item-label>
            </q-item-section>
            <q-item-section side @click.stop='toggleDelete(f.id)'>
              <div>
                <q-btn flat round>
                  <q-icon v-if='!deletes.has(f.id)' name='mdi-delete-outline' />
                  <span v-else> Undo </span>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
          <q-item clickable @click='createFolder()'>
            <q-item-section>
              CREATE NEW FOLDER
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section class='q-px-none'>
        <q-banner dense class='bg-grey-3 text-grey q-px-md'>
          Create editFolders for different groups of chats and quickly switch between them.
        </q-banner>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent, Dialog } from 'quasar'
import { reactive } from 'vue'
import newFolderDialog from './NewFolder'
import editFolderDialog from './EditFolder'
import { cloneDeep } from 'lodash'

export default {
  props: {
    folders: {
      type: Array,
      required: true
    }
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props, { emit }) {
    const { dialogRef, onDialogOK } = useDialogPluginComponent()

    const editFolders = reactive(cloneDeep(props.folders))
    console.log(editFolders)
    const deletes = reactive(new Set())

    const createFolder = () => {
      Dialog.create({
        component: newFolderDialog
      }).onOk(folder => {
        editFolders.push(folder)
      })
    }

    const editFolder = folder => {
      Dialog.create({
        component: editFolderDialog,
        componentProps: {
          folder
        }
      }).onOk(folder => {
        const i = editFolders.findIndex(f => f.id === folder.id)
        if (i !== -1) editFolders[i] = folder
      })
    }

    return {
      dialogRef,
      ok() {
        onDialogOK({
          folders: cloneDeep(editFolders),
          deletes: [...deletes]
        })
      },
      deletes,
      editFolders,
      createFolder,
      editFolder,
      toggleDelete(id) {
        deletes.has(id) ? deletes.delete(id) : deletes.add(id)
      }
    }
  }
}
</script>

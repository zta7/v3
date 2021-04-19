<template>
  <q-dialog ref='dialogRef' persistent @hide='onDialogHide'>
    <q-card>
      <q-card-section>
        <q-item class='no-padding' dense>
          <q-item-section class='text-h6'>
            New Folder
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <q-input ref='nameRef' v-model='name' label='Folder Name' autofocus :rules='[v => v.length > 0 && v.length < 10]'>
          <template #append>
            <q-icon name='mdi-folder-outline' />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align='right'>
        <q-btn label='Cancel' flat @click='onDialogHide' />
        <q-btn label='Create' flat @click='newFolder' />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent, uid } from 'quasar'
import { ref } from 'vue'

export default {
  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
    const name = ref('')
    const nameRef = ref(null)
    const newFolder = async() => {
      const r = await nameRef.value.validate()
      if (r) {
        const obj = {
          id: uid(),
          name: name.value,
          items: []
        }
        onDialogOK(obj)
      }
    }
    return {
      name,
      nameRef,
      dialogRef,
      onDialogHide,
      newFolder
    }
  }
}
</script>

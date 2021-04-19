<template>
  <q-dialog ref='dialogRef' persistent @hide='onDialogHide'>
    <q-card class='q-dialog-plugin'>
      <q-card-section>
        <q-item class='no-padding' dense>
          <q-item-section class='text-h6'>
            New Item
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class='row no-wrap justify-between items-align'>
        <q-avatar class='cursor-pointer' size='80px' font-size='52px' color='teal' text-color='white' @click='avatarFileRef.pickFiles()'>
          <q-icon v-if='!avatarFile' name='photo_camera' />
          <img v-else :src='avatarUrl'>
        </q-avatar>
        <q-input ref='nameRef' v-model='name' class='col-grow q-ml-md' label='Item Name' autofocus :rules='[v => v.length > 0]' lazy-rules='ondemand' :maxlength='12' />
      </q-card-section>
      <q-card-section>
        <q-input v-model='description' label='description(optional)' />
      </q-card-section>
      <q-card-actions align='right'>
        <q-btn label='Cancel' flat @click='onDialogHide' />
        <q-btn label='Create' flat @click='newItem()' />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-file ref='avatarFileRef' :value='avatarFile' accept='.jpg,.png,image/*' @update:model-value='onAvatarFileInput' />
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

export default {
  props: {
    modelModifiers: {
      type: Object,
      default: () => ({})
    }
  },

  emits: [...useDialogPluginComponent.emits],

  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
    const name = ref('')
    const nameRef = ref(null)
    const avatarFileRef = ref(null)
    const avatarUrl = ref(null)
    const avatarFile = ref(null)
    const description = ref('')
    return {
      name,
      description,
      avatarFile,
      avatarUrl,
      nameRef,
      avatarFileRef,
      dialogRef,
      onAvatarFileInput(file) {
        var reader = new FileReader()
        reader.onload = function(e) {
          const url = e.target.result
          avatarFile.value = file
          avatarUrl.value = url
        }
        reader.readAsDataURL(file)
      },
      onDialogHide,
      async newItem() {
        const r = await nameRef.value.validate()
        if (r) {
          onDialogOK({
            name: name.value,
            description: description.value,
            avatar: avatarUrl.value
          })
        }
        else nameRef.value.focus()
      }
    }
  }
}
</script>

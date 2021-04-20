<template>
  <q-dialog ref='dialogRef' persistent @hide='onDialogHide'>
    <q-card class='q-dialog-plugin'>
      <q-card-section class='q-px-none'>
        <q-item dense>
          <q-item-section class='text-h6'>
            <span class='row items-center'>
              Include Items
              <span class='text-caption q-ml-md'>{{ `${editFolder.items.length} / ${MAX_FOLDER_ITEMS}` }}</span>
            </span>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class='q-pa-none'>
        <q-select
          v-model='editFolder.items'
          class='q-px-lg'
          :options='[]'
          option-label='name'
          emit-value
          map-options
          borderless
          multiple
          hide-dropdown-icon
          use-input>
          <template #prepend>
            <q-icon name='search' />
          </template>
          <template #selected-item='scope'>
            <q-chip
              removable
              :tabindex='scope.tabindex'
              color='white'
              text-color='secondary'
              class='bg-grey-3'
              @remove='scope.removeAtIndex(scope.index)'>
              <item-avatar :name='scope.opt.name' :avatar='scope.opt.avatar' />
              {{ scope.opt.name }}
            </q-chip>
          </template>
        </q-select>
        <q-separator />
        <q-list>
          <q-item-label header>Items</q-item-label>
          <avatar-item
            v-for='item in items'
            :key='item.id'
            :item='item'
            display='lm'
            clickable
            :active='selectedItemIds.has(item.id)'
            active-class='text-light-blue-5'
            @click='onSelectItem(item.id)' />
        </q-list>
      </q-card-section>
      <q-card-actions align='right'>
        <q-btn label='Cancel' flat @click='onDialogHide' />
        <q-btn label='Save' flat @click='onOKClick' />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { cloneDeep } from 'lodash'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { MAX_FOLDER_ITEMS } from 'store/app/index'
import itemAvatar from 'components/Avatars/index'
import avatarItem from 'components/Items/Avatar'

export default {
  components: {
    itemAvatar,
    avatarItem
  },
  props: {
    folder: {
      type: Object,
      required: true
    }
  },

  emits: [...useDialogPluginComponent.emits],

  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
    const $store = useStore()
    const editFolder = reactive(cloneDeep(props.folder))
    const items = computed(() => $store.getters['app/items'])
    const selectedItemIds = reactive(new Set())
    const onSelectItem = id =>
      selectedItemIds.has(id) ? selectedItemIds.delete(id) : selectedItemIds.add(id)

    return {
      onSelectItem,
      items,
      selectedItemIds,
      MAX_FOLDER_ITEMS,
      editFolder,
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK()
      }
    }
  }
}
</script>

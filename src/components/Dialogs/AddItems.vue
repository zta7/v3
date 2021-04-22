<template>
  <q-dialog ref='dialogRef' persistent @hide='onDialogHide'>
    <q-card class='q-dialog-plugin'>
      <q-card-section class='q-px-none'>
        <q-item dense>
          <q-item-section class='text-h6'>
            <span class='row items-center'>
              Include Items
              <span class='text-caption q-ml-md'>{{ `${editItems.length} / ${MAX_FOLDER_ITEMS}` }}</span>
            </span>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class='q-pa-none'>
        <q-select
          v-model='editItems'
          class='q-px-lg scroll'
          :options='allItems'
          option-label='name'
          option-value='id'
          emit-value
          map-options
          borderless
          multiple
          hide-dropdown-icon
          use-input
          style='max-height: 120px;'
          :placeholder='editItems.length === 0 ? "Search" : ""'>
          <template #rawControl>123</template>
          <template v-if='editItems.length === 0' #prepend>
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
              {{ scope.opt.name }}
            </q-chip>
          </template>
        </q-select>
        <q-separator />
        <q-list>
          <q-item-label header>Items</q-item-label>
          <q-scroll-area :style='{ height: scrollFullHeight + "px" }' style='max-height: 40vh'>
            <avatar-item
              v-for='(item, i) in allItems'
              :ref='el => { if (el) divs[i] = el }'
              :key='item.id'
              :item='item'
              display='lm'
              clickable
              :active='editItems.includes(item.id)'
              active-class='text-light-blue-5'
              @click='onSelectItem(item.id)' />
          </q-scroll-area>
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
import { useDialogPluginComponent, dom } from 'quasar'
import { cloneDeep } from 'lodash'
import { reactive, computed, ref, onBeforeUpdate } from 'vue'
import { useStore } from 'vuex'
import { MAX_FOLDER_ITEMS } from 'store/app/index'
import itemAvatar from 'components/Avatars/index'
import avatarItem from 'components/Items/Avatar'

export default {
  components: {
    // itemAvatar,
    avatarItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  emits: [...useDialogPluginComponent.emits],

  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
    const $store = useStore()
    const editItems = reactive(cloneDeep(props.items))
    const allItems = computed(() => $store.getters['app/items'])

    const divs = ref([])
    onBeforeUpdate(() => {
      divs.value = []
    })
    const scrollFullHeight = computed(() => {
      return divs.value.map(e => dom.style(e.$el, 'height').replace('px', '')).reduce((pre, cur) => {
        return pre += Number(cur)
      }, 0)
    })

    const onSelectItem = id => {
      const i = editItems.findIndex(e => e === id)
      if (i !== -1) editItems.splice(i, 1)
      else editItems.push(id)
    }

    return {
      divs,
      scrollFullHeight,
      onSelectItem,
      allItems,
      MAX_FOLDER_ITEMS,
      editItems,
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK(cloneDeep(editItems))
      }
    }
  }
}
</script>

<template>
  <q-list>
    <avatar-item
      v-for='item in items'
      :key='item.id'
      :badge='isLeftEdge'
      display='lmr'
      :item='item'
      clickable
      :to="{ name: 'ItemContent', params: { id: item.id } }"
      active-class='bg-light-blue-5 text-white'
      :style='{ width: itemWidth + "px" }'
      style='height: 60px'
      @click='onSelectItem(item.id)'>
      <template #menu>
        <q-menu
          touch-position
          context-menu>
          <q-list dense style='min-width: 100px'>
            <q-item v-close-popup clickable>
              <q-item-section>Pin to top</q-item-section>
            </q-item>
            <q-item v-close-popup clickable>
              <q-item-section>View Profile</q-item-section>
            </q-item>
            <q-item v-close-popup clickable @click='onDeleteItem(item)'>
              <q-item-section>Delete Item</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </template>
    </avatar-item>
  </q-list>
</template>
<script>
import { defineComponent, inject, computed } from 'vue'
import avatarItem from 'components/Items/Avatar'
import { useStore } from 'vuex'
import confirmDialog from 'components/Dialogs/Confirm'
import { Dialog } from 'quasar'
import { $db } from 'boot/dexie'
export default defineComponent({
  components: {
    avatarItem
  },
  props: {
    itemWidth: {
      type: Number,
      required: true
    }
  },
  setup() {
    const $store = useStore()
    const isLeftEdge = inject('isLeftEdge')
    const items = computed(() => $store.getters['app/folderItems'])
    const selectedItemId = computed(() => $store.getters['app/selectedItemId'])
    console.log(selectedItemId)
    const onSelectItem = id => $store.commit('app/SetSelectedItemId', id)
    const onDeleteItem = item => {
      Dialog.create({
        component: confirmDialog,
        componentProps: {
          content: 'Are you sure you want to delete item ?',
          confirmBtnLabel: 'Delete'
        }
      }).onOk(() => {
        $db.items.delete(item.id)
      })
    }
    return {
      items,
      onSelectItem,
      onDeleteItem,
      selectedItemId,
      isLeftEdge
    }
  }
})
</script>

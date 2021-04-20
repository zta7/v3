<template>
  <q-list>
    <avatar-item
      v-for='item in items'
      :key='item.id'
      :badge='isLeftEdge'
      display='lmr'
      :item='item'
      clickable
      :active='item.id === selectedItemId'
      active-class='bg-light-blue-5 text-white'
      :style='{ ...boxStyle, width: itemWidth + "px" }'
      @click='onSelectItem(item.id)' />

    <!-- <q-item
      v-for='item in items'
      :key='item.id'
      clickable
      :active='item.id === selectedItemId'
      active-class='bg-blue text-white'
      :style='{ ...boxStyle, width: itemWidth + "px" }'
      @click='onSelectItem(item.id)'>
      <q-item-section avatar>
        <q-avatar color='teal' text-color='white'>
          <img v-if='item.avatar' :src='item.avatar'>
          <span v-else>{{ item.name[0] }}</span>
          <q-badge v-show='isLeftEdge' color='info' class='absolute' style='bottom: -4px;right: -3px'>
            <span class='ellipsis' style='max-width: 24px'>1324</span>
          </q-badge>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label lines='1' class='text-subtitle2'>{{ item.label }}</q-item-label>
        <q-item-label lines='1'>
          <span class='text-weight-medium '>{{ item.perCaption }}</span>
          <span class='text-body2 text-weight-light'>{{ item.caption }}</span>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class='column no-wrap items-end justify-between'>
          <span>{{ item.lastUpdateTime }}</span>
          <span>{{ item.unarchivedNumber }}</span>
        </div>
      </q-item-section>
    </q-item> -->
  </q-list>
</template>
<script>
import { defineComponent, inject, computed } from 'vue'
import avatarItem from 'components/Items/Avatar'
import { useStore } from 'vuex'
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
    const onSelectItem = id => $store.commit('app/SetSelectedItemId', id)

    return {
      items,
      onSelectItem,
      selectedItemId,
      isLeftEdge,
      boxStyle: inject('boxStyle')
    }
  }
})
</script>

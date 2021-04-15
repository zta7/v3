<template>
  <q-list>
    <q-item
      v-for='item in items'
      :key='item.id'
      clickable
      :active='item.id === selectedItemId'
      active-class='bg-blue text-white'
      :style='{ ...boxStyle, width: itemWidth + "px" }'
      @click='selectedItemId = item.id'>
      <q-item-section avatar>
        <q-avatar>
          <img :src='item.avatar'>
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
    </q-item>
  </q-list>
</template>
<script>
import { defineComponent, ref, inject, provide, computed } from 'vue'
export default defineComponent({
  props: {
    itemWidth: {
      type: Number,
      required: true
    }
  },
  setup() {
    const isLeftEdge = inject('isLeftEdge')
    const item = {
      avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      label: 'Brunch this weekend?',
      perCaption: 'Janet',
      caption: '-- I\'ll be in your neighborhood doing errands thisweekend. Do you want to grab brunch?',
      lastUpdateTime: 'Mon',
      unarchivedNumber: 1234
    }
    const items = Array.from({ length: 20 }, (e, i) => {
      return {
        id: i,
        ...item
      }
    })
    const selectedItemId = ref(2)
    const selectedItem = computed(() => items.find(e => e.id === selectedItemId.value))
    provide('selectedItem', selectedItem)
    return {
      items,
      selectedItemId,
      isLeftEdge,
      boxStyle: inject('boxStyle')
    }
  }
})
</script>

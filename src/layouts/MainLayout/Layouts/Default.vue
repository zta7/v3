<template>
  <q-page :style-fn='styleFn'>
    <q-layout container>
      <div class='fixed-full row no-wrap'>
        <folder-list />
        <q-separator vertical />
        <q-splitter
          v-model='splitterItemsContent'
          unit='px'
          :limits='splitterLimits'>
          <template #before>
            <div class='q-pt-md column no-wrap full-height no-scroll'>
              <div class='q-px-md text-center cursor-pointer'>
                <q-input v-if='!isLeftEdge' outlined dense label='Search' autofocus />
                <div v-else style='height: 40px'>
                  <q-icon name='search' size='24px' @click='searchIconClick' />
                </div>
              </div>
              <q-scroll-area class='col-grow'>
                <item-list :item-width='splitterItemsContent' />
              </q-scroll-area>
            </div>
          </template>

          <template #after>
            <div class='q-pa-md column no-wrap full-height no-scroll'>
              <!-- <q-scroll-area class='col-grow'> -->
              <item-content />
              <!-- </q-scroll-area> -->
            </div>
          </template>
        </q-splitter>
      </div>
      <left-drawer />
    </q-layout>
  </q-page>
</template>
<script>
import { defineComponent, provide, ref, computed } from 'vue'
import leftDrawer from './Default/LeftDrawer/'
import folderList from './Default/FolderList'
import itemContent from './Default/ItemContent'
import itemList from './Default/ItemList'
import LocalStorageUtil from 'utils/LocalStorage'
export default defineComponent({
  components: {
    leftDrawer,
    folderList,
    itemContent,
    itemList
  },
  setup() {
    const drawerLeft = ref(false)
    provide('drawerLeft', drawerLeft)

    const splitterLimits = [75, 350]
    const splitterDefaultValue = 250
    const splitterItemsContent = LocalStorageUtil({
      key: 'SplitterItemsContent',
      validateFn: v => v >= splitterLimits[0] && v <= splitterLimits[1] && Object.prototype.toString.call(v) === '[object Number]',
      toValue: splitterDefaultValue
    })

    const isLeftEdge = computed(() => splitterItemsContent.value === splitterLimits[0])
    provide('isLeftEdge', isLeftEdge)

    const styleFn = (offset, height) => {
      return {
        height: `${height - offset}px`
      }
    }

    const searchIconClick = () => {
      splitterItemsContent.value = splitterDefaultValue
    }

    return {
      styleFn,
      splitterItemsContent,
      splitterLimits,
      isLeftEdge,
      searchIconClick
    }
  }
})
</script>

<template>
  <q-page :style-fn='styleFn'>
    <q-layout container>
      <div class='fixed-full row no-wrap'>
        <folder-list />
        <q-splitter
          v-model='splitterItemsContent'
          class='col-grow'
          unit='px'
          :limits='splitterLimits'>
          <template #before>
            <div class='column no-wrap full-height no-scroll'>
              <div class='row items-center justify-center cursor-pointer' :style='boxStyle'>
                <q-input v-if='!isLeftEdge' class='full-width q-px-md' filled dense label='Search' autofocus />
                <q-icon v-else name='search' size='24px' @click='searchIconClick' />
              </div>
              <q-scroll-area class='col-grow'>
                <item-list :item-width='splitterItemsContent' />
              </q-scroll-area>
            </div>
          </template>

          <template #after>
            <item-content />
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
      key: 'splitterItemsContent',
      validateFn: v => v >= splitterLimits[0] && v <= splitterLimits[1] && Object.prototype.toString.call(v) === '[object Number]',
      toValue: splitterDefaultValue
    })
    const isLeftEdge = computed(() => splitterItemsContent.value === splitterLimits[0])
    provide('isLeftEdge', isLeftEdge)

    const boxStyle = {
      minWidth: '75px',
      minHeight: '60px'
      // padding: '0'
    }

    provide('boxStyle', boxStyle)

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
      searchIconClick,
      boxStyle
    }
  }
})
</script>

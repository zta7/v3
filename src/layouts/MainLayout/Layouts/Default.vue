<template>
  <q-page :style-fn='styleFn'>
    <q-layout container>
      <q-list class='fixed column no-wrap' style='top: 0; bottom: 0;left: 0;'>
        <q-btn icon='menu' flat class='box' @click='drawerLeft = true' />
        <q-btn
          class='box no-border-radius'
          flat
          no-caps
          :class='{"bg-primary text-white" : selectedFolder === allChatsFolder.id}'
          @click='select(allChatsFolder.id)'>
          <q-icon :name='allChatsFolder.icon' />
          <span class='full-width text-caption'>{{ allChatsFolder.label }}</span>
        </q-btn>
        <q-scroll-area
          class='column no-wrap scroll col-grow'>
          <q-btn v-for='(b,i) in list' :key='i' class='box' stack no-caps flat>
            <q-icon :name='b.icon' />
            <span class='full-width text-caption' style='word-break: break-all'>{{ b.label }}</span>
          </q-btn>
        </q-scroll-area>
        <q-btn flat class='box' no-caps>
          <q-icon name='checklist' />
          <span class='full-width text-caption'>Edit</span>
        </q-btn>
      </q-list>
      <left-drawer />
    </q-layout>
  </q-page>
</template>
<script>
import { defineComponent, inject, provide, ref } from 'vue'
import leftDrawer from './Default/LeftDrawer'
export default defineComponent({
  components: {
    leftDrawer
  },
  setup() {
    const drawerLeft = ref(false)
    provide('drawerLeft', drawerLeft)

    const selectedFolder = inject('selectedFolder')

    const allChatsFolder = {
      id: 'All Chats',
      icon: 'mdi-forum-outline',
      label: 'All chats'
    }
    const list = []

    const styleFn = (offset, height) => {
      return {
        height: `${height - offset}px`
      }
    }

    const select = id => {
      selectedFolder.value = id
    }

    return {
      styleFn,
      list,
      drawerLeft,
      selectedFolder,
      allChatsFolder,
      select
    }
  }
})
</script>
<style scoped>
  .box {
    width: 75px;
    min-height: 50px;
    padding-left: 0;
    padding-right: 0
  }

  .active {
    background: red
  }
</style>

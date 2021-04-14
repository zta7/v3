<template>
  <q-list class='column no-wrap list'>
    <q-btn icon='menu' class='box' flat @click='drawerLeft = true' />
    <q-btn
      class='box no-border-radius'
      flat
      no-caps
      :class='{"bg-primary text-white" : allFolder.isActive}'
      @click='select(allFolder.id)'>
      <q-icon :name='allFolder.icon' />
      <span class='full-width text-caption'>{{ allFolder.label }}</span>
    </q-btn>
    <q-scroll-area
      class='column no-wrap scroll col-grow no-scroll'>
      <q-btn
        v-for='(b,i) in customFolder'
        :key='i'
        class='box no-border-radius'
        :class='{"bg-primary text-white" : b.isActive}'
        stack
        no-caps
        flat
        @click='select(b.id)'>
        <q-icon :name='b.icon' />
        <span class='full-width text-caption' style='word-break: break-all'>{{ b.label }}</span>
      </q-btn>
      <q-btn flat class='box' no-caps>
        <q-icon name='checklist' />
        <span class='full-width text-caption'>Edit</span>
      </q-btn>
    </q-scroll-area>
  </q-list>
</template>
<script>
import { defineComponent, inject, watch, reactive, computed } from 'vue'

export default defineComponent({
  setup() {
    const drawerLeft = inject('drawerLeft')
    const selectedFolder = inject('selectedFolder')
    const list = reactive([
      {
        id: 'All Chats',
        icon: 'mdi-forum-outline',
        label: 'All chats'
      },
      {
        id: 'dasdsa',
        icon: 'mdi-folder-outline',
        label: 'All chats'
      }
    ])

    const allFolder = computed(() => list[0])
    const customFolder = computed(() => list.slice(1, list.length))

    watch(selectedFolder, (n, o) => {
      const active = list.find(e => e.id === n)
      const preActive = list.find(e => e.id === o)
      const iconOutline = '-outline'
      if (active) {
        active.icon = active.icon.replace(`${iconOutline}`, '')
        active.isActive = true
      }
      if (preActive) {
        preActive.icon = `${preActive.icon}${iconOutline}`
        preActive.isActive = false
      }
    }, {
      immediate: true
    })

    const select = id => {
      selectedFolder.value = id
    }

    return {
      drawerLeft,
      selectedFolder,
      allFolder,
      list,
      select,
      customFolder
    }
  }
})
</script>
<style scoped>
  .list {
    width: 75px
  }
  .box {
    width: 75px;
    min-height: 50px;
    padding-left: 0;
    padding-right: 0
  }
</style>

<template>
  <q-list class='column no-wrap list bg-blue-grey-14 text-grey'>
    <q-btn icon='menu' :style='boxStyle' flat @click='drawerLeft = true' />
    <q-btn
      class='no-border-radius'
      :style='boxStyle'
      flat
      no-caps
      :class='{"bg-primary text-white" : allFolder.isActive}'
      @click='select(allFolder.id)'>
      <q-icon :name='allFolder.icon' />
      <span class='full-width text-caption'>{{ allFolder.label }}</span>
    </q-btn>
    <q-scroll-area
      class='column no-wrap scroll col-grow no-scroll'>
      <div :id='dragContaierId'>
        <q-btn
          v-for='(b,i) in customFolder'
          :key='i'
          :style='boxStyle'
          class='no-border-radius drag'
          :class='{"bg-primary text-white" : b.isActive, }'
          stack
          no-caps
          flat
          @click='select(b.id)'>
          <q-icon :name='b.icon' />
          <span class='full-width text-caption' style='word-break: break-all'>{{ b.label }}</span>
          <q-menu
            touch-position
            context-menu>
            <q-list dense style='min-width: 100px'>
              <q-item v-close-popup clickable>
                <q-item-section>Edit Folder</q-item-section>
              </q-item>
              <q-item v-close-popup clickable>
                <q-item-section>Remove Folder</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <q-btn :style='boxStyle' flat no-caps @click='editFolder'>
        <q-icon name='checklist' />
        <span class='full-width text-caption'>Edit</span>
      </q-btn>
    </q-scroll-area>
  </q-list>
</template>
<script>
import { defineComponent, inject, watch, reactive, computed, onMounted } from 'vue'
import folderDialog from 'components/Dialogs/Folder'
import { Dialog } from 'quasar'
import { Sortable } from '@shopify/draggable'
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
        id: '1',
        icon: 'mdi-folder-outline',
        label: '1'
      },
      {
        id: '2',
        icon: 'mdi-folder-outline',
        label: '2'
      },
      {
        id: '3',
        icon: 'mdi-folder-outline',
        label: '3'
      },
      {
        id: '4',
        icon: 'mdi-folder-outline',
        label: '4'
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
    const editFolder = () => {
      Dialog.create({
        component: folderDialog
      })
    }

    const dragContaierId = 'custom-folder-container'

    onMounted(() => {
      const droppable = new Sortable(document.getElementById(dragContaierId), {
        draggable: '.drag',
        mirror: {
          // appendTo: containerSelector,
          // constrainDimensions: true
        }
      })
      droppable.on('drag:start', evt => console.log(evt))
      droppable.on('drag:move', () => console.log('drag:move'))
      droppable.on('drag:stop', () => console.log('drag:stop'))
    })

    return {
      drawerLeft,
      selectedFolder,
      allFolder,
      list,
      select,
      customFolder,
      editFolder,
      dragContaierId,
      boxStyle: {
        ...inject('boxStyle'),
        padding: 0
      }
    }
  }
})
</script>
<style scoped>
  .list {
    width: 75px
  }
</style>

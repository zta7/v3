<template>
  <q-list class='column no-wrap list bg-blue-grey-14 text-grey'>
    <q-btn icon='menu' :style='boxStyle' flat @click='drawerLeft = true' />
    <q-btn
      class='no-border-radius'
      :style='boxStyle'
      flat
      no-caps
      :class='{"bg-primary text-white" : selectedFolderId === allFolder.id}'
      @click='select(allFolder.id)'>
      <q-icon :name='selectedFolderId === allFolder.id ? "mdi-forum-outline" : "mdi-forum"' />
      <span class='full-width text-caption'>{{ allFolder.name }}</span>
    </q-btn>
    <q-scroll-area
      class='column no-wrap scroll col-grow no-scroll'>
      <div v-sortable='sortableOptions'>
        <q-btn
          v-for='(b,i) in customFolders'
          :key='i'
          :style='boxStyle'
          class='no-border-radius drag'
          :class='{"bg-primary text-white" : selectedFolderId === b.id, }'
          stack
          no-caps
          flat
          @click='select(b.id)'>
          <q-icon :name='selectedFolderId === b.id ? "mdi-folder-outline": "mdi-folder"' />
          <span class='full-width text-caption' style='word-break: break-all'>{{ b.name }}</span>
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
      <q-btn :style='boxStyle' flat no-caps @click='editFolders'>
        <q-icon name='checklist' />
        <span class='full-width text-caption'>Edit</span>
      </q-btn>
    </q-scroll-area>
  </q-list>
</template>
<script>
import { defineComponent, inject, onMounted, shallowRef } from 'vue'
import folderDialog from 'components/Dialogs/Folder'
import { Dialog } from 'quasar'
// import { Sortable } from '@shopify/draggable'
import { $db } from 'boot/dexie'

export default defineComponent({
  setup() {
    const drawerLeft = inject('drawerLeft')
    const selectedFolderId = inject('selectedFolderId')

    const allFolder = {
      id: 'All',
      name: 'All chats'
    }
    const customFolders = shallowRef([])

    $db.folders.toArray(arr => {
      customFolders.value = arr
    })

    const select = id => {
      selectedFolderId.value = id
    }

    const editFolders = () => {
      Dialog.create({
        component: folderDialog
      }).onOk(async({ folders, deletes }) => {
        $db.transaction('rw', $db.folders, async() => {
          const puts = folders.filter(f => !deletes.includes(f.id))
          await $db.folders.bulkPut(puts)
          await $db.folders.bulkDelete(deletes)
        })
      })
    }
    const sortableOptions = {
      draggable: '.drag',
      mirror: {
        constrainDimensions: true,
        xAxis: false
      }
    }
    onMounted(() => {
      // const sortable = new Sortable(dragContainer.value, {
      //   draggable: '.drag',
      //   mirror: {
      //     constrainDimensions: true,
      //     xAxis: false
      //   }
      // })
      // sortable.on('sortable:stop', evt => {
      //   if (dragContainer.value === evt.newContainer && dragContainer.value === evt.oldContainer && evt.oldIndex !== evt.newIndex) {
      //     // 更新数据就好了
      //   }
      // })
    })

    return {
      // dragContainer,
      drawerLeft,
      selectedFolderId,
      allFolder,
      // list,
      select,
      customFolders,
      editFolders,
      boxStyle: {
        ...inject('boxStyle'),
        padding: 0
      },
      sortableOptions
    }
  }
})
</script>
<style scoped>
  .list {
    width: 75px
  }
</style>

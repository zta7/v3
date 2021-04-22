<template>
  <q-list class='column no-wrap bg-blue-grey-14 text-grey cursor-pointer' style='width: 75px'>
    <div class='column no-wrap items-center justify-center q-pa-xs' style='min-height: 60px' @click='drawerLeft = true'>
      <q-icon name='menu' flat size='24px' />
    </div>
    <div class='column no-wrap items-center justify-center q-pa-xs' :class='{"bg-primary text-white": selectedFolderId === allFolder.id}' style='min-height: 60px' @click='onSelect(allFolder.id)'>
      <q-icon :name='selectedFolderId === allFolder.id ? "mdi-forum-outline" : "mdi-forum"' size='24px' />
      <span class='text-caption'>{{ allFolder.name }}</span>
    </div>
    <!-- <q-btn
      class='no-border-radius'
      flat
      no-caps
      :class='{"bg-primary text-white" : selectedFolderId === allFolder.id}'
      @click='onSelect(allFolder.id)'>
      <q-icon :name='selectedFolderId === allFolder.id ? "mdi-forum-outline" : "mdi-forum"' />
      <span class='full-width text-caption'>{{ allFolder.name }}</span>
    </q-btn> -->
    <q-scroll-area
      class='column no-wrap scroll col-grow no-scroll'>
      <div v-sortable='sortableOptions'>
        <div
          v-for='b in customFolders'
          :key='b.id'
          style='min-height: 60px'
          class='drag column no-wrap items-center justify-center q-pa-xs'
          :class='{"bg-primary text-white" : selectedFolderId === b.id, }'
          @click='onSelect(b.id)'>
          <q-icon :name='selectedFolderId === b.id ? "mdi-folder-outline": "mdi-folder"' size='24px' />
          <span class='text-caption text-center' style='word-break: break-all'>{{ b.name }}</span>
          <q-menu
            touch-position
            context-menu>
            <q-list dense style='min-width: 100px'>
              <q-item v-close-popup clickable @click='onEditFolder(b)'>
                <q-item-section>Edit Folder</q-item-section>
              </q-item>
              <q-item v-close-popup clickable @click='onRemoveFolder(b.id)'>
                <q-item-section>Remove</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
      <q-btn flat no-caps @click='onEditFolders'>
        <q-icon name='checklist' />
        <span class='full-width text-caption'>Edit</span>
      </q-btn>
    </q-scroll-area>
  </q-list>
</template>
<script>
import { defineComponent, inject, computed } from 'vue'
import { useStore } from 'vuex'
import foldersDialog from 'components/Dialogs/Folders'
import confirmDialog from 'components/Dialogs/Confirm'
import editFolderDialog from 'components/Dialogs/EditFolder'

import { Dialog } from 'quasar'
import { $db } from 'boot/dexie'

export default defineComponent({
  setup() {
    const drawerLeft = inject('drawerLeft')
    const $store = useStore()
    const allFolder = {
      id: 'All',
      name: 'All chats'
    }

    const selectedFolderId = computed(() => $store.getters['app/selectedFolderId'])
    const customFolders = computed(() => $store.getters['app/folders'])

    const onSelect = id => $store.commit('app/SetSelectedFolderId', id)

    const onEditFolders = () => {
      Dialog.create({
        component: foldersDialog,
        componentProps: {
          folders: customFolders.value
        }
      }).onOk(async({ folders, deletes }) => {
        $db.transaction('rw', $db.folders, async() => {
          const puts = folders.filter(f => !deletes.includes(f.id))
          await $db.folders.bulkPut(puts)
          await $db.folders.bulkDelete(deletes)
        })
      })
    }

    const onEditFolder = folder => {
      Dialog.create({
        component: editFolderDialog,
        componentProps: {
          folder
        }
      }).onOk(folder => {
        $db.folders.put(folder)
      })
    }

    const onRemoveFolder = id => {
      Dialog.create({
        component: confirmDialog,
        componentProps: {
          content: 'This will remove the folder, your items will not be deleted.',
          confirmBtnLabel: 'Remove'
        }
      }).onOk(() => {
        $db.folders.delete(id)
      })
    }

    const sortableOptions = {
      draggable: '.drag',
      mirror: {
        constrainDimensions: true,
        xAxis: false
      }
    }

    return {
      onEditFolder,
      onRemoveFolder,
      drawerLeft,
      selectedFolderId,
      allFolder,
      onSelect,
      customFolders,
      onEditFolders,
      sortableOptions
    }
  }
})
</script>

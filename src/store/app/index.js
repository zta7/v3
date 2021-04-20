const SELECTED_FOLDER_ALL_ID = 'All'
const MAX_FOLDER_ITEMS = 100

const state = {
  folders: [],
  items: [],
  selectedFolderId: SELECTED_FOLDER_ALL_ID,
  selectedItemId: ''
}

const mutations = {
  SetFolders: (state, folders) => {
    state.folders = folders
  },
  SetItems: (state, items) => {
    state.items = items
  },
  SetSelectedFolderId: (state, v) => {
    state.selectedFolderId = v
  },
  SetSelectedItemId: (state, v) => {
    state.selectedItemId = v
  }
}

const getters = {
  folders: state => state.folders,
  items: state => state.items,
  selectedFolderId: state => state.selectedFolderId,
  selectedItemId: state => state.selectedItemId,

  folderItems: state => {
    if (state.selectedFolderId === SELECTED_FOLDER_ALL_ID) return state.items
    else {
      const selectedFolder = state.folders.find(e => e.id === state.selectedFolderId)
      if (!selectedFolder) return []
      return state.items.filter(e => selectedFolder.items.includes(e.id))
    }
  }
}

export default {
  namespaced: true,
  mutations,
  getters,
  // actions,
  state
}

export { SELECTED_FOLDER_ALL_ID, MAX_FOLDER_ITEMS }

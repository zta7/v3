const state = {
  folders: [],
  items: []
}

const mutations = {
  SetFolders: (state, folders) => {
    state.folders = folders
  }
}

const getters = {
  folders: state => state.folders,
  items: state => state.items
}

export default {
  namespaced: true,
  mutations,
  getters,
  // actions,
  state
}

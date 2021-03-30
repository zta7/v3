const state = {
  fullscreen: 1
}

const mutations = {
  setFullscreen(state, v) {
    state.fullscreen = v
  }
}

export default {
  namespaced: true,
  mutations,
  // actions,
  state
}

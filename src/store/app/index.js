const state = {
}

const mutations = {
  init(state, obj) {
    Object.assign(state, obj)
  },
  set(state, { key, value }) {
    state[key] = value
  }
}

export default {
  namespaced: true,
  mutations,
  // actions,
  state
}

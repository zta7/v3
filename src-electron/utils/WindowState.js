'use strict'

// import { ref } from 'vue'

const { reactive } = require('vue')

const state = reactive({
  WindowBounds: undefined,
  IsMaximized: undefined,
  ZoomLevel: undefined
})

module.exports.manage = function(win) {
  const Store = require('electron-store')
  const store = new Store()
  const _ = require('lodash')

  const init = () => {
    state.WindowBounds = store.get('WindowBounds')
    state.IsMaximized = store.get('IsMaximized')
    state.ZoomLevel = store.get('ZoomLevel')

    if (state.IsMaximized) win.maximize()
    else win.setBounds(state.WindowBounds)
  }

  init()

  const saveState = _.debounce(() => {
    const IsMaximized = win.isMaximized()
    const WindowBounds = win.getBounds()
    state.IsMaximized = IsMaximized
    state.WindowBounds = WindowBounds
    store.set('WindowBounds', win.getBounds())
    store.set('IsMaximized', IsMaximized)
  }, 200)

  // win.once('ready-to-show', () => {
  //   win.webContents.setZoomLevel(2)
  //   win.show()
  // })

  win.on('resize', () => {
    saveState()
  })
  win.on('move', () => {
    saveState()
  })
}

module.exports.state = state

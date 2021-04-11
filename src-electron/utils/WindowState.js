'use strict'

const _ = require('lodash')
const Store = require('electron-store')
const store = new Store()

module.exports = function(win) {
  const bounds = store.get('WindowBounds')
  const isMaximized = store.get('isMaximized')
  const Zoom = store.get('ZoomLevel')

  const init = () => {
    if (isMaximized) win.maximize()
    else win.setBounds(bounds)
  }

  init()

  const saveState = _.debounce(() => {
    store.set('WindowBounds', win.getBounds())
    store.set('isMaximized', win.isMaximized())
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

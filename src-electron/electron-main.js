import { app, BrowserWindow, nativeTheme, Tray, Menu, nativeImage, webFrame } from 'electron'
import path from 'path'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
}
catch (_) {
  // continue regardless of error
}

let win
function createWindow() {
  const winStateManager = require('./utils/WindowState')
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1000,
    height: 800,
    frame: false,
    // https://www.electronjs.org/docs/api/browser-window#setting-backgroundcolor
    backgroundColor: '#ffffff',
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })
  winStateManager(win)

  win.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    win.webContents.openDevTools()
  }
  else {
    // we're on production; no access to devtools pls
    win.webContents.on('devtools-opened', () => {
      win.webContents.closeDevTools()
    })
  }

  win.on('maximize', () => {
    win.webContents.send('maximize')
  })

  win.on('unmaximize', () => {
    win.webContents.send('unmaximize')
  })

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (win === null) createWindow()
})

// let tray = null
// app.whenReady().then(() => {
//   tray = new Tray(path.resolve(__dirname, 'icons/icon.ico'))
//   const contextMenu = Menu.buildFromTemplate([
//     {
//       label: 'Open'
//     },
//     {
//       label: 'Quit'
//     }
//   ])
//   tray.setToolTip('This is my application.')
//   tray.setContextMenu(contextMenu)
// })

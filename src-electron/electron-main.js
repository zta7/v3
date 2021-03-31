import { app, BrowserWindow, nativeTheme } from 'electron'
import path from 'path'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
}
catch (_) {
  // continue regardless of error
}

let mainWindow
const preloadFile = 'preload.json'

function createWindow() {
  /**
   * Initial window options
   */
  const low = require('lowdb')
  const FileSync = require('lowdb/adapters/FileSync')
  const adapter = new FileSync(preloadFile)
  const db = low(adapter)
  const width = db.get('width').value()
  const height = db.get('height').value()
  const x = db.get('x').value()
  const y = db.get('y').value()
  mainWindow = new BrowserWindow({
    width,
    height,
    x,
    y,
    useContentSize: true,
    fullscreenable: false,
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

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  }
  else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('maximizze')
  })

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('unmaximize')
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('close', () => {
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync(preloadFile)
    const db = low(adapter)
    const Bounds = mainWindow.getBounds()
    for (const [k, v] of Object.entries(Bounds)) db.set(k, v).write()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

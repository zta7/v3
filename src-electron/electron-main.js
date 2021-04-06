import { app, BrowserWindow, nativeTheme, sc } from 'electron'
import path from 'path'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
}
catch (_) {
  // continue regardless of error
}

let win
function createWindow() {
  const winStateKeeper = require('electron-window-state')
  const winState = winStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  })
  win = new BrowserWindow({
    x: winState.x,
    y: winState.y,
    width: winState.width,
    height: winState.height,
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
  winState.manage(win)
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

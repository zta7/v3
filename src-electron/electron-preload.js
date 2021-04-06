import { contextBridge, remote, ipcRenderer } from 'electron'
import { Dialog } from 'quasar'
const os = require('os')
const mkdirp = require('mkdirp')
const path = require('path')
const jf = require('jsonfile')

const { BrowserWindow, shell } = remote

contextBridge.exposeInMainWorld('electron', {
  minimize() {
    BrowserWindow.getFocusedWindow().minimize()
  },

  toggleMaximize() {
    const win = BrowserWindow.getFocusedWindow()

    if (win.isMaximized()) win.unmaximize()

    else win.maximize()
  },

  allWindows() {
    return BrowserWindow.getAllWindows()
  },

  close() {
    BrowserWindow.getFocusedWindow().close()
  },

  isMaximized() {
    return BrowserWindow.getFocusedWindow().isMaximized()
  },

  openOsInformation() {
    shell.openPath(osFullFile)
  },

  openOsWindow() {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
    win.loadURL('https://github.com')
  },

  $on(channel, func) {
    ipcRenderer.on(channel, (evt, ...args) => {
      func(evt, ...args)
    })
  },

  $off(channel) {
    ipcRenderer.removeListener(channel)
  }

})

const osFile = 'os-list.json'
const osFullFile = path.join(remote.app.getPath('userData'), osFile)

contextBridge.exposeInMainWorld('node', {
  osInformation() {
    let osKeys = []
    const rewrite = () => {
      const defaultKeys = [
        'arch', 'cpus', 'freemem', 'homedir', 'hostname', 'networkInterfaces', 'platform', 'release'
      ]
      mkdirp.sync(osFile)
      jf.writeFileSync(osFullFile, defaultKeys)
      return defaultKeys
    }

    const json = jf.readFileSync(osFullFile, { throws: false })
    if (Object.prototype.toString.call(json) === '[object Array]') osKeys = json
    else osKeys = rewrite()

    const data = {}
    try {
      osKeys.forEach(e => {
        data[e] = os[e]()
      })
    }
    catch (err) {
      return {}
    }

    return data
  }
})

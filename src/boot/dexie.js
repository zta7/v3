import Dexie from 'dexie'
import 'dexie-observable'
import { boot } from 'quasar/wrappers'

const $db = new Dexie('Main')

export default boot(() => {
  $db.version(1).stores({
    folders: '$$id, name, items',
    items: '$$id, name, caption, avatar'
  })
})

window.$db = $db

export { $db }

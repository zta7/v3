import { LocalStorage } from 'quasar'
import { provide, watch, ref } from 'vue'

export default (k, cb = () => {}) => {
  const _ref = ref(LocalStorage.getItem(k))
  provide(k, _ref)
  cb(_ref.value)
  watch(_ref, n => {
    cb(n)
    LocalStorage.set(k, n)
  })
}

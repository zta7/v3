import { LocalStorage } from 'quasar'
import { provide, watch, ref } from 'vue'

export default ({ key, toValue, validateFn }, cb = () => {}) => {
  let v = LocalStorage.getItem(key)

  if (validateFn && !validateFn(v)) v = toValue

  const _ref = ref(v)
  provide(key, _ref)
  cb(_ref.value)
  watch(_ref, n => {
    cb(n)
    LocalStorage.set(key, n)
  })
  return _ref
}

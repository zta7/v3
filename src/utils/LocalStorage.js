import { LocalStorage } from 'quasar'
import { provide as p, watch, ref } from 'vue'

export default ({ key, toValue, validateFn, provide }, cb = () => {}) => {
  let v = LocalStorage.getItem(key)
  console.log('validate')
  if (validateFn && !validateFn(v)) v = toValue

  const _ref = ref(v)
  if (!provide) p(key, _ref)

  cb(_ref.value)
  watch(_ref, n => {
    console.log(n)
    cb(n)
    LocalStorage.set(key, n)
  })
  return _ref
}

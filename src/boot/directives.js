import { boot } from 'quasar/wrappers'
import { Sortable } from '@shopify/draggable'
import { isPlainObject } from 'lodash'

export default boot(({ app }) => {
  app.directive('sortable', {
    mounted(el, binding) {
      const options = isPlainObject(binding.value) || {}
      const sortable = new Sortable(el, options)
      sortable.on('sortable:stop', evt => {
        console.log(evt)
        // if (dragContainer.value === evt.newContainer && dragContainer.value === evt.oldContainer && evt.oldIndex !== evt.newIndex) {
        //   // 更新数据就好了
        // }
      })
    }
  })
})

<template>
  <q-splitter
    :model-value='splitter.model'
    class='absolute-full no-scroll'
    :after-class='{ "hidden": !itemContentInfo}'
    unit='px'
    :limits='splitter.limits'
    :disable='splitter.disable'
    reverse>
    <template #before>
      <div class='column no-wrap full-height no-scroll'>
        <q-item :style='{ ...boxStyle }'>
          <q-item-section>
            <q-item-label lines='1'>Item with caption</q-item-label>
            <q-item-label caption lines='1'>Caption</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn-group flat>
              <q-btn icon='search' round />
              <q-btn icon='mdi-information-outline' round v-bind='infoBinds' @click='toogleItemContentInfo' />
              <q-btn icon='mdi-dots-vertical' round />
            </q-btn-group>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-scroll-area class='col-grow q-px-md'>
          <div v-for='n in 1000' :key='n'>
            {{ n }}. XXXX
          </div>
        </q-scroll-area>
      </div>
    </template>

    <template #after>
      <div class='full-height no-scroll column no-wrap'>
        <q-item :style='{...boxStyle}'>
          <q-item-section class='text-subtitle1'>
            Info
          </q-item-section>
          <q-item-section side>
            <q-btn icon='close' flat round @click='itemContentInfo = false' />
          </q-item-section>
        </q-item>
        <q-scroll-area class='col-grow'>
          <item-content-info />
        </q-scroll-area>
      </div>
    </template>
  </q-splitter>
</template>
<script>
import { defineComponent, inject, computed, reactive } from 'vue'
import LocalStorageUtil from 'utils/LocalStorage'
import itemContentInfo from './ItemContentInfo/'
export default defineComponent({
  components: {
    itemContentInfo
  },
  setup() {
    const itemContentInfo = LocalStorageUtil({
      key: 'itemContentInfo',
      validateFn: v => v === true || v === false,
      toValue: false
    })
    const infoBinds = computed(() => {
      const style = {
        textColor: itemContentInfo.value ? 'primary' : ''
      }
      return style
    })

    const toogleItemContentInfo = () => {
      itemContentInfo.value = !itemContentInfo.value
    }

    let splitter
    {
      const limits = [290, 390]
      const disable = computed(() => !itemContentInfo.value)
      const model = LocalStorageUtil({
        key: 'splitterItemcontentItemContentInfo',
        validateFn: v => v >= limits[0] && v <= limits[1] && Object.prototype.toString.call(v) === '[object Number]',
        toValue: limits[0],
        provide: false
      })
      splitter = reactive({
        limits,
        disable,
        model
      })
    }

    return {
      boxStyle: inject('boxStyle'),
      itemContentInfo,
      toogleItemContentInfo,
      infoBinds,
      splitter
    }
  }
})
</script>

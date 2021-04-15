<template>
  <q-splitter v-model='splitter.model' class='absolute-full' unit='px' :limits='splitter.limits' :disable='splitter.disable' reverse>
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
            {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium
          </div>
        </q-scroll-area>
      </div>
    </template>

    <template #after class='hidden'>
      <div class='full-height no-scroll column no-wrap'>
        <div>
          132
        </div>
        <q-scroll-area class='col-grow'>
          <div v-for='n in 100' :key='n'>
            iafujioquwoieruqorjfqlkjrlwqjrelqjeqkl
          </div>
        </q-scroll-area>
      </div>
    </template>

    <div>
      <q-input v-for='e in list' :key='e.label' v-model='e.value' label='e.label' />
    </div>
  </q-splitter>
</template>
<script>
import { defineComponent, inject, computed, reactive, watch, ref, shallowRef } from 'vue'
import LocalStorageUtil from 'utils/LocalStorage'
export default defineComponent({
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
        toValue: limits[0]
      })
      splitter = reactive({
        limits,
        disable,
        model
      })
    }

    watch(itemContentInfo, n => {
      if (!n) splitter.model = 0
    }, {
      immediate: true
    })

    const list = shallowRef([
      {
        type: 'input',
        label: 'lable1',
        value: '123'
      },
      {
        type: 'input',
        label: 'lable2',
        value: '123'
      }
    ])

    console.log(list)

    return {
      boxStyle: inject('boxStyle'),
      itemContentInfo,
      toogleItemContentInfo,
      infoBinds,
      splitter,
      list
    }
  }
})
</script>

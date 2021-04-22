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
        <q-item style='height: 60px'>
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
          <svg id='svg' style='height: 1000px' />
        </q-scroll-area>
      </div>
    </template>

    <template #after>
      <div class='full-height no-scroll column no-wrap'>
        <q-item :style='{...box}'>
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
import { defineComponent, inject, computed, reactive, onMounted } from 'vue'
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

    const data = [
      {
        switch: {

        },
        areas: [
          {
            title: '3D打印区域',
            devices: [
              {
                title: '3D打印机'
              }
            ]
          }
        ]
      }
    ]

    onMounted(() => {
      const s = Snap('#svg')
      const lineStyle = {
        stroke: '#000',
        strokeWidth: 2
      }
      const arrowStyle = {
        stroke: '#000',
        strokeWidth: 2,
        fill: 'transparent'
      }
      const circleStyle = {
        stroke: '#000',
        strokeWidth: 2,
        fill: 'transparent'
      }

      s.line(10, 0, 10, 80).attr({ ...lineStyle })
      s.text(20, 15, '3D打印机')
      s.line(10, 40, 180, 40).attr({ ...lineStyle })

      s.rect(60, 33, 34, 14)

      s.path('M45 45,L40 40,L45 35').attr({
        ...arrowStyle
      })
      s.path('M50 45,L45 40,L50 35').attr({
        ...arrowStyle
      })
      s.path('M105 45,L110 40,L105 35').attr({
        ...arrowStyle
      })
      s.path('M110 45,L115 40,L110 35').attr({
        ...arrowStyle
      })

      const ballFn = (x, y) => {
        const r = 5
        const lineHeight = 8
        const XOffset = 5
        s.circle(x, y, r).attr({ ...circleStyle })
        s.line(x - r - XOffset, y, x + r + XOffset, y).attr({ ...lineStyle })
        s.line(x, y - r, x, y - r - lineHeight).attr({ ...lineStyle })
        s.line(x - XOffset, y - r - 6, x + XOffset, y - r - 2).attr({ ...lineStyle })
        s.line(x - XOffset, y - r - 10, x + XOffset, y - r - 6).attr({ ...lineStyle })
      }

      ballFn(150, 19)
      ballFn(150, 40)
      ballFn(150, 61)

      s.path('M200 40, L180 30, L180 50Z').attr({ ...arrowStyle })
    })
    return {
      box: inject('box'),
      itemContentInfo,
      toogleItemContentInfo,
      infoBinds,
      splitter
    }
  }
})
</script>

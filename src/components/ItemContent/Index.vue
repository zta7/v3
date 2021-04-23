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
        <q-scroll-area class='col-grow'>
          <div id='svg' />
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
import { defineComponent, inject, computed, reactive, onMounted, ref } from 'vue'
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
      const strokeWidth = 2
      const lineStyle = {
        stroke: 'red',
        strokeWidth
      }
      const arrowStyle = {
        fill: 'red'
      }
      const circleStyle = {
        stroke: 'red',
        strokeWidth,
        fill: 'transparent'
      }
      const rectStyle = {
        stroke: 'red',
        strokeWidth
      }
      const rectOff = {
        fill: 'transparent'
      }
      const rectOn = {
        fill: 'red'
      }
      const area = (title, state, A = '---', B = '---', C = '---') => {
        const s = Snap()

        s.line(strokeWidth / 2, 0, strokeWidth / 2, 80).attr({ ...lineStyle })
        s.text(strokeWidth + 10, 15, title)

        s.line(strokeWidth / 2, 80 / 2, 40, 80 / 2).attr({ ...lineStyle })

        const g = s.g(
          s.line(45, 40, 60, 40).attr({ ...lineStyle }),
          s.line(60, 40, 64, 40).attr({ ...lineStyle }),
          s.line(94, 40, 110, 40).attr({ ...lineStyle }),
          s.path(`M45 45,L40 40,L45 35,L50 35,L45 40,L50 45Z`).attr({
            ...arrowStyle
          }),
          s.path('M110 45,L115 40,L110 35,L105 35,L110 40,L105 45Z').attr({
            ...arrowStyle
          })
        )

        const rect = s.rect(63, 33, 30, 15).attr({ ...rectStyle })
        state ? rect.attr({ ...rectOn }) : rect.attr({ ...rectOff })

        s.line(115, 80 / 2, 140, 80 / 2).attr({ ...lineStyle })
        s.line(160, 80 / 2, 180, 80 / 2).attr({ ...lineStyle })

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

        s.path('M197 40, L180 30, L180 50Z').attr({ ...arrowStyle })

        s.text(220, 19, A).attr({ fill: 'yellow' })
        s.text(220, 40, B).attr({ fill: 'green' })
        s.text(220, 61, C).attr({ fill: 'red' })

        s.text(280, 19, 'A').addClass('fill-yellow-13')
        s.text(280, 40, 'A').addClass('fill-green-10')
        s.text(280, 61, 'A').addClass('fill-red-10')

        return s
      }
      const col = areas => {
        const b = Snap()
        let width = 0
        const textY = 15
        let preY = 25

        b.text(5, textY, '3D打印区域')

        areas.forEach((e, i, arr) => {
          const box = e.getBBox()
          if (box.w > width) width = box.w
          e.attr({
            y: preY
          })
          preY += box.h
          b.append(e.node)
        })

        b.line(0, 25, width + 20, 25).attr({ ...lineStyle })

        b.attr({
          width: width + 20,
          height: textY + preY
        })
        return b
      }

      const row = blocks => {
        const r = Snap()
        let preX = 0
        let height = 0
        let width = 0
        blocks.forEach((e, i, arr) => {
          const box = e.getBBox()
          if (box.h > height) height = box.h
          width += box.w
          e.attr({
            x: preX
          })
          preX += box.w
          r.add(e)
        })
        r.attr({
          width,
          height
        })
        return r
      }
      // const b = block([area(), area()])

      document.getElementById('svg').append(row([col([area(), area()]), col([area(), area(), area()])]).node)
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
<style>
  .fill-red-10 {
    fill: #b71c1c
  }
  .fill-yellow-13{
    fill: #ffea00
  }
  .fill-green-10 {
    fill: #1b5E20
  }
</style>

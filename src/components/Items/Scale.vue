<template>
  <q-item v-ripple dense tag='label'>
    <q-item-section thumbnail>
      <q-icon name='aspect_ratio' />
    </q-item-section>
    <q-item-section>
      Default interface scale
    </q-item-section>
  </q-item>
  <q-item dense>
    <q-item-section thumbnail>
      <q-icon />
    </q-item-section>
    <q-item-section>
      <transition-group id='dragula_container' name='list' tag='div' class='row justify-between no-wrap'>
        <div
          v-for='(o, i) in scaleLine'
          :key='o.id'
          class='col-grow cursor-pointer row items-center justify-center line q-mx-xs'
          :class='o.v === 1 ? selectedColor : color'
          @click='move(o.id, i)' />
      </transition-group>
      <div class='row justify-between no-wrap'>
        <span v-for='(o, i) in scaleLine' :key='i' class='col-grow cursor-pointer text-center text-caption non-selectable' @click='move(o.id, i)'>{{ o.scale * 100 }}%</span>
      </div>
    </q-item-section>
  </q-item>
</template>
<script>
import { defineComponent, shallowRef, triggerRef } from 'vue'
export default defineComponent({
  setup(props, context) {
    const color = 'bg-grey-3'
    const selectedColor = 'bg-primary'

    const windowScale = window.electron.getZoom()

    const scaleList = [
      1, 1.25, 1.5, 2.0, 2.5, 3.0
    ]
    const data = scaleList.map((e, i) => {
      return {
        id: i,
        v: 0,
        scale: e
      }
    })
    data.find(e => e.scale === windowScale).v = 1
    const scaleLine = shallowRef(data)

    const move = async(toId, toIndex) => {
      const selectedIndex = scaleLine.value.findIndex(e => e.v === 1)
      if (selectedIndex === toIndex) return

      const selected = scaleLine.value.find(e => e.v === 1)

      scaleLine.value[toIndex].id = selected.id
      scaleLine.value[toIndex].v = 1

      scaleLine.value[selectedIndex].id = toId
      scaleLine.value[selectedIndex].v = 0

      triggerRef(scaleLine)
      setTimeout(() => {
        window.electron.setZoom(scaleLine.value[toIndex].scale)
      }, 300)
    }
    return {
      scaleLine,
      color,
      selectedColor,
      scaleList,
      move
    }
  }
})
</script>
<style>
  .line {
    height: 4px;
    width: 90%
  }

  .list-move {
    transition: all 0.3s ease
  }

</style>

<template>
  <q-item v-ripple dense tag='label'>
    <q-item-section thumbnail>
      <q-icon name='aspect_ratio' />
    </q-item-section>
    <q-item-section>
      Default interface scale
    </q-item-section>
    <q-item-section side>
      <q-toggle />
    </q-item-section>
  </q-item>
  <q-item dense>
    <q-item-section thumbnail>
      <q-icon />
    </q-item-section>
    <q-item-section>
      <transition-group id='dragula_container' name='list' tag='div' class='row justify-between instruments'>
        <div
          v-for='(o, i) in scaleLine'
          :key='o.id'
          class='col-grow cursor-pointer row items-center justify-center line q-mx-xs'
          :class='o.v === 1 ? selectedColor : color'
          @click='move(o.id, i)' />
      </transition-group>
      <div class='row justify-between'>
        <span v-for='i in scaleList' :key='i' class='col-grow text-center text-caption non-selectable'>{{ i * 100 }}%</span>
      </div>
    </q-item-section>
  </q-item>
</template>
<script>
import { defineComponent, inject, ref, onMounted, shallowReactive, shallowRef, reactive, toRaw, unRef, triggerRef, computed, provide } from 'vue'
import $dragula from 'dragula'
export default defineComponent({
  setup(props, context) {
    // onMounted(() => {
    //   const drake = $dragula([document.querySelector('#dragula_container')], {
    //     direction: 'vertical',
    //     moves: (el, handle) => el.classList.contains(selectedColor)
    //   })
    //   // drake.on('shadow', (el, source) => {
    //   //   return !el.classList.contains(selectedColor)
    //   // })
    // })
    const color = 'bg-grey-3'
    const selectedColor = 'bg-primary'

    const windowScale = provide('windowScale') || 1

    const scaleList = [
      1, 2, 3, 4, 5
    ]
    const data = scaleList.map((e, i) => {
      return {
        id: i,
        v: 0,
        scale: e
      }
    })
    data.find(e => e.scale === windowScale).v = 1

    const selectedScale = computed(() => data.findIndex(e => e.v === 1).scale)
    const scaleLine = shallowRef(data)

    const move = (toId, toIndex) => {
      const selectedIndex = scaleLine.value.findIndex(e => e.v === 1)
      if (selectedIndex === toIndex) return

      const selected = scaleLine.value.find(e => e.v === 1)

      scaleLine.value[toIndex].id = selected.id
      scaleLine.value[toIndex].v = 1

      scaleLine.value[selectedIndex].id = toId
      scaleLine.value[selectedIndex].v = 0

      triggerRef(scaleLine)
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

<template>
  <q-page :style-fn='styleFn'>
    <q-scroll-area style='height: 100%; max-width: 280px;' class='q-px-md'>
      <q-input outlined label='Search' dense class='q-py-md' style='positon: sticky;top: 0' />
      <div v-for='n in 20' :key='n' class='q-py-xs'>
        Lorem ipsum dolor sit amet, consectetur adipisicing
        elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua.
      </div>
    </q-scroll-area>
    <!-- <router-view /> -->
  </q-page>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {
      styleFn(offset, height) {
        return {
          height: `${height - offset}px`,
          width: '100%'
        }
      }
    }
  }
})
</script>

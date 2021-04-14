<template>
  <div class='text-h4 q-mb-md'>After</div>
  <div v-for='n in 20' :key='n' class='q-my-md'>
    {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({

})
</script>

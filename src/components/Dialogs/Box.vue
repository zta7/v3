<template>
  <q-dialog :model-value='dialog' @update:model-value='update'>
    <q-card style='width: 360px; top: 5vh; bottom: 5vh'>
      <q-card-section>
        <div class='text-h6'>{{ title }}</div>
      </q-card-section>
      <q-card-section style='max-height: 50vh' class='scroll'>
        <slot />
      </q-card-section>
      <q-separator />
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const dialog = ref(false)
    const update = v => {
      console.log(v)
      emit('update:modelValue', v)
    }

    return {
      dialog,
      update
    }
  }
})
</script>

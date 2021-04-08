<template>
  <q-dialog :model-value='dialog' @update:model-value='update'>
    <q-card style='width: 420px'>
      <q-card-section>
        <q-item class='no-padding' dense>
          <q-item-section class='text-h6'>
            {{ title }}
          </q-item-section>
          <q-item-section side>
            <q-btn-group flat>
              <slot name='btn' />
              <q-btn v-close-popup icon='close' flat round dense />
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator size='8px' class='inset-shadow inset-shadow-down' />
      <q-card-section style='max-height: 80vh' class='scroll'>
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
      emit('update:modelValue', v)
    }

    return {
      dialog,
      update
    }
  }
})
</script>

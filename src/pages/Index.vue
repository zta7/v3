<template>
  <q-page class='flex flex-center'>
    {{ os }}
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  setup(props, context) {
    const os_keys = [
      'arch', 'cpus', 'freemem', 'homedir', 'hostname', 'networkInterfaces', 'platform',
      'release'
    ]
    const os = ref({})
    const os_timber = () => {
      os.value = window.node.osInformation(os_keys)
      setInterval(() => {
        os.value = window.node.osInformation(os_keys)
      }, 5000)
    }

    onMounted(() => {
      os_timber()
    })

    onUnmounted(() => {
      clearInterval(os_timber)
    })

    return {
      os
    }
  }
})
</script>

<template>
  <q-page class='flex flex-center'>
    <q-card bordered class='no-shadow' style='max-width: 750px'>
      <q-item>
        <q-item-section class='text-h6'>OS Information</q-item-section>
        <q-item-section side>
          <q-btn-group flat>
            <q-btn icon='launch' flat round dense color='positive' @click='openOsWindow' />
            <q-btn icon='edit' flat round dense color='primary' @click='openOsFile' />
          </q-btn-group>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section>
        <div class='column no-wrap'>
          <div v-for='[k,v] of Object.entries(os)' :key='k' class='row no-wrap'>
            <div class='text-subtitle2 col-2'>{{ k }}</div>
            <q-space />
            <div class='col-9'>
              <span v-if='k === "cpus"'> {{ v.length }} </span>
              <span v-else-if='k === "totalmem"'>{{ format.humanMemorySize(os.totalmem, 'byte', 'GB') }}</span>
              <span v-else-if='k === "freemem"'>{{ format.humanMemorySize(os.freemem, 'byte', 'GB') }}</span>
              <span v-else-if='k === "homedir"'>{{ v }}</span>
              <div v-else-if='k === "networkInterfaces"' class='column no-wrap'>
                <div v-for='[k2,v2] of Object.entries(v)' :key='k2' class='column no-wrap'>
                  <span>{{ k2 }}</span>
                  <div v-for='(v3, i) in v2' :key='i' class='column no-wrap q-ml-md'>
                    <span>{{ v3 }}</span>
                  </div>
                </div>
              </div>
              <span v-else>{{ v }}</span>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { format } from 'quasar'

export default defineComponent({
  name: 'PageIndex',
  setup(props, context) {
    const os = ref({})
    const os_timber = () => {
      os.value = window.node.osInformation()
      setInterval(() => {
        os.value = window.node.osInformation()
      }, 5000)
    }

    const openOsFile = () => window.electron.openOsInformation()
    const openOsWindow = () => window.electron.openOsWindow()

    onMounted(() => {
      os_timber()
    })

    onUnmounted(() => {
      clearInterval(os_timber)
    })

    return {
      os,
      format,
      openOsFile,
      openOsWindow
    }
  }
})
</script>

<template>
  <q-item>
    <q-item-section avatar>
      <item-avatar :name='item.name' :avatar='item.avatar' :badge='badge' />
    </q-item-section>
    <q-item-section v-if='mid'>
      <q-item-label lines='1' class='text-subtitle2'>{{ item.name }}</q-item-label>
      <q-item-label lines='1'>
        <span class='text-caption text-weight-light'>{{ item.caption || 'No caption' }}</span>
      </q-item-label>
    </q-item-section>
    <q-item-section v-if='right' side>
      <div class='column no-wrap items-end justify-between'>
        <span>{{ item.lastUpdateTime }}</span>
        <span>{{ item.unarchivedNumber }}</span>
      </div>
    </q-item-section>
  </q-item>
</template>
<script>
import { defineComponent } from 'vue'
import itemAvatar from 'components/Avatars/index'

export default defineComponent({
  components: {
    itemAvatar
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    display: {
      type: String,
      required: false,
      default: 'lmr'
    },
    badge: {
      type: Boolean,
      required: false,
      default: false
    }
    // active: {
    //   type: Object,
    //   required: false,
    //   default: () => {
    //     return {
    //       active: false,
    //       mutiple: false
    //     }
    //   }
    // }
  },
  setup(props) {
    const [left, mid, right] = props.display.split('')
    return {
      left,
      mid,
      right
    }
  }
})
</script>

<template>
  <q-page :style-fn='styleFn'>
    <q-layout container>
      <div class='fixed-full row no-wrap'>
        <q-list class='column no-wrap list'>
          <q-btn icon='menu' flat class='box' @click='drawerLeft = true' />
          <q-btn
            class='box no-border-radius'
            flat
            no-caps
            :class='{"bg-primary text-white" : selectedFolder === allChatsFolder.id}'
            @click='select(allChatsFolder.id)'>
            <q-icon :name='allChatsFolder.icon' />
            <span class='full-width text-caption'>{{ allChatsFolder.label }}</span>
          </q-btn>
          <q-scroll-area
            class='column no-wrap scroll col-grow no-scroll'>
            <q-btn v-for='(b,i) in list' :key='i' class='box' stack no-caps flat>
              <q-icon :name='b.icon' />
              <span class='full-width text-caption' style='word-break: break-all'>{{ b.label }}</span>
            </q-btn>
            <q-btn flat class='box' no-caps>
              <q-icon name='checklist' />
              <span class='full-width text-caption'>Edit</span>
            </q-btn>
          </q-scroll-area>
        </q-list>
        <q-separator vertical />
        <q-splitter
          v-model='splitterModel'>
          <template #before>
            <div class='q-pa-md column no-wrap full-height no-scroll'>
              <q-input outlined dense label='Search' class='q-pb-md' />
              <q-scroll-area class='col-grow'>
                <q-list>
                  <q-item v-for='i in 50' :key='i' class='no-padding'>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src='https://cdn.quasar.dev/img/boy-avatar.png'>
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label lines='1'>Brunch this weekend?</q-item-label>
                      <q-item-label caption lines='1'>
                        <span class='text-weight-bold'>Janet</span>
                        -- I'll be in your neighborhood doing errands this
                        weekend. Do you want to grab brunch?
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div class='column no-wrap items-end justify-between text-caption'>
                        <q-badge color='transparent' text-color='grey'>
                          Mon
                        </q-badge>
                        <q-badge color='blue'>
                          #30250
                        </q-badge>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>
            </div>
          </template>

          <template #after>
            <div class='q-pa-md'>
              <div class='text-h4 q-mb-md'>After</div>
              <div v-for='n in 20' :key='n' class='q-my-md'>{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
            </div>
          </template>
        </q-splitter>
      </div>
      <left-drawer />
    </q-layout>
  </q-page>
</template>
<script>
import { defineComponent, inject, provide, ref } from 'vue'
import leftDrawer from './Default/LeftDrawer'
export default defineComponent({
  components: {
    leftDrawer
  },
  setup() {
    const drawerLeft = ref(false)
    provide('drawerLeft', drawerLeft)

    const selectedFolder = inject('selectedFolder')

    const allChatsFolder = {
      id: 'All Chats',
      icon: 'mdi-forum-outline',
      label: 'All chats'
    }
    const list = [
      {
        id: 'All Chats',
        icon: 'mdi-forum-outline',
        label: 'All chats'
      },
      {
        id: 'All Chats',
        icon: 'mdi-forum-outline',
        label: 'All chats'
      },
      {
        id: 'All Chats',
        icon: 'mdi-forum-outline',
        label: 'All chats'
      },
      {
        id: 'All Chats',
        icon: 'mdi-forum-outline',
        label: 'All chats'
      },
      {
        id: 'All Chats',
        icon: 'mdi-forum-outline',
        label: 'All chats'
      },
      {
        id: 'All Chats',
        icon: 'mdi-forum-outline',
        label: 'All chats'
      },
      {
        id: 'All Chats',
        icon: 'mdi-forum-outline',
        label: 'All chats'
      },
      {
        id: 'All Chats',
        icon: 'mdi-forum-outline',
        label: 'All chats'
      },
      {
        id: 'All Chats',
        icon: 'mdi-forum-outline',
        label: 'All chats'
      }
    ]

    const styleFn = (offset, height) => {
      return {
        height: `${height - offset}px`
      }
    }

    const select = id => {
      selectedFolder.value = id
    }

    return {
      styleFn,
      list,
      drawerLeft,
      selectedFolder,
      allChatsFolder,
      select,
      splitterModel: ref(20)
    }
  }
})
</script>
<style scoped>
  .list {
    width: 75px
  }
  .box {
    width: 75px;
    min-height: 50px;
    padding-left: 0;
    padding-right: 0
  }

  /* .active {
    background: red
  } */
</style>

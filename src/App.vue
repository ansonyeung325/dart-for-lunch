<script lang="ts">
import { RouterView } from 'vue-router'
import { globalStore } from './store/store';
import Loader from '@/components/Loader.vue'

export default {
  components: {
    Loader,

  },
  data() {
    return {
      globalStore: globalStore
    }
  }
}

</script>

<template>
  <Loader v-if="globalStore.showLoading" />
  <RouterView />
</template>

<style scoped>
@import './styles/base.css';
</style>

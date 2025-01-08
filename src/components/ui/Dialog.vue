<script lang="ts">
import Chip from '@/components/ui/Chip.vue'
import ActionButton from './ActionButton.vue'
import IconButton from './IconButton.vue';

export default {
  name: 'Dialog',
  components: {
    Chip,
    ActionButton,
    IconButton
  },
  data() {
    return {
    }
  },
}
</script>
<template>
  <div class="form-container">
    <div class="form-headline">
      <slot name="title"></slot>
    </div>

    <div class="form-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<style scoped>
@import '@/styles/base.css';
@import '@/styles/font.css';

.form-container {
  position: absolute;
  left: 50%;
  top: 0;
  height: 100%;
  width: 600px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: var(--color-container);
  border-radius: 30px;
  box-shadow: var(--container-boxshadow);
  transform: translate(-50%);
  z-index: 2;
}

.form-headline {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  position: relative;
}

.form-body {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}
</style>

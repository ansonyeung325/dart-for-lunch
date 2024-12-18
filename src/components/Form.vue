<script lang="ts">
export default {
  name: 'Form',
  data() {
    return {}
  },
}
</script>
<template>
  <div class="form-container"></div>
</template>
<style>
@import '@/styles/base.css';
@import '@/styles/font.css';

.form-container {
  height: 100%;
  padding: 20px 20px 40px 20px;
  background: var(--color-container);
  border-radius: 30px;
  box-shadow: var(--container-boxshadow);
}
</style>

<script lang="ts">
export default {
  data() {
    return {}
  },
}
</script>

<template>
  <button class="elevated-btn-container">開始</button>
</template>

<style>
@import '@/styles/base.css';
@import '@/styles/font.css';

.elevated-btn-container {
  width: 200px;
  height: 100%;
  background-color: var(--color-positive);
  padding: 10px;
  border: 2px solid white;
  border-radius: 30px;
  font-size: var(--font-size-subtitle-1);
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.elevated-btn-container:hover {
  scale: 1.04;
}
</style>

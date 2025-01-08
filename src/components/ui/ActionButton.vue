<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    positive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    style() {
      if (this.positive) {
        return {
          backgroundColor: 'rgb(125, 234, 192)',
          color: 'white',
        }
      } else {
        return {
          backgroundColor: 'white',
          color: 'rgba(0, 0, 0, 0.52)',
        }
      }
    },
  },
}
</script>

<template>
  <button class="elevated-btn-container" :style="style">{{ title }}</button>
</template>

<style>
@import '@/styles/base.css';
@import '@/styles/font.css';

.elevated-btn-container {
  width: 200px;
  height: 100%;
  /* background-color: var(--color-positive); */
  padding: 10px;
  border: 2px solid white;
  border-radius: 30px;
  font-size: var(--font-size-subtitle-1);
  /* color: white; */
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

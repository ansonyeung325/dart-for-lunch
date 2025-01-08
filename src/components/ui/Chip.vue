<script lang="ts">
export default {
  name: 'Chip',
  props: {
    name: {
      type: String,
    },
    selected: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {}
  },
}
</script>
<template>
  <div class="chip body2" :class="{ active: selected }" @click="$emit('child-click')">
    {{ name }}
    <!-- <font-awesome-icon icon="check" v-if="selected" /> -->
  </div>
</template>
<style>
.chip {
  height: fit-content;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 10px 30px;
  color: var(--color-text);
  background-color: var(--color-container);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: var(--container-light-boxshadow);
  transition: all 0.2s;
}

.chip:hover {
  scale: 1.04;
}

.active {
  color: white;
  box-shadow: var(--container-inset-boxshadow);
  background-color: var(--color-active);
}
</style>

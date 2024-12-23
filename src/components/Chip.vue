<script lang="ts">
export default {
  name: 'Chip',
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {}
  },
}
</script>
<template>
  <div class="chip body2">
    <div>{{ name }}</div>
  </div>
</template>
<style>
.chip {
  padding: 2px;
  border-radius: 30px;
  box-shadow: var(--container-light-boxshadow);
  cursor: pointer;
  transition: all 0.2s;
}

.chip div {
  padding: 6px 20px;
  border-radius: 30px;
  border: 2px solid var(--color-primary);
}

.chip:hover {
  scale: 1.04;
}
</style>

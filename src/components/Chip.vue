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
  <div class="chip body2" @click="$emit('child-click')">
    <div>
      {{ name }}
      <font-awesome-icon icon="check" v-if="selected" />
    </div>
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
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 20px;
  border-radius: 30px;
  border: 2px solid var(--color-primary);
  transition: all 0.2s;
}

.chip:hover {
  scale: 1.04;
}
</style>

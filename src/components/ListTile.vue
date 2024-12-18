<script lang="ts">
export default {
  name: 'ListTile',
  props: {
    ranking: { type: Number },
    title: { type: String },
    lastEatDate: { type: String },
    twoInARow: { type: Number },
    count: { type: Number },
  },
  data() {
    return {}
  },
  mounted() {},
}
</script>
<template>
  <div class="list-tile">
    <div class="col-s subtitle1">{{ ranking! + 1 }}</div>
    <div class="col-s subtitle1">{{ title }}</div>
    <div class="col-l subtitle1">{{ lastEatDate }}</div>
    <div class="col-s subtitle1">{{ twoInARow }}</div>
    <div class="col-s subtitle1">{{ count }}</div>
  </div>
</template>
<style scoped>
@import url('@/styles/base.css');
@import url('@/styles/font.css');

.list-tile {
  display: flex;
  padding: 10px 20px;
  /* border: 1px solid var(--color-disable); */
  border-radius: 30px;
  box-shadow: var(--container-light-boxshadow);
  transition: all 0.2s;
}

.list-tile:hover {
  scale: 1.04;
}

.col-s {
  flex: 1;
  text-align: center;
}

.col-m {
  flex: 2;
  text-align: center;
}

.col-l {
  flex: 3;
  text-align: center;
}
</style>

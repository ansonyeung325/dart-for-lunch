<script lang="ts">
import ListTile from '@/components/ui/ListTile.vue'
import ActionButton from '@/components/ui/ActionButton.vue'

export default {
  name: 'Leaderboard',
  components: {
    ListTile,
    ActionButton,
  },
  props: {},
  data() {
    return {
      list: [],
    }
  },
  mounted() {

  },
  methods: {
    async getRecord(): Promise<void> {
      let res = await fetch(`/api/record/ranking`);
      let json: [] = await res.json();
      this.list = this.list.concat(json);
    }
  },
}
</script>
<template>
  <ul class="list">
    <div class="list-header">
      <div class="col-s subtitle1">排名</div>
      <div class="col-s subtitle1">菜式</div>
      <div class="col-l subtitle1">上次食日期</div>
      <div class="col-s subtitle1">連食次數</div>
      <div class="col-s subtitle1">次數</div>
    </div>
    <!-- <ListTile v-for="(item, index) in list" :title="item.title" :count="item.count" :twoInARow="item.twoInARow"
        :lastEatDate="item.lastEatDate" :ranking="index" /> -->
  </ul>
</template>
<style scoped>
@import url('@/styles/base.css');
@import url('@/styles/font.css');

.leaderboard {
  display: flex;
  flex-direction: column;
  padding: 20px 30px 40px 30px;
  background: var(--color-container);
  border-radius: 30px;
  box-shadow: var(--container-boxshadow);
}

.leaderboard-headline {
  padding-bottom: 10px;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}

.list {
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  gap: 16px;
}

.list-header {
  display: flex;
  padding: 10px 0;
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

/* .action {
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
} */

@media screen and (max-width: 1080px) {
  .leaderboard {
    margin: 20px;
  }
}
</style>

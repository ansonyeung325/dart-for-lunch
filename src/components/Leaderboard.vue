<script lang="ts">
import ListTile from '@/components/ListTile.vue'
import moment from 'moment'
import ActionButton from '@/components/ActionButton.vue'

export default {
  name: 'Leaderboard',
  components: {
    ListTile,
    ActionButton,
  },
  props: {},
  data() {
    return {
      list: [
        { title: '西式', lastEatDate: moment().format('YYYY-MM-DD'), twoInARow: 2, count: 5 },
        { title: '中式', lastEatDate: moment().format('YYYY-MM-DD'), twoInARow: 2, count: 2 },
        { title: '韓式', lastEatDate: moment().format('YYYY-MM-DD'), twoInARow: 2, count: 4 },
        { title: '日式', lastEatDate: moment().format('YYYY-MM-DD'), twoInARow: 2, count: 8 },
        { title: '米線', lastEatDate: moment().format('YYYY-MM-DD'), twoInARow: 2, count: 2 },
      ],
    }
  },
  mounted() {},
}
</script>
<template>
  <div class="leaderboard">
    <div class="headline6 leaderboard-headline">排行榜</div>

    <ul class="list">
      <div class="list-header">
        <div class="col-s subtitle1">排名</div>
        <div class="col-s subtitle1">菜式</div>
        <div class="col-l subtitle1">上次食日期</div>
        <div class="col-s subtitle1">連食次數</div>
        <div class="col-s subtitle1">次數</div>
      </div>
      <ListTile
        v-for="(item, index) in list"
        :title="item.title"
        :count="item.count"
        :twoInARow="item.twoInARow"
        :lastEatDate="item.lastEatDate"
        :ranking="index"
      />
    </ul>

    <div class="action">
      <ActionButton @click="$emit('child-click')" />
    </div>
  </div>
</template>
<style scoped>
@import url('@/styles/base.css');
@import url('@/styles/font.css');

.leaderboard {
  padding: 20px 20px 40px 20px;
  background: var(--color-container);
  border-radius: 30px;
  box-shadow: var(--container-boxshadow);
}

.leaderboard-headline {
  margin-bottom: 20px;
  text-align: center;
}

.list {
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  gap: 16px;
}

.list-header {
  display: flex;
  padding: 10px 20px;
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

.action {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1080px) {
  .leaderboard {
    margin: 20px;
  }
}
</style>

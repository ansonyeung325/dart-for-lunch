<script lang="ts">
import ListTile from '@/components/ListTile.vue'
import moment from 'moment'

export default {
  name: 'Leaderboard',
  components: {
    ListTile,
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
      <button class="elevated-btn-wrapper" @click="$emit('child-click')">
        <div class="elevated-btn-container">開始</div>
      </button>
    </div>
  </div>
</template>
<style scoped>
@import url('@/styles/base.css');
@import url('@/styles/font.css');

.leaderboard {
  padding: 20px 20px 40px 20px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.leaderboard-headline {
  margin-bottom: 20px;
  text-align: center;
}

.list {
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  gap: 10px;
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

.elevated-btn-wrapper {
  min-width: 200px;
  background-color: var(--color-background);
  padding: 2px;
  border: none;
  border-radius: 20px;
  font-size: var(--font-size-subtitle-1);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.elevated-btn-container {
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
  padding: 10px;
  border: 1px solid var(--color-primary);
  border-radius: 20px;
  font-size: var(--font-size-subtitle-1);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.elevated-btn-wrapper:hover {
  scale: 1.04;
}

@media screen and (max-width: 900px) {
  .leaderboard-warpper {
    margin: 0 20px;
  }
}
</style>

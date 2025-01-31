<script lang="ts">
import Chip from '@/components/ui/Chip.vue'
import ActionButton from '@/components/ui/ActionButton.vue'
import IconButton from '@/components/ui/IconButton.vue';
import type { PropType } from 'vue';
import type { MenuStateStore } from '@/models/interface';

export default {
  name: 'Form',
  components: {
    Chip,
    ActionButton,
    IconButton
  },
  props: {
    onStart: {
      type: Function,
      required: true,
    },
    stateStore: {
      type: Object as PropType<MenuStateStore>,
      required: true,
    }
  },
  data() {
    return {
    }
  },
  computed: {
    gamemode() {
      let selectedGamemode = this.stateStore.gamemode;
      if (!selectedGamemode) {
        return "未選擇模式"
      }
      return this.stateStore.gamemode?.name;
    }
  }
}
</script>
<template>
  <div class="subtitle1 section-title">模式</div>
  <div class="gamemode-section">
    <button class="mode-btn body2">
      {{ gamemode }}
    </button>
  </div>

  <div class="subtitle1 section-title">選擇菜式</div>
  <div class="chips">
    <div v-for="dish of stateStore.selectedDishes" class="chip body2">
      {{ dish }}
    </div>
  </div>
  <div class="action">
    <ActionButton :title="'開始'" @click="onStart()" />
    <ActionButton :title="'遊戲設定'" @click="stateStore.currentPage = stateStore.currentPageEnum.setting"
      :positive="false" />
  </div>
</template>
<style scoped>
@import '@/styles/base.css';
@import '@/styles/font.css';

.gamemode-section {
  display: flex;
  padding: 10px 20px;
  gap: 20px;
}

.dishes-section {
  padding: 10px 20px;
  gap: 20px;
}

.section-title {
  margin: 10px 0;
}

.mode-btn {
  color: var(--color-text);
  padding: 10px 30px;
  background-color: var(--color-container);
  border: none;
  border-radius: 30px;
  box-shadow: var(--container-light-boxshadow);
  transition: all 0.2s;
}

.input-wrapper {
  position: relative;
}

.suffix {
  position: absolute;
  padding: 10px;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  transition: all 0.2s;
  cursor: pointer;
}

.suffix:hover {
  color: var(--color-primary);
}

.dish-input {
  width: 100%;
  padding: 10px 30px 10px 20px;
  border-radius: 20px;
  border: none;
  box-shadow: var(--container-inset-boxshadow);
}

.active {
  color: white;
  box-shadow: var(--container-inset-boxshadow);
  background-color: var(--color-active);
}

.dish-input:focus {
  outline: none;
}

.chip {
  height: fit-content;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 10px 30px;
  color: var(--color-text);
  background-color: var(--color-container);
  border: none;
  border-radius: 30px;
  box-shadow: var(--container-light-boxshadow);
  transition: all 0.2s;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 100%;
  margin: 10px 0;
  padding: 10px 20px;
  overflow: auto;
  gap: 10px;
}

.selected {
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
}

@media screen and (max-width: 1080px) {
  .form-container {
    margin: 20px !important;
  }
}
</style>

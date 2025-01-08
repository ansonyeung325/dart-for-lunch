<script lang="ts">
import Chip from '@/components/ui/Chip.vue'
import type { Dish } from '@/models/dish'
import type { FormData } from '@/models/componentData'
import ActionButton from './ui/ActionButton.vue'
import IconButton from './ui/IconButton.vue';

export default {
  name: 'Form',
  components: {
    Chip,
    ActionButton,
    IconButton
  },
  data(): FormData {
    return {
      dishes: [],
      selected: new Set<Dish>(),
      gamemode: null,
      isTyping: false,
      inputValue: '',
    }
  },
  mounted() {
    this.getSuggestDish()
  },
  methods: {
    async getSuggestDish(): Promise<void> {
      // "/api" here is using vite.config server proxy setting
      let response = await fetch(`/api/record`)
      let json: Object[] = await response.json()
      this.dishes = this.dishes.concat(json.map((data) => data as Dish))
    },
    selectDish(dish: Dish) {
      let beforeSize = this.selected.size
      this.selected.add(dish)
      if (this.selected.size == beforeSize) {
        this.selected.delete(dish)
      }
    },
    addNewDish() {
      if (this.selected.size > 20) {
        console.log(`Hit max selected dish`)
        return
      }
      if (this.inputValue.length > 0) {
        let newDish: Dish = { name: this.inputValue }
        this.dishes.push(newDish)
        this.selectDish(newDish)
        this.inputValue = ''
      }
    },
    onEnterKeydown(event: KeyboardEvent) {
      if (event.key == 'Enter' && this.isTyping) {
        this.addNewDish()
      }
    },
    reset() {
      this.selected = new Set<Dish>()
    },
  },
}
</script>
<template>
  <div class="subtitle1 section-title">模式</div>
  <div class="gamemode-section">
    <button @click="gamemode = 1" class="mode-btn body2" :class="{ active: gamemode == 1 }">
      掉 1 支
    </button>
    <button @click="gamemode = 2" class="mode-btn body2" :class="{ active: gamemode == 2 }">
      掉 3 支
    </button>
  </div>

  <div class="subtitle1 section-title">選擇菜式</div>
  <div class="dishes-section">
    <div class="input-wrapper">
      <input class="dish-input body2" placeholder="輸入你想食既野" v-model="inputValue" @keydown="onEnterKeydown"
        @focus="isTyping = true" @blur="isTyping = false" maxlength="20" />
      <font-awesome-icon icon="arrow-right" class="suffix" @click="addNewDish" />
    </div>
  </div>
  <div class="chips">
    <Chip v-for="dish of dishes" :key="dish.id" :name="dish.name" :selected="selected.has(dish)"
      @child-click="selectDish(dish)" />
  </div>
  <div class="action">
    <ActionButton :title="'重置'" :positive="false" @click="reset" />
    <ActionButton :title="'確認'" @click="" />
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
  cursor: pointer;
  box-shadow: var(--container-light-boxshadow);
  transition: all 0.2s;
}

.mode-btn:hover {
  scale: 1.04;
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

.chips {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 100%;
  padding: 10px 20px;
  overflow: auto;
  gap: 10px;
}

.action {
  display: flex;
  justify-content: space-around;
  margin-top: auto;
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

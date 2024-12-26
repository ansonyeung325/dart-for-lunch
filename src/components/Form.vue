<script lang="ts">
import Chip from '@/components/Chip.vue'
import type { Dish } from '@/models/dish'
import type { FormData } from '@/models/componentData'

export default {
  name: 'Form',
  components: {
    Chip,
  },
  props: {
    onBackward: {
      type: void Function,
    },
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
    onEnterKeydown(event: KeyboardEvent) {
      if (event.key == 'Enter' && this.isTyping) {
        console.log(`New dish: ${this.inputValue}`)
        if (this.inputValue.length > 0) {
        }
        return
      }
    },
  },
}
</script>
<template>
  <div class="form-container">
    <div class="headline6 form-headline">
      <font-awesome-icon icon="arrow-left" class="back-btn" @click="onBackward" />
      <div>Headline</div>
    </div>

    <div class="form-body">
      <div class="subtitle1 section-title">Game mode</div>
      <div class="gamemode-section">
        <button @click="gamemode = 1" class="mode-btn body2" :class="{ active: gamemode == 1 }">
          掉 1 支
        </button>
        <button @click="gamemode = 2" class="mode-btn body2" :class="{ active: gamemode == 2 }">
          掉 3 支
        </button>
      </div>

      <div class="subtitle1 section-title">Dish</div>
      <div class="dishes-section">
        <div class="input-wrapper">
          <input
            class="dish-input body2"
            placeholder="輸入你想食既野"
            v-model="inputValue"
            @keydown="onEnterKeydown"
            @focus="isTyping = true"
            @blur="isTyping = false"
          />
          <font-awesome-icon icon="arrow-right" class="suffix" />
        </div>
        <div class="chips">
          <Chip
            v-for="dish of dishes"
            :key="dish.id"
            :name="dish.name"
            :selected="selected.has(dish)"
            @child-click="selectDish(dish)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import '@/styles/base.css';
@import '@/styles/font.css';

.form-container {
  height: 100%;
  padding: 20px 20px 40px 20px;
  background: var(--color-container);
  border-radius: 30px;
  box-shadow: var(--container-boxshadow);
}

.form-headline {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  position: relative;
}

.form-headline div {
  flex-grow: 1;
  text-align: center;
}

.back-btn {
  height: 26px;
  width: 26px;
  padding: 6px;
  position: absolute;
  left: 0;
  background-color: var(--color-container);
  border-radius: 50%;
  box-shadow: var(--container-light-boxshadow);
  transition: all 0.2s;
  cursor: pointer;
}

.back-btn:hover {
  scale: 1.04;
}

.form-body {
  padding: 10px 20px;
}

.gamemode-section {
  display: flex;
  padding: 10px 20px;
  gap: 20px;
}

.dishes-section {
  /* display: flex; */
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
  margin-top: 10px;
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

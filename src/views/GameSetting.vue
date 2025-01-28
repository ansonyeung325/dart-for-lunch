<script lang="ts">
import Chip from '@/components/ui/Chip.vue'
import type { GameSettingData, MenuStateStore, Dish, GameMode } from '@/models/interface'
import ActionButton from '@/components/ui/ActionButton.vue'
import IconButton from '@/components/ui/IconButton.vue';
import { MenuPage } from '@/models/enum';
import type { PropType } from 'vue';


export default {
    name: 'Form',
    components: {
        Chip,
        ActionButton,
        IconButton
    },
    props: {
        stateStore: {
            type: Object as PropType<MenuStateStore>,
            required: true,
        }
    },
    data(): GameSettingData {
        return {
            suggestedDish: [],
            selectedDishes: new Set<String>(),
            gamemode: null,
            gamemodes: [],
            isTyping: false,
            inputValue: '',
        }
    },
    mounted() {
        this.getSuggestDish()
        this.getGamemodes()
        this.getMenuStateStoreValue();
    },
    methods: {
        isSelected(target: String): boolean {
            let selected = false;
            selected = this.selectedDishes.has(target)
            return selected;
        },
        getMenuStateStoreValue() {
            this.selectedDishes = new Set([...this.stateStore.selectedDishes]);
            this.gamemode = this.stateStore.gamemode;
        },
        async getSuggestDish(): Promise<void> {
            // "/api" here is using vite.config server proxy setting
            let response = await fetch(`/api/game/dishes`)
            let json: Object[] = await response.json()
            this.suggestedDish = this.suggestedDish.concat(json.map((data) => data as Dish))
        },
        async getGamemodes(): Promise<void> {
            let response = await fetch(`/api/game/gamemodes`)
            let json: Object[] = await response.json()
            this.gamemodes = this.gamemodes.concat(json.map((data) => data as GameMode))
        },
        selectDish(dish: String) {
            let beforeSize = this.selectedDishes.size;
            this.selectedDishes.add(dish);
            if (this.selectedDishes.size == beforeSize) {
                this.selectedDishes.delete(dish);
            }
        },
        addNewDish() {
            if (this.selectedDishes.size > 20) {
                return
            }
            if (this.inputValue.length > 0) {
                let newDish: Dish = { name: this.inputValue };
                let clone: Dish = JSON.parse(JSON.stringify(newDish))
                this.selectDish(clone.name)
                this.suggestedDish.push(clone)
                this.inputValue = ''
            }
        },
        onEnterKeydown(event: KeyboardEvent) {
            if (event.key == 'Enter' && this.isTyping) {
                this.addNewDish()
            }
        },
        onCancel() {
            // Back to previous page
            this.stateStore.currentPage = MenuPage.game;
        },
        async onConfirm() {
            // Update state store 
            this.stateStore.gamemode = this.gamemode;
            this.stateStore.selectedDishes = new Set(this.selectedDishes);
            this.stateStore.currentPage = MenuPage.game;
        }
    },
}
</script>
<template>
    <div class="subtitle1 section-title">模式</div>
    <div class="gamemode-section">
        <button v-for="mode of gamemodes" @click="gamemode = mode" class="mode-btn body2"
            :class="{ active: gamemode?.id === mode.id }">
            {{ mode.name }}
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
        <Chip v-for="dish of suggestedDish" :name="dish.name" :selected="isSelected(dish.name)"
            @child-click="selectDish(dish.name)" />
    </div>
    <div class="action">
        <ActionButton :title="'確定'" @click="onConfirm" />
        <ActionButton :title="'取消'" @click="onCancel" :positive="false" />
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
    margin: 10px 0;
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

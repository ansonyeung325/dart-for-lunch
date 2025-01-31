<script lang="ts">
import Dialog from '@/components/ui/Dialog.vue';
import Game from '@/views/Game.vue';
import { reactive } from 'vue'
import GameSetting from '@/views/GameSetting.vue';
import { MenuPage } from '@/models/enum';
import ActionButton from '@/components/ui/ActionButton.vue';
import type { MenuStateStore } from '@/models/interface';
import IconButton from '@/components/ui/IconButton.vue';

export default {
    name: "Menu",
    components: {
        Dialog,
        Game,
        GameSetting,
        ActionButton,
        IconButton
    },
    props: {
        onStart: {
            type: Function,
            requried: true,
        }
    },
    data() {
        return {
            stateStore: {
                currentPageEnum: MenuPage,
                gamemodes: [],
                gamemode: null,
                selectedDishes: new Set(),
                currentPage: MenuPage.game
            } as MenuStateStore,
        }
    },
    methods: {
    },
    computed: {
        headline() {
            switch (this.stateStore.currentPage) {
                case MenuPage.game:
                    return '選單';
                case MenuPage.setting:
                    return '設定';
            }
        },
    },
}

</script>
<template>
    <Dialog>
        <template #title>
            <div class="leaderboard-header">
                <div class="headline6">{{ headline }}</div>
            </div>
        </template>
        <template #body>
            <div v-if="stateStore.currentPage == stateStore.currentPageEnum.game" class="view-wrapper">
                <Game :stateStore="stateStore" :onStart="onStart!" />
            </div>
            <div v-else class="view-wrapper">
                <GameSetting :stateStore="stateStore" />
            </div>
        </template>
    </Dialog>

</template>
<style>
.slide-fade-enter-active {
    transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
}

.view-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.leaderboard-header {
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
}

.action {
    display: flex;
    justify-content: space-around;
    margin-top: auto;
}
</style>

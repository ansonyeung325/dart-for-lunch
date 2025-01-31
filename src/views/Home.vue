<script lang="ts">
import Dartboard from '@/components/Dartboard.vue'
import Header from '@/components/Header.vue';
import Leaderboard from '@/views/Leaderboard.vue'
import Menu from '@/views/Menu.vue';
import ActionButton from '@/components/ui/ActionButton.vue';
import Dialog from '@/components/ui/Dialog.vue'
import IconButton from '@/components/ui/IconButton.vue';
import type { HomeData } from '@/models/interface'
import Loader from '@/components/Loader.vue';
import { globalStore } from '@/store/store.ts';

export default {
  components: {
    Dartboard,
    Leaderboard,
    Header,
    Dialog,
    IconButton,
    ActionButton,
    Menu,
    Loader
  },
  data(): HomeData {
    return {
      rebuildKey: 0,
      canvasSize: {
        height: 300,
        width: 300,
      },
      showLeaderBoard: false,
      showForm: true,
      started: false,
      globalStore: globalStore
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeDartBoard)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeDartBoard)
  },
  methods: {
    resizeDartBoard(): void {
      // Minus the padding of container and padding inside the canvas
      this.canvasSize.height = window.innerHeight
      this.canvasSize.width = window.innerWidth
      this.rebuildKey += 1
    },
    onStart(): void {
      this.started = true;
      this.showForm = false;
    },
    onOpenLeaderboard() {
      this.showLeaderBoard = !this.showLeaderBoard;
    }
  },
}
</script>

<template>
  <main>
    <Header :onOpenLeaderboard="onOpenLeaderboard" />
    <div id="container">

      <Transition name="slide-fade">
        <Menu v-if="showForm" :onStart="onStart" />
      </Transition>

      <Transition name="slide-fade">
        <Dialog v-if="showLeaderBoard">
          <template #title>
            <div class="leaderboard-header">
              <div class="headline6">排行榜</div>
              <IconButton class="closeBtn" :icon="'xmark'" @click="showLeaderBoard = false;" />
            </div>
          </template>
          <template #body>
            <Leaderboard />
          </template>
        </Dialog>
      </Transition>

      <div class="canvas-container">
        <Dartboard :key="rebuildKey" />
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Permanent+Marker&display=swap');
@import url(@/styles/base.css);

main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

#container {
  display: flex;
  position: relative;
  height: 720px;
  padding: 20px;
}

.canvas-container {
  height: 100%;
  width: 100%;
}

.closeBtn {
  position: absolute;
  right: 0;
}

.blur-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
  z-index: 1;
}

.start-btn {
  width: 260px;
  height: 70px;
  padding: 10px;
  border: 2px solid white;
  border-radius: 40px;
  font-size: var(--font-size-subtitle-1);
  background-color: rgb(125, 234, 192);
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.start-btn:hover {
  scale: 1.04;
}

@media screen and (max-width: 1080px) {
  #container {
    display: block;
    padding: 0;
  }
}
</style>

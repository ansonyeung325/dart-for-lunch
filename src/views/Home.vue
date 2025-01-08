<script lang="ts">
import Dartboard from '@/components/Dartboard.vue'
import Form from '@/components/Form.vue'
import Header from '@/components/Header.vue';
import Leaderboard from '@/components/Leaderboard.vue'
import ActionButton from '@/components/ui/ActionButton.vue';
import Dialog from '@/components/ui/Dialog.vue'
import IconButton from '@/components/ui/IconButton.vue';
import type { HomeData } from '@/models/componentData'

export default {
  components: {
    Dartboard,
    Leaderboard,
    Form,
    Header,
    Dialog,
    IconButton,
    ActionButton
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
    // onStart(): void {
    //   this.started = true;
    //   setTimeout(() => (this.showForm = true), 500)
    // },
  },
}
</script>

<template>
  <main>
    <Header :onOpenLeaderboard="() => { showLeaderBoard = !showLeaderBoard; }" />
    <div id="container">

      <Transition name="slide-fade">
        <!-- <div class="blur-overlay" v-if="!started">
          <button class="start-btn" @click="onStart()">開始</button>
        </div> -->
        <Dialog v-if="showForm">
          <template #title>
            <div class="leaderboard-header">
              <div class="headline6">設定</div>
              <!-- <IconButton class="closeBtn" :icon="'xmark'" @click="showLeaderBoard = false;" /> -->
            </div>
          </template>
          <template #body>
            <Form />
          </template>
        </Dialog>
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
      <!-- <div class="leaderboard-warpper"> -->
      <!-- <Transition name="slide-fade">
          <Leaderboard v-if="showLeaderBoard" @child-click="onStart" />
        </Transition>
        <Transition name="slide-fade">
          <Form v-if="showForm" :onBackward="onBackward" />
        </Transition> -->
      <!-- </div> -->
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
  flex: 1;
}

.leaderboard-header {
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
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

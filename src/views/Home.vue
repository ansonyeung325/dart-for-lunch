<script lang="ts">
import Dartboard from '@/components/Dartboard.vue'
import Form from '@/components/Form.vue'
import Leaderboard from '@/components/Leaderboard.vue'
import type { HomeData } from '@/models/componentData'

export default {
  components: {
    Dartboard,
    Leaderboard,
    Form,
  },
  data(): HomeData {
    return {
      rebuildKey: 0,
      canvasSize: {
        height: 300,
        width: 300,
      },
      showLeaderBoard: true,
      showForm: false,
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
      this.showLeaderBoard = false
      setTimeout(() => (this.showForm = true), 500)
    },
    onBackward(): void {
      this.showForm = false
      setTimeout(() => (this.showLeaderBoard = true), 500)
    },
  },
}
</script>

<template>
  <main>
    <div class="brand header">DartForLunch</div>
    <div id="container">
      <div class="canvas-container">
        <Dartboard :key="rebuildKey" />
      </div>
      <div class="leaderboard-warpper" ref="leaderboard">
        <Transition name="slide-fade">
          <Leaderboard v-if="showLeaderBoard" @child-click="onStart" />
        </Transition>
        <Transition name="slide-fade">
          <Form v-if="showForm" :onBackward="onBackward" />
        </Transition>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Permanent+Marker&display=swap');
@import url(@/styles/base.css);

main {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.brand {
  font-family: 'Pacifico', cursive;
  font-weight: 400;
  font-size: 48px;
  font-style: normal;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

#container {
  display: flex;
  padding: 20px;
}

.leaderboard-warpper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.canvas-container {
  flex: 1;
}

@media screen and (max-width: 1080px) {
  #container {
    display: block;
    padding: 0;
  }
}
</style>

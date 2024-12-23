<script lang="ts">
import Dartboard from '@/components/Dartboard.vue'
import Form from '@/components/Form.vue'
import Leaderboard from '@/components/Leaderboard.vue'

export default {
  components: {
    Dartboard,
    Leaderboard,
    Form,
  },
  data() {
    return {
      boardRadius: 300,
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
      const windowWidth: number = window.innerWidth
      // Minus the padding of container and padding inside the canvas
      let newBoardRadius: number
      if (windowWidth <= 900) {
        newBoardRadius = Math.floor(windowWidth - 40 - 40)
        this.boardRadius = newBoardRadius / 2
        return
      } else {
        newBoardRadius = Math.floor((windowWidth - 40) / 4 - 40)
        if (newBoardRadius <= 220 || newBoardRadius >= 300) {
          return
        }
        this.boardRadius = newBoardRadius
      }
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
        <Dartboard :boardRadius="boardRadius" />
      </div>
      <div class="leaderboard-warpper">
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
  height: 100%;
  display: flex;
  padding: 20px 20px 20px 0;
}

.leaderboard-warpper {
  flex: 1;
  /* max-height: 200px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.canvas-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1080px) {
  #container {
    display: block;
    padding: 0;
  }
}
</style>

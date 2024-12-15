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
      gameStart: false,
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
      this.gameStart = true
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
        <Transition name="fade">
          <Leaderboard v-if="!gameStart" @child-click="onStart" />
        </Transition>
        <Transition name="fade">
          <Form v-if="gameStart" />
        </Transition>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
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
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 900px) {
  #container {
    display: block;
    padding: 0;
  }
}
</style>

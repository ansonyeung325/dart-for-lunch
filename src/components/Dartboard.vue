<script lang="js">
import Dartboard from '@/models/dartboard.js'

export default {
  name: 'Dartboard',
  props: {},
  data() {
    return {}
  },
  mounted() {
    this.initialCanvas()
  },
  watch: {
    rebuildFlag() {
      this.initialCanvas()
    },
  },
  methods: {
    initialCanvas() {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')

      // Set canvas resolution
      let padding = 40
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      let centerX = canvas.width / 2
      let centerY = canvas.height / 2
      let maxRadius = (Math.min(canvas.width, canvas.height) - padding) / 2

      // let boardHeight = padding + maxRadius * 2
      // let boardWidth = padding + maxRadius * 2

      // let lightness = 43
      // let increment = 1
      console.log(
        `Canvas details:\n{ clientWidth: ${canvas.clientWidth}, clientHeight: ${canvas.clientHeight}, maxRadius: ${maxRadius}, resolution: ${canvas.width}:${canvas.height} }`,
      )

      let dartBoard = new Dartboard(ctx, centerX, centerY, maxRadius)
      dartBoard.draw()
      // canvas.addEventListener('mousemove', (event) => {
      //   console.log(`Mouse moved`)
      //   const rect = canvas.getBoundingClientRect()
      //   const mouseX = event.clientX - rect.left
      //   const mouseY = event.clientY - rect.top
      //   dartBoard.calcMouseEnteredPosition(mouseX, mouseY)
      // })
      canvas.addEventListener('click', (event) => {
        console.log(`Mouse clicked`)
        const rect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        dartBoard.calcMouseEnteredPosition(mouseX, mouseY)
      })
    },
  },
}
</script>
<template>
  <canvas id="canvas"></canvas>
</template>
<style scoped>
@import url('@/styles/base.css');

#canvas {
  width: 100%;
  height: 100%;
}
</style>

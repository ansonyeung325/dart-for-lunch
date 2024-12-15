<script lang="js">
import Dartboard from '@/models/dartboard.js'

export default {
  name: 'Dartboard',
  props: {
    padding: { type: Number, default: 40 },
    boardRadius: { type: Number, default: 300 },
  },
  data() {
    return {}
  },
  mounted() {
    this.initialCanvas()
  },
  watch: {
    boardRadius(newValue, oldValue) {
      console.log(`old: ${oldValue}, new: ${newValue}`)
      this.initialCanvas()
    },
  },
  methods: {
    initialCanvas() {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')

      let padding = this.padding
      let maxRadius = this.boardRadius
      let boardHeight = padding + maxRadius * 2
      let boardWidth = padding + maxRadius * 2

      canvas.width = boardWidth
      canvas.height = boardHeight

      // let lightness = 43
      // let increment = 1

      console.log(`Canvas details: width: ${canvas.width} height: ${canvas.height}`)
      let dartBoard = new Dartboard(ctx, boardWidth, boardHeight, maxRadius)
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
</style>

import Section from './section.js'

export default class Dartboard {
  constructor(ctx, x, y, radius) {
    // Giving center postion and max radius to initialize a Dartboard
    // Store the state of this board
    this.ctx = ctx
    this.canvasWidth = x
    this.canvasHeight = y
    this.x = x
    this.y = y
    this.maxRadius = radius

    this.invlidSectionRadius = radius * 0.86
    this.doubleSectionRadius = radius * 0.74
    this.singleSectionRadius = radius * 0.68
    this.tripleSectionRadius = radius * 0.44
    this.innersingleSectionRadius = radius * 0.38
    this.bullRadius = radius * 0.08
    this.doubleBullRadius = radius * 0.04

    this.black = 'rgba(0, 0, 0, 0.6)'
    // Active
    this.activeBlue = 'rgb(227,71,67)'
    this.activeRed = 'rgb(136,133,229)'
    this.activeLightBlue = 'rgb(241, 230, 247)'
    this.activeLightRed = 'rgb(250, 249, 254)'

    // Inactive
    this.inactiveRed = 'rgb(222,73,79)'
    this.inactiveLightRed = 'rgb(152,123,121)'
    this.inactiveBlue = 'rgb(110,112,229)'
    this.inactiveLightBlue = 'rgb(237,227,249)'

    this.scores = [6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13]
    this.sections = []
    this.mouseEntered = false
  }

  #delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async draw() {
    console.log('Drawing dartboard')
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

    // Draw the Dartboard
    this.#drawboardbase(this.maxRadius, '#3d3d3d')

    // let oddShadow = "rgba(62,78,159,0.2)";
    // let evenShadow = "rgb(161,57,56,0.2)";

    let tempSections = []

    for (let i = 0; i <= 19; i++) {
      this.#drawInvalidArea(this.invlidSectionRadius, i, this.black)
      let bonusColor = i % 2 === 0 ? this.activeRed : this.activeBlue
      let singleColor = i % 2 === 0 ? this.activeLightRed : this.activeLightBlue

      if (i != 0 && i % 4 == 0) {
        this.sections.push(tempSections)
        tempSections = []
      }

      let double = new Section(
        this.ctx,
        this.doubleSectionRadius,
        this.singleSectionRadius,
        this.x,
        this.y,
        bonusColor,
        (i * Math.PI) / 10 - Math.PI / 20,
        (i * Math.PI) / 10 + Math.PI / 20,
        this.scores[i] * 2,
      )
      double.draw()

      let single = new Section(
        this.ctx,
        this.singleSectionRadius,
        this.tripleSectionRadius,
        this.x,
        this.y,
        singleColor,
        (i * Math.PI) / 10 - Math.PI / 20,
        (i * Math.PI) / 10 + Math.PI / 20,
        this.scores[i],
      )
      single.draw()

      let triple = new Section(
        this.ctx,
        this.tripleSectionRadius,
        this.innersingleSectionRadius,
        this.x,
        this.y,
        bonusColor,
        (i * Math.PI) / 10 - Math.PI / 20,
        (i * Math.PI) / 10 + Math.PI / 20,
        this.scores[i] * 3,
      )
      triple.draw()

      let innerSingle = new Section(
        this.ctx,
        this.innersingleSectionRadius,
        this.bullRadius,
        this.x,
        this.y,
        singleColor,
        (i * Math.PI) / 10 - Math.PI / 20,
        (i * Math.PI) / 10 + Math.PI / 20,
        this.scores[i],
      )
      innerSingle.draw()

      tempSections.push(...[double, single, triple, innerSingle])
      if (i == 19) {
        this.sections.push(tempSections)
      }
    }
    let bull = new Section(
      this.ctx,
      this.bullRadius,
      this.doubleBullRadius,
      this.x,
      this.y,
      this.activeBlue,
      0,
      2 * Math.PI,
      25,
    )
    bull.draw(true)

    let doubleBull = new Section(
      this.ctx,
      this.doubleBullRadius,
      0,
      this.x,
      this.y,
      this.activeRed,
      0,
      2 * Math.PI,
      25,
    )
    doubleBull.draw(true)

    this.sections.push([bull, doubleBull])
    console.log(this.sections)
  }

  onHover() {
    this.ctx.shadowColor = i % 2 === 0 ? evenShadow : oddShadow
    this.ctx.shadowBlur = 40
    this.ctx.shadowOffsetX = 4
    this.ctx.shadowOffsetY = 4
  }

  #drawBull(radius, color, innerColor) {
    this.ctx.fillStyle = color
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.closePath()
    // Inner Bull
    this.ctx.fillStyle = innerColor
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.doubleBullRadius, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.closePath()
  }

  #drawboardbase(radius, color) {
    this.ctx.fillStyle = color
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    this.ctx.shadowBlur = 10
    this.ctx.shadowOffsetX = 10
    this.ctx.shadowOffsetY = 8
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
    this.ctx.fill()
    // Reset shadow avoid affect other
    this.ctx.shadowColor = 'transparent'
    this.ctx.shadowBlur = 0
    this.ctx.shadowOffsetX = 0
    this.ctx.shadowOffsetY = 0
    this.ctx.closePath()
  }

  #drawInvalidArea(radius, segment, color) {
    this.ctx.fillStyle = color
    this.ctx.beginPath()
    this.ctx.arc(
      this.x,
      this.y,
      radius,
      (segment * Math.PI) / 10 - Math.PI / 20,
      (segment * Math.PI) / 10 + Math.PI / 20,
    )
    this.ctx.lineTo(this.x, this.y)
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.closePath()
    this.#drawLabel(radius, segment, 'serif', 24, 'white')
  }

  #drawLabel(radius, segment, font, size, color) {
    const angle = (segment * Math.PI) / 10 - Math.PI / 200
    const textX = this.x + (radius - 12) * Math.cos(angle)
    const textY = this.y + (radius - 12) * Math.sin(angle)

    this.ctx.fillStyle = color
    this.ctx.font = `${size}px ${font}`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'

    this.ctx.fillText(this.scores[segment], textX, textY)
  }

  calcMouseEnteredPosition(mouseX, mouseY) {
    const dx = mouseX - this.x
    const dy = this.y - mouseY
    const distance = Math.sqrt(dx * dx + dy * dy)

    const angle = Math.atan2(dy, dx)
    let clockwiseAngle = (2 * Math.PI - angle) % (2 * Math.PI)

    if (distance <= this.invlidSectionRadius) {
      this.mouseEntered = true
      for (let sections of this.sections) {
        for (let section of sections) {
          if (
            clockwiseAngle >= section.startAngle &&
            clockwiseAngle <= section.endAngle &&
            distance <= section.radius &&
            distance >= section.endRadius
          ) {
            console.log(`Inside sector: ${section.score}`)
          }
        }
      }
    } else {
      this.mouseEntered = false
    }
  }
}

/// Using the below ** ** to create highlight section effect
// If the Invalid area startAngle different to the score area,
// First started draw invalid area will on top, which can make hover like effect

// (segment * Math.PI) / 10  ** - Math.PI / 2 **  - Math.PI / 20,
// (segment * Math.PI) / 10  ** - Math.PI / 2 ** + Math.PI / 20

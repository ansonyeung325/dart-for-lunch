export default class Section {
  constructor(ctx, radius, endRadius, x, y, color, startAngle, endAngle, score) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.color = color
    this.radius = radius
    this.endRadius = endRadius
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.score = score
  }

  draw(dontDrawLine) {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle)
    if (!dontDrawLine) {
      this.ctx.lineTo(this.x, this.y)
    }
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.closePath()
  }
}

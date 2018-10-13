import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

const a = 200
const b = 100

export default
@withStyles({
  canvas: {
    width: '100%',
    height: '100%'
  }
})
class Ellipse extends PureComponent {
  componentDidMount () {
    const context = this.canvas.getContext('2d')
    this.canvas.width = 980
    this.canvas.height = 490
    this.n = 0
    this.direction = 1
    const animation = () => {
      this.draw(context, this.canvas.width, this.canvas.height)
      requestAnimationFrame(animation)
    }
    animation()
  }
  draw (context, width, height) {
    const centerX = width / 2
    const centerY = height / 2
    context.clearRect(0, 0, width, height)
    this.drawAxis(context, width, height)
    context.beginPath()
    for (let i = 0; i < 360; i++) {
      let degree = i * Math.PI / 180
      let x = a * Math.sin(degree)
      let y = b * Math.cos(degree)
      context.lineTo(x + centerX, y + centerY)
      // this.drawCircle(context, x + centerX, y + centerY)
    }
    context.closePath()
    context.strokeStyle = 'blue'
    context.lineJoin = 'round'
    context.stroke()
    this.drawRect(context, 80, this.n, centerX, centerY)
    this.n += this.direction
    
    // if (this.n === 45) this.direction = -1
    // if (this.n === 0) this.direction = 1
  }
  drawAxis (context, width, height) {
    context.strokeStyle = 'red'
    context.strokeWidth = 1
    context.beginPath()
    context.moveTo(0, height / 2)
    context.lineTo(width, height / 2)
    context.stroke()
    context.closePath()
    context.moveTo(width / 2, 0)
    context.lineTo(width / 2, height)
    context.stroke()
    context.closePath()
  }
  drawCircle (context, x, y, r = 1) {
    context.beginPath()
    context.fillStyle = '#000'
    context.arc(x, y, r, 0, 2 * Math.PI)
    context.fill()
  }
  drawRect (context, startPointX, n = 0, offsetX = 0, offsetY = 0) {
    let startPointY = b * Math.sqrt(1 - startPointX * startPointX / a / a)
    
    const distance = Math.sqrt(startPointX * startPointX + startPointY * startPointY)
    const d = Math.atan(startPointY / startPointX) * 180 / Math.PI

    const d1 = (d - n) * Math.PI / 180
    const d2 = (d + 90 - n) * Math.PI / 180
    const d3 = (d + 180 - n) * Math.PI / 180
    const d4 = (d + 270 - n) * Math.PI / 180

    const x1 = distance * Math.cos(d1)
    const x2 = distance * Math.cos(d2)
    const x3 = distance * Math.cos(d3)
    const x4 = distance * Math.cos(d4)
    const y1 = distance * Math.sin(d1)
    const y2 = distance * Math.sin(d2)
    const y3 = distance * Math.sin(d3)
    const y4 = distance * Math.sin(d4)

    const newPoint1 = { x: x1 + offsetX, y: y1 + offsetY }
    const newPoint2 = { x: x2 + offsetX, y: y2 + offsetY }
    const newPoint3 = { x: x3 + offsetX, y: y3 + offsetY }
    const newPoint4 = { x: x4 + offsetX, y: y4 + offsetY }

    context.beginPath()
    context.strokeStyle = 'red'
    context.strokeWidth = 1
    context.moveTo(newPoint1.x, newPoint1.y)
    context.lineTo(newPoint2.x, newPoint2.y)
    context.lineTo(newPoint3.x, newPoint3.y)
    context.lineTo(newPoint4.x, newPoint4.y)
    context.closePath()
    context.stroke()
    this.drawLine(context, context.canvas.width, context.canvas.height, newPoint1, newPoint3)
    this.drawLine(context, context.canvas.width, context.canvas.height, newPoint2, newPoint4)
  }
  drawLine (context, width, height, d1, d2) {
    let x1 = d1.x
    let y1 = d1.y
    let x2 = d2.x
    let y2 = d2.y
    context.beginPath()
    let k = 1, c = 0
    if (x1 === x2) {
      context.moveTo(x1, 0)
      context.lineTo(x1, height)
      context.strokeStyle = '#000'
      context.stroke()
    } else {
      k = (y2 - y1) / (x2 - x1)
      c = y1 - k * x1
      context.moveTo(0, c)
      context.lineTo(width, k * width + c)
      context.strokeStyle = '#000'
      context.stroke()
      const dots = this.getDot({ g: k, h: c }, { a, b, m: width / 2, n: height / 2  })

      this.drawDot(context, dots.x1, dots.y1)
      this.drawDot(context, dots.x2, dots.y2)
    }
  }
  drawDot (context, x, y) {
    context.beginPath()
    context.fillStyle = 'red'
    context.fillText(`x:${x}, y:${y}`, x, y)
  }
  getDot (line, ellipse) {
    const { g, h } = line
    const { a, b, m, n } = ellipse
    const B = 2 * g * (h - n) * a * a - 2 * m * b * b
    const A = b * b + g * g * a * a
    const C = a * a * ((h - n) * (h - n) - b * b) + b * b * m * m
    const delta = Math.sqrt(B * B - 4 * A * C)
    const x1 = (-B + delta) / 2 / A
    const x2 = (-B - delta) / 2 / A
    const y1 = g * x1 + h
    const y2 = g * x2 + h
    return { x1, y1, x2, y2 }
  }
  render () {
    const { classes } = this.props
    return <canvas className={classes.canvas} ref={ref => this.canvas = ref}></canvas>
  }
}
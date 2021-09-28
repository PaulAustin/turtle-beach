 
// This is a spin on on Turtle graphics famous
// from the Apple II days. And Python Turtle
// It uses the HTML Canvas and Javascript. It forgoes
// animation uses the native Canvas coordinate system by default
//
// Licensese under the MIT 
//
//

"use strict";

var gTurtles = []
var gTCC = {}

console.log('\x1b[30m');
console.log('Welcome To JS-Turtle-Graphics - PFA 0.1')

export class Beach {
  constructor() {

    // Turtle constructors connect to the beach
    // Could check to see is al ready ther, coudl allow for other beaches
    gTCC = this

    // Find the Canvas or insert one 
    let c = document.getElementById('turtleBeach')
    if (c === null) {
      c = document.createElement('canvas')
      c.id = 'turtleBeach'
      document.body.appendChild(c); // adds the canvas to the body element
    }
    this.canvas = c
    this.ctx = this.canvas.getContext("2d") 

    // Adjust the canvas to match the window size
    window.addEventListener('resize', () => {this.resizeCanvas()}, false);
    this.resizeCanvas()

    // Catch key events
    window.addEventListener('keydown', (event) => {this.keyDown(event)}, false);

    // Mouse events go to the beach. 
    this.canvas.addEventListener('click', (event) => {this._mouseDown(event)}, false);

    // Start timer tics    
    this.now = 0
    this.ticking = true
    this.step = false
    setTimeout(() => {this.tic()}, 20)
  }

  keyDown(event) {
    //  var name = event.key;
    // var code = event.code;
    if (event.key === ' ') {
      this.ticking = !this.ticking
    } else if (event.key === 's') {
      this.step = true
    }

    gTurtles.forEach((t) => {t.keyDown(event)})
  }


  _mouseDown(event) {
    if (typeof this.onMouseDown == 'function') {
      // Fix the edges 
      let x = this.invMapX(event.clientX) - 7
      let y = this.mapY(event.clientY) + 9
      this.onMouseDown(x, y, true)
    }
  }

  tic() {
    if (this.ticking || this.step || this.needsUpdate) {

      if (this.ticking || this.step) {
        this.now += 1
      }
      let tics = this.now
      gTurtles.forEach(function(t) {t.timer(tics)})
      this.refresh()
    }
    this.needsUpdate = false
    this.step = false

    setTimeout(() => {this.tic()}, 20)
  }

  update() {
    this.needsUpdate = true
  }

  resizeCanvas() {
    // When the windwo resizes size the canvas to match
    let c = this.canvas
    c.width = window.innerWidth
    c.height = window.innerHeight
    this.yc = c.height/2
    this.xc = c.width/2
    this.update()
  }

  refresh() {
    // Reset the context's treansform
    // For math grid, let translate to the shift
    this.ctx.resetTransform()
    //this.ctx.translate(this.xc, 0);
    this.ctx.textAlign = "left";
    this.ctx.lineCap = "round";

    gTurtles.forEach(function(t) {t.reset()})
    if (typeof onDraw == 'function') { 
      onDraw()
    }
    gTurtles.forEach(function(t) {t.draw()})      
  }

  mapY(y) {
    return this.yc - y
  }

  mapX(x) {
    return x + this.xc
  }

  invMapX(x) {
    return this.xc - x
  }

  line(x0, y0, x1, y1) {
    this.ctx.beginPath()
    this.ctx.moveTo(this.mapX(x0), this.mapY(y0))
    this.ctx.lineTo(this.mapX(x1), this.mapY(y1))
    this.ctx.stroke()
  }

  circle(x, y, radius) {
    // Draw a circle center where the turtle is 
    this.ctx.beginPath();
    this.ctx.arc(x, this.mapY(y), radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  stamp(x, y, image) {
    let ix = this.mapX(x)
    let iy = this.mapY(y)
    image.drawToContext(this.ctx, ix, iy)
  }

  text(x, y, message) {
    this.ctx.font = this.font
    this.ctx.fillStyle = this.penColor
    this.ctx.save();
    this.ctx.translate(this.mapX(x), this.mapY(y));
//    this.ct.rotate(this.angleInRadians);
    this.ctx.fillText(message, 0, 0);
    this.ctx.restore();
  }
}

export class Turtle {
  constructor() {
    // The origin - All Turtle drawing is relative to its origin
    // a Turtle Image can be moved on the beach by changing the 
    // the origin. 
    this.ox = 0
    this.oy = 0

    // All turtles have their own sense of time.
    this.tics = 0

    this.reset()
    gTurtles.push(this)
    this.cc = gTCC
    this.tics = 0
  }

  draw() {
  }

  timer(tics) {
    this.tics = tics
  }

  keyDown(event) {
  }

  update() {
    this.cc.update()
  }

  now() {
    return this.tics
  }
  
  reset() {
    this.penStack = []
    this.x = 0
    this.y = 0
    this.angleInRadians = 0
    this.penColor = "#FFFFFF"
    this.shadowColor = "cyan"
    this.shadowBlur = 0
    this.lineWidth = 1
    this.font = "12px Arial"
    this.penDown = true;
  }

  setPen(color, width) {
    this.penColor = color
    this.lineWidth = width
    this.shadowColor = "#000000"
    this.shadowBlur = 0
  }

  setShadowedPen(color, width, blurColor, blurWidth) {
    this.penColor = color
    this.lineWidth = width
    this.shadowColor = blurColor
    this.shadowBlur = blurWidth
  }

  push() {
    var pstate = {
      x: this.x,
      y: this.y,
      penColor: this.penColor,
      lineWidth: this.lineWidth,
      shadowBlur: this.shadowBlur,
      shadowColor: this.shadowColor,
    }
    this.penStack.push(pstate);
  }

  pop() {
    if (this.penStack.length > 0) {
      // restore the state fromthe stack
      var p = this.penStack.pop()
      this.penColor = p.penColor
      this.lineWidth = p.lineWidth
      this.shadowBlur = p.shadowBlur
      this.shadowColor = p.shadowColor
      this.x = p.x
      this.y = p.y
      this.moveTo(p.x, p.y)
    }
  }

  backward(length) {
    // backward is just shorthand, use the main function
    this.forward(-length)
    return this;
  }

  left(angleInDegrees) {
    // A complete circle, 360º, is equivalent to 2π radians  
    // angleInDegrees is an angle measure in degrees
    this.angleInRadians -= angleInDegrees * Math.PI / 180.0
    return this
  }

  right(angleInDegrees) {
    this.left(-angleInDegrees);
    return this
  }

  angle () {
    // the turtle status is hold in this.angleInRadians;
    // degrees are often more convenient for the display
    return this.angleInRadians * 180.0 / Math.PI
  }

  mox(x) {
    return x + this.ox
  }

  moy(y) {
    return y + this.oy
  }

  setOrigin(x, y) {
    this.ox = x
    this.oy = y
  }

  moveTo (x, y) {
    this.x = x
    this.y = y
  }

  lineTo (x, y) {
    // If if can draw the last two segments it can have
    // joint  if width > 1 ???
    this.setCtxStroke()
    this.cc.line(this.mox(this.x), this.moy(this.y), this.mox(x), this.moy(y))
    this.x = x
    this.y = y
  }

  circle(radius) {
    // Draw a circle center where the turtle is 
    this.setCtxStroke()
    this.cc.circle(this.mox(this.x), this.moy(this.y))
  }

  stamp(image) {
    this.cc.stamp(this.mox(this.x), this.moy(this.y), image)
  }

  up() {
    this.penDown = false
  }

  down() {
    this.penDown = true
  }

  forward(length) {
    var x0 = this.x
    var  y0 = this.y
    let x = x0 + length * Math.cos(this.angleInRadians)
    let y = y0 + length * Math.sin(this.angleInRadians)
    if (this.penDown) {
      this.lineTo(x, y)
    } else {
      this.moveTo(x, y)
    }
    return this;
  }

  drawXY () {
    let str = String(this.x) + ',' + String(this.y)
    this.push()
    this.moveTo(this.x + 3, this.y + 5)
    this.text(str) 
    this.pop()
  }

  setCtxStroke() {
    this.cc.ctx.lineWidth = this.lineWidth
    this.cc.ctx.strokeStyle = this.penColor
    this.cc.ctx.shadowBlur = this.shadowBlur
    this.cc.ctx.shadowColor = this.shadowColor
  }

  text(message) {
    this.cc.ctx.font = this.font
    this.cc.ctx.fillStyle = this.penColor
    this.cc.text(this.mox(this.x), this.moy(this.y), message)
  }
}

/*

canvas.addEventListener('mousemove', onclick, false);
function onclick(event) {
  if (typeof onMouseMove == 'function') { 
    onMouseMove(event.clientX - turtle.xc - 7, turtle.my(event.clientY)+9, event.buttons !== 0)
  }
}
*/
/*

*/


import { Turtle, Beach } from './modules/turtle.mjs';
import { drawGrid } from './modules/shapes.mjs';
import { TImage } from './modules/turtle.mjs';


var b = new Beach()

class Grid extends Turtle {
  constructor () {
    super()
    this.colorIndex = 0
    this.colors = [
      ["grey", "lightGrey", "white"],
      ["grey", "lightGrey","rgba(255, 255, 255, 0.1)"],
      ["green", "darkgreen", "black"],
    ]
  }
  
  draw() {
    drawGrid(this, this.colors[this.colorIndex])
  }

  keyDown(event) {
    if (event.key === 'g') {
      this.update()
      this.colorIndex = (this.colorIndex + 1) %  this.colors.length
    }
  }
}

class Ship extends Turtle {
  draw() {
    this.left((this.now() * 10) % 360)
    // When draw starts 
    this.setPen("orange", 15)
    drawHexagon(this, Math.sin(this.now() * 0.05)* 100)
  }
}
  
class Balloon extends Turtle {
  draw() {
    this.setPen("blue", 10)
    this.moveTo(100,100)
    this.forward(50)
    this.circle(20)
  }
  timer(tic) {
  }
}
  
let grid = new Grid()
let ship = new Ship()
let bubble = new TImage("./images/bubble.png")

//let b1 = new Balloon()
  
  
function drawTri(t, length) {
  t.push()
  t.setPen("blue", 4)
  for (let i=1; i <= 3; i++) {
    t.forward(length)
    t.left(120)  
  }
  t.pop()
}
  
function drawHexagon(t, length) {
  for (let i=1; i <= 6; i++) {
    t.forward(length)
    t.stamp(bubble)
    t.left(60)   
  }
}
  
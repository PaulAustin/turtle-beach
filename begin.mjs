
import { Turtle, Beach} from './modules/turtle.mjs'
import { drawGrid } from './modules/shapes.mjs'
import { MusicPlayer } from './modules/music.mjs'
import { prelude, twinkle } from './modules/songs.mjs'
import { PixelMatrix, PixelFile } from './modules/pixels.mjs'
import { spriteColors } from './modules/pixels.mjs'


var b = new Beach()
let music = new MusicPlayer()
console.log("make a donot")
let donut = new PixelMatrix(16, 16)
console.log("make a donot", donut)

b.onMouseDown = function(x, y) {
  // console.log('mouse', x, y)
  ship.setOrigin(x, y)
  // music.playNote("C:1")
  // music.playNotes(['C:1', 'D:1', 'E:1', 'C:1', 'D:1', 'E:1'])
  //music.playNotes(['r4:2', 'g', 'g', 'g', 'eb:8', 'r:2', 'f', 'f', 'f', 'd:8'])

  music.playNotes(prelude)
  // a short hack
}

class Grid extends Turtle {
  constructor () {
    super()
    this.colorIndex = 0
    this.colors = [
      ["grey", "lightGrey", "white"],
      ["grey", "lightGrey","rgba(255, 255, 255, 0.1)"],
      ["green", "darkgreen", "black"],
      ["green", "darkgreen","rgba(0, 0, 0, 0.1)"],
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
    let len = 50
    //this.left((this.now() * 10) % 360)
    //this.backward(125)
    this.right((this.now() * 3) % 360)
    //this.right(-60)
    // When draw starts 
    this.setPen("orange", 15)
    drawHexagon(this, (Math.sin(this.now() * 0.04) + 1.1) * len)
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

let bubble = new PixelFile("./images/bubble.png")

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
  t.stamp(bubble)
  for (let i=1; i <= 6; i++) {
    t.stamp(donut)
    t.forward(length)
    t.left(60)   
  }
}
  
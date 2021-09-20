

export function drawArrow (t, length) {
    t.forward(50)
    t.left(150)
    t.forward(7)
    t.backward(7)
    t.right(150)
    t.right(150)
    t.forward(7)
    t.backward(7)
    t.left(150)
}

export function drawPoly (t, count, length) {
    let angle = 360 / count
    for (var i = 0; i < count; i++) {
        t.forward(50)
        t.left(angle)
    }
 }

export function drawGrid(t, colors) {
    // Draw X lines and y lines
    let top = 1000, bottom = -1000
    let left = -1000, right = 1000
  

    let majorColor = colors[0]
    let minorColor = colors[1]


    t.push()
    t.cc.ctx.fillStyle = colors[2]
    t.cc.ctx.fillRect(-1000, 0, 2000, 2000)
    t.penDown = true;
    t.lineWidth = 1.0;
    
    // Vertical gridlines
    for (var xi = -1000; xi < 1000; xi+=20) {
      if (xi % 100 === 0) {
        t.penColor = majorColor
        t.moveTo(xi, 0)
        t.drawXY()
      } else {
        t.penColor = minorColor
      }
      t.moveTo(xi, top)
      t.lineTo(xi, bottom)
    }

    // Horizontal gridlines
    for (var yi = -1000; yi < 1000; yi+=20) {
       if (yi % 100 === 0) {
        t.penColor = majorColor
        t.moveTo(0, yi)
        t.drawXY()
      } else {
        t.penColor = minorColor
      }
      t.moveTo(left, yi)
      t.lineTo(right, yi)
    }
  
    t.moveTo(0, 0)
    t.penColor = "black"
    t.circle(2)
    t.pop()
  }
  
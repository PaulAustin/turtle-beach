/*

Copyright 2021 Paul Austin

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

*/
// A HTML-Canvas based bit map sprite. Bsaed on 16 color game engines.

// Each row has . or the hexideciaml digit 0-F leading or trailing spaces are ignored.
// There is a default palette but it can be changed

export let spriteColors = [
  "rgba(0,0,0,0.0)",
  "rgb(255, 255, 255)",       // White
  "rgb(231, 64, 50)",         // Red
  "rgb(238, 152, 94)",        // Pink
  "rgb(237, 135, 72)",        // Orange
  "rgb(253, 245, 83)",        // Yellow
  "rgb(80, 154, 61)",         // Teal
  "rgb(148, 217,102)",        // Green
  "rgb(255,255,255)",         // Blue
  "rgb(255,255,255)",         // Cyan
  "rgb(255,255,255)",         // Purple
  "rgb(255,255,255)",         // Mauve-Grey
  "rgb(255,255,255)",         // Shadows
  "rgb(255,255,255)",         // Sand
  "rgb(134, 74, 64)",         // Brown
  "rgb(0, 0, 0)",             // Black
]

// Two concepts for sprites. 
// They have a location,  The image data coudl be shared across many sprites
// if so then changing the image data affects all. This was cetrainly the case in early hardware based sprites.

// Sprite images coudl be used as stamps as well. 

export class PixelImage {
  drawToContext(ctx, x, y, w, h) {
  }
}

export class PixelFile {
  constructor(path) {
    this.loaded = false
    let di = new Image()
    di.onload = () => {this.onLoad()}
    di.src = path
    this.domImage = di
  }

  onLoad() {
    this.loaded = true
  }

  drawToContext(ctx, x, y, scale) {
    if (this.loaded) {
      let di = this.domImage
      let w = di.width * scale
      let h = di.height * scale
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(di, x - w/2, y - h/2, w, h);
      ctx.imageSmoothingEnabled = true
    }
  }
}

export class PixelMatrix {
  // make static factories on the class, create from size, Create from data, ( JPEG??)
  // This could merge with TImage

  constructor(options) {

    let w = options.w
    let h = options.h
    let data = options.data

    if (typeof(data) ==='string') {
      let slabs = data.replace(/ /g, '').split('\n')
      // still need to remove emply lines, move to seperate function. 
      // use with color table to put data into Canvas.
      console.log('data passes', slabs.length, slabs)
    }

    this.canvas = document.createElement('canvas')
    this.canvas.width = w
    this.canvas.height = h
    this.ctx = this.canvas.getContext("2d") // can use just one, perhasp none???) 
    let id = this.ctx.createImageData(w, h)
    this.imageData = id

    // Iterate through every pixel
    for (let i = 0; i < id.data.length; i += 4) {
      // Modify pixel data
      id.data[i + 0] = 255 - i/2  // R value
      id.data[i + 1] = (i % 32) * 8    // G value
      id.data[i + 2] = i/2  // B value
      id.data[i + 3] = 128  // A value
    }

    // Draw image data to the canvas
    this.ctx.putImageData(id, 0, 0)
    console.log('built image data', id)
  }
  drawToContext(ctx, x, y) {
    let w = this.canvas.width
    let h = this.canvas.height  
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(this.canvas, x, y, 50, 50)
  }
}


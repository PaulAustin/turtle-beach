

export class MusicPlayer {
  constructor() {
    this.actx = new (window.AudioContext || window.webkitAudioContext)();
    this.keyTimer === null

    // Default to 120 BPM, Using 4:4 timing
    this.qNote = 0.500
    this.wNote = this.qNote * 4

    this.lastNote = 'C4'
    this.lastTics = 2
    this.ticLength = 1.0 / 8.0

    this.song = null
    this.index = -1

    // It would be nice to just build this automatically ???
    // Just build by 12th root of 2 for each half step`
    this.noteTable = {
      "R4" : 0.00,              // Rest
      "C3" : 130.8128,
      "D3" : 146.8324,
      "E3" : 164.8138,
      "F3" : 174.6141,
      "G3" : 195.9977,
      "A3" : 220.00,
      "B3" : 246.94,
      "C4" : 261.63,
      "D4" : 293.66,
      "D#4": 311.1270,	
      "EB4": 311.1270,	
      "E4" : 329.63,
      "F4" : 349.23,
      "F#4" : 369.9944,
      "GB4" : 369.9944,
      "G4" : 392.00,
      "A4" : 440.00,
      "B4" : 493.88,
      "C5" : 523.25,
      "D5" : 587.33,
      "E5" : 659.2551,
      "F5" : 698.4565,
      "G5" : 783.9909,
      "A5" : 880.0000,
    }
  }
  
  
  // music could be passed in as an array or as a string
  playNotes(notes) {
    this.song = notes
    this.index = 0
    this.nextNote()
  }
  
  playNote(note) {

    // Allow frequency to be numeric or letter
    if (typeof(note) === 'string') {
      // Get the note name 
      let p = note.split(':', 2)
      if (p.length >= 1) {
        let name = p[0].toUpperCase()
        let len = name.length
        if (name.length === 1) {
          // If no octave specified append '4'  
          name = name + '4'
        } else if (len ===  2) {
          let ch2 = name.substr(1,1)
          if (ch2 === 'B' || ch2 === '#' ) {
            name = name + '4'
          }
        }
        let note =  this.noteTable[name]
        if (typeof(note) === 'number') {
          this.lastNote = this.noteTable[name]
        } else {
          console.log("missing note", name)
        }

      }
      if (p.length >= 2) {
        this.lastTics = parseInt(p[1])
      }
    }

    let frequency = this.lastNote
    let tics = this.lastTics
    let duration = tics * this.ticLength

    let actx = this.actx
    let oscillator = actx.createOscillator()
    let gain = actx.createGain()

    oscillator.connect(gain)
    gain.connect(actx.destination)


    gain.gain.value = 0.3
    oscillator.type = 'sine'
    if (frequency < 0.1) {
      frequency = 0.01
    }
    oscillator.frequency.value = frequency
    oscillator.start()
    let endTime  =  actx.currentTime + duration
    oscillator.stop(endTime)
    oscillator.onended = ()=>{this.nextNote()}
    gain.gain.setTargetAtTime(0, endTime - 0.05, 0.015)
    // Make sure note ends. Is there another notification toconnect to???
    //this.keyTimer = setTimeout(() => { this.stopNote() }, 1000)
    // Next Queue up notes, or on done callback.
  }

  nextNote() {
    if (this.song !== null) {
      if (this.index < this.song.length) {
        let note = this.song[this.index]
        this.index++
        this.playNote(note)
      }
    }
  }

  stopNote() {
    if (this.keyTimer !== null) {
      console.log('done')
      clearTimeout(this.keyTimer);
      this.keyTimer = null;
    }
  }
}

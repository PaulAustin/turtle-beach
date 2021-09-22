

export class MusicPlayer {
  constructor() {
    this.actx = new (window.AudioContext || window.webkitAudioContext)();
    this.keyTimer === null

    // Default to 120 BPM, Using 4:4 timing
    this.qNote = 0.500
    this.wNote = this.qNote * 4


    this.noteTable = {
      "A3" : 220.00,
      "B3" : 246.94,
      "C4" : 261.63,
      "D4" : 293.66,
      "E4" : 329.63,
      "F4" : 349.23,
      "G4" : 392.00,
      "A4" : 440.00,
      "B4" : 493.88,
      "C5" : 523.25,
      "D5" : 587.33,
    }
  }

  playNote(note, beats) {

    // Allow frequency to be numeric or letter
    var frequency = note
    if (typeof(note) === 'string') {
      // If it is just one letter append a 4???
      frequency = this.noteTable[note]
    }

    console.log('notef', frequency)

    let actx = this.actx
    let duration = this.qNote * beats
    let oscillator = actx.createOscillator()
    let gain = actx.createGain()
    oscillator.connect(gain)
    gain.connect(actx.destination)
    gain.gain.value = 0.3
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    oscillator.start()
    oscillator.stop(actx.currentTime + duration)
    gain.gain.setTargetAtTime(0, actx.currentTime + 0.3, 0.015)
    // Make sure note ends. Is there another notification toconnect to???
    //this.keyTimer = setTimeout(() => { this.stopNote() }, 1000)
    // Next Queue up notes, or on done callback.
  }

  stopNote() {
    if (this.keyTimer !== null) {
      console.log('done')
      clearTimeout(this.keyTimer);
      this.keyTimer = null;
    }
  }
}

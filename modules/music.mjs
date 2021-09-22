

export class MusicPlayer {
  constructor() {
    this.actx = new (window.AudioContext || window.webkitAudioContext)();
    this.keyTimer === null

    // Default to 120 BPM, Using 4:4 timing
    this.qNote = 0.500
    this.wNote = this.qNote * 4
  }

  playNote(frequency, beats) {
    let actx = this.actx;
    var oscillator = actx.createOscillator();
    var gain = actx.createGain();
    oscillator.connect(gain);
    gain.connect(actx.destination);
    gain.gain.value = 0.3;
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.start();
    oscillator.stop(actx.currentTime + (this.qNote * beats));
    gain.gain.setTargetAtTime(0, actx.currentTime + 0.3, 0.015);

    // Make sure note ends.
    this.keyTimer = setTimeout(() => { this.stopNote() }, this.qNote * beats)

    // Next Queu up notes, or on done callback.
  }

  stopNote() {
    if (this.keyTimer !== null) {
      clearTimeout(this.keyTimer);
      this.keyTimer = null;
    }
  }
}

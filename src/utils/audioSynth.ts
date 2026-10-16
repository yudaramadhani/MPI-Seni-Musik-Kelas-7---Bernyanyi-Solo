// Web Audio API tone generator and sound effect synthesizers

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const SOLFEGE_NOTES = [
  { note: 'C4', solfege: 'Do', freq: 261.63, label: '1 (Do)' },
  { note: 'D4', solfege: 'Re', freq: 293.66, label: '2 (Re)' },
  { note: 'E4', solfege: 'Mi', freq: 329.63, label: '3 (Mi)' },
  { note: 'F4', solfege: 'Fa', freq: 349.23, label: '4 (Fa)' },
  { note: 'G4', solfege: 'Sol', freq: 392.00, label: '5 (Sol)' },
  { note: 'A4', solfege: 'La', freq: 440.00, label: '6 (La)' },
  { note: 'B4', solfege: 'Si', freq: 493.88, label: '7 (Si)' },
  { note: 'C5', solfege: 'Do˙', freq: 523.25, label: '1˙ (Do Tinggi)' },
];

/**
 * Play a musical note with natural harmonics and envelope
 */
export function playNote(freq: number, duration: number = 1.2, type: OscillatorType = 'triangle'): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Subtle overtone for richer piano/voice timbre
    const overtone = ctx.createOscillator();
    const overtoneGain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, now);

    // Envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.35, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    overtoneGain.gain.setValueAtTime(0.001, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.12, now + 0.04);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    gain.connect(ctx.destination);
    overtoneGain.connect(ctx.destination);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + duration);
    overtone.stop(now + duration);
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}

/**
 * Play a cue beep for breathing exercise
 */
export function playCue(type: 'inhale' | 'hold' | 'exhale' | 'finish'): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freqs = {
      inhale: 440,
      hold: 554.37,
      exhale: 330,
      finish: 659.25,
    };

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freqs[type], now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  } catch (err) {
    console.warn(err);
  }
}

/**
 * Play correct chime sound
 */
export function playSuccessChime(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.09;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  } catch (err) {
    console.warn(err);
  }
}

/**
 * Play error sound
 */
export function playIncorrectSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(160, now + 0.35);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch (err) {
    console.warn(err);
  }
}

/**
 * Apersepsi: compare "Nada Tepat" vs "Nada Fals"
 */
export function playAperceptionComparison(type: 'tepat' | 'fals'): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'tepat') {
      // Clean pure harmonious tone A4 = 440Hz + overtone
      playNote(440, 1.8, 'triangle');
    } else {
      // Fals tone: 425Hz with slight detuned wobble (beating effect)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(425, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(431, now); // creates 6Hz dissonant beating wobble

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.25, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.8);
      osc2.stop(now + 1.8);
    }
  } catch (err) {
    console.warn(err);
  }
}

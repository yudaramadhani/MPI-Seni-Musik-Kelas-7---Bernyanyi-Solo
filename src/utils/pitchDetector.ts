// Real-time Web Audio API Pitch Detector using Autocorrelation

export interface PitchResult {
  frequency: number;
  noteName: string;
  solfege: string;
  cents: number;
  status: 'fals-rendah' | 'pas' | 'fals-tinggi' | 'hening';
  volume: number; // 0 to 1
  confidence: number;
}

const NOTE_STRINGS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function noteFromPitch(frequency: number): number {
  const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  return Math.round(noteNum) + 69;
}

export function frequencyFromNoteNumber(note: number): number {
  return 440 * Math.pow(2, (note - 69) / 12);
}

export function centsOffFromPitch(frequency: number, note: number): number {
  return Math.floor((1200 * Math.log(frequency / frequencyFromNoteNumber(note))) / Math.log(2));
}

export function getSolfegeFromNoteName(noteName: string): string {
  const noteOnly = noteName.replace(/[0-9]/g, '');
  const map: Record<string, string> = {
    'C': 'Do',
    'C#': 'Di',
    'D': 'Re',
    'D#': 'Ri',
    'E': 'Mi',
    'F': 'Fa',
    'F#': 'Fi',
    'G': 'Sol',
    'G#': 'Sel',
    'A': 'La',
    'A#': 'Li',
    'B': 'Si'
  };
  return map[noteOnly] || noteOnly;
}

/**
 * Autocorrelation algorithm to extract fundamental frequency from audio buffer
 */
export function autoCorrelate(buffer: Float32Array, sampleRate: number): { freq: number; confidence: number; rms: number } {
  const SIZE = buffer.length;
  let sumOfSquares = 0;
  for (let i = 0; i < SIZE; i++) {
    const val = buffer[i];
    sumOfSquares += val * val;
  }
  const rootMeanSquare = Math.sqrt(sumOfSquares / SIZE);

  // If too quiet, ignore
  if (rootMeanSquare < 0.015) {
    return { freq: -1, confidence: 0, rms: rootMeanSquare };
  }

  // Trim quiet ends
  let r1 = 0;
  let r2 = SIZE - 1;
  const thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < thres) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < thres) {
      r2 = SIZE - i;
      break;
    }
  }

  const trimmed = buffer.slice(r1, r2);
  const c = new Float32Array(trimmed.length);
  for (let i = 0; i < trimmed.length; i++) {
    for (let j = 0; j < trimmed.length - i; j++) {
      c[i] = c[i] + trimmed[j] * trimmed[j + i];
    }
  }

  // Find the first dip
  let d = 0;
  while (c[d] > c[d + 1]) {
    d++;
  }

  // Find the maximum peak after the dip
  let maxval = -1;
  let maxpos = -1;
  for (let i = d; i < trimmed.length; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }

  let T0 = maxpos;

  // Parabolic interpolation around peak
  const x1 = c[T0 - 1];
  const x2 = c[T0];
  const x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) {
    T0 = T0 - b / (2 * a);
  }

  const fundamentalFreq = sampleRate / T0;
  const confidence = maxval / c[0];

  // Restrict to human vocal range ~75Hz to 1100Hz
  if (fundamentalFreq >= 75 && fundamentalFreq <= 1100 && confidence > 0.65) {
    return { freq: fundamentalFreq, confidence, rms: rootMeanSquare };
  }

  return { freq: -1, confidence, rms: rootMeanSquare };
}

/**
 * Format pitch analysis into friendly educational UI feedback
 */
export function analyzePitch(buffer: Float32Array, sampleRate: number): PitchResult {
  const { freq, confidence, rms } = autoCorrelate(buffer, sampleRate);

  if (freq === -1) {
    return {
      frequency: 0,
      noteName: '-',
      solfege: 'Hening',
      cents: 0,
      status: 'hening',
      volume: Math.min(1, rms * 5),
      confidence,
    };
  }

  const midiNote = noteFromPitch(freq);
  const noteName = NOTE_STRINGS[midiNote % 12] + Math.floor(midiNote / 12 - 1);
  const solfege = getSolfegeFromNoteName(NOTE_STRINGS[midiNote % 12]);
  const cents = centsOffFromPitch(freq, midiNote);

  let status: 'fals-rendah' | 'pas' | 'fals-tinggi' = 'pas';
  if (cents < -15) {
    status = 'fals-rendah';
  } else if (cents > 15) {
    status = 'fals-tinggi';
  }

  return {
    frequency: Math.round(freq * 10) / 10,
    noteName,
    solfege,
    cents,
    status,
    volume: Math.min(1, rms * 6),
    confidence,
  };
}

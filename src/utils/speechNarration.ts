// Speech Synthesis Utility for Accessibility Narration in Indonesian

let currentUtterance: SpeechSynthesisUtterance | null = null;
let speechListeners: Array<(isSpeaking: boolean, text: string) => void> = [];

export function subscribeSpeechState(listener: (isSpeaking: boolean, text: string) => void) {
  speechListeners.push(listener);
  return () => {
    speechListeners = speechListeners.filter((l) => l !== listener);
  };
}

function notifySpeechState(isSpeaking: boolean, text: string = '') {
  speechListeners.forEach((fn) => fn(isSpeaking, text));
}

export function speakText(text: string, rate: number = 0.95, pitch: number = 1.05): void {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Clean markdown or html tags from text
  const cleanText = text.replace(/[*_#`>-]/g, '').trim();
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  currentUtterance = utterance;

  utterance.rate = rate;
  utterance.pitch = pitch;

  // Try to find an Indonesian voice
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find(
    (v) => v.lang.toLowerCase().includes('id') || v.lang.toLowerCase().includes('indonesia')
  );
  if (idVoice) {
    utterance.voice = idVoice;
    utterance.lang = 'id-ID';
  } else {
    utterance.lang = 'id-ID';
  }

  utterance.onstart = () => {
    notifySpeechState(true, cleanText);
  };

  utterance.onend = () => {
    notifySpeechState(false, '');
    currentUtterance = null;
  };

  utterance.onerror = (e) => {
    console.warn('Speech error:', e);
    notifySpeechState(false, '');
    currentUtterance = null;
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    notifySpeechState(false, '');
    currentUtterance = null;
  }
}

export function isSpeechSpeaking(): boolean {
  return window.speechSynthesis ? window.speechSynthesis.speaking : false;
}

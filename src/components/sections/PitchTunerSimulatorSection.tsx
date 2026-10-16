import React, { useState, useEffect, useRef } from 'react';
import { SectionId } from '../../types';
import { MascotCard } from '../MascotCard';
import { playNote, playSuccessChime, SOLFEGE_NOTES } from '../../utils/audioSynth';
import { analyzePitch, PitchResult } from '../../utils/pitchDetector';
import { speakText } from '../../utils/speechNarration';
import { Mic, MicOff, Volume2, Sparkles, Award, ArrowRight, ArrowLeft, Music, Activity } from 'lucide-react';

interface PitchTunerSimulatorSectionProps {
  onNavigate: (section: SectionId) => void;
}

export const PitchTunerSimulatorSection: React.FC<PitchTunerSimulatorSectionProps> = ({ onNavigate }) => {
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [pitchData, setPitchData] = useState<PitchResult>({
    frequency: 0,
    noteName: '-',
    solfege: 'Hening',
    cents: 0,
    status: 'hening',
    volume: 0,
    confidence: 0
  });

  const [targetNote, setTargetNote] = useState<typeof SOLFEGE_NOTES[0]>(SOLFEGE_NOTES[0]); // Default Do
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [inTuneStreak, setInTuneStreak] = useState<number>(0);
  const [streakPassed, setStreakPassed] = useState<boolean>(false);

  // Audio Context & Analyser references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const startMic = async () => {
    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: false,
          autoGainControl: true
        }
      });
      streamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);

      const buffer = new Float32Array(analyser.fftSize);

      const updatePitch = () => {
        analyser.getFloatTimeDomainData(buffer);
        const result = analyzePitch(buffer, ctx.sampleRate);
        setPitchData(result);

        // Check if matching target challenge note
        if (result.status === 'pas' && result.noteName.startsWith(targetNote.note.charAt(0))) {
          setInTuneStreak((s) => {
            const next = s + 1;
            if (next >= 15 && !streakPassed) { // ~1.5 seconds in tune
              playSuccessChime();
              setStreakPassed(true);
              setChallengeScore((c) => c + 20);
            }
            return next;
          });
        } else {
          setInTuneStreak((s) => Math.max(0, s - 1));
        }

        animFrameRef.current = requestAnimationFrame(updatePitch);
      };

      animFrameRef.current = requestAnimationFrame(updatePitch);
      setIsMicActive(true);
    } catch (err: unknown) {
      console.warn('Microphone error:', err);
      setMicError(
        'Akses mikrofon tidak diizinkan atau tidak tersedia. Jangan khawatir, kamu tetap bisa menggunakan Keyboard Piano Solmisasi di bawah untuk latihan!'
      );
      setIsMicActive(false);
    }
  };

  const stopMic = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsMicActive(false);
    setPitchData({
      frequency: 0,
      noteName: '-',
      solfege: 'Hening',
      cents: 0,
      status: 'hening',
      volume: 0,
      confidence: 0
    });
  };

  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);

  const handlePlaySolfege = (item: typeof SOLFEGE_NOTES[0]) => {
    playNote(item.freq, 1.4);
    setTargetNote(item);
    setStreakPassed(false);
    setInTuneStreak(0);
  };

  const readNarration = () => {
    speakText(
      'Lab Pengukur Intonasi Vokal. Di sini kamu dapat menguji ketepatan nada suaramu. Aktifkan mikrofon dan bunyikan suara vokal Aaaa atau Oooo. Jarum pengukur akan menunjukkan apakah suaramu terlalu rendah, terlalu tinggi, atau sudah pas tepat di zona hijau. Kamu juga dapat menekan tuts piano solmisasi untuk mendengarkan nada panduan.'
    );
  };

  // Needle angle for gauge (-50 to +50 cents maps to -45deg to +45deg)
  const clampedCents = Math.max(-50, Math.min(50, pitchData.cents));
  const needleRotation = (clampedCents / 50) * 45;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 07 · Lab Praktik 2
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Pengukur Intonasi Vokal (Live Tuner)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Ukur keakuratan frekuensi vokal suaramu (pitch) secara langsung dan basmi nada fals!
          </p>
        </div>
        <button
          onClick={readNarration}
          className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Petunjuk</span>
        </button>
      </div>

      <MascotCard
        message="Cobalah bunyikan vokal 'Aaaa' atau 'Oooo' yang stabil dan panjang ke arah mikrofon. Arahkan jarum tepat ke titik tengah ZONA HIJAU!"
        subtext="Bagi kelompok: Penguji Intonasi bertugas memantau pergerakan jarum dan memberi aba-aba jika nada terlalu rendah atau terlalu tinggi."
      />

      {/* Main Tuner Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: The Digital Needle Tuner Sandbox */}
        <div className="lg:col-span-7 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-sm font-bold tracking-wide uppercase text-slate-300">
                Penganalisis Frekuensi Tala Vokal
              </h2>
            </div>
            {isMicActive ? (
              <button
                onClick={stopMic}
                className="px-3 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <MicOff className="w-3.5 h-3.5" />
                <span>Matikan Mic</span>
              </button>
            ) : (
              <button
                onClick={startMic}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
              >
                <Mic className="w-4 h-4" />
                <span>Aktifkan Mikrofon</span>
              </button>
            )}
          </div>

          {micError && (
            <div className="p-3 rounded-xl bg-amber-900/40 border border-amber-700/60 text-amber-200 text-xs">
              ⚠️ {micError}
            </div>
          )}

          {/* Visual Arc Gauge */}
          <div className="relative py-6 flex flex-col items-center justify-center">
            {/* Tuner Scale Arc */}
            <div className="relative w-64 h-32 overflow-hidden flex items-end justify-center">
              {/* Semi-circle background zones */}
              <div className="w-64 h-64 rounded-full border-8 border-slate-800 flex items-center justify-center relative">
                {/* Zone Markers */}
                <div className="absolute top-4 left-10 text-[10px] font-bold text-amber-400">
                  -50 ♭
                </div>
                <div className="absolute top-1 text-[11px] font-bold text-emerald-400">
                  0 (TEPAT)
                </div>
                <div className="absolute top-4 right-10 text-[10px] font-bold text-rose-400">
                  +50 ♯
                </div>
              </div>

              {/* The Moving Needle */}
              <div
                className="absolute bottom-0 w-1.5 h-28 bg-gradient-to-t from-slate-400 to-amber-300 rounded-full origin-bottom transition-transform duration-100 shadow-md"
                style={{
                  transform: `rotate(${needleRotation}deg)`,
                  filter: pitchData.status === 'pas' ? 'drop-shadow(0 0 8px #10B981)' : 'none'
                }}
              />
              {/* Center Pivot Pin */}
              <div className="absolute bottom-0 w-5 h-5 rounded-full bg-white shadow-md border-2 border-slate-900" />
            </div>

            {/* Note Display Box */}
            <div className="mt-6 text-center space-y-1">
              <div className="inline-block px-6 py-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                  {pitchData.noteName !== '-' ? pitchData.noteName : '--'}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-400">
                Solmisasi:{' '}
                <strong className="text-amber-400 text-sm">
                  {pitchData.solfege !== 'Hening' ? pitchData.solfege : 'Belum Ada Suara'}
                </strong>{' '}
                · Frekuensi:{' '}
                <span className="font-mono text-slate-300">
                  {pitchData.frequency > 0 ? `${pitchData.frequency} Hz` : '-- Hz'}
                </span>
              </p>
            </div>

            {/* Status Feedback Badge */}
            <div className="mt-4">
              {pitchData.status === 'hening' ? (
                <span className="px-4 py-1.5 rounded-full bg-slate-800 text-slate-400 text-xs font-semibold">
                  🎙️ Suarakan vokalmu ke mikrofon...
                </span>
              ) : pitchData.status === 'pas' ? (
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                  ✅ Nada Pas & Akurat! (In Tune ±15 Cents)
                </span>
              ) : pitchData.status === 'fals-rendah' ? (
                <span className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                  ⚠️ Fals: Terlalu Rendah ({pitchData.cents} cents) - Tambah dorongan nafas!
                </span>
              ) : (
                <span className="px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
                  ⚠️ Fals: Terlalu Tinggi (+{pitchData.cents} cents) - Rilekskan leher!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Solfege Piano Keyboard & Target Note Challenge */}
        <div className="lg:col-span-5 space-y-6">
          {/* Target Note Challenge */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Tantangan Solmisasi
              </span>
              <span className="text-xs font-bold text-slate-500">
                Poin: <strong className="text-amber-600 font-mono text-sm">{challengeScore}</strong>
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Tirukan Nada Sasaran: <span className="text-amber-600">{targetNote.label}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Frekuensi sasaran: {targetNote.freq} Hz ({targetNote.note})
              </p>
            </div>

            {/* Sound button for target note */}
            <button
              onClick={() => handlePlaySolfege(targetNote)}
              className="w-full py-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span>Dengarkan Nada {targetNote.solfege}</span>
            </button>

            {streakPassed && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Hebat! Nadanya tepat sasaran! +20 Poin diperoleh!</span>
              </div>
            )}
          </div>

          {/* Virtual Solfege Piano Keyboard */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>Keyboard Solmisasi (Do-Re-Mi)</span>
              </h3>
              <span className="text-[10px] text-slate-400">Klik tuts untuk mendengar</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-2">
              {SOLFEGE_NOTES.map((sn) => {
                const isCurrentTarget = sn.note === targetNote.note;
                return (
                  <button
                    key={sn.note}
                    onClick={() => handlePlaySolfege(sn)}
                    className={`py-6 px-1 rounded-xl flex flex-col items-center justify-between text-center transition-all cursor-pointer ${
                      isCurrentTarget
                        ? 'bg-amber-400 text-slate-950 font-black shadow-lg scale-105'
                        : 'bg-white text-slate-900 font-bold hover:bg-amber-50 active:scale-95'
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{sn.solfege}</span>
                    <span className="text-[10px] font-mono text-slate-500">{sn.note}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-400 text-center italic pt-1">
              💡 Tekan tuts piano di atas, lalu nyanyikan vokal tiruan dengan nada yang persis sama.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('breathing')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Lab Nafas</span>
        </button>
        <button
          onClick={() => onNavigate('exercise')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm"
        >
          <span>Lanjut ke Latihan Interaktif</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

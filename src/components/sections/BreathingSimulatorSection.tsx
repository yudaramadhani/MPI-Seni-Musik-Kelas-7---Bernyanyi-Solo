import React, { useState, useEffect, useRef } from 'react';
import { SectionId } from '../../types';
import { MascotCard } from '../MascotCard';
import { playCue } from '../../utils/audioSynth';
import { speakText } from '../../utils/speechNarration';
import { Play, Pause, RotateCcw, Volume2, Wind, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface BreathingSimulatorSectionProps {
  onNavigate: (section: SectionId) => void;
}

type BreathingPhase = 'idle' | 'inhale' | 'hold' | 'exhale';

export const BreathingSimulatorSection: React.FC<BreathingSimulatorSectionProps> = ({ onNavigate }) => {
  const [phase, setPhase] = useState<BreathingPhase>('idle');
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 8
  };

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase Transition
        if (phase === 'inhale') {
          playCue('hold');
          setPhase('hold');
          return phaseDurations.hold;
        } else if (phase === 'hold') {
          playCue('exhale');
          setPhase('exhale');
          return phaseDurations.exhale;
        } else if (phase === 'exhale') {
          setCycleCount((c) => {
            const nextCycle = c + 1;
            if (nextCycle >= 3) {
              playCue('finish');
              setIsRunning(false);
              setPhase('idle');
              speakText('Bagus sekali! Kamu telah menyelesaikan 3 siklus pernapasan diafragma dengan sempurna.');
              return nextCycle;
            } else {
              playCue('inhale');
              setPhase('inhale');
              return nextCycle;
            }
          });
          return phaseDurations.inhale;
        }
        return 4;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, phase]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('inhale');
    setSecondsLeft(phaseDurations.inhale);
    playCue('inhale');
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setSecondsLeft(4);
    setCycleCount(0);
  };

  const readNarration = () => {
    speakText(
      'Simulator Pernapasan Diafragma Empat-Empat-Delapan. Latihan ini melatih otot diafragmamu agar mampu menopang vokal solo dengan kokoh. Tarik nafas melalui hidung selama 4 detik hingga lingkar perut mengembang. Tahan nafas selama 4 detik tanpa menegangkan leher. Lalu hembuskan perlahan dengan desisan huruf Sss selama 8 detik secara stabil. Lakukan sebanyak 3 siklus.'
    );
  };

  // Phase color & title
  const getPhaseInfo = () => {
    switch (phase) {
      case 'inhale':
        return {
          title: 'Tarik Nafas Perlahan (Inhale)',
          desc: 'Tarik nafas lewat hidung. Rasakan perut dan pinggang samping mengembang ke luar! Jaga bahu tetap tenang.',
          color: 'from-emerald-500 to-teal-500',
          textColor: 'text-emerald-600',
          bgBadge: 'bg-emerald-100 text-emerald-800'
        };
      case 'hold':
        return {
          title: 'Tahan Nafas Stabil (Hold)',
          desc: 'Tahan udara di diafragma. Jangan mengunci leher atau mendongakkan kepala.',
          color: 'from-amber-500 to-orange-500',
          textColor: 'text-amber-600',
          bgBadge: 'bg-amber-100 text-amber-800'
        };
      case 'exhale':
        return {
          title: 'Hembuskan Desis "Sss" (Exhale)',
          desc: 'Hembuskan perlahan lewat celah gigi dengan bunyi "Sss..." secara konstan seperti meniup lilin lembut.',
          color: 'from-sky-500 to-indigo-500',
          textColor: 'text-sky-600',
          bgBadge: 'bg-sky-100 text-sky-800'
        };
      default:
        return {
          title: 'Siap Memulai Latihan Diafragma',
          desc: 'Letakkan tanganmu di perut samping. Tekan tombol Mulai Latihan di bawah.',
          color: 'from-slate-700 to-slate-900',
          textColor: 'text-slate-700',
          bgBadge: 'bg-slate-100 text-slate-700'
        };
    }
  };

  const phaseInfo = getPhaseInfo();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 06 · Lab Praktik 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Simulator Pernapasan Diafragma (Ritme 4-4-8)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Latih kestabilan kontrol nafas vokal solomu dengan panduan visual dan audio cue real-time.
          </p>
        </div>
        <button
          onClick={readNarration}
          className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Panduan</span>
        </button>
      </div>

      <MascotCard
        message="Letakkan kedua tangan di pinggangmu. Ketika fase TARIK NAFAS dimulai, dorong tanganmu keluar menggunakan udara di perut bawah, BUKAN mengangkat bahu ke atas!"
        subtext="Bagi yang belajar berkelompok: Pengamat Postur silakan periksa bahu temanmu!"
      />

      {/* Simulator Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Breathing Visualizer Animation Ring */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-md flex flex-col items-center justify-center relative overflow-hidden">
          {/* Phase Badge */}
          <div className="mb-6 flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${phaseInfo.bgBadge}`}>
              {phase === 'idle' ? 'Mode Siaga' : `Siklus ${cycleCount + 1} dari 3`}
            </span>
          </div>

          {/* Dynamic Breathing Bubble */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
            {/* Animated Outer Ring */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 border-4 ${
                phase === 'inhale'
                  ? 'scale-110 border-emerald-400 bg-emerald-50/60'
                  : phase === 'hold'
                  ? 'scale-110 border-amber-400 bg-amber-50/60'
                  : phase === 'exhale'
                  ? 'scale-90 border-sky-400 bg-sky-50/60'
                  : 'scale-95 border-slate-200 bg-slate-50'
              }`}
            />

            {/* Inner Center Circle with Seconds Countdown */}
            <div className="relative z-10 w-36 h-36 rounded-full bg-white shadow-lg border border-slate-100 flex flex-col items-center justify-center">
              <span className={`text-4xl sm:text-5xl font-black font-mono ${phaseInfo.textColor}`}>
                {phase === 'idle' ? '--' : `${secondsLeft}s`}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                {phase === 'idle' ? 'Klik Mulai' : phase.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Phase Instruction Text */}
          <div className="mt-8 text-center max-w-sm">
            <h3 className="font-extrabold text-slate-900 text-lg">
              {phaseInfo.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {phaseInfo.desc}
            </p>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center gap-3">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Mulai Latihan (3 Siklus)</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="px-6 py-3 rounded-2xl bg-slate-800 text-white font-extrabold text-sm shadow-md hover:bg-slate-700 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Pause className="w-4 h-4" />
                <span>Jeda Sementara</span>
              </button>
            )}

            <button
              onClick={handleReset}
              title="Reset Latihan"
              className="p-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Checklist & Group Observation Tasks */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                👁️
              </span>
              <h3 className="font-bold text-slate-900 text-base">
                Lembar Observasi Pasangan / Kelompok
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Teman kelompok bertindak sebagai <strong>Pengamat Postur & Nafas</strong>. Periksa 4 indikator berikut:
            </p>

            <div className="space-y-2.5 text-xs text-slate-700">
              <label className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-amber-50/50 cursor-pointer transition-colors">
                <input type="checkbox" className="mt-0.5 rounded text-amber-600 focus:ring-amber-500" />
                <span>Bahu penyanyi tetap diam dan tenang (tidak naik saat menarik nafas).</span>
              </label>

              <label className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-amber-50/50 cursor-pointer transition-colors">
                <input type="checkbox" className="mt-0.5 rounded text-amber-600 focus:ring-amber-500" />
                <span>Pinggang dan perut bagian bawah mengembang terasa oleh tangan.</span>
              </label>

              <label className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-amber-50/50 cursor-pointer transition-colors">
                <input type="checkbox" className="mt-0.5 rounded text-amber-600 focus:ring-amber-500" />
                <span>Otot leher dan rahang tetap rileks tanpa urat leher tegang.</span>
              </label>

              <label className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-amber-50/50 cursor-pointer transition-colors">
                <input type="checkbox" className="mt-0.5 rounded text-amber-600 focus:ring-amber-500" />
                <span>Hembusan desis "Sss" berbunyi rata dan stabil hingga detik ke-8.</span>
              </label>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-900">
            <span className="font-semibold">Progres Siklus Latihan:</span>
            <span className="font-bold font-mono text-sm">{cycleCount} / 3 Selesai</span>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('anatomy')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Lab Anatomi</span>
        </button>
        <button
          onClick={() => onNavigate('tuner')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm"
        >
          <span>Lanjut ke Lab Tuner Intonasi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

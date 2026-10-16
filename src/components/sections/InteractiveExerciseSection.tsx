import React, { useState } from 'react';
import { SectionId } from '../../types';
import { VOCAL_ORGANS } from '../../data/curriculumData';
import { MascotCard } from '../MascotCard';
import { playSuccessChime, playIncorrectSound } from '../../utils/audioSynth';
import { speakText } from '../../utils/speechNarration';
import { Sparkles, CheckCircle2, RotateCcw, Volume2, ArrowRight, ArrowLeft } from 'lucide-react';

interface InteractiveExerciseSectionProps {
  onNavigate: (section: SectionId) => void;
}

const TARGET_BUCKETS = [
  { id: 'napas', label: '1. Penopang Nafas', desc: 'Menampung & mengontrol aliran udara' },
  { id: 'sumber_suara', label: '2. Sumber Suara (Fonasi)', desc: 'Menghasilkan getaran frekuensi bunyi' },
  { id: 'resonansi', label: '3. Penguat Resonansi', desc: 'Memantulkan dan mempertebal volume suara' },
  { id: 'artikulasi', label: '4. Pembentuk Artikulasi', desc: 'Membentuk kata & vokal A-I-U-E-O' }
];

export const InteractiveExerciseSection: React.FC<InteractiveExerciseSectionProps> = ({ onNavigate }) => {
  // Matching state: map organId -> bucketId
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedOrganId, setSelectedOrganId] = useState<string | null>(null);
  const [checkedResults, setCheckedResults] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSelectOrgan = (organId: string) => {
    if (checkedResults) return;
    setSelectedOrganId(organId);
  };

  const handleAssignToBucket = (bucketId: string) => {
    if (!selectedOrganId || checkedResults) return;
    setMatches((prev) => ({
      ...prev,
      [selectedOrganId]: bucketId
    }));
    setSelectedOrganId(null);
  };

  const handleCheckAnswers = () => {
    let allCorrect = true;
    VOCAL_ORGANS.forEach((organ) => {
      if (matches[organ.id] !== organ.correctTarget) {
        allCorrect = false;
      }
    });

    setCheckedResults(true);

    if (allCorrect && Object.keys(matches).length === VOCAL_ORGANS.length) {
      playSuccessChime();
      setFeedback('Luar biasa! Seluruh organ vokal telah dipasangkan dengan fungsinya secara tepat 100%!');
      speakText('Bagus sekali! Semua pasangan organ vokal sudah benar.');
    } else {
      playIncorrectSound();
      setFeedback('Masih ada pasangan yang belum tepat. Coba periksa kembali organ yang bergaris merah!');
    }
  };

  const handleReset = () => {
    setMatches({});
    setSelectedOrganId(null);
    setCheckedResults(false);
    setFeedback(null);
  };

  const readNarration = () => {
    speakText(
      'Latihan Interaktif Menjodohkan Organ Suara. Pilih salah satu kartu organ di sebelah kiri, lalu klik kotak fungsi yang sesuai di sebelah kanan. Pastikan seluruh organ terpasang dengan tepat sebelum menekan tombol Periksa Jawaban.'
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 08 · Latihan Gamifikasi
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Latihan Menjodohkan Organ & Fungsi Vokal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Uji pemahamanmu sebelum melangkah ke Kuis Formatif berstandar kelulusan 80%!
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
        message="Klik kartu organ tubuh di sebelah kiri, kemudian klik kotak fungsi yang cocok di sebelah kanan. Latihan ini akan membantumu meraih nilai 100 di kuis!"
      />

      {/* Interactive Matching Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Draggable/Selectable Organs */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Daftar Organ Tubuh (Pilih Satu):
            </h2>
            <span className="text-xs text-slate-400">4 Kartu</span>
          </div>

          <div className="space-y-3">
            {VOCAL_ORGANS.map((organ) => {
              const isSelected = selectedOrganId === organ.id;
              const assignedBucket = matches[organ.id];
              const isCorrect = checkedResults && assignedBucket === organ.correctTarget;
              const isWrong = checkedResults && assignedBucket && assignedBucket !== organ.correctTarget;

              return (
                <button
                  key={organ.id}
                  onClick={() => handleSelectOrgan(organ.id)}
                  disabled={checkedResults}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-400 shadow-md'
                      : isCorrect
                      ? 'border-emerald-400 bg-emerald-50/50'
                      : isWrong
                      ? 'border-rose-400 bg-rose-50/50'
                      : assignedBucket
                      ? 'border-slate-300 bg-slate-50 opacity-90'
                      : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">{organ.name}</h3>
                    {assignedBucket && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        Terpasang
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{organ.role}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Target Buckets */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Kotak Target Fungsi Bernyanyi:
            </h2>
            <span className="text-xs text-slate-400">Klik kotak untuk meletakkan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TARGET_BUCKETS.map((bucket) => {
              // Find organ placed in this bucket
              const placedOrgan = VOCAL_ORGANS.find((o) => matches[o.id] === bucket.id);

              return (
                <button
                  key={bucket.id}
                  onClick={() => handleAssignToBucket(bucket.id)}
                  disabled={checkedResults}
                  className={`text-left p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer min-h-[140px] flex flex-col justify-between ${
                    selectedOrganId
                      ? 'border-amber-400 bg-amber-50/40 hover:bg-amber-50'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div>
                    <span className="text-xs font-extrabold text-slate-800">
                      {bucket.label}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">{bucket.desc}</p>
                  </div>

                  <div className="mt-3">
                    {placedOrgan ? (
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-bold text-amber-900 flex items-center justify-between">
                        <span>{placedOrgan.name}</span>
                        {checkedResults && (
                          <span>
                            {placedOrgan.correctTarget === bucket.id ? '✅' : '❌'}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">
                        [Kosong - Klik di sini saat organ dipilih]
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback & Actions */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl text-xs font-semibold ${
                feedback.includes('Luar biasa')
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {feedback}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleCheckAnswers}
              disabled={Object.keys(matches).length === 0}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-40 cursor-pointer"
            >
              Periksa Jawaban
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Latihan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('tuner')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Lab Tuner</span>
        </button>
        <button
          onClick={() => onNavigate('quiz')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm"
        >
          <span>Lanjut ke Kuis Formatif (Target 80%)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

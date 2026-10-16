import React, { useState } from 'react';
import { SectionId } from '../../types';
import { MascotCard } from '../MascotCard';
import { playAperceptionComparison } from '../../utils/audioSynth';
import { speakText } from '../../utils/speechNarration';
import { Volume2, Music, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Headphones } from 'lucide-react';

interface ApperceptionSectionProps {
  onNavigate: (section: SectionId) => void;
}

export const ApperceptionSection: React.FC<ApperceptionSectionProps> = ({ onNavigate }) => {
  const [testedAudio, setTestedAudio] = useState<'tepat' | 'fals' | null>(null);
  const [userGuess, setUserGuess] = useState<'A' | 'B' | null>(null);
  const [guessFeedback, setGuessFeedback] = useState<string | null>(null);

  const handlePlayAudio = (type: 'tepat' | 'fals') => {
    setTestedAudio(type);
    playAperceptionComparison(type);
  };

  const handleCheckGuess = (choice: 'A' | 'B') => {
    setUserGuess(choice);
    // In our test: Sampel A is Tepat, Sampel B is Fals
    if (choice === 'A') {
      setGuessFeedback('Tepat sekali! Sampel A adalah nada yang akurat dan harmonis (440 Hz). Suaranya stabil dan bulat.');
    } else {
      setGuessFeedback('Sampel B terdengar goyah dan ada getaran disonan bergelombang (beating effect). Ini adalah contoh nada fals!');
    }
  };

  const readNarration = () => {
    speakText(
      'Apersepsi: Mengapa bernyanyi solo berbeda? Saat bernyanyi bersama paduan suara, nada yang sedikit meleset bisa tersamar oleh suara rekanmu. Namun saat bernyanyi solo, seluruh mata dan telinga tertuju padamu! Mari kita dengarkan perbedaan nada tepat versus nada fals pada pemutar suara interaktif di bawah ini.'
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 03
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Apersepsi: Tantangan Bernyanyi Solo
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Mengapa teknik vokal dan intonasi sangat menentukan saat tampil seorang diri?
          </p>
        </div>
        <button
          onClick={readNarration}
          className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Apersepsi</span>
        </button>
      </div>

      <MascotCard
        message="Pernahkah kamu mendengar seseorang bernyanyi tapi suaranya terasa 'geli' atau janggal di telinga? Itu terjadi karena intonasinya meleset beberapa sentimeter frekuensi!"
        subtext="Klik tombol audio di bawah untuk melatih kepekaan telingamu membedakan nada harmonis vs nada fals."
      />

      {/* Solo vs Choir Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
              👥
            </span>
            <h3 className="font-bold text-slate-900 text-base">
              Bernyanyi Kelompok / Paduan Suara
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Kekuatan suara bertumpu pada perpaduan harmoni bersama. Jika ada satu nada yang sedikit goyah atau nafas yang pendek, suara anggota kelompok lain dapat saling menopang dan menyamarkan kesalahan.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center text-sm">
              🌟
            </span>
            <h3 className="font-bold text-slate-900 text-base">
              Bernyanyi Solo (Tunggal)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            Seluruh perhatian penonton dan dinamika lagu terpusat 100% pada satu vokalis. Kejelasan lirik, stabilitas pernapasan diafragma, dan <strong>ketepatan bidikan nada (anti-fals)</strong> harus mutlak dikuasai!
          </p>
        </div>
      </div>

      {/* Interactive Ear Training Lab */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                Laboratorium Kepekaan Telinga (Ear Training)
              </h2>
              <p className="text-xs text-slate-400">
                Dengarkan kedua sampel audio di bawah ini yang dibangkitkan langsung oleh Web Audio API:
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
            Simulasi Frekuensi Nyata
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Sample A */}
          <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Sampel Suara A
              </span>
              <span className="text-xs text-slate-400">Frekuensi Akurat (440 Hz)</span>
            </div>
            <button
              onClick={() => handlePlayAudio('tepat')}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Music className="w-4 h-4" />
              <span>Putar Nada Harmonis (Pas)</span>
            </button>
            <p className="text-[11px] text-slate-400">
              Gelombang murni A4 yang bulat, stabil, dan pas di tengah sasaran tala nada.
            </p>
          </div>

          {/* Sample B */}
          <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Sampel Suara B
              </span>
              <span className="text-xs text-slate-400">Frekuensi Meleset (425 Hz)</span>
            </div>
            <button
              onClick={() => handlePlayAudio('fals')}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Putar Nada Sumbang (Fals)</span>
            </button>
            <p className="text-[11px] text-slate-400">
              Nada sedikit lebih rendah (underpitch) dengan efek gelombang getaran disonan.
            </p>
          </div>
        </div>

        {/* Mini Quiz Guess */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-200">
            Tebak Cepat: Manakah sampel yang menurut telingamu berbunyi PALING MERDU & TEPAT?
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCheckGuess('A')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                userGuess === 'A'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Pilih Sampel A
            </button>
            <button
              onClick={() => handleCheckGuess('B')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                userGuess === 'B'
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Pilih Sampel B
            </button>
          </div>

          {guessFeedback && (
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-amber-300 animate-in fade-in">
              💡 {guessFeedback}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('objectives')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Tujuan</span>
        </button>
        <button
          onClick={() => onNavigate('material')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm"
        >
          <span>Lanjut ke 5 Pilar Materi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

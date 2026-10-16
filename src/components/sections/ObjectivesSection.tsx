import React from 'react';
import { SectionId } from '../../types';
import { MascotCard } from '../MascotCard';
import { Target, CheckCircle2, Award, Volume2, ArrowRight, ArrowLeft } from 'lucide-react';
import { speakText } from '../../utils/speechNarration';

interface ObjectivesSectionProps {
  onNavigate: (section: SectionId) => void;
}

export const ObjectivesSection: React.FC<ObjectivesSectionProps> = ({ onNavigate }) => {
  const readNarration = () => {
    speakText(
      'Tujuan Pembelajaran Bernyanyi Solo SMP Kelas Tujuh. Peserta didik mampu memahami dan menganalisis teknik dasar dalam bernyanyi solo, meliputi postur tubuh, pernapasan diafragma, resonansi, artikulasi vokal, dan ketepatan intonasi nada. Kriteria keberhasilan: peserta didik mampu menyelesaikan kuis formatif dengan skor minimal 80 persen.'
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 02
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Tujuan Pembelajaran & Kriteria Keberhasilan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kurikulum Merdeka · Fase D (SMP Kelas 7) · Seni Musik Unit 1
          </p>
        </div>
        <button
          onClick={readNarration}
          className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Tujuan</span>
        </button>
      </div>

      <MascotCard
        message="Target kita adalah skor minimal 80%! Di VocaLab, kamu tidak perlu terburu-buru; cermati materi dan cobalah simulator intonasi sesering mungkin."
      />

      {/* Main Goal Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Tujuan Pembelajaran Spesifik
            </h2>
            <p className="text-xs text-slate-600">
              Capaian Elemen Mengalami (Experiencing) & Merefleksikan (Reflecting)
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed font-medium bg-white/80 p-4 rounded-2xl border border-amber-200/80">
          "Peserta didik mampu memahami, menganalisis, dan mempraktikkan teknik dasar bernyanyi solo (meliputi sikap postur tubuh, pernapasan diafragma, resonansi rongga tubuh, artikulasi vokal A-I-U-E-O, serta ketepatan intonasi nada diatonis) dengan percaya diri dan penuh apresiasi musikal."
        </p>
      </div>

      {/* Success Indicators & Passing Grade */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Indikator Ketercapaian Tujuan Pembelajaran (IKTP)</span>
          </h3>

          <div className="space-y-3">
            {[
              'Menjelaskan fungsi postur tubuh tegap dan rileks dalam menopang aliran udara suara.',
              'Menganalisis perbedaan pernapasan dada, perut, dan diafragma dalam bernyanyi solo.',
              'Mengidentifikasi 3 rongga resonansi (dada, mulut, kepala) untuk mempertebal timbre vokal.',
              'Menunjukkan bentuk bukaan rongga mulut pada artikulasi vokal (A, I, U, E, O).',
              'Mengukur ketepatan membidik nada (solfeggio) menggunakan simulasi tuner vokal tanpa fals.'
            ].map((text, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Passing Grade Target */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50 to-teal-50/40 border border-emerald-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">
              Kriteria Kelulusan Kuis
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Untuk mendapatkan Sertifikat Digital Resmi "Bintang Vokal Solo", kamu atau kelompokmu harus menjawab kuis formatif dengan:
            </p>
            <div className="p-4 rounded-2xl bg-white border border-emerald-200 text-center">
              <span className="text-3xl font-extrabold text-emerald-600 font-mono">
                ≥ 80%
              </span>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Minimal Benar 4 dari 5 Soal Analitis
              </p>
            </div>
          </div>

          <p className="text-[11px] text-emerald-800/80 italic mt-4">
            💡 Jika nilai pertama belum mencapai 80%, kamu dapat meninjau kembali pembahasan dan mengulang kuis kapan saja.
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('instructions')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Petunjuk</span>
        </button>
        <button
          onClick={() => onNavigate('apperception')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm"
        >
          <span>Lanjut ke Apersepsi & Uji Suara</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

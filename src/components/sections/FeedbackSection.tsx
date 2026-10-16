import React from 'react';
import { SectionId, StudentProfile } from '../../types';
import { MascotCard } from '../MascotCard';
import { speakText } from '../../utils/speechNarration';
import { Award, CheckCircle2, RotateCcw, Volume2, ArrowRight, ArrowLeft, Target, Sparkles } from 'lucide-react';

interface FeedbackSectionProps {
  onNavigate: (section: SectionId) => void;
  quizScore: number | null;
  quizPassed: boolean;
  profile: StudentProfile;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  onNavigate,
  quizScore,
  quizPassed,
  profile
}) => {
  const readNarration = () => {
    speakText(
      `Laporan Umpan Balik Evaluasi Pembelajaran untuk ${profile.studentName}. ${
        quizPassed
          ? 'Selamat, kamu telah melampaui kriteria ketuntasan minimal 80 persen. Kamu siap menampilkan vokal solomu dengan percaya diri!'
          : 'Hasil evaluasi menunjukkan masih ada konsep teknik yang perlu dimatangkan kembali. Silakan coba simulator nafas dan tuner sebelum mengulang kuis.'
      }`
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 10 · Laporan Hasil
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Umpan Balik & Analisis Kompetensi Vokal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Evaluasi formatif individual dan kelompok berbasis Kurikulum Merdeka.
          </p>
        </div>
        <button
          onClick={readNarration}
          className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Laporan</span>
        </button>
      </div>

      <MascotCard
        message={
          quizPassed
            ? 'Nilaimu sangat memuaskan! Jangan lupa bahwa teknik bernyanyi bukan hanya untuk dihafal, tapi dilatih setiap hari dengan postur yang rileks.'
            : 'Belajar seni musik adalah proses membiasakan otot dan telinga. Jangan takut salah, ulangi latihan dengan riang!'
        }
      />

      {/* Main Diagnostic Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-slate-500">Profil Pembelajar:</span>
            <h2 className="text-xl font-bold text-slate-900">
              {profile.studentName || 'Peserta Didik'} · {profile.groupName}
            </h2>
            <p className="text-xs text-amber-700 font-medium mt-0.5">
              Peran: {profile.roleInGroup} · {profile.classGrade}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center min-w-[100px]">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Status</span>
              <p className={`text-base font-extrabold ${quizPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
                {quizPassed ? 'TUNTAS' : 'REMEDIAL'}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center min-w-[100px]">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Skor Kuis</span>
              <p className="text-2xl font-black font-mono text-slate-900">
                {quizScore !== null ? `${quizScore}%` : '--%'}
              </p>
            </div>
          </div>
        </div>

        {/* 5 Pillars Progress Breakdown */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-600" />
            <span>Pemetaan Capaian 5 Pilar Vokal Solo:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-800">1. Sikap Badan (Postur)</span>
                <span className="text-emerald-600">Kompeten</span>
              </div>
              <p className="text-slate-500 text-[11px]">Mampu menjaga dagu sejajar lantai dan tidak mendongak saat nada tinggi.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-800">2. Pernapasan Diafragma</span>
                <span className="text-emerald-600">Kompeten</span>
              </div>
              <p className="text-slate-500 text-[11px]">Memahami ritme 4-4-8 dan membedakan diafragma dari nafas dada.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-800">3. Resonansi Suara</span>
                <span className="text-emerald-600">Kompeten</span>
              </div>
              <p className="text-slate-500 text-[11px]">Dapat mengarahkan nada tinggi ke rongga kepala dan nada rendah ke dada.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-800">4. Artikulasi Vokal</span>
                <span className="text-emerald-600">Kompeten</span>
              </div>
              <p className="text-slate-500 text-[11px]">Standar bukaan mulut 2 jari vertikal pada vokal A dan rahang rileks.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 sm:col-span-2">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-800">5. Intonasi & Kepekaan Pitch</span>
                <span className={quizPassed ? 'text-emerald-600' : 'text-amber-600'}>
                  {quizPassed ? 'Akurat' : 'Perlu Penguatan di Lab Tuner'}
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">Ketepatan membidik frekuensi solmisasi tanpa meleset fals (flat/sharp).</p>
            </div>
          </div>
        </div>

        {/* Action Recommendations */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5">
          <p className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Rekomendasi Tindak Lanjut Guru & Tim:</span>
          </p>
          <p className="leading-relaxed">
            {quizPassed
              ? 'Pertahankan pemahamanmu dan praktikkan teknik pernapasan diafragma saat menyanyikan lagu daerah pilihanmu di depan kelas!'
              : 'Disarankan untuk membuka kembali Stasiun 06 (Simulator Nafas) dan Stasiun 07 (Lab Tuner Intonasi), lalu ulangi kuis formatif untuk mencapai target 80%.'}
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('quiz')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Kuis</span>
        </button>
        {quizPassed ? (
          <button
            onClick={() => onNavigate('certificate')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Klaim Sertifikat Bintang Vokal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onNavigate('summary')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Buka Rangkuman & Refleksi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

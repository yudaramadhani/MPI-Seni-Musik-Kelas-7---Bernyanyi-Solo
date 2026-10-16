import React from 'react';
import { SectionId, StudentProfile } from '../../types';
import { MascotCard } from '../MascotCard';
import { speakText } from '../../utils/speechNarration';
import { Award, Printer, Lock, ArrowRight, ArrowLeft, Sparkles, CheckCircle } from 'lucide-react';

interface CertificateSectionProps {
  onNavigate: (section: SectionId) => void;
  profile: StudentProfile;
  quizScore: number | null;
  quizPassed: boolean;
}

export const CertificateSection: React.FC<CertificateSectionProps> = ({
  onNavigate,
  profile,
  quizScore,
  quizPassed
}) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const readNarration = () => {
    if (quizPassed) {
      speakText(
        `Piagam Penghargaan Bintang Vokal Solo. Diberikan kepada ${profile.studentName || 'Peserta Didik'}, kelompok ${profile.groupName}, atas keberhasilan menyelesaikan Multimedia Pembelajaran Interaktif VocaLab dengan predikat Sangat Baik dan nilai ${quizScore} persen.`
      );
    } else {
      speakText(
        'Sertifikat ini masih terkunci. Selesaikan kuis formatif dengan nilai minimal 80 persen untuk membuka dan mencetak piagam ini.'
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 print:hidden">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 12 · Penghargaan Digital
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Piagam & Sertifikat Bintang Vokal Solo
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Bukti pencapaian kompetensi bernyanyi solo Kurikulum Merdeka SMP Kelas VII.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={readNarration}
            className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Bacakan Sertifikat</span>
          </button>
          {quizPassed && (
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
          )}
        </div>
      </div>

      <div className="print:hidden">
        <MascotCard
          message={
            quizPassed
              ? `Selamat ${profile.studentName}! Kamu resmi menjadi Bintang Vokal Solo SMP Kelas 7. Simpan piagam ini sebagai portofolio prestasimu!`
              : 'Sertifikat ini akan terbuka otomatis ketika kamu mencapai skor minimal 80% pada kuis formatif.'
          }
        />
      </div>

      {/* Certificate Container */}
      {quizPassed ? (
        <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-8 border-double border-amber-300 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-6 print:border-4 print:p-6 print:shadow-none">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 left-4 text-amber-400 text-2xl font-serif">❦</div>
          <div className="absolute top-4 right-4 text-amber-400 text-2xl font-serif">❦</div>
          <div className="absolute bottom-4 left-4 text-amber-400 text-2xl font-serif">❦</div>
          <div className="absolute bottom-4 right-4 text-amber-400 text-2xl font-serif">❦</div>

          {/* Header Seal */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white shadow-lg border-2 border-white">
              <Award className="w-9 h-9" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-wide uppercase">
              Piagam Penghargaan
            </h2>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
              Sertifikat Keberhasilan Eksplorasi Seni Musik SMP
            </p>
          </div>

          {/* Recipient Details */}
          <div className="space-y-2 py-4 border-y border-amber-200/80">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Dengan bangga dianugerahkan kepada:
            </p>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 tracking-tight">
              {profile.studentName || 'Bintang Musik Siswa'}
            </h3>
            <p className="text-xs font-bold text-slate-700">
              Kelompok Vokal: <span className="text-amber-800 font-extrabold">{profile.groupName}</span> · Peran: {profile.roleInGroup}
            </p>
            <p className="text-xs text-slate-500">
              Kelas VII Semester 1 · Kurikulum Merdeka
            </p>
          </div>

          {/* Statement */}
          <div className="max-w-xl mx-auto space-y-1">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
              Telah berhasil menuntaskan seluruh rangkaian stasiun pembelajaran interaktif <strong>VocaLab</strong> dengan penguasaan 5 pilar teknik vokal solo: sikap tubuh, pernapasan diafragma, resonansi, artikulasi, dan intonasi tanpa fals.
            </p>
            <div className="inline-block mt-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300">
              Predikat: SANGAT BAIK · Nilai Evaluasi: {quizScore}%
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-4 text-xs text-slate-600">
            <div className="text-center sm:text-left">
              <p className="text-[11px] text-slate-400">Diterbitkan pada:</p>
              <p className="font-semibold text-slate-800">{currentDate}</p>
              <p className="text-[11px] text-slate-500">Laboratorium Musik VocaLab</p>
            </div>

            {/* Mascot Seal stamp */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-amber-500 p-1 flex items-center justify-center">
                <img
                  src="/src/assets/images/mascot_melodi_bird_1791604828906.jpg"
                  alt="Stempel Melodi"
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] font-bold text-amber-700 mt-1 uppercase">
                Stempel Resmi Melodi
              </span>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-[11px] text-slate-400">Instruktur Pembimbing:</p>
              <p className="font-semibold text-slate-800 underline decoration-amber-400 underline-offset-4">
                Guru Seni Budaya (Musik)
              </p>
              <p className="text-[11px] text-slate-500">Fase D SMP Kelas VII</p>
            </div>
          </div>
        </div>
      ) : (
        /* Locked State */
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Piagam Penghargaan Masih Terkunci
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Selesaikan Kuis Formatif di Stasiun 09 dengan skor minimal <strong>80%</strong> untuk membuka dan mencetak sertifikat resmi atas nama kamu dan tim.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('quiz')}
              className="px-6 py-3 rounded-2xl bg-amber-500 text-white font-extrabold text-xs hover:bg-amber-600 shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Buka Stasiun Kuis Formatif</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 print:hidden">
        <button
          onClick={() => onNavigate('summary')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Rangkuman</span>
        </button>
        <button
          onClick={() => onNavigate('references')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <span>Lanjut ke Glosarium & Referensi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

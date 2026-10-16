import React from 'react';
import { SectionId } from '../../types';
import { GROUP_ROLES } from '../../data/curriculumData';
import { MascotCard } from '../MascotCard';
import { Volume2, Users, Keyboard, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { speakText } from '../../utils/speechNarration';

interface InstructionsSectionProps {
  onNavigate: (section: SectionId) => void;
}

export const InstructionsSection: React.FC<InstructionsSectionProps> = ({ onNavigate }) => {
  const readNarration = () => {
    speakText(
      'Petunjuk Penggunaan VocaLab. Aplikasi ini dirancang untuk membantumu belajar bernyanyi solo dengan mudah. Kamu dapat berpindah stasiun materi menggunakan tombol navigasi. Manfaatkan fitur Text to Speech jika ingin mendengarkan materi dibacakan. Jika belajar bersama kelompok, bagilah peran sebagai Penyanyi Solo, Pengamat Postur dan Nafas, Penguji Intonasi, atau Notulis.'
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 01
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Petunjuk Penggunaan & Aksesibilitas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Panduan lengkap agar pengalaman belajar vokal menjadi interaktif, inklusif, dan menyenangkan.
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
        message="VocaLab sangat mudah digunakan! Jangan ragu menekan tombol audio atau mengganti ukuran teks di pojok kanan atas jika kamu butuh bantuan visual."
      />

      {/* Grid Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Navigation Guide */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              🧭
            </span>
            <h2 className="text-base font-bold text-slate-900">Alur & Simbol Navigasi</h2>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-amber-600">🔘 Tombol Stasiun:</span>
              <span>Gunakan menu atas atau tombol "Lanjut" di bagian bawah layar untuk beralih ke stasiun belajar berikutnya.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-amber-600">🔊 Ikon Audio:</span>
              <span>Klik ikon speaker di dekat judul materi kapan saja untuk mendengarkan teks dinarasikan secara otomatis.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-amber-600">🖥️ Mode Fullscreen:</span>
              <span>Klik tombol "Layar Penuh" di bilah atas untuk menyembunyikan distraksi peramban web selama belajar.</span>
            </li>
          </ul>
        </div>

        {/* Accessibility Features */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm">
              👁️
            </span>
            <h2 className="text-base font-bold text-slate-900">Fitur Aksesibilitas</h2>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-indigo-600">🔤 Font Ramah Disleksia:</span>
              <span>Aktifkan melalui tombol mata (Eye) di bilah navigasi atas untuk mengubah tampilan teks ke spasi yang lebih mudah dibaca.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-indigo-600">🔍 Ukuran Teks Fleksibel:</span>
              <span>Tersedia pilihan ukuran Normal, Besar, dan Ekstra Besar agar nyaman di mata saat menggunakan ponsel maupun proyektor.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-indigo-600">🌓 Kontras Tinggi:</span>
              <span>Membantu siswa dengan hambatan penglihatan membedakan teks dan objek tombol dengan jelas.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Group Learning Protocol */}
      <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Panduan Kolaborasi Kelompok (3 - 4 Siswa)
            </h2>
            <p className="text-xs text-slate-600">
              Setiap anggota kelompok dapat bergantian memegang peran berikut saat praktik simulasi vokal:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GROUP_ROLES.map((role, idx) => (
            <div
              key={role.role}
              className="p-4 rounded-xl bg-white border border-amber-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Peran {idx + 1}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1.5">
                  {role.role}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  {role.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100">
                <p className="text-[11px] font-semibold text-slate-700 mb-1">Tugas Utama:</p>
                <ul className="text-[11px] text-slate-500 space-y-0.5 list-disc list-inside">
                  {role.tasks.map((t, tidx) => (
                    <li key={tidx}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('menu')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
        <button
          onClick={() => onNavigate('objectives')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm"
        >
          <span>Lanjut ke Tujuan Pembelajaran</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

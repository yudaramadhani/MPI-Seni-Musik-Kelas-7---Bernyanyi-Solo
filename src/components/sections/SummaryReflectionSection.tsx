import React, { useState } from 'react';
import { SectionId, StudentProfile } from '../../types';
import { MascotCard } from '../MascotCard';
import { speakText } from '../../utils/speechNarration';
import { Bookmark, MessageSquare, Save, Volume2, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface SummaryReflectionSectionProps {
  onNavigate: (section: SectionId) => void;
  profile: StudentProfile;
}

export const SummaryReflectionSection: React.FC<SummaryReflectionSectionProps> = ({
  onNavigate,
  profile
}) => {
  const [reflection3, setReflection3] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection1, setReflection1] = useState('');
  const [savedNote, setSavedNote] = useState(false);

  const handleSaveReflection = () => {
    setSavedNote(true);
    speakText('Catatan refleksi berhasil disimpan! Kerja sama yang luar biasa bersama tim.');
    setTimeout(() => setSavedNote(false), 3000);
  };

  const readNarration = () => {
    speakText(
      'Rangkuman dan Refleksi Pembelajaran. Mari mengingat kembali lima pilar bernyanyi solo: postur tubuh tegap dan rileks, pernapasan diafragma yang stabil, resonansi tiga rongga tubuh, artikulasi vokal A-I-U-E-O yang jelas, serta intonasi nada yang akurat tanpa fals. Tuliskan refleksimu pada lembar 3-2-1 di bawah ini.'
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 11 · Rangkuman & Refleksi
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Rangkuman Esensial & Refleksi 3-2-1
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Endapkan pemahaman bernyanyi solo dan rekatkan kolaborasi kelompokmu.
          </p>
        </div>
        <button
          onClick={readNarration}
          className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Rangkuman</span>
        </button>
      </div>

      <MascotCard
        message="Refleksi adalah rahasia seorang musisi hebat! Tuliskan apa yang paling berkesan bagi kamu dan kelompokmu hari ini."
      />

      {/* 5 Pillars Quick Memory Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-600" />
          <span>Peta Ingatan Ringkas (5 Pilar Bernyanyi Solo)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              1. Postur
            </span>
            <h3 className="font-bold text-slate-900 text-xs">Sikap Badan</h3>
            <p className="text-[11px] text-slate-500 leading-snug">
              Tegap rileks, bahu diam, dagu sejajar lantai. Hindari mendongak saat nada tinggi.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              2. Nafas
            </span>
            <h3 className="font-bold text-slate-900 text-xs">Diafragma</h3>
            <p className="text-[11px] text-slate-500 leading-snug">
              Otot sekat dada turun, lingkar pinggang mengembang. Hembusan stabil desis Sss 4-4-8.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
              3. Resonansi
            </span>
            <h3 className="font-bold text-slate-900 text-xs">Tiga Rongga</h3>
            <p className="text-[11px] text-slate-500 leading-snug">
              Rongga dada (rendah), mulut (tengah), dan sinus/kepala (tinggi) sebagai amplifier.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
              4. Artikulasi
            </span>
            <h3 className="font-bold text-slate-900 text-xs">Diksi & Vokal</h3>
            <p className="text-[11px] text-slate-500 leading-snug">
              Vokal A-I-U-E-O buka 2 jari vertikal, rahang bawah santai, konsonan ditegaskan.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
              5. Intonasi
            </span>
            <h3 className="font-bold text-slate-900 text-xs">Anti-Fals</h3>
            <p className="text-[11px] text-slate-500 leading-snug">
              Ketepatan membidik tinggi-rendah nada solmisasi pada jarum tuner tanpa meleset.
            </p>
          </div>
        </div>
      </div>

      {/* 3-2-1 Reflection Interactive Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Lembar Refleksi Pembelajaran 3 - 2 - 1
              </h2>
              <p className="text-xs text-slate-500">
                Ditulis oleh: {profile.studentName || 'Peserta Didik'} ({profile.groupName})
              </p>
            </div>
          </div>
          {savedNote && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Tersimpan!</span>
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              🌟 3 Hal Baru yang Saya dan Kelompok Pelajari:
            </label>
            <textarea
              rows={2}
              value={reflection3}
              onChange={(e) => setReflection3(e.target.value)}
              placeholder="Contoh: 1. Cara kerja diafragma, 2. Bahaya mendongak saat nada tinggi, 3. Membaca jarum tuner cents..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              💡 2 Hal yang Paling Menarik atau Menantang:
            </label>
            <textarea
              rows={2}
              value={reflection2}
              onChange={(e) => setReflection2(e.target.value)}
              placeholder="Contoh: Menirukan nada piano pada Lab Tuner mikrofon dan mengontrol nafas 8 detik..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              🎯 1 Hal yang Ingin Terus Saya Latih Bersama Teman:
            </label>
            <textarea
              rows={2}
              value={reflection1}
              onChange={(e) => setReflection1(e.target.value)}
              placeholder="Contoh: Mempertebal suara dengan resonansi kepala saat menyanyikan lagu solo kesukaan..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
            />
          </div>

          <button
            onClick={handleSaveReflection}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Catatan Refleksi</span>
          </button>
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
        <button
          onClick={() => onNavigate('certificate')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <span>Lanjut ke Sertifikat Kelulusan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SectionId } from '../../types';
import { MascotCard } from '../MascotCard';
import { speakText } from '../../utils/speechNarration';
import { Volume2, Sparkles, Layers, ArrowRight, ArrowLeft, Info } from 'lucide-react';

interface AnatomyExplorationSectionProps {
  onNavigate: (section: SectionId) => void;
}

interface Hotspot {
  id: string;
  name: string;
  role: string;
  detail: string;
  xPercent: number; // For interactive highlight placement
  yPercent: number;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'diafragma',
    name: '1. Diafragma (Diaphragm)',
    role: 'Pompa Udara Alami',
    detail: 'Otot tipis berbentuk kubah di bawah paru-paru. Bergerak mendatar turun saat menarik nafas, menampung udara bervolume maksimal.',
    xPercent: 52,
    yPercent: 88
  },
  {
    id: 'paru-paru',
    name: '2. Paru-Paru (Lungs)',
    role: 'Reservoir Udara Suara',
    detail: 'Menyimpan oksigen yang akan dihembuskan melewati pita suara secara stabil tanpa terputus.',
    xPercent: 54,
    yPercent: 72
  },
  {
    id: 'pita-suara',
    name: '3. Pita Suara di Laring (Voice Box)',
    role: 'Generator Getaran Bunyi',
    detail: 'Sepasang selaput lentur yang merapat dan bergetar ribuan kali per detik saat dialiri udara dari paru-paru.',
    xPercent: 57,
    yPercent: 52
  },
  {
    id: 'resonansi-kepala',
    name: '4. Rongga Resonansi Sinus & Wajah',
    role: 'Penguat Nada Tinggi (Head Voice)',
    detail: 'Ruang hampa di tulang pipi, dahi, dan hidung tempat gelombang frekuensi tinggi bergetar megah.',
    xPercent: 68,
    yPercent: 28
  },
  {
    id: 'artikulasi-mulut',
    name: '5. Organ Artikulasi (Bibir, Lidah, Rahang)',
    role: 'Pencetak Kata & Lirik',
    detail: 'Membentuk bunyi mentah dari pita suara menjadi suku kata yang tegas dan vokal A, I, U, E, O yang bulat.',
    xPercent: 66,
    yPercent: 40
  }
];

export const AnatomyExplorationSection: React.FC<AnatomyExplorationSectionProps> = ({ onNavigate }) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[0]);

  const handleSelectHotspot = (h: Hotspot) => {
    setActiveHotspot(h);
    speakText(`${h.name}. Peran: ${h.role}. ${h.detail}`);
  };

  const readNarration = () => {
    speakText(
      'Lab Anatomi Organ Vokal. Tubuh manusia adalah instrumen musik yang utuh. Mulai dari diafragma sebagai penopang udara, pita suara di dalam laring sebagai sumber bunyi, rongga resonansi sebagai penguat suara, hingga bibir dan lidah sebagai pembentuk kata. Klik setiap organ untuk mempelajari fungsinya!'
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 05 · Eksplorasi Visual
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Lab Anatomi Organ Vokal & Peta Konsep
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Lihat bagaimana tubuh manusia bekerja sebagai satu instrumen musik akustik yang sempurna.
          </p>
        </div>
        <button
          onClick={readNarration}
          className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Penjelasan Anatomi</span>
        </button>
      </div>

      <MascotCard
        message="Tidak seperti gitar atau piano yang bisa dilihat dari luar, instrumen bernyanyi ada di dalam tubuhmu sendiri! Kenali letak diafragma, laring, dan rongga resonansimu."
      />

      {/* Anatomy Sandbox 2-Zone Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Diagram with Highlights */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Bagan Anatomi Vokal Manusia</span>
            </h2>
            <span className="text-xs text-slate-400">Pilih organ di bawah gambar</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
            <img
              src="/src/assets/images/diagram_vocal_anatomy_1791604850818.jpg"
              alt="Bagan Anatomi Suara Manusia Lengkap"
              className="w-full h-auto max-h-[460px] object-contain mx-auto"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Quick Select Buttons below image */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            {HOTSPOTS.map((h) => {
              const isSelected = h.id === activeHotspot.id;
              return (
                <button
                  key={h.id}
                  onClick={() => handleSelectHotspot(h)}
                  className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-500' : 'bg-slate-300'}`} />
                  <span className="truncate">{h.name.split('. ')[1].split(' (')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Organ Detail & Concept Relationship */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Organ Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Organ Terpilih
              </span>
              <button
                onClick={() => speakText(`${activeHotspot.name}. ${activeHotspot.detail}`)}
                className="text-xs text-amber-600 hover:text-amber-800 flex items-center gap-1 font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Bacakan</span>
              </button>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {activeHotspot.name}
              </h3>
              <p className="text-xs font-bold text-amber-600 mt-0.5">
                {activeHotspot.role}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {activeHotspot.detail}
            </p>
          </div>

          {/* Cause and Effect Musical Concept Map */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-md space-y-4">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Peta Alur Bunyi (Sebab-Akibat)</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <p className="font-bold text-white">Inspirasi Diafragma</p>
                  <p className="text-slate-400 text-[11px]">Udara ditarik ke paru-paru bagian bawah.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <p className="font-bold text-white">Fonasi di Laring</p>
                  <p className="text-slate-400 text-[11px]">Pita suara bergetar mengubah aliran udara jadi bunyi nada.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <p className="font-bold text-white">Amplifikasi Resonansi</p>
                  <p className="text-slate-400 text-[11px]">Getaran dipantulkan di dada, mulut, atau sinus kepala.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0">
                  4
                </span>
                <div>
                  <p className="font-bold text-white">Artikulasi Lirik</p>
                  <p className="text-slate-400 text-[11px]">Bibir dan lidah membentuk huruf dan kata yang jelas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('material')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke 5 Pilar</span>
        </button>
        <button
          onClick={() => onNavigate('breathing')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm"
        >
          <span>Lanjut ke Simulator Nafas Diafragma</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

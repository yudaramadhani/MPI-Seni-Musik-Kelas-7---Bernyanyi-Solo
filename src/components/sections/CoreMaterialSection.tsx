import React, { useState } from 'react';
import { SectionId } from '../../types';
import { VOCAL_PILLARS } from '../../data/curriculumData';
import { MascotCard } from '../MascotCard';
import { speakText } from '../../utils/speechNarration';
import { Volume2, Sparkles, AlertTriangle, Lightbulb, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface CoreMaterialSectionProps {
  onNavigate: (section: SectionId) => void;
}

export const CoreMaterialSection: React.FC<CoreMaterialSectionProps> = ({ onNavigate }) => {
  const [activePillarId, setActivePillarId] = useState<string>(VOCAL_PILLARS[0].id);

  const activePillar = VOCAL_PILLARS.find((p) => p.id === activePillarId) || VOCAL_PILLARS[0];

  const handleReadPillar = (pillar: typeof activePillar) => {
    const textToRead = `${pillar.title}. ${pillar.subtitle}. ${pillar.summary}. Poin penting: ${pillar.keyPoints
      .map((k) => `${k.label}: ${k.detail}`)
      .join('. ')}. Kesalahan umum: ${pillar.commonMistake}. Tips dari Melodi: ${pillar.proTip}`;
    speakText(textToRead);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 04 · Materi Utama
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            5 Pilar Teknik Bernyanyi Solo
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Panduan anatomis dan teknik bernyanyi sesuai standar Kurikulum Merdeka SMP Kelas VII.
          </p>
        </div>
        <button
          onClick={() => handleReadPillar(activePillar)}
          className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Materi Ini</span>
        </button>
      </div>

      {/* Mascot Card */}
      <MascotCard
        message="Kelima pilar ini bekerja bersama bagaikan satu tim! Nafas diafragma adalah bahan bakar mesin, postur adalah rangkanya, resonansi adalah amplifiernya, artikulasi adalah kemasannya, dan intonasi adalah sasaran tembaknya!"
      />

      {/* Tabs for 5 Pillars */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {VOCAL_PILLARS.map((pillar, idx) => {
          const isActive = pillar.id === activePillarId;
          return (
            <button
              key={pillar.id}
              onClick={() => setActivePillarId(pillar.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                {idx + 1}
              </span>
              <span>{pillar.title.split('. ')[1]}</span>
            </button>
          );
        })}
      </div>

      {/* Pillar Detail Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        {/* Title & Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${activePillar.badgeColor}`}>
              Pilar Utama
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              {activePillar.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {activePillar.subtitle}
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 max-w-md">
            {activePillar.summary}
          </p>
        </div>

        {/* 3 Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activePillar.keyPoints.map((pt, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-2 hover:border-amber-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-700 text-xs font-bold">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{pt.label}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pt.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Common Mistakes & Pro Tip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Mistake warning */}
          <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                Kesalahan yang Sering Terjadi:
              </p>
              <p className="text-xs text-rose-700 mt-1 leading-snug">
                {activePillar.commonMistake}
              </p>
            </div>
          </div>

          {/* Pro tip */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                Pro Tip Melodi:
              </p>
              <p className="text-xs text-emerald-800 mt-1 leading-snug">
                {activePillar.proTip}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('apperception')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Apersepsi</span>
        </button>
        <button
          onClick={() => onNavigate('anatomy')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm"
        >
          <span>Lanjut ke Lab Anatomi Vokal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

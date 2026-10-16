import React, { useState } from 'react';
import { SectionId } from '../../types';
import { GLOSSARY_TERMS } from '../../data/curriculumData';
import { MascotCard } from '../MascotCard';
import { speakText } from '../../utils/speechNarration';
import { BookOpen, Search, Volume2, FileText, ArrowLeft, ArrowRight } from 'lucide-react';

interface GlossaryReferencesSectionProps {
  onNavigate: (section: SectionId) => void;
  onOpenDesignDoc: () => void;
}

export const GlossaryReferencesSection: React.FC<GlossaryReferencesSectionProps> = ({
  onNavigate,
  onOpenDesignDoc
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGlossary = GLOSSARY_TERMS.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const readNarration = () => {
    speakText(
      'Glosarium dan Referensi Pembelajaran. Memuat kamus istilah vokal penting seperti solfeggio, phrasering, head voice, dan vibrato, serta rujukan resmi buku seni musik SMP Kelas 7 Kemendikbudristek Kurikulum Merdeka.'
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 13 · Glosarium & Rujukan
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Kamus Istilah Vokal & Referensi Kurikulum
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Glosarium musikal lengkap dan dasar pustaka resmi Kurikulum Merdeka.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={readNarration}
            className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Dengarkan Glosarium</span>
          </button>
          <button
            onClick={onOpenDesignDoc}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Dokumen Desain (23 Poin)</span>
          </button>
        </div>
      </div>

      <MascotCard
        message="Memahami istilah musik membantumu berkomunikasi seperti musisi profesional! Klik istilah mana saja untuk mendengarkan artinya."
      />

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari istilah vokal (misal: Diafragma, Resonansi, Head Voice)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
        />
      </div>

      {/* Glossary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredGlossary.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-all space-y-2"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {item.term}
                </h3>
                <button
                  onClick={() => speakText(`${item.term}: ${item.desc}`)}
                  title="Dengarkan Istilah"
                  className="p-1 text-amber-600 hover:text-amber-800 rounded-md"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Official Curriculum References */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold">
            Daftar Pustaka & Referensi Kurikulum Merdeka
          </h2>
        </div>

        <ul className="space-y-3 text-xs text-slate-300">
          <li className="p-3 rounded-xl bg-slate-800 border border-slate-700">
            <strong>Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI (2021).</strong>{' '}
            <em>Buku Panduan Guru Seni Musik untuk SMP Kelas VII.</em> Jakarta: Pusat Kurikulum dan Perbukuan, Balitbangbuk.
          </li>
          <li className="p-3 rounded-xl bg-slate-800 border border-slate-700">
            <strong>Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI (2021).</strong>{' '}
            <em>Buku Siswa Seni Musik SMP Kelas VII.</em> Jakarta: Balitbangbuk Kemendikbudristek.
          </li>
          <li className="p-3 rounded-xl bg-slate-800 border border-slate-700">
            <strong>Miller, Richard (2004).</strong>{' '}
            <em>Solutions for Singers: Tools Every Performer and Teacher Should Have.</em> Oxford University Press.
          </li>
          <li className="p-3 rounded-xl bg-slate-800 border border-slate-700">
            <strong>W3C (2021).</strong>{' '}
            <em>Web Audio API & HTML5 Fullscreen API Specification.</em> World Wide Web Consortium.
          </li>
        </ul>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('certificate')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Sertifikat</span>
        </button>
        <button
          onClick={() => onNavigate('menu')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <span>Kembali ke Beranda Utama</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

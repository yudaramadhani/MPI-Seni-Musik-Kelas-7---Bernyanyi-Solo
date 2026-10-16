import React, { useState } from 'react';
import { SectionId } from '../types';
import { Maximize2, Minimize2, Volume2, VolumeX, Eye, HelpCircle, FileText, Download } from 'lucide-react';

interface HeaderNavProps {
  currentSection: SectionId;
  onNavigate: (section: SectionId) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onToggleAccessibility: () => void;
  onOpenDesignDoc: () => void;
  studentName?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentSection,
  onNavigate,
  isFullscreen,
  onToggleFullscreen,
  soundEnabled,
  onToggleSound,
  onToggleAccessibility,
  onOpenDesignDoc,
  studentName
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDownloadHtml = () => {
    const a = document.createElement('a');
    a.href = '/vocalab-mpi-bernyanyi-solo.html';
    a.download = 'vocalab-mpi-bernyanyi-solo.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('menu')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white text-base shadow-sm">
            🎵
          </span>
          <span>VocaLab</span>
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 hidden sm:inline-block">
            SMP Kelas 7
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('menu')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentSection === 'menu' ? 'text-amber-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => onNavigate('material')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentSection === 'material' ? 'text-amber-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Materi Vokal
          </button>
          <button
            onClick={() => onNavigate('breathing')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentSection === 'breathing' ? 'text-amber-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Lab Nafas
          </button>
          <button
            onClick={() => onNavigate('tuner')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentSection === 'tuner' ? 'text-amber-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Lab Tuner
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentSection === 'quiz' ? 'text-amber-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Kuis Evaluasi
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {studentName && (
            <span className="text-xs text-slate-500 hidden xl:inline-block max-w-[120px] truncate">
              👤 {studentName}
            </span>
          )}

          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Matikan Efek Suara' : 'Aktifkan Efek Suara'}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
          </button>

          <button
            onClick={onToggleAccessibility}
            title="Panel Aksesibilitas (Audio & Font Disleksia)"
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenDesignDoc}
            title="Dokumen Desain Instruksional MPI (23 Poin Lengkap)"
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors hidden sm:block"
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={handleDownloadHtml}
            title="Unduh File HTML Mandiri (Offline / Standalone)"
            className="px-2.5 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Unduh HTML</span>
          </button>

          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh (Fullscreen)'}
            className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar Penuh</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Layar Penuh</span>
              </>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => { onNavigate('menu'); setMobileMenuOpen(false); }}
              className="p-2 text-left rounded hover:bg-slate-100 font-medium text-slate-700"
            >
              🏠 Beranda
            </button>
            <button
              onClick={() => { onNavigate('material'); setMobileMenuOpen(false); }}
              className="p-2 text-left rounded hover:bg-slate-100 font-medium text-slate-700"
            >
              📖 5 Pilar Materi
            </button>
            <button
              onClick={() => { onNavigate('breathing'); setMobileMenuOpen(false); }}
              className="p-2 text-left rounded hover:bg-slate-100 font-medium text-slate-700"
            >
              🫁 Lab Nafas
            </button>
            <button
              onClick={() => { onNavigate('tuner'); setMobileMenuOpen(false); }}
              className="p-2 text-left rounded hover:bg-slate-100 font-medium text-slate-700"
            >
              🎯 Lab Tuner Intonasi
            </button>
            <button
              onClick={() => { onNavigate('exercise'); setMobileMenuOpen(false); }}
              className="p-2 text-left rounded hover:bg-slate-100 font-medium text-slate-700"
            >
              🧩 Latihan Drag & Drop
            </button>
            <button
              onClick={() => { onNavigate('quiz'); setMobileMenuOpen(false); }}
              className="p-2 text-left rounded hover:bg-slate-100 font-medium text-slate-700"
            >
              📝 Kuis Evaluasi (80%)
            </button>
            <button
              onClick={() => { onOpenDesignDoc(); setMobileMenuOpen(false); }}
              className="p-2 text-left rounded hover:bg-slate-100 font-medium text-amber-700 col-span-2 border border-amber-200 bg-amber-50"
            >
              📄 Dokumen Desain Instruksional (23 Poin)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

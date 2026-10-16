import React, { useState } from 'react';
import { INSTRUCTIONAL_DESIGN_DOCUMENT } from '../../data/instructionalDesignDoc';
import { X, Copy, Check, FileText, Search, Download } from 'lucide-react';

interface DesignDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignDocModal: React.FC<DesignDocModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [activeNumber, setActiveNumber] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleDownloadHtml = () => {
    const a = document.createElement('a');
    a.href = '/vocalab-mpi-bernyanyi-solo.html';
    a.download = 'vocalab-mpi-bernyanyi-solo.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyAll = () => {
    const fullText = INSTRUCTIONAL_DESIGN_DOCUMENT.map(
      (sec) => `${sec.number}. ${sec.title}\n\n${sec.content}\n\n--------------------\n`
    ).join('\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredSections = INSTRUCTIONAL_DESIGN_DOCUMENT.filter(
    (sec) =>
      sec.title.toLowerCase().includes(filterText.toLowerCase()) ||
      sec.content.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Dokumen Kurikulum & Desain Instruksional MPI (23 Poin Lengkap)
              </h2>
              <p className="text-xs text-slate-500">
                Spesifikasi Pedagogis, Storyboard, Flowchart, Prompt Aset & Kode Teknis VocaLab
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadHtml}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh HTML</span>
            </button>
            <button
              onClick={handleCopyAll}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Semua'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search bar & quick jump pills */}
        <div className="px-6 py-3 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Cari dalam 23 poin..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Menampilkan {filteredSections.length} dari 23 Poin Desain
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800">
          {filteredSections.map((sec) => (
            <div
              key={sec.number}
              id={`section-${sec.number}`}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                  {sec.number}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {sec.title}
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 whitespace-pre-line pl-11">
                {sec.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Standar: Kurikulum Merdeka (Kemendikbudristek) · Seni Musik SMP Kelas VII</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
          >
            Tutup Dokumen
          </button>
        </div>
      </div>
    </div>
  );
};

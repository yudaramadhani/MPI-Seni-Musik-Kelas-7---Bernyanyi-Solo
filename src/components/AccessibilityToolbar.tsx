import React from 'react';
import { Volume2, VolumeX, Type, Sun, Sparkles, X } from 'lucide-react';
import { stopSpeaking } from '../utils/speechNarration';

interface AccessibilityToolbarProps {
  isOpen: boolean;
  onClose: () => void;
  dyslexicFont: boolean;
  onToggleDyslexicFont: () => void;
  textSize: 'normal' | 'large' | 'xlarge';
  onChangeTextSize: (size: 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  isSpeaking: boolean;
  currentSpeechText: string;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  isOpen,
  onClose,
  dyslexicFont,
  onToggleDyslexicFont,
  textSize,
  onChangeTextSize,
  highContrast,
  onToggleHighContrast,
  isSpeaking,
  currentSpeechText
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-4 transition-all animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-800">Panel Aksesibilitas & Narasi</h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 space-y-3 text-xs">
        {/* Voice Narration Active Status */}
        {isSpeaking ? (
          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
              <p className="text-amber-800 font-medium truncate">
                Narator Suara Sedang Membaca...
              </p>
            </div>
            <button
              onClick={() => stopSpeaking()}
              className="px-2 py-1 bg-amber-600 text-white rounded font-semibold hover:bg-amber-700 shrink-0"
            >
              Hentikan
            </button>
          </div>
        ) : (
          <p className="text-slate-500 italic">
            Klik tombol audio 🔊 di setiap judul materi untuk mendengarkan teks dibacakan secara otomatis.
          </p>
        )}

        {/* Font Dyslexia */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="font-semibold text-slate-700">Font Ramah Disleksia</p>
            <p className="text-slate-400 text-[11px]">Memudahkan membaca dengan spasi lebar</p>
          </div>
          <button
            onClick={onToggleDyslexicFont}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              dyslexicFont
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {dyslexicFont ? 'Aktif' : 'Nonaktif'}
          </button>
        </div>

        {/* Text Size */}
        <div className="pt-1">
          <p className="font-semibold text-slate-700 mb-1.5">Ukuran Teks Tampilan</p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => onChangeTextSize('normal')}
              className={`py-1.5 rounded border text-center font-medium ${
                textSize === 'normal'
                  ? 'border-amber-500 bg-amber-50 text-amber-800'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              Normal (100%)
            </button>
            <button
              onClick={() => onChangeTextSize('large')}
              className={`py-1.5 rounded border text-center font-medium ${
                textSize === 'large'
                  ? 'border-amber-500 bg-amber-50 text-amber-800'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              Besar (115%)
            </button>
            <button
              onClick={() => onChangeTextSize('xlarge')}
              className={`py-1.5 rounded border text-center font-medium ${
                textSize === 'xlarge'
                  ? 'border-amber-500 bg-amber-50 text-amber-800'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              Ekstra (130%)
            </button>
          </div>
        </div>

        {/* High Contrast Mode */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="font-semibold text-slate-700">Mode Kontras Tinggi</p>
            <p className="text-slate-400 text-[11px]">Meningkatkan ketajaman teks dan border</p>
          </div>
          <button
            onClick={onToggleHighContrast}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              highContrast
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {highContrast ? 'Aktif' : 'Standar'}
          </button>
        </div>
      </div>
    </div>
  );
};

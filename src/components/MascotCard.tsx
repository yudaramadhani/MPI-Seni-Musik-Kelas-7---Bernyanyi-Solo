import React from 'react';
import { Volume2 } from 'lucide-react';
import { speakText } from '../utils/speechNarration';

interface MascotCardProps {
  message: string;
  subtext?: string;
  expression?: 'cheerful' | 'guiding' | 'celebrating';
  onAudioPlay?: () => void;
  className?: string;
}

export const MascotCard: React.FC<MascotCardProps> = ({
  message,
  subtext,
  onAudioPlay,
  className = ''
}) => {
  const handleVoice = () => {
    if (onAudioPlay) {
      onAudioPlay();
    } else {
      speakText(`${message}. ${subtext || ''}`);
    }
  };

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 backdrop-blur-sm shadow-sm ${className}`}
    >
      <div className="relative shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-white">
          <img
            src="/src/assets/images/mascot_melodi_bird_1791604828906.jpg"
            alt="Melodi si Maskot Burung Vokal"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="absolute -bottom-1 -right-1 text-xs bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-full font-bold shadow-sm">
          Melodi
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Tips dari Melodi
          </p>
          <button
            onClick={handleVoice}
            title="Dengarkan Suara Melodi"
            className="p-1 text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-md transition-colors flex items-center gap-1 text-xs"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dengarkan</span>
          </button>
        </div>
        <p className="text-sm font-medium text-slate-800 mt-0.5 leading-snug">
          "{message}"
        </p>
        {subtext && (
          <p className="text-xs text-slate-500 mt-1">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};

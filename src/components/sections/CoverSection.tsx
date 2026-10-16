import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import { GROUP_ROLES } from '../../data/curriculumData';
import { Play, Sparkles, Users, User, ArrowRight, ShieldCheck, Music } from 'lucide-react';
import { speakText } from '../../utils/speechNarration';

interface CoverSectionProps {
  onStart: (profile: StudentProfile) => void;
  initialProfile: StudentProfile;
}

export const CoverSection: React.FC<CoverSectionProps> = ({ onStart, initialProfile }) => {
  const [studentName, setStudentName] = useState(initialProfile.studentName || '');
  const [groupName, setGroupName] = useState(initialProfile.groupName || '');
  const [mode, setMode] = useState<'kelompok' | 'individu'>(initialProfile.mode || 'kelompok');
  const [role, setRole] = useState(initialProfile.roleInGroup || 'Penyanyi Solo');
  const [membersInput, setMembersInput] = useState(initialProfile.members.join(', ') || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartClick = () => {
    if (!studentName.trim()) {
      setErrorMessage('Silakan isi nama kamu terlebih dahulu untuk memulai petualangan!');
      return;
    }
    setErrorMessage('');

    // Trigger Programmatic HTML5 Fullscreen API
    const elem = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      mozRequestFullScreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    try {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch((err) => {
          console.warn('Iframe or browser denied fullscreen request:', err);
        });
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request error:', err);
    }

    const membersList = membersInput
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    onStart({
      studentName: studentName.trim(),
      groupName: mode === 'kelompok' ? groupName.trim() || 'Kelompok Vokal Bintang' : 'Mandiri',
      classGrade: 'VII SMP (Semester 1)',
      roleInGroup: role,
      mode,
      members: membersList.length > 0 ? membersList : [studentName.trim()]
    });
  };

  const readIntro = () => {
    speakText(
      'Selamat datang di VocaLab! Multimedia Pembelajaran Interaktif Seni Musik Kelas 7 SMP, materi Bernyanyi Solo. Masukkan nama kamu dan klik tombol Start untuk membuka mode layar penuh.'
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/60 via-slate-50 to-slate-100">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Visual & Character Greeting */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Kurikulum Merdeka · Seni Budaya (Musik)</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Menjadi Bintang <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-500 to-purple-600">
                Bernyanyi Solo
              </span>
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              Kuasai teknik vokal dasar SMP Kelas VII: rahasia pernapasan diafragma, resonansi merdu, artikulasi vokal, dan uji ketepatan nada dengan <strong>Pengukur Intonasi Interaktif</strong>!
            </p>
          </div>

          {/* Hero Stage Illustration */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-white group">
            <img
              src="/src/assets/images/hero_singing_student_1791604839898.jpg"
              alt="Siswa SMP Bernyanyi Solo di Panggung"
              className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
              <div className="text-white">
                <p className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                  Laboratorium Audio Interaktif
                </p>
                <p className="text-sm font-semibold">
                  Eksplorasi Praktik Vokal Tanpa Rasa Takut Meleset
                </p>
              </div>
            </div>
          </div>

          {/* Melodi Mascot Greeting Bubble */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/90 border border-amber-200 shadow-sm">
            <img
              src="/src/assets/images/mascot_melodi_bird_1791604828906.jpg"
              alt="Melodi"
              className="w-12 h-12 rounded-xl object-cover border border-amber-300"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-amber-700">Hai, aku Melodi!</p>
              <p className="text-xs text-slate-600 line-clamp-2">
                "Siap bernyanyi merdu? Klik tombol START di samping untuk memulai dengan mode Layar Penuh (Fullscreen)!"
              </p>
            </div>
            <button
              onClick={readIntro}
              title="Dengarkan Suara Pembuka"
              className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg shrink-0"
            >
              <Music className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Profile & START Trigger */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Identitas Peserta Didik
              </h2>
              <p className="text-xs text-slate-500">
                SMP Kelas 7 · Semester 1 · Alokasi 3 × 40 Menit
              </p>
            </div>
            <div className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Target KKM 80%</span>
            </div>
          </div>

          {errorMessage && (
            <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-shake">
              ⚠️ {errorMessage}
            </div>
          )}

          <div className="mt-5 space-y-4">
            {/* Mode Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Mode Pembelajaran
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode('kelompok')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                    mode === 'kelompok'
                      ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Kerja Kelompok (Disarankan)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('individu')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                    mode === 'individu'
                      ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Praktik Mandiri</span>
                </button>
              </div>
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap / Panggilan Kamu <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Contoh: Farhan / Aurel"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-slate-50/50"
              />
            </div>

            {/* Group Name & Role if Mode == Kelompok */}
            {mode === 'kelompok' && (
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Kelompok Vokal
                    </label>
                    <input
                      type="text"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="Contoh: Melodi Harmoni VII-A"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Peran Kamu di Tim
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as StudentProfile['roleInGroup'])}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      {GROUP_ROLES.map((r) => (
                        <option key={r.role} value={r.role}>
                          {r.role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Anggota Kelompok (pisahkan koma)
                  </label>
                  <input
                    type="text"
                    value={membersInput}
                    onChange={(e) => setMembersInput(e.target.value)}
                    placeholder="Contoh: Budi, Siti, Farhan, Zahra"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50/50"
                  />
                </div>
              </div>
            )}
          </div>

          {/* MANDATORY FULLSCREEN TRIGGER BUTTON: START */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={handleStartClick}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-extrabold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 group focus:outline-none focus:ring-4 focus:ring-amber-300 cursor-pointer"
            >
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Play className="w-5 h-5 fill-current" />
              </span>
              <span>START: MASUK LAYAR PENUH</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-2.5">
              💡 Tombol START akan otomatis mengaktifkan mode <strong>Fullscreen</strong> browser untuk kenyamanan interaktif maksimal.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

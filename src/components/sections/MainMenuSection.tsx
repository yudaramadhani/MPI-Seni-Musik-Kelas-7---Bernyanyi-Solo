import React from 'react';
import { SectionId, StudentProfile } from '../../types';
import { MascotCard } from '../MascotCard';
import {
  BookOpen,
  Wind,
  Target,
  FileCheck2,
  HelpCircle,
  Sparkles,
  Award,
  Layers,
  Activity,
  Compass,
  ArrowRight,
  Bookmark,
  FileText,
  Download
} from 'lucide-react';

interface MainMenuSectionProps {
  onNavigate: (section: SectionId) => void;
  profile: StudentProfile;
  quizScore: number | null;
  quizPassed: boolean;
  onOpenDesignDoc: () => void;
}

export const MainMenuSection: React.FC<MainMenuSectionProps> = ({
  onNavigate,
  profile,
  quizScore,
  quizPassed,
  onOpenDesignDoc
}) => {
  const handleDownloadHtml = () => {
    const a = document.createElement('a');
    a.href = '/vocalab-mpi-bernyanyi-solo.html';
    a.download = 'vocalab-mpi-bernyanyi-solo.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const stations = [
    {
      id: 'instructions' as SectionId,
      number: '01',
      title: 'Petunjuk Penggunaan',
      desc: 'Panduan navigasi, peran kelompok, dan aksesibilitas ramah anak.',
      icon: HelpCircle,
      tag: 'Panduan',
      badgeClass: 'bg-slate-100 text-slate-700'
    },
    {
      id: 'objectives' as SectionId,
      number: '02',
      title: 'Tujuan Pembelajaran',
      desc: 'Capaian Kurikulum Merdeka Fase D dan indikator kelulusan 80%.',
      icon: Target,
      tag: 'Kompetensi',
      badgeClass: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'apperception' as SectionId,
      number: '03',
      title: 'Apersepsi: Uji Nada Fals',
      desc: 'Dengarkan perbandingan audio nada harmonis vs nada sumbang.',
      icon: Compass,
      tag: 'Eksplorasi Awal',
      badgeClass: 'bg-sky-100 text-sky-800'
    },
    {
      id: 'material' as SectionId,
      number: '04',
      title: '5 Pilar Teknik Vokal',
      desc: 'Postur, Pernapasan, Resonansi, Artikulasi, dan Intonasi.',
      icon: BookOpen,
      tag: 'Materi Utama',
      badgeClass: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'anatomy' as SectionId,
      number: '05',
      title: 'Lab Anatomi & Peta Konsep',
      desc: 'Diagram interaktif organ suara, laring, paru-paru, dan rongga resonansi.',
      icon: Layers,
      tag: 'Visual Anatomi',
      badgeClass: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 'breathing' as SectionId,
      number: '06',
      title: 'Lab 1: Nafas Diafragma',
      desc: 'Simulator ritme tarikan, tahanan, dan hembusan desis 4-4-8 real-time.',
      icon: Wind,
      tag: 'Simulasi Praktik',
      badgeClass: 'bg-teal-100 text-teal-800'
    },
    {
      id: 'tuner' as SectionId,
      number: '07',
      title: 'Lab 2: Pengukur Intonasi',
      desc: 'Tuner vokal mikrofon & keyboard piano solmisasi anti-fals.',
      icon: Activity,
      tag: 'Simulasi Audio',
      badgeClass: 'bg-rose-100 text-rose-800'
    },
    {
      id: 'exercise' as SectionId,
      number: '08',
      title: 'Latihan Drag & Drop',
      desc: 'Tantangan menjodohkan organ vokal dan studi kasus bernyanyi solo.',
      icon: Sparkles,
      tag: 'Aktivitas Gamifikasi',
      badgeClass: 'bg-violet-100 text-violet-800'
    },
    {
      id: 'quiz' as SectionId,
      number: '09',
      title: 'Kuis Formatif (Target 80%)',
      desc: '5 butir soal analitis pemahaman bernyanyi solo berstandar KKM.',
      icon: FileCheck2,
      tag: quizPassed ? 'Lulus ✅' : quizScore !== null ? `Skor: ${quizScore}%` : 'Uji Kemampuan',
      badgeClass: quizPassed ? 'bg-emerald-500 text-white' : 'bg-orange-100 text-orange-800'
    },
    {
      id: 'reflection' as SectionId,
      number: '10',
      title: 'Rangkuman & Refleksi Tim',
      desc: 'Kartu memori 5 pilar dan lembar kerja kolaborasi 3-2-1.',
      icon: Bookmark,
      tag: 'Refleksi Diri',
      badgeClass: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'certificate' as SectionId,
      number: '11',
      title: 'Sertifikat Vokal Star',
      desc: 'Piagam kelulusan digital atas nama kamu dan tim yang dapat dicetak.',
      icon: Award,
      tag: quizPassed ? 'Siap Cetak 🏆' : 'Terkunci (Kuis >= 80%)',
      badgeClass: quizPassed ? 'bg-amber-400 text-amber-950 font-bold' : 'bg-slate-100 text-slate-500'
    },
    {
      id: 'references' as SectionId,
      number: '12',
      title: 'Glosarium & Referensi',
      desc: 'Kamus istilah musik vokal dan rujukan resmi Kurikulum Merdeka.',
      icon: BookOpen,
      tag: 'Daftar Pustaka',
      badgeClass: 'bg-slate-100 text-slate-700'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <span>✨ Hub Pembelajaran Interaktif</span>
            <span>·</span>
            <span>SMP Kelas 7 Semester 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Halo, {profile.studentName || 'Bintang Vokal'}!
          </h1>
          <p className="text-white/90 text-sm leading-relaxed">
            {profile.mode === 'kelompok'
              ? `Kamu sedang belajar bersama kelompok "${profile.groupName}" sebagai ${profile.roleInGroup}. Telusuri stasiun materi dan simulasi di bawah ini secara bertahap!`
              : 'Kamu sedang belajar dalam mode mandiri. Pelajari teknik bernyanyi solo, coba simulator nafas dan tuner vokal, lalu selesaikan kuis dengan nilai minimal 80%!'}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-lg bg-black/20 font-medium">
              Mode: {profile.mode === 'kelompok' ? '👥 Kerja Kelompok' : '👤 Mandiri'}
            </span>
            {quizScore !== null && (
              <span className={`px-3 py-1 rounded-lg font-bold ${quizPassed ? 'bg-emerald-400 text-emerald-950' : 'bg-amber-300 text-amber-950'}`}>
                {quizPassed ? `Lulus Kuis: ${quizScore}%` : `Skor Kuis: ${quizScore}% (Remedial < 80%)`}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Download HTML & Open Instructional Design Spec */}
        <div className="mt-4 sm:mt-0 sm:absolute sm:right-6 sm:bottom-6 z-10 flex flex-wrap gap-2">
          <button
            onClick={handleDownloadHtml}
            className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs hover:bg-amber-300 shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>Unduh File HTML (.html)</span>
          </button>
          <button
            onClick={onOpenDesignDoc}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-amber-50 shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Dokumen Desain (23 Poin)</span>
          </button>
        </div>
      </div>

      {/* Offline HTML Download Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Unduh Aplikasi HTML Mandiri (Bisa Dibuka Tanpa Internet / Offline)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Simpan file <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-300 font-mono text-[11px] text-emerald-800">vocalab-mpi-bernyanyi-solo.html</code> ke laptop atau HP. Berisi seluruh materi, simulator nafas, tuner mic, dan kuis lengkap.
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadHtml}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Unduh Sekarang (.html)</span>
        </button>
      </div>

      {/* Mascot Card Guide */}
      <MascotCard
        message="Mulai dari Petunjuk dan Apersepsi untuk memanaskan telinga musikmu! Jangan lupa coba Lab Nafas dan Lab Tuner sebelum mengerjakan kuis."
        subtext="Kamu butuh skor minimal 80% pada kuis formatif untuk membuka Sertifikat Bintang Vokal Solo."
      />

      {/* Stations Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Peta Stasiun Pembelajaran MPI
          </h2>
          <span className="text-xs text-slate-500">12 Stasiun Belajar Terpadu</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stations.map((st) => {
            const Icon = st.icon;
            return (
              <button
                key={st.id}
                onClick={() => onNavigate(st.id)}
                className="text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      STASIUN {st.number}
                    </span>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${st.badgeClass}`}>
                      {st.tag}
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors">
                        {st.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600 group-hover:text-amber-700">
                  <span>Buka Stasiun</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

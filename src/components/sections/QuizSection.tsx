import React, { useState } from 'react';
import { SectionId, QuizQuestion } from '../../types';
import { QUIZ_QUESTIONS } from '../../data/curriculumData';
import { MascotCard } from '../MascotCard';
import { playSuccessChime, playIncorrectSound } from '../../utils/audioSynth';
import { speakText } from '../../utils/speechNarration';
import confetti from 'canvas-confetti';
import {
  FileCheck2,
  CheckCircle,
  XCircle,
  HelpCircle,
  Volume2,
  Sparkles,
  Award,
  RotateCcw,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface QuizSectionProps {
  onNavigate: (section: SectionId) => void;
  onQuizComplete: (score: number, passed: boolean) => void;
  savedScore: number | null;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  onNavigate,
  onQuizComplete,
  savedScore
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option
    }));
  };

  const handleNext = () => {
    setShowHint(false);
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setShowHint(false);
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
    const passed = calculatedScore >= 80;

    setIsSubmitted(true);
    onQuizComplete(calculatedScore, passed);

    if (passed) {
      playSuccessChime();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn(e);
      }
      speakText(`Hebat sekali! Kamu berhasil lulus kuis dengan skor ${calculatedScore} persen! Sertifikat Bintang Vokal Solo telah terbuka.`);
    } else {
      playIncorrectSound();
      speakText(`Skor kamu ${calculatedScore} persen. Kriteria kelulusan adalah 80 persen. Jangan berkecil hati, pelajari pembahasannya lalu coba lagi!`);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setShowHint(false);
  };

  const readQuestionAudio = () => {
    const textToRead = `Soal nomor ${currentIdx + 1}. Kategori ${currentQ.category}. ${currentQ.scenario || ''}. Pertanyaan: ${currentQ.prompt}. Pilihan: ${currentQ.options?.join('. ')}`;
    speakText(textToRead);
  };

  // Calculate stats
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctAnswer) {
      correctCount += 1;
    }
  });
  const currentScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
  const isPassed = currentScore >= 80;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Stasiun 09 · Asesmen Formatif
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Kuis Formatif Bernyanyi Solo
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standar Kriteria Kelulusan Minimal (KKM): Skor 80% (Minimal 4 Benar).
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isSubmitted && (
            <button
              onClick={readQuestionAudio}
              className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Soal</span>
            </button>
          )}
        </div>
      </div>

      <MascotCard
        message="Bacalah setiap studi kasus dengan teliti. Pikirkan apa akibat fisik dan bunyi dari masing-masing teknik bernyanyi!"
      />

      {/* Quiz Body */}
      {!isSubmitted ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress Bar & Question Tracker */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Soal {currentIdx + 1} dari {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                Kategori: {currentQ.category}
              </span>
            </div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-amber-600 hover:text-amber-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showHint ? 'Tutup Petunjuk' : 'Lihat Petunjuk'}</span>
            </button>
          </div>

          {/* Hint Dropdown */}
          {showHint && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Petunjuk dari Melodi:</strong> {currentQ.hint}
              </div>
            </div>
          )}

          {/* Scenario Context */}
          {currentQ.scenario && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              " {currentQ.scenario} "
            </div>
          )}

          {/* Prompt */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQ.prompt}
          </h2>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options?.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === opt;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/80 text-amber-950 ring-2 ring-amber-400 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Quiz Stepper Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-30 cursor-pointer"
            >
              Sebelumnya
            </button>

            {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Selanjutnya
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold shadow-md hover:scale-105 transition-all disabled:opacity-40 cursor-pointer"
              >
                Kirim & Selesaikan Kuis
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results & Full Review Screen */
        <div className="space-y-6">
          {/* Score Header Card */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 ${
              isPassed
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 border border-current">
                {isPassed ? '🎉 Selamat! Kamu Lulus KKM' : '📚 Perlu Mengulang (Remedial)'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                {isPassed
                  ? 'Penguasaan Teknik Vokal Sempurna!'
                  : 'Tetap Semangat! Kamu Hampir Berhasil!'}
              </h2>
              <p className="text-xs sm:text-sm max-w-lg opacity-90 leading-relaxed">
                {isPassed
                  ? 'Kamu telah menguasai konsep dasar bernyanyi solo dengan nilai di atas batas 80%. Kamu berhak membuka Sertifikat Digital Bintang Vokal Solo.'
                  : 'Kriteria kelulusan minimal adalah 80%. Pelajari pembahasan di bawah ini untuk melihat bagian yang perlu diperbaiki, lalu coba lagi!'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-current/20 shadow-md text-center shrink-0 min-w-[160px]">
              <span className="text-xs font-bold text-slate-500 uppercase">
                Skor Akhir
              </span>
              <p className="text-5xl font-black font-mono text-slate-900 mt-1">
                {currentScore}%
              </p>
              <p className="text-[11px] font-semibold text-slate-500 mt-1">
                {correctCount} dari {QUIZ_QUESTIONS.length} Soal Benar
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {isPassed ? (
              <button
                onClick={() => onNavigate('certificate')}
                className="px-6 py-3 rounded-2xl bg-amber-500 text-white font-extrabold text-sm hover:bg-amber-600 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-5 h-5" />
                <span>Buka Sertifikat Kelulusan</span>
              </button>
            ) : (
              <button
                onClick={handleRetake}
                className="px-6 py-3 rounded-2xl bg-amber-500 text-white font-extrabold text-sm hover:bg-amber-600 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis Sekarang</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('feedback')}
              className="px-5 py-3 rounded-2xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              Lihat Umpan Balik Lengkap
            </button>
          </div>

          {/* Question-by-Question Deep Explanations */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-slate-900">
              Pembahasan Mendalam Setiap Butir Soal:
            </h3>

            {QUIZ_QUESTIONS.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              const isAnsCorrect = userAns === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl border bg-white shadow-sm space-y-3 ${
                    isAnsCorrect ? 'border-emerald-200' : 'border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      Soal #{idx + 1} · {q.category}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        isAnsCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isAnsCorrect ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Benar</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Kurang Tepat</span>
                        </>
                      )}
                    </span>
                  </div>

                  <p className="font-bold text-slate-900 text-sm">
                    {q.prompt}
                  </p>

                  <div className="text-xs space-y-1">
                    <p className="text-slate-600">
                      <strong>Jawaban Kamu:</strong>{' '}
                      <span className={isAnsCorrect ? 'text-emerald-700 font-semibold' : 'text-rose-700'}>
                        {userAns || '(Belum dijawab)'}
                      </span>
                    </p>
                    {!isAnsCorrect && (
                      <p className="text-emerald-700">
                        <strong>Kunci Jawaban yang Benar:</strong>{' '}
                        {typeof q.correctAnswer === 'object'
                          ? JSON.stringify(q.correctAnswer)
                          : String(q.correctAnswer)}
                      </p>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                    <strong>💡 Analisis Pembahasan:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('exercise')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Latihan</span>
        </button>
        <button
          onClick={() => onNavigate('reflection')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <span>Lanjut ke Refleksi & Lembar Tim</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

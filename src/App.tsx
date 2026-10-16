import React, { useState, useEffect } from 'react';
import { SectionId, StudentProfile } from './types';
import { HeaderNav } from './components/HeaderNav';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { CoverSection } from './components/sections/CoverSection';
import { MainMenuSection } from './components/sections/MainMenuSection';
import { InstructionsSection } from './components/sections/InstructionsSection';
import { ObjectivesSection } from './components/sections/ObjectivesSection';
import { ApperceptionSection } from './components/sections/ApperceptionSection';
import { CoreMaterialSection } from './components/sections/CoreMaterialSection';
import { AnatomyExplorationSection } from './components/sections/AnatomyExplorationSection';
import { BreathingSimulatorSection } from './components/sections/BreathingSimulatorSection';
import { PitchTunerSimulatorSection } from './components/sections/PitchTunerSimulatorSection';
import { InteractiveExerciseSection } from './components/sections/InteractiveExerciseSection';
import { QuizSection } from './components/sections/QuizSection';
import { FeedbackSection } from './components/sections/FeedbackSection';
import { SummaryReflectionSection } from './components/sections/SummaryReflectionSection';
import { CertificateSection } from './components/sections/CertificateSection';
import { GlossaryReferencesSection } from './components/sections/GlossaryReferencesSection';
import { DesignDocModal } from './components/sections/DesignDocModal';
import { subscribeSpeechState } from './utils/speechNarration';

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>('cover');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [accessibilityOpen, setAccessibilityOpen] = useState<boolean>(false);
  const [designDocOpen, setDesignDocOpen] = useState<boolean>(false);

  // Accessibility state
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentSpeechText, setCurrentSpeechText] = useState<string>('');

  // Student profile
  const [profile, setProfile] = useState<StudentProfile>({
    studentName: '',
    groupName: 'Kelompok Vokal Harmoni VII',
    classGrade: 'VII SMP (Semester 1)',
    roleInGroup: 'Penyanyi Solo',
    mode: 'kelompok',
    members: []
  });

  // Quiz progress
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizPassed, setQuizPassed] = useState<boolean>(false);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Subscribe to speech synthesis state
  useEffect(() => {
    const unsubscribe = subscribeSpeechState((speaking, text) => {
      setIsSpeaking(speaking);
      setCurrentSpeechText(text);
    });
    return unsubscribe;
  }, []);

  // Programmatic Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const elem = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch((err) => console.warn(err));
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => console.warn(err));
      }
    }
  };

  const handleStartFromCover = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    setCurrentSection('menu');
  };

  const handleQuizComplete = (score: number, passed: boolean) => {
    setQuizScore(score);
    setQuizPassed(passed);
  };

  // Text size classes
  const getTextSizeClass = () => {
    if (textSize === 'large') return 'text-[108%] leading-relaxed';
    if (textSize === 'xlarge') return 'text-[118%] leading-loose';
    return '';
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        highContrast ? 'bg-slate-100 text-slate-950 font-semibold' : 'bg-slate-50 text-slate-800'
      } ${dyslexicFont ? 'tracking-wider font-sans' : 'font-sans'} ${getTextSizeClass()}`}
    >
      {/* Top Bar Contract (Visible on all sections) */}
      <HeaderNav
        currentSection={currentSection}
        onNavigate={(sec) => setCurrentSection(sec)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onToggleAccessibility={() => setAccessibilityOpen(!accessibilityOpen)}
        onOpenDesignDoc={() => setDesignDocOpen(true)}
        studentName={profile.studentName}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {currentSection === 'cover' && (
          <CoverSection onStart={handleStartFromCover} initialProfile={profile} />
        )}

        {currentSection === 'menu' && (
          <MainMenuSection
            onNavigate={(sec) => setCurrentSection(sec)}
            profile={profile}
            quizScore={quizScore}
            quizPassed={quizPassed}
            onOpenDesignDoc={() => setDesignDocOpen(true)}
          />
        )}

        {currentSection === 'instructions' && (
          <InstructionsSection onNavigate={(sec) => setCurrentSection(sec)} />
        )}

        {currentSection === 'objectives' && (
          <ObjectivesSection onNavigate={(sec) => setCurrentSection(sec)} />
        )}

        {currentSection === 'apperception' && (
          <ApperceptionSection onNavigate={(sec) => setCurrentSection(sec)} />
        )}

        {currentSection === 'material' && (
          <CoreMaterialSection onNavigate={(sec) => setCurrentSection(sec)} />
        )}

        {currentSection === 'anatomy' && (
          <AnatomyExplorationSection onNavigate={(sec) => setCurrentSection(sec)} />
        )}

        {currentSection === 'breathing' && (
          <BreathingSimulatorSection onNavigate={(sec) => setCurrentSection(sec)} />
        )}

        {currentSection === 'tuner' && (
          <PitchTunerSimulatorSection onNavigate={(sec) => setCurrentSection(sec)} />
        )}

        {currentSection === 'exercise' && (
          <InteractiveExerciseSection onNavigate={(sec) => setCurrentSection(sec)} />
        )}

        {currentSection === 'quiz' && (
          <QuizSection
            onNavigate={(sec) => setCurrentSection(sec)}
            onQuizComplete={handleQuizComplete}
            savedScore={quizScore}
          />
        )}

        {currentSection === 'feedback' && (
          <FeedbackSection
            onNavigate={(sec) => setCurrentSection(sec)}
            quizScore={quizScore}
            quizPassed={quizPassed}
            profile={profile}
          />
        )}

        {currentSection === 'summary' && (
          <SummaryReflectionSection
            onNavigate={(sec) => setCurrentSection(sec)}
            profile={profile}
          />
        )}

        {currentSection === 'reflection' && (
          <SummaryReflectionSection
            onNavigate={(sec) => setCurrentSection(sec)}
            profile={profile}
          />
        )}

        {currentSection === 'certificate' && (
          <CertificateSection
            onNavigate={(sec) => setCurrentSection(sec)}
            profile={profile}
            quizScore={quizScore}
            quizPassed={quizPassed}
          />
        )}

        {currentSection === 'references' && (
          <GlossaryReferencesSection
            onNavigate={(sec) => setCurrentSection(sec)}
            onOpenDesignDoc={() => setDesignDocOpen(true)}
          />
        )}
      </main>

      {/* Floating Accessibility Drawer */}
      <AccessibilityToolbar
        isOpen={accessibilityOpen}
        onClose={() => setAccessibilityOpen(false)}
        dyslexicFont={dyslexicFont}
        onToggleDyslexicFont={() => setDyslexicFont(!dyslexicFont)}
        textSize={textSize}
        onChangeTextSize={setTextSize}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        isSpeaking={isSpeaking}
        currentSpeechText={currentSpeechText}
      />

      {/* Full 23-Point Instructional Design Document Modal */}
      <DesignDocModal
        isOpen={designDocOpen}
        onClose={() => setDesignDocOpen(false)}
      />

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 sm:px-6 lg:px-8 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">VocaLab</span>
            <span>·</span>
            <span>MPI Seni Budaya (Musik) SMP Kelas 7 Semester 1</span>
            <span>·</span>
            <span>Kurikulum Merdeka</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDesignDocOpen(true)}
              className="text-amber-700 font-semibold hover:underline"
            >
              Dokumen Desain Instruksional (23 Poin)
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentSection('instructions')}
              className="hover:text-slate-900 transition-colors"
            >
              Petunjuk Belajar
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentSection('references')}
              className="hover:text-slate-900 transition-colors"
            >
              Glosarium Musik
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

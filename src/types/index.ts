export type SectionId =
  | 'cover'
  | 'menu'
  | 'instructions'
  | 'objectives'
  | 'apperception'
  | 'material'
  | 'anatomy'
  | 'breathing'
  | 'tuner'
  | 'exercise'
  | 'quiz'
  | 'feedback'
  | 'summary'
  | 'reflection'
  | 'certificate'
  | 'references'
  | 'design-doc';

export interface StudentProfile {
  studentName: string;
  groupName: string;
  classGrade: string;
  roleInGroup: 'Penyanyi Solo' | 'Pengamat Postur & Nafas' | 'Penguji Intonasi' | 'Notulis/Pencatat';
  mode: 'individu' | 'kelompok';
  members: string[];
}

export interface QuizQuestion {
  id: number;
  type: 'multiple-choice' | 'matching' | 'drag-drop-sequence';
  category: 'Postur' | 'Pernapasan' | 'Resonansi' | 'Artikulasi' | 'Intonasi';
  prompt: string;
  scenario?: string;
  options?: string[];
  correctAnswer: string | number | Record<string, string> | string[];
  explanation: string;
  hint: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan';
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
  description: string;
}

export interface DragDropOrgan {
  id: string;
  name: string;
  role: string;
  correctTarget: 'napas' | 'sumber_suara' | 'resonansi' | 'artikulasi';
}

export interface PitchTarget {
  note: string;
  solfege: string;
  frequency: number;
  midi: number;
  description: string;
}

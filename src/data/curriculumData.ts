// Curriculum and Instructional Design Data for VocaLab
// Kurikulum Merdeka - Seni Budaya (Seni Musik) SMP Kelas VII Semester 1 - Bernyanyi Solo

import { QuizQuestion, DragDropOrgan } from '../types';

export const VOCAL_PILLARS = [
  {
    id: 'postur',
    title: '1. Sikap Badan (Postur)',
    subtitle: 'Fondasi Penopang Aliran Udara',
    color: 'from-amber-500 to-orange-400',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    summary: 'Tubuh tegap tapi rileks membuka saluran udara secara optimal dari paru-paru ke pita suara.',
    keyPoints: [
      {
        label: 'Posisi Berdiri',
        detail: 'Kaki dibuka selebar bahu, berat badan bertumpu seimbang di kedua kaki, lutut tidak dikunci (lentur).'
      },
      {
        label: 'Posisi Bahu & Dada',
        detail: 'Bahu diturunkan rileks ke bawah dan agak ditarik ke belakang, dada terbuka lebar tanpa dibusungkan kaku.'
      },
      {
        label: 'Posisi Kepala & Dagu',
        detail: 'Pandangan lurus ke depan setinggi mata, dagu sejajar lantai. Jangan mendongak saat nada tinggi agar pita suara tidak tercekik.'
      }
    ],
    commonMistake: 'Mendongakkan leher saat menjangkau nada tinggi dan membungkuk saat menyanyikan nada rendah.',
    proTip: 'Bayangkan ada benang sutra yang menarik lembut puncak kepalamu ke arah langit.'
  },
  {
    id: 'pernapasan',
    title: '2. Pernapasan Diafragma',
    subtitle: 'Bahan Bakar Utama Suara Merdu',
    color: 'from-emerald-500 to-teal-400',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    summary: 'Pernapasan terbaik dalam bernyanyi solo karena menampung udara paling banyak dan stabil dikontrol.',
    keyPoints: [
      {
        label: 'Mengapa Diafragma?',
        detail: 'Otot sekat rongga dada dan perut bergerak turun saat menghirup udara, memberi ruang paru-paru bagian bawah mengembang maksimal.'
      },
      {
        label: 'Beda dengan Nafas Dada',
        detail: 'Nafas dada mengangkat bahu, cepat lelah, dan udara cepat habis. Nafas diafragma bahu tetap diam dan lingkar pinggang mengembang.'
      },
      {
        label: 'Kontrol Hembusan (Support)',
        detail: 'Udara dikeluarkan perlahan secara stabil seperti meniup lilin dari jauh tanpa memadamkannya seketika.'
      }
    ],
    commonMistake: 'Bahu terangkat naik saat menarik nafas, menyebabkan ketegangan di leher dan nafas pendek.',
    proTip: 'Letakkan kedua tangan di pinggang samping. Rasakan tanganmu terdorong keluar saat menarik nafas!'
  },
  {
    id: 'resonansi',
    title: '3. Resonansi Suara',
    subtitle: 'Amplifier Alami Tubuh Manusia',
    color: 'from-sky-500 to-indigo-400',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    summary: 'Memantulkan getaran suara di rongga-rongga tubuh agar suara bervolume bulat, tebal, dan tidak cempreng.',
    keyPoints: [
      {
        label: 'Resonansi Dada (Chest Voice)',
        detail: 'Getaran terasa di dada saat membawakan nada-nada rendah, menghasilkan warna suara hangat, tebal, dan berbobot.'
      },
      {
        label: 'Resonansi Tengah (Mulut & Faring)',
        detail: 'Getaran di rongga mulut dan langit-langit lunak saat nada sedang/bicara normal, menghasilkan kejernihan vokal.'
      },
      {
        label: 'Resonansi Kepala (Head Voice / Sinus)',
        detail: 'Getaran terasa di rongga hidung, dahi, dan kepala atas untuk nada-nada tinggi, membuat suara melengking indah tanpa dipaksa.'
      }
    ],
    commonMistake: 'Menyanyikan nada tinggi dengan mendorong otot leher dan dada (ngegas), bukan mengalirkan ke rongga kepala.',
    proTip: 'Ucapkan "Hmmm" lembut seperti mencium aroma masakan sedap untuk merasakan getaran di bibir dan hidung.'
  },
  {
    id: 'artikulasi',
    title: '4. Artikulasi & Pembentukan Vokal',
    subtitle: 'Kejelasan Kata dan Keindahan Vokal',
    color: 'from-violet-500 to-purple-400',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
    summary: 'Cara mengucapkan kata-kata dan melafalkan huruf vokal (A, I, U, E, O) serta konsonan secara tegas dan jelas.',
    keyPoints: [
      {
        label: 'Vokal A, I, U, E, O',
        detail: 'Huruf vokal dibentuk dengan membuka rongga mulut cukup lebar (dua jari di antara gigi depan untuk vokal A).'
      },
      {
        label: 'Konsonan Tegas',
        detail: 'Huruf konsonan (P, T, K, B, D, M) diartikulasikan dengan ketukan bibir dan lidah yang gesit agar lirik mudah dipahami pendengar.'
      },
      {
        label: 'Rahang Rileks',
        detail: 'Rahang bawah diturunkan santai ke bawah, tidak kaku ke samping agar suara tidak pipih atau sengau.'
      }
    ],
    commonMistake: 'Mulut hanya terbuka sedikit (berbisik/bergumam) sehingga lirik lagu tidak jelas dan suara tertelan ke dalam.',
    proTip: 'Lakukan senam muka: julurkan lidah, putar rahang pelan, dan ucapkan "Ma-Me-Mi-Mo-Mu" dengan riang.'
  },
  {
    id: 'intonasi',
    title: '5. Intonasi & Pitch',
    subtitle: 'Ketepatan Bidikan Nada (Anti-Fals)',
    color: 'from-rose-500 to-pink-400',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    summary: 'Ketepatan menyuarakan tinggi rendah nada sesuai tangga nada musik. Penyanyi solo yang baik tidak pernah meleset dari nada sasaran.',
    keyPoints: [
      {
        label: 'Solfeggio (Do-Re-Mi)',
        detail: 'Melatih kepekaan telinga mendengar interval nada tangga nada diatonis mayor (1-2-3-4-5-6-7-1˙).'
      },
      {
        label: 'Penyebab Fals',
        detail: 'Fals sering disebabkan kurangnya dukungan nafas (underpitch/terlalu rendah) atau ketegangan otot leher berlebihan.'
      },
      {
        label: 'Latihan Menirukan Nada',
        detail: 'Dengarkan nada instrumen terlebih dahulu di dalam pikiran (audiation), baru bunyikan suara vokal dengan mantap.'
      }
    ],
    commonMistake: 'Langsung menyanyi tanpa mendengarkan intro atau nada dasar musik pengiring terlebih dahulu.',
    proTip: 'Gunakan fitur Tuner Interaktif di VocaLab untuk menguji apakah nadamu sudah tepat di tengah sasaran!'
  }
];

export const VOCAL_ORGANS: DragDropOrgan[] = [
  {
    id: 'diafragma',
    name: 'Otot Diafragma',
    role: 'Otot sekat penopang udara pernapasan di bawah paru-paru',
    correctTarget: 'napas'
  },
  {
    id: 'pita-suara',
    name: 'Pita Suara (Laring)',
    role: 'Sepasang selaput bergetar di jakun yang mengubah udara jadi bunyi',
    correctTarget: 'sumber_suara'
  },
  {
    id: 'sinus-kepala',
    name: 'Rongga Sinus & Kepala',
    role: 'Rongga pemantul getaran untuk nada-nada tinggi (Head Voice)',
    correctTarget: 'resonansi'
  },
  {
    id: 'bibir-lidah',
    name: 'Bibir, Lidah & Rahang',
    role: 'Organ pengubah bunyi menjadi kata-kata vokal dan konsonan',
    correctTarget: 'artikulasi'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: 'multiple-choice',
    category: 'Pernapasan',
    scenario: 'Rian sedang bernyanyi solo di depan kelas. Pada bait lagu yang panjang, nafasnya tiba-tiba habis di tengah kalimat dan bahunya tampak naik-turun dengan cepat saat menghirup udara.',
    prompt: 'Berdasarkan analisis kasus Rian, teknik pernapasan apakah yang sedang digunakan Rian dan bagaimana solusi yang tepat?',
    options: [
      'A. Rian menggunakan pernapasan perut; solusinya menahan nafas di dada lebih lama.',
      'B. Rian menggunakan pernapasan dada; solusinya beralih ke pernapasan diafragma yang menampung udara lebih banyak tanpa mengangkat bahu.',
      'C. Rian sudah benar menggunakan pernapasan diafragma; solusinya bernyanyi lebih cepat agar nafas cukup.',
      'D. Rian menggunakan pernapasan mulut; solusinya bernyanyi tanpa menarik nafas sama sekali.'
    ],
    correctAnswer: 'B. Rian menggunakan pernapasan dada; solusinya beralih ke pernapasan diafragma yang menampung udara lebih banyak tanpa mengangkat bahu.',
    explanation: 'Mengangkat bahu saat menghirup nafas adalah tanda pernapasan dada. Pernapasan ini kapasitasnya dangkal dan cepat habis. Solusi terbaik dalam bernyanyi solo adalah pernapasan diafragma karena udara tertampung di bagian bawah paru-paru dan dikontrol oleh otot diafragma.',
    hint: 'Perhatikan tanda fisik bahu yang naik-turun. Pernapasan vokal yang ideal menjaga bahu tetap tenang rileks.',
    difficulty: 'Sedang'
  },
  {
    id: 2,
    type: 'multiple-choice',
    category: 'Postur',
    scenario: 'Saat hendak menyanyikan nada tinggi pada reff lagu, Sita secara refleks mendongakkan kepalanya ke atas setinggi mungkin hingga lehernya tampak tegang.',
    prompt: 'Mengapa kebiasaan mendongakkan kepala saat menyanyikan nada tinggi keliru dalam bernyanyi solo?',
    options: [
      'A. Karena membuat penonton tidak bisa melihat wajah penyanyi.',
      'B. Karena mendongak justru menekan laring dan mencekik pita suara sehingga suara menjadi serak atau meleset fals.',
      'C. Karena mendongak menyebabkan diafragma pecah.',
      'D. Karena mendongak hanya boleh dilakukan untuk penyanyi paduan suara, bukan solo.'
    ],
    correctAnswer: 'B. Karena mendongak justru menekan laring dan mencekik pita suara sehingga suara menjadi serak atau meleset fals.',
    explanation: 'Mendongak ke atas saat menyanyikan nada tinggi mempersempit saluran laring dan menegangkan otot-otot leher luar. Akibatnya, pita suara tertekan dan tidak bebas bergetar. Posisi dagu harus tetap rileks dan sejajar lantai dengan mengalihkan fokus ke resonansi kepala.',
    hint: 'Pikirkan apa yang terjadi pada pipa saluran jika ditekuk ke belakang saat mengalirkan udara.',
    difficulty: 'Sedang'
  },
  {
    id: 3,
    type: 'multiple-choice',
    category: 'Intonasi',
    scenario: 'Kelompok vokal sedang mengevaluasi rekaman solo Siti. Pengamat menyadari bahwa Siti menyanyikan nada Sol (G4) sedikit lebih rendah dari nada iringan piano (kurang lebih 30 cents di bawah nada sebenarnya).',
    prompt: 'Istilah apa yang tepat untuk menggambarkan kesalahan tinggi-rendah nada Siti, dan apa faktor pemicu utamanya?',
    options: [
      'A. Kesalahan Phrasering; disebabkan oleh salah penggalan kalimat lagu.',
      'B. Kesalahan Artikulasi; disebabkan bibir kurang terbuka saat melafalkan lirik.',
      'C. Kesalahan Intonasi (Fals/Flat); dipicu oleh kurangnya dukungan nafas diafragma atau kurang teliti membidik nada.',
      'D. Kesalahan Tempo; disebabkan ketukan lagu terlalu lambat.'
    ],
    correctAnswer: 'C. Kesalahan Intonasi (Fals/Flat); dipicu oleh kurangnya dukungan nafas diafragma atau kurang teliti membidik nada.',
    explanation: 'Intonasi adalah ketepatan membidik tinggi rendahnya nada. Jika nada yang dibunyikan lebih rendah dari nada sebenarnya, suara disebut fals (flat/underpitch). Hal ini paling sering dipicu oleh hilangnya tekanan udara pendukung (breath support) dari diafragma.',
    hint: 'Kata kuncinya adalah ketepatan frekuensi tinggi-rendah nada (pitch accuracy).',
    difficulty: 'Tantangan'
  },
  {
    id: 4,
    type: 'multiple-choice',
    category: 'Resonansi',
    scenario: 'Budi memiliki suara yang terdengar cempreng dan tipis saat bernyanyi di panggung sekolah, meskipun ia sudah bernyanyi dengan volume yang keras.',
    prompt: 'Teknik vokal apakah yang perlu dilatih Budi agar suaranya terdengar lebih tebal, bulat, dan berbobot tanpa harus memaksakan tenggorokannya?',
    options: [
      'A. Melatih resonansi suara dengan memanfaatkan rongga dada dan rongga mulut secara seimbang.',
      'B. Menjerit sekeras mungkin agar pita suara membesar.',
      'C. Mengunyah makanan sebelum bernyanyi untuk melumasi lidah.',
      'D. Membungkukkan badan saat bernyanyi agar suara tidak keluar.'
    ],
    correctAnswer: 'A. Melatih resonansi suara dengan memanfaatkan rongga dada dan rongga mulut secara seimbang.',
    explanation: 'Resonansi berfungsi sebagai pengeras suara alami tubuh manusia. Memanfaatkan rongga dada (chest resonance) dan rongga mulut yang terbuka membentuk vokal bulat bervolume tebal tanpa perlu menjerit atau merusak pita suara.',
    hint: 'Bayangkan badan gitar kopong yang memperbesar dan memperdalam bunyi dawai getar.',
    difficulty: 'Sedang'
  },
  {
    id: 5,
    type: 'multiple-choice',
    category: 'Artikulasi',
    scenario: 'Ketika peserta didik menyanyikan huruf vokal "A", beberapa siswa hanya membuka bibir sedikit sehingga vokal yang keluar terdengar seperti "E" atau "O".',
    prompt: 'Berapakah standar bukaan rongga mulut yang disarankan untuk melafalkan vokal "A" dengan sempurna pada bernyanyi solo?',
    options: [
      'A. Mulut dirapatkan rapat-rapat.',
      'B. Terbuka selebar kurang lebih dua jari vertikal di antara gigi depan dengan rahang bawah rileks.',
      'C. Terbuka selebar lima jari dengan rahang ditarik kencang ke samping.',
      'D. Mulut dimonyongkan ke depan seperti bersiul.'
    ],
    correctAnswer: 'B. Terbuka selebar kurang lebih dua jari vertikal di antara gigi depan dengan rahang bawah rileks.',
    explanation: 'Standar pembentukan vokal "A" yang benar adalah membuka rongga mulut secara vertikal selebar kurang lebih dua jari di antara gigi depan atas dan bawah. Rahang bawah harus rileks ke bawah agar bentuk vokal bulat dan jernih.',
    hint: 'Cobalah gunakan jari telunjuk dan jari tengah tanganmu secara vertikal di depan cermin.',
    difficulty: 'Mudah'
  }
];

export const GLOSSARY_TERMS = [
  { term: 'Solo Vokal', desc: 'Menyanyikan lagu seorang diri dengan membawakan melodi utama dan ekspresi pribadi.' },
  { term: 'Diafragma', desc: 'Otot tipis berbentuk kubah di bawah paru-paru yang mengatur pernapasan vokal.' },
  { term: 'Intonasi', desc: 'Ketepatan membidik tinggi rendah nada (pitch accuracy) tanpa meleset fals.' },
  { term: 'Artikulasi', desc: 'Teknik pelafalan kata, suku kata, serta huruf vokal dan konsonan secara jelas.' },
  { term: 'Resonansi', desc: 'Gejala bergetarnya udara di dalam rongga tubuh (dada, mulut, kepala) yang memperkuat volume dan timbre suara.' },
  { term: 'Phrasering', desc: 'Teknik pemenggalan kalimat lagu yang tepat sesuai dengan makna lirik dan aturan musik.' },
  { term: 'Solfeggio', desc: 'Latihan solmisasi vokal menyanyikan nada tangga nada diatonis (Do-Re-Mi-Fa-Sol-La-Si-Do).' },
  { term: 'Head Voice', desc: 'Register suara kepala untuk menjangkau nada tinggi dengan getaran pada rongga atas wajah dan sinus.' },
  { term: 'Chest Voice', desc: 'Register suara dada untuk nada rendah dan sedang dengan getaran resonansi di rongga dada.' },
  { term: 'Vibrato', desc: 'Gelombang getaran halus yang teratur dan alami pada nada panjang bernyanyi.' }
];

export const GROUP_ROLES = [
  {
    role: 'Penyanyi Solo',
    description: 'Mempraktikkan teknik postur, pernapasan, dan mencoba membunyikan nada pada tuner interaktif.',
    tasks: ['Mencoba simulasi nafas 3 siklus', 'Menyuarakan nada Do-Re-Mi pada Tuner', 'Menjawab tantangan vokal']
  },
  {
    role: 'Pengamat Postur & Nafas',
    description: 'Mengamati sikap tubuh dan memastikan bahu penyanyi tidak terangkat saat menarik nafas.',
    tasks: ['Mengecek ketegangan bahu & leher', 'Memastikan dagu sejajar lantai', 'Mencatat temuan di lembar kerja']
  },
  {
    role: 'Penguji Intonasi',
    description: 'Mendengarkan ketepatan nada dan memantau jarum indikator cents pada Tuner Interaktif.',
    tasks: ['Memantau apakah nada Fals atau Pas', 'Membunyikan nada panduan di piano', 'Memberikan aba-aba tangga nada']
  },
  {
    role: 'Notulis / Pencatat',
    description: 'Merekap hasil skor kuis, mencatat poin diskusi refleksi, dan mendokumentasikan sertifikat tim.',
    tasks: ['Mencatat skor kuis kelompok', 'Menuliskan 3 hal baru yang dipelajari', 'Menyimpan hasil refleksi tim']
  }
];

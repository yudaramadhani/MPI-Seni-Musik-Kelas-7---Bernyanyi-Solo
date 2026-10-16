// Complete 23-Point Instructional Design Document for VocaLab MPI

export interface DesignDocSection {
  number: number;
  title: string;
  content: string;
}

export const INSTRUCTIONAL_DESIGN_DOCUMENT: DesignDocSection[] = [
  {
    number: 1,
    title: 'Judul Multimedia Pembelajaran Interaktif',
    content: `**VocaLab: Menjadi Bintang Vokal Solo (Seni Musik SMP Kelas VII)**
*Aplikasi Multimedia Pembelajaran Interaktif (MPI) Berbasis Web untuk Penguasaan Teknik Vokal, Simulasi Pernapasan Diafragma, dan Pengukur Intonasi Nada.*`
  },
  {
    number: 2,
    title: 'Deskripsi Singkat MPI',
    content: `VocaLab adalah media pembelajaran interaktif berbasis web (HTML5/React/Web Audio API) yang dirancang khusus untuk memfasilitasi pembelajaran seni musik materi "Bernyanyi Solo" pada jenjang SMP Kelas VII Semester 1 (Kurikulum Merdeka).

Aplikasi ini mengintegrasikan visual pastel edukatif, maskot animasi ramah anak bernama "Melodi", narasi audio terintegrasi (Text-to-Speech), simulator ritme pernapasan diafragma 4-4-8 interaktif, dan modul pengukur intonasi vokal (Real-time Pitch Tuner) menggunakan deteksi mikrofon nyata serta keyboard solmisasi virtual. Dirancang untuk mode pembelajaran kelompok maupun mandiri dengan asesmen formatif adaptif berstandar kelulusan 80%.`
  },
  {
    number: 3,
    title: 'Sasaran Pengguna',
    content: `- **Jenjang / Kelas**: Sekolah Menengah Pertama (SMP) Kelas VII Semester 1.
- **Rentang Usia**: 12 – 13 tahun (fase perkembangan remaja awal/Fase D Kurikulum Merdeka).
- **Karakteristik Psikologis**: Menyukai pengalaman gamifikasi, visual berwarna cerah/pastel yang segar, tantangan eksploratif, serta kolaborasi teman sebaya.
- **Kemampuan Awal**: Memiliki pemahaman intuitif tentang bernyanyi dan mendengarkan musik, namun belum menguasai mekanisme anatomi vokal (diafragma, laring, resonansi) dan teknik bidikan intonasi (pitch accuracy).
- **Kebutuhan Diferensiasi**: Terdapat variasi literasi baca teks, sehingga memerlukan dukungan narator suara (audio guidance) dan pengaturan font ramah disleksia.`
  },
  {
    number: 4,
    title: 'Tujuan Pembelajaran & Indikator',
    content: `**Tujuan Pembelajaran (Capaian Pembelajaran Fase D - Elemen Mengalami & Merefleksikan):**
Peserta didik mampu memahami dan menganalisis 5 teknik dasar dalam bernyanyi solo (postur tubuh, pernapasan diafragma, resonansi, artikulasi vokal, dan intonasi nada) serta mempraktikkannya dalam latihan mandiri maupun kelompok.

**Indikator Keberhasilan (IKTP):**
1. Peserta didik dapat mengidentifikasi postur tubuh yang benar saat bernyanyi solo tanpa ketegangan pada leher dan bahu.
2. Peserta didik dapat membedakan mekanisme pernapasan dada, perut, dan diafragma serta mempraktikkan siklus nafas diafragma (tarik-tahan-hembus).
3. Peserta didik dapat mengelompokkan 3 rongga resonansi (dada, mulut/tengah, kepala) beserta fungsinya pada register suara.
4. Peserta didik dapat menganalisis bentuk artikulasi vokal (A-I-U-E-O) dan posisi rahang yang rileks.
5. Peserta didik dapat membunyikan nada solmisasi (Do-Re-Mi-Fa-Sol-La-Si-Do) dengan akurasi intonasi pada tuner digital.
6. Peserta didik mampu menyelesaikan kuis evaluasi formatif dengan mencapai skor minimal 80%.`
  },
  {
    number: 5,
    title: 'Rasional Desain Pembelajaran',
    content: `1. **Pendekatan Konstruktivisme & Eksplorasi Terbimbing**: Peserta didik usia 12-13 tahun memahami konsep abstrak (seperti diafragma di dalam tubuh dan frekuensi getaran nada) lebih cepat jika diberikan simulasi visual dinamis dan umpan balik sensorik langsung.
2. **Dual Coding Theory (Paivio)**: Menggabungkan stimulasi verbal (teks terstruktur & narasi suara) dengan representasi non-verbal (diagram organ vokal, animasi nafas, warna gradasi pastel) untuk memaksimalkan retensi memori jangka panjang.
3. **Pembelajaran Berdiferensiasi & Universal Design for Learning (UDL)**: Menyediakan alternatif narasi audio di setiap halaman bagi siswa yang memiliki hambatan literasi membaca atau pembelajar auditori, serta fitur toggle font ramah disleksia.
4. **Gamifikasi & Umpan Balik Positif**: Menyediakan badge kelulusan "Bintang Vokal Solo" dan sertifikat digital yang dapat dicetak bersama kelompok untuk menumbuhkan efikasi diri (self-efficacy) berkesenian.`
  },
  {
    number: 6,
    title: 'Alur Pembelajaran',
    content: `Alur pembelajaran 3 x 40 menit dirancang terstruktur:
1. **Fase Awal (15 Menit) - Motivasi & Apersepsi**: Masuk ke aplikasi melalui tombol "START" (layar penuh), mengatur profil kelompok/nama siswa, mendengarkan audio perbandingan nada tepat vs nada fals, serta mengeksplorasi tantangan awal.
2. **Fase Eksplorasi Materi & Peta Konsep (35 Menit)**: Menelaah 5 Pilar Teknik Vokal, mengeksplorasi anatomi organ pernapasan & resonansi interaktif.
3. **Fase Simulasi & Praktik Laboratorium (35 Menit)**: 
   - Latihan 1: Simulator ritme pernapasan diafragma (4 detik tarik, 4 detik tahan, 8 detik hembus desis 'Sss').
   - Latihan 2: Virtual Voice Pitch Tuner (membunyikan nada vokal ke mikrofon dan mencocokkan frekuensi nada Do-Re-Mi pada solmisasi piano).
4. **Fase Kolaborasi & Latihan (15 Menit)**: Aktivitas drag-and-drop organ vokal serta diskusi pembagian peran dalam kelompok.
5. **Fase Asesmen & Refleksi (20 Menit)**: Menyelesaikan kuis formatif analitis, menerima umpan balik terperinci, mengisi lembar refleksi 3-2-1, dan mengunduh sertifikat penghargaan kelompok.`
  },
  {
    number: 7,
    title: 'Flowchart Navigasi dalam Bentuk Teks',
    content: `[START SCREEN / HALAMAN PEMBUKA]
       │
       ▼ (Klik Tombol START -> Trigger HTML5 Fullscreen API)
[INPUT PROFIL SISWA & MODE KELOMPOK/MANDIRI]
       │
       ▼
[MENU UTAMA / HUB BERANDA MPI]
       ├──────► [01. Petunjuk Penggunaan & Aksesibilitas]
       ├──────► [02. Capaian & Tujuan Pembelajaran]
       ├──────► [03. Apersepsi: Misteri Suara & Uji Nada Fals]
       ├──────► [04. 5 Pilar Materi Teknik Bernyanyi Solo]
       ├──────► [05. Peta Konsep & Eksplorasi Anatomi Organ Vokal]
       ├──────► [06. Lab Praktik 1: Simulator Pernapasan Diafragma]
       ├──────► [07. Lab Praktik 2: Pengukur Intonasi Vokal (Live Mic Tuner & Piano)]
       ├──────► [08. Latihan Interaktif: Drag & Drop Pasangkan Organ]
       ├──────► [09. Kuis Formatif (PG, Menjodohkan, Studi Kasus)]
       │            │
       │            ▼ (Selesai Kuis)
       ├──────► [10. Umpan Balik Komprehensif & Analisis Skor]
       │            ├─ Jika Skor >= 80% ──► [12. Buka Kunci Sertifikat & Badge]
       │            └─ Jika Skor < 80%  ──► [Rekomendasi Ulangi Materi/Simulasi]
       ├──────► [11. Rangkuman & Lembar Diskusi Refleksi Kelompok]
       ├──────► [13. Glosarium Musik & Referensi Kurikulum Merdeka]
       └──────► [14. Dokumen Lengkap Desain Instruksional MPI]`
  },
  {
    number: 8,
    title: 'Struktur Halaman MPI (dengan Trigger Tombol START Fullscreen)',
    content: `Struktur halaman terdiri dari 16 modul terpadu:
- **Halaman 1 (Cover / Pembuka)**: Judul megah, visual panggung vokal solo, maskot Melodi, input nama/kelompok, dan tombol utama **"START: MULAI BELAJAR"** yang terikat dengan fungsi \`document.documentElement.requestFullscreen()\`.
- **Halaman 2 (Menu Utama)**: Grid kartu visual akses cepat ke seluruh stasiun pembelajaran dengan indikator progres belajar.
- **Halaman 3 (Petunjuk Penggunaan)**: Panduan simbol interaktif, tombol suara, keyboard shortcuts, dan cara kerja kelompok.
- **Halaman 4 (Tujuan Pembelajaran)**: Capaian Kurikulum Merdeka dan target skor minimal 80%.
- **Halaman 5 (Apersepsi)**: Player perbandingan nada vokal selaras vs nada sumbang/fals (440Hz vs 425Hz) untuk memantik rasa ingin tahu.
- **Halaman 6 (Materi Inti)**: 5 Tab pilar teknik bernyanyi solo (Sikap Badan, Pernapasan, Resonansi, Artikulasi, Intonasi).
- **Halaman 7 (Lab Anatomi Vokal)**: Peta organ tubuh vokal dengan hotspot interaktif yang menjelaskan fungsi setiap bagian.
- **Halaman 8 (Simulasi Pernapasan)**: Simulator ritme pernapasan diafragma real-time dengan animasi kubah diafragma, timer visual, dan panduan suara.
- **Halaman 9 (Simulasi Pengukur Intonasi)**: Audio Pitch Tuner real-time dengan input mikrofon (Autocorrelation) + Virtual Solfege Piano.
- **Halaman 10 (Latihan Drag & Drop)**: Permainan menyusun organ vokal ke 4 kategori fungsi suara.
- **Halaman 11 (Kuis Formatif)**: 5 Soal analitis berbasis studi kasus dengan scoring otomatis.
- **Halaman 12 (Umpan Balik)**: Evaluasi hasil belajar lengkap dengan kunci pembahasan mendalam.
- **Halaman 13 (Rangkuman)**: Kartu ringkasan konsep esensial bernyanyi solo.
- **Halaman 14 (Refleksi & Lembar Kelompok)**: Form refleksi 3-2-1 dan pembagian tugas kelompok.
- **Halaman 15 (Sertifikat Digital)**: Piagam apresiasi "Bintang Vokal Solo SMP" yang dapat dicetak.
- **Halaman 16 (Glosarium & Referensi)**: Kamus istilah musik vokal dan daftar pustaka resmi.`
  },
  {
    number: 9,
    title: 'Storyboard Lengkap Setiap Halaman',
    content: `**Storyboard Cuplikan Halaman Kunci:**
1. **Screen 1 (Opening Cover)**:
   - Header: Wordmark "VocaLab", indikator SMP Kelas 7.
   - Body: Visual panggung konser vokal pastel, maskot Melodi menyapa "Halo Sahabat Vokal!", field input Nama Siswa & Nama Kelompok.
   - CTA Utama: Tombol START besar bersinar (warna peach-amber pastel) dengan ikon layar penuh dan teks: "START - Mulai Petualangan Vokal (Fullscreen)".
2. **Screen 2 (Simulator Tuner Intonasi)**:
   - Atas: Panel pemilihan mode (Mikrofon Nyata vs Piano Solmisasi).
   - Tengah: Gauge meter jarum Tuner Cents (-50 cents ke +50 cents), display notasi balok besar (misal: "A4 / 440 Hz"), label solmisasi "La", status teks ("Fals Terlalu Rendah" / "Pas & Akurat!" / "Terlalu Tinggi").
   - Bawah: Deretan tuts piano interaktif bernomor 1 (Do), 2 (Re), 3 (Mi), 4 (Fa), 5 (Sol), 6 (La), 7 (Si), 1˙ (Do Tinggi).
3. **Screen 3 (Simulator Pernapasan Diafragma)**:
   - Visual: Animasi kubah otot diafragma yang melengkung turun saat fase TARIK, mendatar stabil saat fase TAHAN, dan bergerak naik rileks saat fase HEMBUS.
   - Panel Instruksi: Hitung mundur detik (4s - 4s - 8s), sound cue lembut di tiap pergantian fase, serta tombol Mulai / Jeda / Ulangi Siklus.`
  },
  {
    number: 10,
    title: 'Rancangan Aktivitas Interaktif',
    content: `1. **Praktik Mandiri / Berpasangan pada Tuner**: Siswa mencoba menyanyikan vokal "Aaa" menirukan nada piano. Teman kelompok yang bertindak sebagai "Penguji Intonasi" memantau jarum indikator cents pada layar untuk memastikan nada berada di zona hijau (+-15 cents).
2. **Gym Pernapasan Diafragma**: Siswa mengikuti pemandu visual tarikan nafas 3 siklus. Pengamat kelompok memastikan bahu temannya tidak terangkat naik saat menarik nafas.
3. **Drag & Drop Matching Organ Vokal**: Menyeret kartu organ tubuh (Diafragma, Pita Suara, Sinus Wajah, Bibir/Lidah) ke dalam kotak fungsinya (Sistem Bahan Bakar, Sumber Bunyi Utama, Penguat Resonansi, Pembentuk Artikulasi).
4. **Uji Kepekaan Nada Apersepsi**: Membandingkan 2 sampel audio (nada 440Hz harmonis vs nada 425Hz disonan bergelombang) dan menebak mana yang bernada fals.`
  },
  {
    number: 11,
    title: 'Rancangan Konten Materi',
    content: `Konten materi disajikan berdasarkan buku resmi Seni Musik SMP Kelas VII Kurikulum Merdeka (Kemendikbudristek 2021):
- **Unit 1: Bernyanyi Solo**: Karakteristik bernyanyi solo, perbedaan dengan vokal grup/paduan suara.
- **Sikap Tubuh yang Benar**: Posisi kepala, leher, bahu rileks, dada terbuka, tulang punggung lurus alami, kaki seimbang.
- **Mekanisme Pernapasan Diafragma**: Anatomi diafragma sebagai sekat pemisah rongga dada dan rongga perut; cara melatih pernapasan diafragma dengan teknik hembusan berdesis (*hissing sound*).
- **Resonansi (Tiga Rongga Tubuh)**: Rongga resonansi bawah (dada), tengah (mulut/faring), dan atas (hidung/kepala) untuk mengoptimalkan timbre suara.
- **Artikulasi dan Diksi Vokal**: Pembentukan huruf vokal A-I-U-E-O dengan bukaan rahang rileks, pembentukan huruf konsonan tegas tanpa ketegangan laring.
- **Intonasi dan Solfeggio**: Interval nada diatonis mayor, kepekaan pendengaran vokal (*audiation*), serta cara mengatasi suara sumbang/fals.`
  },
  {
    number: 12,
    title: 'Rancangan Media Visual',
    content: `- **Gaya Visual**: Ilustrasi pastel edukatif kontemporer, ramah remaja awal, bersih, bebas dari efek visual silau/neon.
- **Palet Warna 60-30-10**:
  - 60% Kanvas Netral: Off-white lembut (#F8FAFC) dan slate muda (#F1F5F9).
  - 30% Struktur & Permukaan: Kartu putih bersih dengan border halus pastel (#E2E8F0), aksen mint, coral muda, dan lavender.
  - 10% Aksen Aksi: Oranye cerah (#EA580C) dan Amber hangat (#D97706) untuk tombol utama, hijau zamrud (#059669) untuk feedback benar.
- **Aset Gambar**:
  - Maskot "Melodi": Burung kicau bertopi headphone studio berkarakter 3D lembut.
  - Hero Banner: Panggung vokal solo siswa SMP penuh semangat.
  - Diagram Anatomi: Bagan pernapasan dan rongga resonansi beranotasi ramah anak.`
  },
  {
    number: 13,
    title: 'Rancangan Audio atau Narasi',
    content: `- **Audio Engine**: Memanfaatkan Web Audio API synthesizers bawaan peramban (tanpa ketergantungan file eksternal yang rentan putus sambungan).
- **Text-to-Speech (TTS) Narasi**: Menggunakan Web Speech API berbahasa Indonesia (id-ID) dengan kontrol Play/Pause/Stop di setiap modul materi untuk mendukung siswa dengan kebutuhan diferensiasi literasi.
- **Audio Sintesis Musik**: Tangga nada solmisasi piano akustik (C4 hingga C5) dengan overtone frekuensi harmonis alami.
- **Efek Suara Responsif**:
  - Chime nada arpeggio riang saat jawaban kuis benar.
  - Efek nada menurun lembut saat jawaban kurang tepat.
  - Audio metronom & nada pemandu pada simulator pernapasan.
  - Suara perbandingan nada fals (425Hz) vs nada akurat (440Hz).`
  },
  {
    number: 14,
    title: 'Rancangan Animasi atau Simulasi',
    content: `1. **Simulasi Dinamis Diafragma**:
   - Menggunakan animasi SVG dan CSS transition untuk merepresentasikan gerakan otot diafragma (mengembang turun 15% saat inspirasi, menahan stabil, lalu mengempis kembali saat ekspirasi).
   - Dilengkapi progress ring melingkar yang menunjukkan detik hitung mundur secara halus.
2. **Simulasi Pengukur Intonasi (Live Pitch Tuner)**:
   - Menganalisis frekuensi suara mikrofon peserta didik melalui algoritma Autocorrelation pada AnalyserNode.
   - Jarum penunjuk gauge bergerak secara dinamis antara -50 cents hingga +50 cents.
   - Indikator warna dinamis: Kuning (terlalu rendah), Hijau (pas/akurat +-15 cents), Merah (terlalu tinggi).`
  },
  {
    number: 15,
    title: 'Rancangan Kuis dan Asesmen',
    content: `Asesmen formatif terdiri dari 5 butir soal analitis berbasis situasi nyata:
- **Soal 1 (Pernapasan)**: Menganalisis kasus kehabisan nafas di tengah lagu dan bahu naik-turun.
- **Soal 2 (Postur)**: Mengkritisi dampak mendongakkan kepala saat menyanyikan nada tinggi.
- **Soal 3 (Intonasi)**: Mengidentifikasi istilah saat vokal bergeser 30 cents di bawah nada instrumen.
- **Soal 4 (Resonansi)**: Menemukan solusi teknik agar suara vokal tidak cempreng dan tipis.
- **Soal 5 (Artikulasi)**: Menentukan standar bukaan rongga mulut pada vokal "A".

Kriteria Ketuntasan Minimal (KKM): Skor 80% (minimal benar 4 dari 5 soal). Siswa yang lulus berhak membuka sertifikat digital.`
  },
  {
    number: 16,
    title: 'Umpan Balik untuk Jawaban Benar dan Salah',
    content: `- **Umpan Balik Jawaban Benar**: Ditampilkan dengan warna hijau zamrud, efek suara chime gembira, pujian kontekstual dari maskot Melodi, serta penjelasan mendalam mengapa pilihan tersebut merupakan teknik yang tepat.
- **Umpan Balik Jawaban Salah**: Ditampilkan tanpa nada menghakimi, menjelaskan letak kekeliruan konsep, memaparkan akibat fisik jika teknik yang salah dipaksakan pada pita suara, dan menyertakan tombol "Coba Lagi" atau "Lihat Petunjuk Materi".
- **Laporan Evaluasi Akhir**: Ringkasan persentase nilai, indikator lulus/remedial, dan rekomendasi spesifik pilar mana yang perlu diulang.`
  },
  {
    number: 17,
    title: 'Rubrik Penilaian jika Diperlukan',
    content: `Rubrik Keterampilan Praktik Bernyanyi Solo (Skala 1 - 4):
1. **Sikap Badan**: 
   - Skor 4: Berdiri tegap, rileks, bahu tenang, dagu sejajar lantai secara konsisten.
   - Skor 2: Masih sering membungkuk atau mendongak saat nada tinggi.
2. **Pernapasan Diafragma**:
   - Skor 4: Mampu menahan nafas stabil selama 8 detik hembusan desis tanpa mengangkat bahu.
   - Skor 2: Nafas terputus-putus atau bahu terangkat naik saat menghirup.
3. **Ketepatan Intonasi (Pitch)**:
   - Skor 4: Jarum tuner berada di zona hijau (+- 15 cents) pada minimal 7 dari 8 nada solmisasi.
   - Skor 2: Nada sering meleset fals > 30 cents di bawah nada sasaran.
4. **Artikulasi**:
   - Skor 4: Pengucapan vokal A-I-U-E-O bulat jelas dan konsonan tegas terdengar.`
  },
  {
    number: 18,
    title: 'Catatan Diferensiasi Pembelajaran',
    content: `- **Diferensiasi Konten**: Materi disajikan dalam 3 modalitas: teks penjelasan terstruktur, diagram visual anatomi tubuh beresolusi tinggi, dan narasi audio yang dapat didengarkan kapan saja.
- **Diferensiasi Proses**: Peserta didik dapat belajar mandiri dengan kecepatan sendiri (self-paced) atau dalam kelompok kecil 3-4 orang dengan pembagian peran spesifik (Penyanyi, Pengamat Nafas, Penguji Intonasi, Notulis).
- **Diferensiasi Produk**: Peserta didik menunjukkan pemahaman melalui kuis formatif digital, rekaman hasil akurasi tuner nada, atau lembar refleksi kelompok.`
  },
  {
    number: 19,
    title: 'Catatan Aksesibilitas',
    content: `- **Aksesibilitas Visual**: Rasio kontras teks memenuhi standar WCAG AA (minimal 4.5:1), tidak mengandalkan warna semata (selalu disertai teks dan ikon penjelas).
- **Mode Ramah Disleksia**: Opsi tombol pengubah font ke tampilan berjarak renggang yang mudah dibaca.
- **Pengatur Ukuran Teks**: Pilihan ukuran Normal, Besar (+20%), dan Ekstra Besar (+40%).
- **Aksesibilitas Motorik**: Seluruh tombol interaktif memiliki target sentuh minimal 44 x 44 piksel dengan highlight fokus yang jelas saat menggunakan navigasi keyboard.
- **Aksesibilitas Auditori**: Seluruh audio disertai teks transkrip visual pada layar.`
  },
  {
    number: 20,
    title: 'Spesifikasi Teknis HTML/CSS/JavaScript (Fullscreen API)',
    content: `**Implementasi Pemanggilan Fullscreen API Programmatic pada Tombol START:**
\`\`\`javascript
// Fungsi Pemicu Fullscreen Programmatic
function handleStartFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch(err => {
      console.warn("Fullscreen diblokir peramban atau mode iframe:", err);
    });
  } else if (elem.webkitRequestFullscreen) { // Safari / iOS
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE/Edge lama
    elem.msRequestFullscreen();
  }
}
\`\`\`
- **Frontend Stack**: React 19 + TypeScript + Tailwind CSS v4 + Motion.
- **Audio Processing**: HTML5 Web Audio API (\`AudioContext\`, \`AnalyserNode\`, \`OscillatorNode\`, \`GainNode\`).
- **Pitch Detection**: Algoritma Autocorrelation pada buffer waktu-nyata \`Float32Array\` dengan batasan frekuensi vokal 75Hz - 1100Hz.
- **Speech Synthesis**: \`window.speechSynthesis\` dengan utterance Bahasa Indonesia (\`id-ID\`).
- **Responsivitas**: Desain Mobile-First & Desktop 1440px dengan container flex/grid yang beradaptasi di smartphone, tablet, dan laptop.`
  },
  {
    number: 21,
    title: 'Prompt Tambahan untuk Membuat Aset Gambar',
    content: `**Prompt 1 (Maskot Melodi):**
"Cute pastel educational mascot named Melodi, an adorable friendly musical songbird character wearing cozy studio headphones and holding a tiny musical note, cheerful warm expression, soft pastel mint green and coral colors, charming storybook 3D character style, isolated on clean pastel cream background."

**Prompt 2 (Hero Ilustrasi Siswa Bernyanyi Solo):**
"Warm cheerful educational illustration of a junior high school student singing solo on a friendly school stage with microphone, good tall singing posture, soft floating musical notes, pastel color palette with warm peach, sky blue and lavender tones, clean contemporary editorial vector art."

**Prompt 3 (Diagram Anatomi Vokal):**
"Educational medical diagram for junior high school students showing human vocal anatomy: diaphragm, lungs, vocal cords in larynx, and facial resonance cavities, clearly color coded with soft pastel tones, clear labels, friendly scientific illustration style."`
  },
  {
    number: 22,
    title: 'Prompt Tambahan untuk Membuat Video Pembelajaran',
    content: `**Prompt Video Veo (16:9 Landscape / 9:16 Portrait):**
"Cinematic 4K educational video clip showing a 13-year-old junior high school student practicing diaphragmatic breathing and vocal warmups on a brightly lit pastel music stage. The camera glides around the student showing correct erect posture, relaxed shoulders, gentle expansion of the lower abdomen and ribs while singing melodic solfege notes. Floating pastel musical notes softly glow in the air, joyful atmosphere, high educational production quality."`
  },
  {
    number: 23,
    title: 'Rekomendasi Pengembangan Lanjutan',
    content: `1. **Penyimpanan Nilai ke Cloud**: Mengintegrasikan penyimpanan nilai siswa ke database Google Classroom atau Firebase Firestore untuk rekapitulasi penilaian guru secara otomatis.
2. **Perekam Vokal & Analisis Spektrogram**: Menambahkan fitur perekaman suara bernyanyi 1 lagu penuh dengan visualisasi spektrogram frekuensi untuk melihat kekayaan harmonik suara siswa.
3. **Mode Duet & Karaoke Solo**: Menyediakan iringan musik instrumental lagu-lagu daerah Indonesia (misal: "Yamko Rambe Yamko", "Gundhul Pacul") lengkap dengan lirik berjalan (karaoke) dan pendeteksi ketepatan nada real-time.
4. **PWA Offline Mode**: Mengonfigurasi Service Worker agar aplikasi dapat dipasang di smartphone Android/iOS dan diakses sepenuhnya tanpa sambungan internet di sekolah pelosok.`
  }
];

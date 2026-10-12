export interface TimelineEntry {
    period: string;
    position: string;
    institution: string;
    type: "Freelance" | "Sekolah";
    points: string[];
}

/*
 * Sumber: konten pengalaman yang sudah ada di situs lama + data yang tercetak di sertifikat.
 * Diurutkan dari yang terbaru.
 */
export const timeline: TimelineEntry[] = [
    {
        period: "2025 – Sekarang",
        position: "Full Stack Developer",
        institution: "Proyek klien", // TODO: profil LinkedIn menyebut "Oke Web Indonesia". Isi nama perusahaan/klien jika ingin ditampilkan.
        type: "Freelance",
        points: [
            "Mengembangkan aplikasi web full stack dengan React/Vue, Node.js/Express, serta MySQL, PostgreSQL, dan Supabase.",
            "Membangun website WordPress dengan custom theme & plugin untuk e-commerce, blog, dan website perusahaan.",
            // TODO: tambahkan 1 pencapaian terukur (mis. jumlah klien, kecepatan muat, hasil SEO) jika datanya ada.
        ],
    },
    {
        period: "2023 – 2026",
        position: "Siswa Rekayasa Perangkat Lunak (RPL)",
        institution: "SMK Negeri 1 Jenangan, Ponorogo",
        type: "Sekolah",
        points: [
            "Lulus Uji Kompetensi Keahlian Junior Coder dengan predikat Sangat Kompeten melalui proyek Aplikasi Peminjaman Alat (Feb 2026).",
            "Meraih Sertifikat Kompetensi Pemrogram Junior dari PT Universal Big Data (Okt 2025).",
            "Mempelajari dasar pemrograman, pengembangan web, dan rekayasa perangkat lunak.",
        ],
    },
    {
        period: "2023 – 2024",
        position: "Web Developer (Frontend)",
        institution: "Proyek klien",
        type: "Freelance",
        points: [
            "Membuat website statis & interaktif dengan HTML, CSS, dan JavaScript.",
            "Mengerjakan landing page, toko online, dan profil bisnis untuk klien.",
        ],
    },
];

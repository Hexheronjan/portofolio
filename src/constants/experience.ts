export interface TimelineEntry {
    period: string;
    position: string;
    institution: string;
    type: "Pekerjaan" | "Freelance" | "Sekolah";
    points: string[];
}

/*
 * Sumber: riwayat karier profesional & pendidikan resmi Fauzan Bagus Prasetyo.
 * Diurutkan dari yang terbaru.
 */
export const timeline: TimelineEntry[] = [
    {
        period: "2025 – Sekarang",
        position: "Full Stack Developer",
        institution: "Oke Web Indonesia",
        type: "Pekerjaan",
        points: [
            "Bekerja aktif mengembangkan dan memelihara aplikasi web modern berbasis Next.js, React, Node.js, Express, serta basis data PostgreSQL, Supabase, dan MySQL.",
            "Merancang website bisnis dan custom web application dengan performa tinggi, struktur kode terstandarisasi, dan integrasi API yang handal.",
            "Siap untuk kesempatan baru: Remote, WFH, WFO, Full time, Part time, Shift, Karyawan tetap (PKWTT), Karyawan kontrak (PKWT), Magang (internship), Freelance, maupun Outsourcing (alih daya).",
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

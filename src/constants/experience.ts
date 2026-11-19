export interface TimelineEntry {
    period: string;
    position: string;
    institution: string;
    type: "Pekerjaan" | "Prestasi" | "Freelance" | "Sekolah";
    points: string[];
}

/*
 * Sumber: riwayat karier profesional, prestasi kompetisi, & pendidikan resmi Fauzan Bagus Prasetyo.
 * Diurutkan dari yang terbaru.
 */
export const timeline: TimelineEntry[] = [
    {
        period: "Sep – Nov 2026",
        position: "Juara 2 — Kompetisi Web Development (ITX 2026)",
        institution: "Prodi Teknik Informatika — Universitas Darussalam Gontor",
        type: "Prestasi",
        points: [
            "Meraih Juara 2 bidang Web Development dalam Informatic Technology Experience (ITX) 2026 bertema \"Empowering Minds: Digitalizing the Future of Education\".",
            "Membangun solusi platform pembelajaran digital adaptif dengan arsitektur web modern, responsif, dan berfokus pada pengalaman belajar nyata.",
        ],
    },
    {
        period: "2025 – Sekarang",
        position: "Freelance Full Stack & Web Developer",
        institution: "PrajaLinks",
        type: "Freelance",
        points: [
            "Mengembangkan berbagai website bisnis dan aplikasi web kustom secara end-to-end untuk beragam sektor (profil perusahaan, kafe & bakery, laundry dengan tracking pesanan, reservasi event/VIP, hingga portal pelayanan digital desa).",
            "Membangun antarmuka modern dan responsif berbasis Next.js, React, TypeScript, dan Tailwind CSS lengkap dengan sistem reservasi, cek status pesanan, dashboard admin/staf, serta integrasi WhatsApp.",
            "Menangani seluruh siklus pengembangan mulai dari desain UI/UX, arsitektur frontend & backend, optimasi kecepatan, hingga deployment produksi di Vercel.",
        ],
    },
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

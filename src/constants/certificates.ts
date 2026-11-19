export interface Certificate {
    /** Nama resmi sesuai yang tertulis di sertifikat. */
    title: string;
    issuer: string;
    /** Tanggal terbit (format tampilan) & tahun untuk metadata. */
    issuedAt: string;
    year: number;
    category: "Prestasi" | "Kompetensi" | "Pelatihan";
    badge?: string;
    featured?: boolean;
    themeQuote?: string;
    credentialId?: string;
    note?: string;
    verifyUrl?: string;
    /** Tautan ke berkas PDF resmi bila tersedia di /public. */
    pdfUrl?: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
}

/*
 * Data diambil langsung dari teks resmi yang tercetak di dokumen sertifikat (/public/sertifikatjuara.pdf & /public/sertif1-3.jpeg).
 */
export const certificates: Certificate[] = [
    {
        title: "Juara 2 — Informatic Technology Experience (ITX) 2026: Web Development",
        issuer: "Program Studi Teknik Informatika — Universitas Darussalam Gontor",
        issuedAt: "September – November 2026",
        year: 2026,
        category: "Prestasi",
        badge: "Juara 2 Nasional · Web Dev",
        featured: true,
        themeQuote: "Empowering Minds: Digitalizing the Future of Education",
        credentialId: "020/ITX UNIDA/HIMATIF UNIDA/XI/2026",
        note: "Meraih peringkat Juara 2 bidang Web Development pada kompetisi ITX UNIDA 2026 yang diselenggarakan oleh Prodi Teknik Informatika & HIMATIF Universitas Darussalam Gontor.",
        pdfUrl: "/sertifikatjuara.pdf",
        image: "/sertif-juara-itx-2026.jpg",
        imageWidth: 2400,
        imageHeight: 1855,
    },
    {
        title: "Sertifikat Kompetensi Pemrogram Junior (Junior Coder)",
        issuer: "PT Universal Big Data (UBIG)",
        issuedAt: "21 Oktober 2025",
        year: 2025,
        category: "Kompetensi",
        badge: "KKNI Level 3",
        credentialId: "SERKOM/UBIG/JC/083/2025",
        note: "Kode jenjang UB3.31001.KKNI3UBIG · berlaku 3 tahun",
        verifyUrl: "https://sertifikat.ubig.co.id/cek/083",
        image: "/sertif1.jpeg",
        imageWidth: 1280,
        imageHeight: 895,
    },
    {
        title: "Uji Kompetensi Keahlian: Junior Coder",
        issuer: "SMK Negeri 1 Jenangan × PT Seje Digital Utama",
        issuedAt: "9 Februari 2026",
        year: 2026,
        category: "Kompetensi",
        badge: "Sangat Kompeten",
        credentialId: "UKK/SMKN-JEN/SD/2026.0045",
        note: "Predikat Sangat Kompeten · penugasan: Pengembangan Aplikasi Peminjaman Alat",
        image: "/sertif2.jpeg",
        imageWidth: 960,
        imageHeight: 1280,
    },
    {
        title: "Training Public Speaking",
        issuer: "Galeri Bertumbuh",
        issuedAt: "2 Agustus 2025",
        year: 2025,
        category: "Pelatihan",
        badge: "Komunikasi & Presentasi",
        credentialId: "003-TPS/GB/2.8/2025",
        note: "Pelatihan komunikasi publik, penyampaian gagasan teknis, dan presentasi profesional.",
        image: "/sertif3.jpeg",
        imageWidth: 1280,
        imageHeight: 912,
    },
];

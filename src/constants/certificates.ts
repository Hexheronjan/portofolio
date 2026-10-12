export interface Certificate {
    /** Nama resmi sesuai yang tertulis di sertifikat. */
    title: string;
    issuer: string;
    /** Tanggal terbit (format tampilan) & tahun untuk metadata. */
    issuedAt: string;
    year: number;
    credentialId?: string;
    note?: string;
    verifyUrl?: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
}

/*
 * Data diambil langsung dari teks yang tercetak di gambar sertifikat (/public/sertif1-3.jpeg).
 * PERINGATAN PRIVASI: gambar asli memuat NISN serta tempat/tanggal lahir.
 * TODO: unggah versi gambar yang bagian data pribadinya sudah di-blur.
 */
export const certificates: Certificate[] = [
    {
        title: "Sertifikat Kompetensi Pemrogram Junior (Junior Coder)",
        issuer: "PT Universal Big Data (UBIG)",
        issuedAt: "21 Oktober 2025",
        year: 2025,
        credentialId: "SERKOM/UBIG/JC/083/2025",
        note: "Kode jenjang UB3.31001.KKNI3UBIG · berlaku 3 tahun",
        verifyUrl: "https://sertifikat.ubig.co.id/cek/083", // TODO: pastikan tautan verifikasi ini aktif
        image: "/sertif1.jpeg",
        imageWidth: 1280,
        imageHeight: 895,
    },
    {
        title: "Uji Kompetensi Keahlian: Junior Coder",
        issuer: "SMK Negeri 1 Jenangan × PT Seje Digital Utama",
        issuedAt: "9 Februari 2026",
        year: 2026,
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
        credentialId: "003-TPS/GB/2.8/2025",
        image: "/sertif3.jpeg",
        imageWidth: 1280,
        imageHeight: 912,
    },
];

/**
 * Satu sumber kebenaran untuk identitas & positioning.
 * Semua teks identitas (hero, metadata, footer, OG image) membaca dari sini
 * agar tidak terjadi lagi "FOLIO OF FAUZAN" vs "FAUZAN STUDIO" vs "Frontend Developer".
 */
export const site = {
    name: "Fauzan Bagus Prasetyo",
    shortName: "Fauzan",
    role: "Full Stack & Mobile Developer",
    currentRole: "Full Stack Developer di Oke Web Indonesia",
    /** Satu kalimat value proposition. */
    tagline:
        "Full Stack Developer di Oke Web Indonesia. Saya membangun website bisnis dan aplikasi web & mobile end-to-end, dari antarmuka, API, hingga database, yang cepat dan mudah dikelola klien.",
    location: "Ponorogo, Indonesia",
    url: "https://portofolio-kappa-smoky.vercel.app", // TODO: ganti jika memakai domain kustom
    locale: "id_ID",
    email: "prasetyobagusfauzan@gmail.com",
    phoneDisplay: "0823-3868-9711",
    phoneIntl: "6282338689711",
    workArrangements: [
        "Remote / WFH",
        "WFO",
        "Full Time (PKWTT / PKWT)",
        "Part Time",
        "Shift",
        "Magang (Internship)",
        "Freelance",
        "Outsourcing (Alih Daya)"
    ],
    /** File placeholder; ganti isinya dengan CV asli (nama file boleh tetap). */
    cvPath: "/cv-fauzan-bagus-prasetyo.pdf", // TODO: ganti dengan CV asli
    socials: {
        github: "https://github.com/Hexheronjan",
        linkedin: "https://www.linkedin.com/in/fauzan-bagus-prasetyo-b8315738b/",
    },
} as const;

export const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/about" },
    { name: "Keahlian", href: "/skills" },
    { name: "Proyek", href: "/projects" },
    { name: "Kontak", href: "/contact" },
] as const;

export const whatsappUrl = `https://wa.me/${site.phoneIntl}`;
export const mailtoUrl = `mailto:${site.email}`;

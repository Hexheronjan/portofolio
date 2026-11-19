export interface SkillItem {
    name: string;
    icon: string; // simple-icons slug or key identifier
    level?: string;
}

export interface SkillCategory {
    title: string;
    description: string;
    skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
    {
        title: "Bahasa Pemrograman",
        description: "Bahasa pemrograman inti untuk pengembangan web, mobile, backend, hingga pemrograman sistem.",
        skills: [
            { name: "TypeScript", icon: "typescript" },
            { name: "JavaScript", icon: "javascript" },
            { name: "Go (Golang)", icon: "go" },
            { name: "Kotlin", icon: "kotlin" },
            { name: "Java", icon: "openjdk" },
            { name: "C++", icon: "cplusplus" },
            { name: "C", icon: "c" },
            { name: "PHP", icon: "php" },
        ],
    },
    {
        title: "Frontend & UI",
        description: "Membangun antarmuka web modern, interaktif, responsif, dan aksesibel berstandar produksi.",
        skills: [
            { name: "React", icon: "react" },
            { name: "Next.js", icon: "nextdotjs" },
            { name: "Tailwind CSS", icon: "tailwindcss" },
            { name: "HTML5 & CSS3", icon: "html5" },
            { name: "Framer Motion", icon: "framer" },
        ],
    },
    {
        title: "Mobile App",
        description: "Pengembangan aplikasi seluler lintas platform maupun native Android.",
        skills: [
            { name: "React Native", icon: "react" },
            { name: "Expo", icon: "expo" },
            { name: "Kotlin Android", icon: "kotlin" },
            { name: "Java Android", icon: "openjdk" },
        ],
    },
    {
        title: "Backend & API",
        description: "Arsitektur server, layanan REST API berkinerja tinggi, dan logika bisnis skalabel.",
        skills: [
            { name: "Node.js", icon: "nodedotjs" },
            { name: "Express.js", icon: "express" },
            { name: "Go (Golang) API", icon: "go" },
            { name: "Laravel", icon: "laravel" },
            { name: "REST API", icon: "postman" },
        ],
    },
    {
        title: "Basis Data",
        description: "Perancangan skema, optimasi query, dan manajemen database relasional maupun cloud.",
        skills: [
            { name: "PostgreSQL", icon: "postgresql" },
            { name: "MySQL", icon: "mysql" },
            { name: "Supabase", icon: "supabase" },
            { name: "Prisma ORM", icon: "prisma" },
        ],
    },
    {
        title: "CMS & DevOps",
        description: "Pengembangan CMS siap pakai, kontrol versi, pengujian API, desain UI, dan deployment.",
        skills: [
            { name: "WordPress", icon: "wordpress" },
            { name: "Elementor", icon: "elementor" },
            { name: "WooCommerce", icon: "woocommerce" },
            { name: "Git & GitHub", icon: "github" },
            { name: "Vercel", icon: "vercel" },
            { name: "Figma", icon: "figma" },
            { name: "Postman", icon: "postman" },
        ],
    },
];

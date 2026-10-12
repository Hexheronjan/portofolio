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
        title: "Frontend",
        description: "Membangun antarmuka web modern, interaktif, responsif, dan aksesibel.",
        skills: [
            { name: "React", icon: "react" },
            { name: "Next.js", icon: "nextdotjs" },
            { name: "TypeScript", icon: "typescript" },
            { name: "JavaScript", icon: "javascript" },
            { name: "Tailwind CSS", icon: "tailwindcss" },
            { name: "HTML5 & CSS3", icon: "html5" },
            { name: "Framer Motion", icon: "framer" },
        ],
    },
    {
        title: "Mobile",
        description: "Pengembangan aplikasi lintas platform untuk iOS dan Android.",
        skills: [
            { name: "React Native", icon: "react" },
            { name: "Expo", icon: "expo" },
        ],
    },
    {
        title: "Backend",
        description: "Arsitektur server, integrasi API, dan penanganan logika bisnis.",
        skills: [
            { name: "Node.js", icon: "nodedotjs" },
            { name: "Express.js", icon: "express" },
            { name: "REST API", icon: "postman" },
            { name: "PHP / Laravel", icon: "laravel" },
        ],
    },
    {
        title: "Basis Data",
        description: "Manajemen data relasional dan modern cloud database.",
        skills: [
            { name: "MySQL", icon: "mysql" },
            { name: "PostgreSQL", icon: "postgresql" },
            { name: "Supabase", icon: "supabase" },
            { name: "Prisma ORM", icon: "prisma" },
        ],
    },
    {
        title: "CMS & Platform",
        description: "Pengembangan tema, plugin, dan solusi situs siap pakai.",
        skills: [
            { name: "WordPress", icon: "wordpress" },
            { name: "Elementor", icon: "elementor" },
            { name: "WooCommerce", icon: "woocommerce" },
        ],
    },
    {
        title: "Alat & DevOps",
        description: "Alat bantu kerja, kontrol versi, deployment, dan desain visual.",
        skills: [
            { name: "Git & GitHub", icon: "github" },
            { name: "Vercel", icon: "vercel" },
            { name: "VS Code", icon: "vscodium" },
            { name: "Figma", icon: "figma" },
            { name: "Postman", icon: "postman" },
        ],
    },
];

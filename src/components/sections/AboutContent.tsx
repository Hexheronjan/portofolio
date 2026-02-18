"use client";

import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/Timeline";
import { Section } from "@/components/ui/Section";

const experience = [
    {
        year: "2023 - Sekarang",
        title: "Frontend Developer",
        organization: "Tech Solutions Inc.",
        description:
            "Mengembangkan aplikasi web yang skalabel menggunakan React, Next.js, dan TypeScript. Meningkatkan performa situs sebesar 40% melalui pemisahan kode dan optimasi gambar.",
    },
    {
        year: "2022 - 2023",
        title: "Junior Web Developer",
        organization: "Creative Agency",
        description:
            "Berkolaborasi dengan desainer untuk mengimplementasikan antarmuka pengguna yang responsif. Membangun pustaka komponen yang dapat digunakan kembali menggunakan Tailwind CSS.",
    },
];

const education = [
    {
        year: "2019 - 2023",
        title: "Sarjana Ilmu Komputer",
        organization: "Universitas Indonesia",
        description:
            "Fokus pada Rekayasa Perangkat Lunak dan Interaksi Manusia-Komputer. Anggota aktif klub pemrograman universitas.",
    },
];

export function AboutContent() {
    return (
        <div className="flex flex-col">
            <Section className="pb-8 relative">
                {/* Decorative element */}
                <div className="absolute top-20 right-0 w-72 h-72 -z-10 rounded-full bg-primary/5 blur-3xl" />

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-display font-bold mb-6"
                >
                    Tentang Saya
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid md:grid-cols-2 gap-12 items-start"
                >
                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                        <p>
                            Saya adalah Software Engineer yang bersemangat dengan fokus kuat pada Pengembangan Frontend.
                            Perjalanan saya di dunia teknologi dimulai dengan rasa ingin tahu tentang bagaimana
                            situs web bekerja, yang membawa saya mendalami ekosistem web modern.
                        </p>
                        <p>
                            Dengan keahlian di <span className="text-foreground font-medium">React, Next.js, dan TypeScript</span>,
                            saya senang membangun aplikasi yang tidak hanya menarik secara visual tetapi juga
                            aksesibel dan memiliki performa tinggi. Saya percaya pada penulisan kode yang bersih,
                            mudah dikelola, dan tahan uji waktu.
                        </p>
                        <p>
                            Saat tidak sedang coding, Anda bisa menemukan saya mengeksplorasi teknologi baru, berkontribusi
                            pada open source, atau berbagi pengetahuan dengan komunitas.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-secondary/30 p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                    >
                        <h3 className="text-xl font-bold mb-6">Filosofi Saya</h3>
                        <ul className="space-y-6">
                            {[
                                { title: "Utamakan Performa", desc: "Waktu muat yang cepat dan interaksi yang halus adalah hal yang tidak bisa ditawar." },
                                { title: "Aksesibel untuk Semua", desc: "Membangun pengalaman inklusif untuk pengguna dengan segala kemampuan." },
                                { title: "Detail Sempurna", desc: "Perhatian terhadap detail di setiap komponen dan interaksi." },
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-primary text-lg font-light mt-0.5" aria-hidden>·</span>
                                    <div>
                                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </Section>

            <Section className="bg-secondary/20 py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl relative"
                >
                    <h2 className="text-2xl font-bold mb-8 text-foreground tracking-tight">Pengalaman Kerja</h2>
                    <Timeline items={experience} />
                </motion.div>
            </Section>

            <Section className="py-16 relative">
                <div className="absolute top-0 left-1/2 w-96 h-96 -z-10 rounded-full bg-primary/5 blur-3xl -translate-x-1/2" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl relative"
                >
                    <h2 className="text-2xl font-bold mb-8 text-foreground tracking-tight">Pendidikan</h2>
                    <Timeline items={education} />
                </motion.div>
            </Section>
        </div>
    );
}

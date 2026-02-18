"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
    { name: "GitHub", href: "https://github.com/Hexheronjan", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/fauzan-bagus-prasetyo-bisnis-b8315738b", icon: Linkedin },
    { name: "Email", href: "mailto:fauzanbagusprasetyobisnis@gmail.com", icon: Mail },
];

import { Magnetic } from "@/components/ui/Magnetic";

export function Footer() {
    return (
        <footer className="bg-background border-t border-border py-12 mt-20 relative overflow-hidden noise-bg">
            {/* Animated gradient accent line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ originX: 0.5 }}
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            />

            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative">
                {/* Logo & copyright */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center md:items-start gap-2"
                >
                    <Magnetic strength={0.2}>
                        <Link href="/" className="flex items-center gap-2 group">
                            <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <Image
                                    src="/set.png"
                                    alt="FRAVOX Digital Solutions"
                                    width={36}
                                    height={36}
                                    className="h-9 w-9 object-contain"
                                    unoptimized
                                />
                            </motion.div>
                            <span className="font-display font-bold text-xl tracking-tight group-hover:text-primary transition-colors duration-300">
                                FRAVOX<span className="text-primary">.</span>
                            </span>
                        </Link>
                    </Magnetic>
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} FRAVOX Digital Solutions. Hak cipta dilindungi.
                    </p>
                </motion.div>

                {/* Social icons */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-center gap-4"
                >
                    {socialLinks.map((link, index) => (
                        <Magnetic key={link.name} strength={0.5}>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                whileHover={{ y: -3, scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link
                                    href={link.href}
                                    className="relative flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-secondary/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-colors duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.name}
                                >
                                    <link.icon size={18} />
                                </Link>
                            </motion.div>
                        </Magnetic>
                    ))}
                </motion.div>
            </div>
        </footer>
    );
}

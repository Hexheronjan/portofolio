import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
    { name: "GitHub", href: "https://github.com/Hexheronjan", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/fauzan-bagus-prasetyo-bisnis-b8315738b", icon: Linkedin },
    { name: "Email", href: "mailto:fauzanbagusprasetyobisnis@gmail.com", icon: Mail },
];

export function Footer() {
    return (
        <footer className="bg-background border-t border-border py-12 mt-20 relative overflow-hidden">
            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/set.png"
                            alt="FRAVOX Digital Solutions"
                            width={36}
                            height={36}
                            className="h-9 w-9 object-contain"
                            unoptimized
                        />
                        <span className="font-display font-bold text-xl tracking-tight">
                            FRAVOX<span className="text-primary">.</span>
                        </span>
                    </Link>
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} FRAVOX Digital Solutions. Hak cipta dilindungi.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    {socialLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.name}
                        >
                            <link.icon size={20} />
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}

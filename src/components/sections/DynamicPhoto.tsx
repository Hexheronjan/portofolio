"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FlowerIcon = () => (
    <svg viewBox="0 0 100 100" className="w-[0.7em] h-[0.7em] text-[#b4f000] drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 C60 0, 70 10, 70 25 C70 40, 50 50, 50 50 C50 50, 30 40, 30 25 C30 10, 40 0, 50 0 Z" fill="currentColor"/>
        <path d="M100 50 C100 60, 90 70, 75 70 C60 70, 50 50, 50 50 C50 50, 60 30, 75 30 C90 30, 100 40, 100 50 Z" fill="currentColor"/>
        <path d="M50 100 C40 100, 30 90, 30 75 C30 60, 50 50, 50 50 C50 50, 70 60, 70 75 C70 90, 60 100, 50 100 Z" fill="currentColor"/>
        <path d="M0 50 C0 40, 10 30, 25 30 C40 30, 50 50, 50 50 C50 50, 40 70, 25 70 C10 70, 0 60, 0 50 Z" fill="currentColor"/>
    </svg>
);

export function DynamicPhoto() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Efek kartu membesar saat di-scroll
    const margin = useTransform(scrollYProgress, [0, 0.2], ["4vw", "0vw"]);
    const radius = useTransform(scrollYProgress, [0, 0.2], ["3rem", "0rem"]);
    
    // Animasi foto
    const photoY = useTransform(scrollYProgress, [0.2, 0.5], [250, 0]);
    const photoScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
    const photoOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

    return (
        <section ref={containerRef} className="relative w-full bg-[#0A0A0A]">
            
            {/* The expanding white card */}
            <motion.div 
                style={{ 
                    marginLeft: margin, 
                    marginRight: margin, 
                    borderTopLeftRadius: radius,
                    borderTopRightRadius: radius,
                }}
                className="bg-[#EAEAEA] overflow-hidden flex flex-col items-center pt-[15vh] pb-[20vh] mt-[5vh]"
            >
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-20 w-full overflow-hidden pointer-events-none mb-[12vh] md:mb-[18vh]"
                >
                    <motion.div 
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                        className="flex whitespace-nowrap items-center font-display font-bold tracking-tight text-[#111] w-max"
                    >
                        <div className="flex items-center gap-6 md:gap-12 pr-6 md:pr-12 text-[15vw] md:text-[10vw]">
                            <span>FULL-STACK DEVELOPER</span>
                            <FlowerIcon />
                            <span>MOBILE DEVELOPER</span>
                            <FlowerIcon />
                            <span>FULL-STACK DEVELOPER</span>
                            <FlowerIcon />
                            <span>MOBILE DEVELOPER</span>
                            <FlowerIcon />
                        </div>
                        <div className="flex items-center gap-6 md:gap-12 pr-6 md:pr-12 text-[15vw] md:text-[10vw]">
                            <span>FULL-STACK DEVELOPER</span>
                            <FlowerIcon />
                            <span>MOBILE DEVELOPER</span>
                            <FlowerIcon />
                            <span>FULL-STACK DEVELOPER</span>
                            <FlowerIcon />
                            <span>MOBILE DEVELOPER</span>
                            <FlowerIcon />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Photo */}
                <motion.div 
                    style={{ y: photoY, scale: photoScale, opacity: photoOpacity }}
                    className="relative z-10 w-[75vw] max-w-[320px] md:max-w-[450px] aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-[#EAEAEA] group"
                >
                    <img 
                        src="/fototengah.jpg" 
                        alt="Fauzan Developer" 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </motion.div>
            </motion.div>
        </section>
    );
}

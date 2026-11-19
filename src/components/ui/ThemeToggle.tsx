"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({
    className,
    onDarkSurface = false,
}: {
    className?: string;
    onDarkSurface?: boolean;
}) {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Placeholder statis saat SSR agar tidak layout shift
    if (!mounted) {
        return (
            <div
                className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-full border opacity-50",
                    onDarkSurface
                        ? "border-white/20 bg-white/10 text-[#f4efe8]"
                        : "border-border bg-background text-muted-foreground",
                    className
                )}
                aria-hidden="true"
            />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                onDarkSurface
                    ? "border-white/20 bg-white/10 hover:bg-white/20 text-[#f4efe8]"
                    : "border-border/80 bg-background/80 hover:bg-muted text-foreground",
                className
            )}
            aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
            title={isDark ? "Mode terang" : "Mode gelap"}
        >
            {isDark ? (
                <Sun className="h-4 w-4 text-brass transition-transform hover:rotate-45" />
            ) : (
                <Moon
                    className={cn(
                        "h-4 w-4 transition-transform hover:-rotate-12",
                        onDarkSurface ? "text-[#f4efe8]" : "text-foreground"
                    )}
                />
            )}
        </button>
    );
}

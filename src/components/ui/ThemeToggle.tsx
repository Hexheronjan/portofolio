"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
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
                    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground opacity-50",
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
                "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-background/80 hover:bg-muted text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                className
            )}
            aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
            title={isDark ? "Mode terang" : "Mode gelap"}
        >
            {isDark ? (
                <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
                <Moon className="h-4 w-4 text-zinc-700 transition-transform hover:-rotate-12" />
            )}
        </button>
    );
}

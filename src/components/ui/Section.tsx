import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    container?: boolean;
}

export function Section({
    className,
    children,
    container = true,
    ...props
}: SectionProps) {
    return (
        <section className={cn("py-12 md:py-16 lg:py-24", className)} {...props}>
            {container ? (
                <div className="container mx-auto px-4 md:px-6">{children}</div>
            ) : (
                children
            )}
        </section>
    );
}

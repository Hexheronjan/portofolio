import { cn } from "@/lib/utils";

export interface TimelineItem {
    year: string;
    title: string;
    organization?: string;
    description: string;
}

export function Timeline({ items }: { items: TimelineItem[] }) {
    return (
        <div className="relative border-l border-muted md:ml-3 ml-3 space-y-8 pb-4">
            {items.map((item, index) => (
                <div key={index} className="mb-10 ml-6 relative group">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-background rounded-full -left-[37px] ring-4 ring-background border border-muted group-hover:border-primary transition-colors">
                        <div className="w-2 h-2 bg-muted-foreground/30 rounded-full group-hover:bg-primary transition-colors" />
                    </span>
                    <time className="block mb-2 text-sm font-mono leading-none text-muted-foreground">
                        {item.year}
                    </time>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-foreground">
                        {item.title}
                    </h3>
                    {item.organization && (
                        <span className="block mb-2 text-sm font-medium text-primary">
                            {item.organization}
                        </span>
                    )}
                    <p className="mb-4 text-base font-normal text-muted-foreground text-pretty max-w-2xl">
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
    );
}

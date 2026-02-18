import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image: string; // URL to image
    githubUrl?: string;
    liveUrl?: string;
}

export function ProjectCard({
    title,
    description,
    tags,
    image,
    githubUrl,
    liveUrl,
}: ProjectCardProps) {
    return (
        <Card className="flex flex-col overflow-hidden group border-border/50 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
            <div className="relative aspect-video overflow-hidden bg-muted">
                {/* Placeholder for image if not valid URL or using next/image with placeholder */}
                {/* For this demo, using a colored div or text if no image provided, but ideally next/image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:scale-105 transition-transform duration-500" />
                {/* Real image implementation would require valid src */}
                <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-1">{title}</CardTitle>
                <CardDescription className="line-clamp-2">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                {githubUrl && (
                    <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                        <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            Code
                        </Link>
                    </Button>
                )}
                {liveUrl && (
                    <Button size="sm" className="w-full gap-2" asChild>
                        <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Demo
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

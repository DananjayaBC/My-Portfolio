import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  const Card: any = href ? "a" : "div";

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t shadow-sm",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        // Make cards more readable on mobile while keeping stable width for marquee
        "w-[88vw] max-w-[88vw] min-w-[260px] sm:w-[320px] sm:max-w-[320px]",
        // Slightly taller cards for better readability and consistency
        "min-h-[180px] sm:min-h-[200px]",
        "transition-colors duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none">{author.name}</h3>
          <p className="text-sm text-muted-foreground">{author.handle}</p>
        </div>
      </div>
      <p className="mt-3 text-[0.95rem] text-muted-foreground sm:mt-4 sm:text-base">
        {text}
      </p>
    </Card>
  );
}

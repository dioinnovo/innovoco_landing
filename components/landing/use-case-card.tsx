import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UseCaseCardProps {
  title: string;
  description: string;
  icon: LucideIcon | string;
  benefits: string[];
  example?: {
    label: string;
    content: string;
  };
  tags?: string[];
  badge?: string;
  className?: string;
}

export function UseCaseCard({
  title,
  description,
  icon: Icon,
  benefits,
  example,
  tags = [],
  badge,
  className,
}: UseCaseCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden bg-card/50 border-border/50",
      "hover:bg-card/80 hover:border-border hover:shadow-glow",
      "transition-all duration-300 hover-lift",
      "before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5",
      "before:bg-primary before:transform before:-translate-x-full",
      "hover:before:translate-x-0 before:transition-transform before:duration-500",
      className
    )}>
      {badge && (
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground border-0">
          {badge}
        </Badge>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            {typeof Icon === "string" ? (
              <span className="text-2xl">{Icon}</span>
            ) : (
              <Icon className="h-6 w-6 text-primary" />
            )}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-foreground">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        {example && (
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium text-primary mb-1">
              {example.label}
            </p>
            <p className="text-sm text-muted-foreground italic">
              "{example.content}"
            </p>
          </div>
        )}
        
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs border-primary/30 text-primary/70"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
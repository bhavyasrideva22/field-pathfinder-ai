import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'warning';
}

export const ProgressBar = ({ 
  value, 
  max = 100, 
  className, 
  showPercentage = true,
  variant = 'default'
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const variantClasses = {
    default: 'hero-gradient',
    success: 'success-gradient',
    warning: 'bg-warning'
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        {showPercentage && (
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div className="w-full bg-secondary rounded-lg h-3 overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out rounded-lg",
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
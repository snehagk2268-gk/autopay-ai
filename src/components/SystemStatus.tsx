import { Zap, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusItem {
  icon: typeof Zap;
  title: string;
  subtitle: string;
  iconBg?: string;
}

interface SystemStatusProps {
  isActive?: boolean;
  lastAnalysis?: string;
}

export function SystemStatus({ isActive = true, lastAnalysis = "INV-2023-089 processed 2h ago" }: SystemStatusProps) {
  const items: StatusItem[] = [
    {
      icon: Zap,
      title: "Agent Ready",
      subtitle: "Waiting for invoice upload...",
      iconBg: "bg-primary/10 text-primary",
    },
    {
      icon: Clock,
      title: "Last Analysis",
      subtitle: lastAnalysis,
      iconBg: "bg-muted text-muted-foreground",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-lg">System Status</h2>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
          isActive 
            ? "bg-success/10 text-success" 
            : "bg-muted text-muted-foreground"
        )}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="space-y-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", item.iconBg)}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

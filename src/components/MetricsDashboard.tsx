import { Bell, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MetricsDashboardProps {
  onUploadClick: () => void;
}

interface MetricCardProps {
  label: string;
  value: string;
  trend: number;
  trendLabel: string;
}

function MetricCard({ label, value, trend, trendLabel }: MetricCardProps) {
  const isPositive = trend >= 0;
  
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-display font-semibold text-foreground">{value}</p>
      <div className="flex items-center gap-1">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-primary" />
        ) : (
          <TrendingDown className="w-4 h-4 text-destructive" />
        )}
        <span className={isPositive ? "text-sm text-primary" : "text-sm text-destructive"}>
          {isPositive ? '+' : ''}{trend}%
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{trendLabel}</p>
    </div>
  );
}

export function MetricsDashboard({ onUploadClick }: MetricsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-foreground">AutoOps</h1>
        <Button variant="ghost" size="icon" className="rounded-xl border border-border">
          <Bell className="w-5 h-5" />
        </Button>
      </div>

      {/* Last Sync */}
      <p className="text-sm text-muted-foreground">Last Sync: 2m ago</p>

      {/* Agent Status */}
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-bold text-foreground">Agent Ready</h2>
        <p className="text-muted-foreground">
          Autonomous monitoring active. All payment queues are clear.
        </p>
        <Button variant="outline" className="rounded-xl border-border">
          View System Logs
        </Button>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        <h3 className="text-xl font-display font-semibold text-foreground">Overview Metrics</h3>
        
        <div className="grid grid-cols-1 gap-6">
          <MetricCard
            label="Invoices Processed"
            value="124"
            trend={12}
            trendLabel="vs last month"
          />
          
          <MetricCard
            label="Total USDC Paid"
            value="45,200.00"
            trend={5.4}
            trendLabel="current quarter"
          />
          
          <MetricCard
            label="Monthly Spend"
            value="12,840.00"
            trend={-2}
            trendLabel="budget variance"
          />
        </div>
      </div>

      {/* Upload Button */}
      <Button
        onClick={onUploadClick}
        variant="outline"
        className="w-full h-12 rounded-xl border-border flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Upload New Invoice
      </Button>
    </div>
  );
}

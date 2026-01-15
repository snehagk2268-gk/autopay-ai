import { useState } from 'react';
import { Settings, Wallet, Shield, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

type BehaviorMode = 'conservative' | 'balanced' | 'aggressive';

const modeDescriptions: Record<BehaviorMode, string> = {
  conservative: 'Conservative mode requires manual approval for all payments over $100.',
  balanced: 'Balanced mode optimizes for speed while maintaining strict secondary verification on payments over $500.',
  aggressive: 'Aggressive mode auto-approves all recognized vendors with minimal delay.',
};

export function SettingsView() {
  const [behaviorMode, setBehaviorMode] = useState<BehaviorMode>('balanced');
  const [dailyLimit, setDailyLimit] = useState(2500);
  const [monthlyLimit, setMonthlyLimit] = useState(45000);
  const [autoPayInvoices, setAutoPayInvoices] = useState(true);
  const [subscriptionShield, setSubscriptionShield] = useState(true);
  const [portfolioRebalancing, setPortfolioRebalancing] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Agent Avatar & Info */}
      <div className="text-center space-y-3">
        <div className="w-24 h-24 mx-auto rounded-full bg-[hsl(30,10%,15%)] flex items-center justify-center relative">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-[hsl(35,60%,50%)]">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
          </svg>
          <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-primary border-2 border-card"></div>
        </div>
        
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Sage Agent v2.4</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="px-2 py-0.5 bg-muted rounded text-xs font-semibold text-muted-foreground">
              Status: Active
            </span>
            <span className="text-sm text-muted-foreground">AutoOps Autonomous Agent</span>
          </div>
        </div>
      </div>

      {/* Behavior Mode */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Behavior Mode
          </h3>
        </div>
        
        <div className="bg-card rounded-2xl p-1 flex">
          {(['conservative', 'balanced', 'aggressive'] as BehaviorMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setBehaviorMode(mode)}
              className={cn(
                'flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all capitalize',
                behaviorMode === mode
                  ? 'bg-foreground text-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {mode}
            </button>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground italic">
          {modeDescriptions[behaviorMode]}
        </p>
      </div>

      {/* Expenditure Limits */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Expenditure Limits
          </h3>
        </div>

        <div className="bg-card rounded-2xl p-4 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Daily limit</span>
              <span className="text-lg font-display font-semibold text-foreground">
                {formatCurrency(dailyLimit)}
              </span>
            </div>
            <Slider
              value={[dailyLimit]}
              onValueChange={(value) => setDailyLimit(value[0])}
              min={500}
              max={10000}
              step={100}
              className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-0 [&_.bg-primary]:bg-primary"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Monthly cap</span>
              <span className="text-lg font-display font-semibold text-foreground">
                {formatCurrency(monthlyLimit)}
              </span>
            </div>
            <Slider
              value={[monthlyLimit]}
              onValueChange={(value) => setMonthlyLimit(value[0])}
              min={10000}
              max={100000}
              step={1000}
              className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-0 [&_.bg-primary]:bg-primary"
            />
          </div>
        </div>
      </div>

      {/* Automation Rules */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Automation Rules
          </h3>
        </div>

        <div className="space-y-2">
          <div className="bg-card rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12h8M8 8h8M8 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Auto-pay invoices</p>
              <p className="text-sm text-muted-foreground">Pay recognized vendors automatically</p>
            </div>
            <Switch
              checked={autoPayInvoices}
              onCheckedChange={setAutoPayInvoices}
            />
          </div>

          <div className="bg-card rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-info/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-info" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Subscription shield</p>
              <p className="text-sm text-muted-foreground">Alert on price hikes or double billing</p>
            </div>
            <Switch
              checked={subscriptionShield}
              onCheckedChange={setSubscriptionShield}
            />
          </div>

          <div className="bg-card rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Portfolio rebalancing</p>
              <p className="text-sm text-muted-foreground">Move idle cash to high-yield accounts</p>
            </div>
            <Switch
              checked={portfolioRebalancing}
              onCheckedChange={setPortfolioRebalancing}
            />
          </div>
        </div>
      </div>

      {/* Emergency Pause */}
      <div className="space-y-3 pb-4">
        <Button
          variant="outline"
          className="w-full h-14 rounded-2xl border-destructive/30 bg-destructive/5 hover:bg-destructive/10 text-destructive font-semibold"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          Emergency Agent Pause
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Paused agents will stop all outbound transactions immediately. Resumption requires admin biometric auth.
        </p>
      </div>
    </div>
  );
}

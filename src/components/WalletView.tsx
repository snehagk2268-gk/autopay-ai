import { Settings, User, ExternalLink, Copy, Check, ArrowDownLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface WalletViewProps {
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

interface ActivityItem {
  id: string;
  type: 'payment' | 'deposit' | 'verification';
  title: string;
  subtitle: string;
  amount?: string;
  amountType?: 'debit' | 'credit';
  badge?: string;
}

const recentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'payment',
    title: 'Invoice #4021 Paid',
    subtitle: 'AUTONOMOUS AP AGENT • ...',
    amount: '-$1,200.00',
    amountType: 'debit',
  },
  {
    id: '2',
    type: 'deposit',
    title: 'Deposit Confirmed',
    subtitle: 'EXTERNAL WALLET • 1...',
    amount: '+$5,000.00',
    amountType: 'credit',
  },
  {
    id: '3',
    type: 'verification',
    title: 'Agent Verification',
    subtitle: 'TREASURY CHECK • 3 HOURS...',
    badge: 'VERIFIED',
  },
];

function ActivityIcon({ type }: { type: ActivityItem['type'] }) {
  const iconStyles = {
    payment: 'bg-primary/20 text-primary',
    deposit: 'bg-muted text-muted-foreground',
    verification: 'bg-muted text-primary',
  };

  return (
    <div className={cn(
      'w-12 h-12 rounded-full flex items-center justify-center',
      iconStyles[type]
    )}>
      {type === 'payment' && <Check className="w-5 h-5" />}
      {type === 'deposit' && <ArrowDownLeft className="w-5 h-5" />}
      {type === 'verification' && <ShieldCheck className="w-5 h-5" />}
    </div>
  );
}

export function WalletView({ onSettingsClick, onProfileClick }: WalletViewProps) {
  const [copied, setCopied] = useState(false);
  const walletAddress = '0x71C74B43445910C91C6EBE921';

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-xl"
          onClick={onSettingsClick}
        >
          <Settings className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-display font-semibold text-foreground">Treasury Wallet</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-xl"
          onClick={onProfileClick}
        >
          <User className="w-5 h-5" />
        </Button>
      </div>

      {/* Agent Status */}
      <div className="flex items-center justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          AP Agent Active
        </span>
      </div>

      {/* Balance Card */}
      <div className="bg-card rounded-3xl p-6 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-muted rounded-lg text-xs font-semibold text-muted-foreground uppercase">
            Testnet
          </span>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </Button>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Wallet Balance</p>
          <p className="text-4xl font-display font-bold text-foreground">$42,050.00</p>
        </div>

        <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Explorer
        </Button>
      </div>

      {/* Wallet Address */}
      <div className="bg-card rounded-2xl p-4 flex items-center gap-3 shadow-card">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
            <circle cx="8" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <circle cx="16" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M11 12h2" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <p className="flex-1 font-mono text-sm text-foreground truncate">
          {walletAddress}
        </p>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-xl"
          onClick={handleCopy}
        >
          {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-display font-semibold text-foreground">Recent Activity</h3>
          <Button variant="link" className="text-primary h-auto p-0">
            See all
          </Button>
        </div>

        <div className="space-y-3">
          {recentActivity.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl p-4 flex items-center gap-4 shadow-card"
            >
              <ActivityIcon type={item.type} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide truncate">
                  {item.subtitle}
                </p>
              </div>
              <div className="text-right">
                {item.amount && (
                  <p className={cn(
                    'font-semibold',
                    item.amountType === 'debit' ? 'text-destructive' : 'text-primary'
                  )}>
                    {item.amount}
                  </p>
                )}
                {item.badge && (
                  <span className="px-2 py-1 bg-muted rounded text-xs font-semibold text-muted-foreground">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

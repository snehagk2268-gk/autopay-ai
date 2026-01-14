import { CheckCircle2, Copy, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import type { Transaction } from '@/types/invoice';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SuccessViewProps {
  transaction: Transaction;
  onBackToDashboard: () => void;
}

export function SuccessView({ transaction, onBackToDashboard }: SuccessViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(transaction.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncatedHash = `${transaction.hash.slice(0, 20)}...`;

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col">
      <div className="flex-1">
        {/* Success Card */}
        <div className="bg-card rounded-2xl p-8 text-center animate-scale-in">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse-ring">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>

          <h1 className="font-display text-2xl font-semibold mb-2">
            Payment Executed<br />Successfully
          </h1>
          <p className="text-muted-foreground text-sm">
            Processed by your autonomous finance agent
          </p>

          {/* Amount */}
          <div className="mt-8 mb-6">
            <p className="font-display text-4xl font-bold text-primary">
              {transaction.amount} {transaction.currency}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Sent to {transaction.recipient}
            </p>
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            {/* Status */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Status</span>
              <span className="flex items-center gap-1.5 text-success font-medium text-sm">
                Confirmed
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            {/* Transaction Hash */}
            <div className="space-y-2">
              <span className="text-muted-foreground text-sm block text-left">Transaction Hash</span>
              <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3">
                <code className="text-xs flex-1 text-left truncate font-mono">
                  {truncatedHash}
                </code>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 shrink-0"
                  onClick={handleCopy}
                >
                  <Copy className={cn("w-4 h-4", copied && "text-success")} />
                </Button>
              </div>
            </div>

            {/* Network Fee */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Network Fee</span>
              <span className="font-medium text-sm">{transaction.networkFee} {transaction.currency}</span>
            </div>

            {/* View on Explorer */}
            <button className="flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors py-2 w-full">
              View on Explorer
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-auto pt-6 pb-4">
        <Button 
          variant="success" 
          className="w-full h-14 text-base"
          onClick={onBackToDashboard}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

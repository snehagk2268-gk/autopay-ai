import { Shield, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import type { Invoice, AgentDecision, DecisionType } from '@/types/invoice';
import { cn } from '@/lib/utils';

interface DecisionViewProps {
  invoice: Invoice;
  decision: AgentDecision;
  onApprove: () => void;
  onReview: () => void;
}

const decisionStyles: Record<DecisionType, { bg: string; text: string; label: string }> = {
  approve: { 
    bg: 'bg-primary/20', 
    text: 'text-primary', 
    label: 'APPROVE' 
  },
  negotiate: { 
    bg: 'bg-warning/20', 
    text: 'text-warning', 
    label: 'NEGOTIATE' 
  },
  reject: { 
    bg: 'bg-destructive/20', 
    text: 'text-destructive', 
    label: 'REJECT' 
  },
};

export function DecisionView({ invoice, decision, onApprove, onReview }: DecisionViewProps) {
  const style = decisionStyles[decision.type];

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col">
      <div className="flex-1 space-y-6">
        {/* Decision Card */}
        <div className="bg-card rounded-2xl p-6 animate-scale-in">
          {/* Decision Badge */}
          <div className={cn("inline-block px-6 py-4 rounded-xl mb-6", style.bg)}>
            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-widest">
              AI Recommendation
            </p>
            <h2 className={cn("font-display text-3xl font-bold", style.text)}>
              {style.label}
            </h2>
          </div>

          {/* Invoice Details */}
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-border">
              <h3 className="font-display text-xl font-semibold">{invoice.vendor}</h3>
              <p className="font-display text-3xl font-bold mt-1">
                ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-medium">{invoice.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{invoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{invoice.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Reasoning */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm uppercase tracking-wide">Agent Reasoning</h3>
          </div>
          <div className="bg-card rounded-2xl p-5">
            <p className="text-sm leading-relaxed italic text-muted-foreground">
              "{decision.reasoning}"
            </p>
          </div>
        </div>

        {/* Decorative Image Area */}
        <div 
          className="h-32 rounded-2xl overflow-hidden animate-fade-in"
          style={{ animationDelay: '300ms' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-primary/20 to-accent/20" />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto pt-6 pb-4 space-y-3">
        <Button 
          variant="success" 
          className="w-full h-14 text-base gap-2"
          onClick={onApprove}
        >
          <CheckCircle2 className="w-5 h-5" />
          Approve & Execute Payment
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-14 text-base"
          onClick={onReview}
        >
          Review Details
        </Button>
      </div>
    </div>
  );
}

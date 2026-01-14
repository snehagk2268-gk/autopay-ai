import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import type { AnalysisStep } from '@/types/invoice';
import { cn } from '@/lib/utils';

interface AnalyzingViewProps {
  steps: AnalysisStep[];
  onIntervene: () => void;
}

export function AnalyzingView({ steps, onIntervene }: AnalyzingViewProps) {
  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col">
      <div className="flex-1 flex flex-col items-center pt-8">
        {/* Analyzing Animation */}
        <div className="relative w-48 h-48 mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          {/* Animated ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin-slow" />
          {/* Inner circle */}
          <div className="absolute inset-4 rounded-full bg-card flex flex-col items-center justify-center shadow-soft">
            <div className="w-10 h-10 mb-2">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Analyzing</span>
          </div>
        </div>

        <h1 className="font-display text-2xl font-semibold text-center mb-2">
          Autonomous Assessment
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Cross-referencing global market indicators
        </p>

        {/* Steps */}
        <div className="w-full bg-card rounded-2xl p-5 space-y-4">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="flex items-start gap-3 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center mt-0.5 shrink-0",
                step.status === 'success' && "bg-success/10",
                step.status === 'in_progress' && "bg-primary/10",
                step.status === 'pending' && "bg-muted"
              )}>
                {step.status === 'success' && (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                )}
                {step.status === 'in_progress' && (
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                )}
                {step.status === 'pending' && (
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">{step.title}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 pb-4">
        <Button 
          variant="outline" 
          className="w-full h-14" 
          onClick={onIntervene}
        >
          INTERVENE ANALYSIS
        </Button>
      </div>
    </div>
  );
}

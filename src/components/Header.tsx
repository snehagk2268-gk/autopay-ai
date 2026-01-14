import { Menu, User } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({ title = 'AutoOps', showBack, onBack }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-4 max-w-md mx-auto">
        {showBack ? (
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="rounded-full">
            <Menu className="w-5 h-5" />
          </Button>
        )}
        
        <h1 className="font-display font-semibold text-lg tracking-tight">{title}</h1>
        
        <Button variant="ghost" size="icon" className="rounded-full bg-foreground text-background">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}

import { UploadZone } from './UploadZone';
import { SystemStatus } from './SystemStatus';
import { Button } from './ui/button';
import { BarChart3 } from 'lucide-react';

interface DashboardViewProps {
  onFileSelect: (file: File) => void;
  onAnalyze: () => void;
  hasFile: boolean;
  fileName?: string;
}

export function DashboardView({ onFileSelect, onAnalyze, hasFile, fileName }: DashboardViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Card */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <div className="text-center mb-6">
          <h1 className="font-display text-2xl font-semibold mb-2">
            Autonomous Finance<br />Agent
          </h1>
          <p className="text-muted-foreground text-sm">
            Simplify your accounts payable workflow
          </p>
        </div>

        <UploadZone onFileSelect={onFileSelect} />

        {hasFile && fileName && (
          <div className="mt-4 p-3 bg-muted rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{fileName}</p>
              <p className="text-xs text-muted-foreground">Ready to analyze</p>
            </div>
          </div>
        )}

        <Button 
          variant="hero" 
          className="w-full mt-6 h-14 gap-2"
          onClick={onAnalyze}
          disabled={!hasFile}
        >
          <BarChart3 className="w-5 h-5" />
          ANALYZE WITH AUTOOPS
        </Button>
      </div>

      {/* System Status */}
      <SystemStatus />
    </div>
  );
}

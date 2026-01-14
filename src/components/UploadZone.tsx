import { Upload } from 'lucide-react';
import { Button } from './ui/button';
import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

export function UploadZone({ onFileSelect }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  return (
    <div
      className={cn(
        "relative rounded-2xl border-2 border-dashed transition-all duration-300 p-8",
        isDragging 
          ? "border-primary bg-primary/5 scale-[1.02]" 
          : "border-muted-foreground/30 hover:border-muted-foreground/50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <Upload className="w-6 h-6 text-muted-foreground" />
        </div>
        
        <div className="text-center">
          <h3 className="font-display font-semibold text-lg">Upload Invoice</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Drag and drop or tap to select a PDF or image
          </p>
        </div>

        <label>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileInput}
          />
          <Button variant="hero" className="cursor-pointer" asChild>
            <span>Select File</span>
          </Button>
        </label>
      </div>
    </div>
  );
}

import { Search, SlidersHorizontal, Hourglass, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type InvoiceStatus = 'approve' | 'negotiate' | 'reject';

interface InvoiceItem {
  id: string;
  vendor: string;
  logo: string;
  time: string;
  invoiceNumber: string;
  amount: string;
  status: InvoiceStatus;
}

interface ActivityViewProps {
  onInvoiceClick?: (invoice: InvoiceItem) => void;
}

const mockInvoices: { date: string; dateLabel: string; items: InvoiceItem[] }[] = [
  {
    date: 'TODAY',
    dateLabel: 'OCT 24',
    items: [
      {
        id: '1',
        vendor: 'CloudStack',
        logo: 'CS',
        time: '10:30 AM',
        invoiceNumber: '#INV-9021',
        amount: '$1,200.00',
        status: 'approve',
      },
      {
        id: '2',
        vendor: 'Vertex Agency',
        logo: 'VA',
        time: '09:15 AM',
        invoiceNumber: '#INV-8842',
        amount: '$4,500.00',
        status: 'negotiate',
      },
    ],
  },
  {
    date: 'YESTERDAY',
    dateLabel: 'OCT 23',
    items: [
      {
        id: '3',
        vendor: 'Swift Logistics',
        logo: 'SL',
        time: '04:45 PM',
        invoiceNumber: '#INV-7731',
        amount: '$850.25',
        status: 'reject',
      },
      {
        id: '4',
        vendor: 'Global Soft',
        logo: 'GS',
        time: '01:20 PM',
        invoiceNumber: '#INV-7710',
        amount: '$12,400.00',
        status: 'approve',
      },
    ],
  },
];

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const styles = {
    approve: 'bg-primary text-primary-foreground',
    negotiate: 'bg-warning text-warning-foreground',
    reject: 'bg-destructive text-destructive-foreground',
  };

  const labels = {
    approve: 'APPROVE',
    negotiate: 'NEGOTIATE',
    reject: 'REJECT',
  };

  return (
    <span className={cn(
      'px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider',
      styles[status]
    )}>
      {labels[status]}
    </span>
  );
}

function VendorLogo({ vendor }: { vendor: string }) {
  const gradients: Record<string, string> = {
    CloudStack: 'from-[hsl(45,30%,75%)] to-[hsl(150,25%,55%)]',
    'Vertex Agency': 'from-[hsl(50,35%,80%)] to-[hsl(100,20%,60%)]',
    'Swift Logistics': 'from-[hsl(55,30%,75%)] to-[hsl(90,25%,55%)]',
    'Global Soft': 'from-[hsl(45,25%,70%)] to-[hsl(130,20%,50%)]',
  };

  return (
    <div className={cn(
      'w-14 h-14 rounded-full bg-gradient-to-br',
      gradients[vendor] || 'from-muted to-muted-foreground/30'
    )} />
  );
}

export function ActivityView({ onInvoiceClick }: ActivityViewProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-display font-semibold text-foreground">Activity</h1>
        <div className="w-10 h-10 rounded-full bg-accent-warm flex items-center justify-center">
          <span className="text-accent-warm-foreground text-sm">👤</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search invoices..." 
            className="pl-12 bg-card border-0 rounded-xl h-12 shadow-card"
          />
        </div>
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-0 bg-card shadow-card">
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Invoice List */}
      <div className="space-y-4">
        {mockInvoices.map((section) => (
          <div key={section.date} className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {section.date} – {section.dateLabel}
            </p>
            <div className="space-y-3">
              {section.items.map((invoice) => (
                <button
                  key={invoice.id}
                  onClick={() => onInvoiceClick?.(invoice)}
                  className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 shadow-card hover:shadow-soft transition-shadow"
                >
                  <VendorLogo vendor={invoice.vendor} />
                  <div className="flex-1 text-left">
                    <p className="font-display font-semibold text-foreground">{invoice.vendor}</p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.time} • {invoice.invoiceNumber}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-display font-semibold text-foreground">{invoice.amount}</p>
                    <StatusBadge status={invoice.status} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Syncing Records */}
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <Hourglass className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-xs font-semibold uppercase tracking-wider">Syncing Records</p>
      </div>
    </div>
  );
}

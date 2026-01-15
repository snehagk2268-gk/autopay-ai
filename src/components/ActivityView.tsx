import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const mockInvoices: { date: string; items: InvoiceItem[] }[] = [
  {
    date: 'TODAY',
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
  {
    date: 'EARLIER THIS MONTH',
    items: [
      {
        id: '5',
        vendor: 'Creative Flow',
        logo: 'CF',
        time: 'Oct 20',
        invoiceNumber: '#INV-6650',
        amount: '$2,150.00',
        status: 'negotiate',
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

function VendorLogo({ text, vendor }: { text: string; vendor: string }) {
  const colors: Record<string, string> = {
    CloudStack: 'bg-[hsl(200,20%,25%)]',
    'Vertex Agency': 'bg-[hsl(150,20%,30%)]',
    'Swift Logistics': 'bg-[hsl(30,15%,35%)]',
    'Global Soft': 'bg-[hsl(200,25%,35%)]',
    'Creative Flow': 'bg-[hsl(150,15%,40%)]',
  };

  return (
    <div className={cn(
      'w-12 h-12 rounded-full flex items-center justify-center text-xs font-semibold text-primary-foreground',
      colors[vendor] || 'bg-muted-foreground'
    )}>
      <span className="text-[10px] opacity-80">{text}</span>
    </div>
  );
}

export function ActivityView({ onInvoiceClick }: ActivityViewProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Search className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-display font-semibold text-foreground">Invoice Activity</h1>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Invoice List */}
      <div className="space-y-6">
        {mockInvoices.map((section) => (
          <div key={section.date} className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {section.date}
            </p>
            <div className="space-y-3">
              {section.items.map((invoice) => (
                <button
                  key={invoice.id}
                  onClick={() => onInvoiceClick?.(invoice)}
                  className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 shadow-card hover:shadow-soft transition-shadow"
                >
                  <VendorLogo text={invoice.logo} vendor={invoice.vendor} />
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
    </div>
  );
}

import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { LoginView } from '@/components/LoginView';
import { MetricsDashboard } from '@/components/MetricsDashboard';
import { DashboardView } from '@/components/DashboardView';
import { AnalyzingView } from '@/components/AnalyzingView';
import { DecisionView } from '@/components/DecisionView';
import { SuccessView } from '@/components/SuccessView';
import { ActivityView } from '@/components/ActivityView';
import { WalletView } from '@/components/WalletView';
import type { AppView, Invoice, AgentDecision, Transaction, AnalysisStep } from '@/types/invoice';

const mockInvoice: Invoice = {
  id: 'INV-2024-001',
  vendor: 'Amazon Web Services',
  amount: 1240.00,
  currency: 'USD',
  transactionId: '#TXN-99281',
  date: 'Oct 24, 2023',
  category: 'Cloud Infrastructure',
};

const mockDecision: AgentDecision = {
  type: 'approve',
  reasoning: 'Invoice matches all contract terms. Budget availability has been confirmed for Q3 Cloud Services through the ERP bridge. No anomalies detected in current billing cycle compared to historical averages.',
  confidence: 0.95,
};

const mockTransaction: Transaction = {
  hash: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  amount: 120,
  currency: 'USDC',
  recipient: 'Liquidity Pool Alpha',
  networkFee: 0.45,
  status: 'confirmed',
};

const initialSteps: AnalysisStep[] = [
  { id: '1', title: 'Fetched real-time treasury yields', status: 'pending', detail: 'WAITING' },
  { id: '2', title: 'Validated portfolio compliance', status: 'pending', detail: 'WAITING' },
  { id: '3', title: 'Scanning risk parameters', status: 'pending', detail: 'WAITING' },
];

type MainTab = 'home' | 'activity' | 'vault' | 'settings';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [view, setView] = useState<AppView>('dashboard');
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [steps, setSteps] = useState<AnalysisStep[]>(initialSteps);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
  }, []);

  const handleAnalyze = useCallback(() => {
    if (!selectedFile) return;
    setView('analyzing');
    setSteps(initialSteps);
    
    const delays = [800, 1600, 2400];
    const details = ['SUCCESS • 12MS', 'VERIFIED • 0 DISCREPANCIES', 'IN PROGRESS • TIER 1'];
    
    delays.forEach((delay, index) => {
      setTimeout(() => {
        setSteps(prev => prev.map((step, i) => {
          if (i < index) return { ...step, status: 'success' as const, detail: details[i] };
          if (i === index) return { ...step, status: 'in_progress' as const, detail: details[i] };
          return step;
        }));
      }, delay);
    });

    setTimeout(() => {
      setSteps(prev => prev.map((step, i) => ({
        ...step,
        status: 'success' as const,
        detail: details[i],
      })));
      setTimeout(() => setView('decision'), 500);
    }, 3200);
  }, [selectedFile]);

  const handleApprove = useCallback(() => {
    setView('success');
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setView('dashboard');
    setShowUpload(false);
    setSelectedFile(null);
    setSteps(initialSteps);
  }, []);

  const handleBack = useCallback(() => {
    if (view === 'decision') {
      setView('dashboard');
      setShowUpload(false);
    } else if (view === 'success') {
      setView('decision');
    } else if (view === 'analyzing') {
      setView('dashboard');
      setShowUpload(false);
    }
  }, [view]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab as MainTab);
    setView('dashboard');
    setShowUpload(false);
    setSelectedFile(null);
  }, []);

  // Show login if not logged in
  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  const getHeaderTitle = () => {
    if (activeTab === 'activity') return 'Invoice Activity';
    if (activeTab === 'vault') return 'Treasury Wallet';
    if (activeTab === 'settings') return 'Settings';
    if (view === 'decision') return 'Agent Decision';
    if (view === 'success') return 'Transaction Details';
    return 'AutoOps';
  };

  const showBack = view !== 'dashboard' || showUpload;

  return (
    <div className="min-h-screen bg-background pb-24">
      {activeTab === 'home' && !showUpload && view === 'dashboard' ? null : (
        <Header 
          title={getHeaderTitle()} 
          showBack={showBack} 
          onBack={showUpload ? () => setShowUpload(false) : handleBack} 
        />
      )}
      
      <main className="px-4 py-6 max-w-md mx-auto">
        {activeTab === 'home' && (
          <>
            {view === 'dashboard' && !showUpload && (
              <MetricsDashboard onUploadClick={() => setShowUpload(true)} />
            )}
            
            {view === 'dashboard' && showUpload && (
              <DashboardView
                onFileSelect={handleFileSelect}
                onAnalyze={handleAnalyze}
                hasFile={!!selectedFile}
                fileName={selectedFile?.name}
              />
            )}
            
            {view === 'analyzing' && (
              <AnalyzingView 
                steps={steps} 
                onIntervene={() => {
                  setView('dashboard');
                  setShowUpload(false);
                }} 
              />
            )}
            
            {view === 'decision' && (
              <DecisionView
                invoice={mockInvoice}
                decision={mockDecision}
                onApprove={handleApprove}
                onReview={() => {}}
              />
            )}
            
            {view === 'success' && (
              <SuccessView
                transaction={mockTransaction}
                onBackToDashboard={handleBackToDashboard}
              />
            )}
          </>
        )}

        {activeTab === 'activity' && (
          <ActivityView />
        )}

        {activeTab === 'vault' && (
          <WalletView />
        )}

        {activeTab === 'settings' && (
          <div className="text-center py-12">
            <h2 className="text-xl font-display font-semibold text-foreground mb-2">Settings</h2>
            <p className="text-muted-foreground">Coming soon</p>
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;

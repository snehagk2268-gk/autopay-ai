export type DecisionType = 'approve' | 'negotiate' | 'reject';

export interface Invoice {
  id: string;
  vendor: string;
  amount: number;
  currency: string;
  transactionId: string;
  date: string;
  category: string;
  fileName?: string;
}

export interface AgentDecision {
  type: DecisionType;
  reasoning: string;
  confidence: number;
}

export interface Transaction {
  hash: string;
  amount: number;
  currency: string;
  recipient: string;
  networkFee: number;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface AnalysisStep {
  id: string;
  title: string;
  status: 'pending' | 'success' | 'in_progress' | 'error';
  detail: string;
}

export type AppView = 'dashboard' | 'analyzing' | 'decision' | 'success';

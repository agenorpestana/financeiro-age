export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string; // Used for "Observações"
  categoryId: string;
  date: string; // ISO String
  type: TransactionType;
}

export interface UserSettings {
  hasConsented: boolean;
  theme: 'light' | 'dark';
  currency: string;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Transaction, Category, UserSettings, DashboardSummary } from '../types';
import { Repository } from '../services/repository';
import { auth } from '../services/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

interface FinanceContextType {
  transactions: Transaction[];
  categories: Category[];
  settings: UserSettings;
  summary: DashboardSummary;
  user: User | null;
  addTransaction: (t: Omit<Transaction, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateSettings: (s: UserSettings) => Promise<void>;
  deleteAllData: () => Promise<void>;
  syncData: () => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<UserSettings>({ hasConsented: false, theme: 'light', currency: 'BRL' });
  const [summary, setSummary] = useState<DashboardSummary>({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [user, setUser] = useState<User | null>(null);

  // Monitorar Auth do Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        Repository.syncFromCloud().then(() => loadData());
      }
    });
    return () => unsubscribe();
  }, []);

  // Carregar dados iniciais
  const loadData = async () => {
    const [txs, cats, sets] = await Promise.all([
      Repository.getAllTransactions(),
      Repository.getCategories(),
      Repository.getSettings()
    ]);
    
    setTransactions(txs);
    setCategories(cats);
    setSettings(sets);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Calcular Resumo
  useEffect(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
    
    setSummary({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    });
  }, [transactions]);

  const addTransaction = useCallback(async (t: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...t,
      id: crypto.randomUUID()
    };
    // Otimista: Atualiza UI antes do BD
    setTransactions(prev => [newTransaction, ...prev]);
    await Repository.addTransaction(newTransaction);
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    await Repository.deleteTransaction(id);
  }, []);

  const updateSettings = useCallback(async (newSettings: UserSettings) => {
    setSettings(newSettings);
    await Repository.saveSettings(newSettings);
  }, []);

  const deleteAllData = useCallback(async () => {
    await Repository.clearLocalData();
    setTransactions([]);
    setSettings({ hasConsented: false, theme: 'light', currency: 'BRL' });
  }, []);

  const syncData = useCallback(async () => {
     await Repository.syncFromCloud();
     await loadData();
  }, []);

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      categories, 
      settings, 
      summary, 
      user,
      addTransaction, 
      deleteTransaction,
      updateSettings,
      deleteAllData,
      syncData
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used within FinanceProvider");
  return context;
};
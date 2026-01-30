import { Transaction, Category, UserSettings } from '../types';
import { DEFAULT_CATEGORIES } from '../constants';

const KEYS = {
  TRANSACTIONS: 'mfs_transactions',
  CATEGORIES: 'mfs_categories',
  SETTINGS: 'mfs_settings',
};

export const StorageService = {
  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem(KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  },

  saveTransactions: (transactions: Transaction[]) => {
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },

  getCategories: (): Category[] => {
    const data = localStorage.getItem(KEYS.CATEGORIES);
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
  },

  saveCategories: (categories: Category[]) => {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
  },

  getSettings: (): UserSettings => {
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : { hasConsented: false, theme: 'light', currency: 'BRL' };
  },

  saveSettings: (settings: UserSettings) => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },

  clearAllData: () => {
    localStorage.removeItem(KEYS.TRANSACTIONS);
    localStorage.removeItem(KEYS.CATEGORIES);
    localStorage.removeItem(KEYS.SETTINGS);
  }
};

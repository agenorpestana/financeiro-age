import { Category } from './types';
import { Home, Coffee, Bus, HeartPulse, ShoppingBag, DollarSign, AlertCircle } from 'lucide-react';
import React from 'react';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Moradia', icon: 'home', color: '#6750A4' },
  { id: '2', name: 'Alimentação', icon: 'coffee', color: '#B58392' },
  { id: '3', name: 'Transporte', icon: 'bus', color: '#625B71' },
  { id: '4', name: 'Saúde', icon: 'heart', color: '#B3261E' },
  { id: '5', name: 'Lazer', icon: 'shopping', color: '#E8DEF8' },
  { id: '6', name: 'Outros', icon: 'alert', color: '#7D5260' },
  { id: '7', name: 'Salário', icon: 'dollar', color: '#2E7D32' },
];

export const getIconComponent = (iconName: string, size = 20, color = 'currentColor') => {
  const props = { size, color };
  switch (iconName) {
    case 'home': return <Home {...props} />;
    case 'coffee': return <Coffee {...props} />;
    case 'bus': return <Bus {...props} />;
    case 'heart': return <HeartPulse {...props} />;
    case 'shopping': return <ShoppingBag {...props} />;
    case 'dollar': return <DollarSign {...props} />;
    default: return <AlertCircle {...props} />;
  }
};

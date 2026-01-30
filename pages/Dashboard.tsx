import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { getIconComponent } from '../constants';

const Dashboard: React.FC = () => {
  const { summary, transactions, categories } = useFinance();

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="p-4 space-y-6 pt-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Olá, Usuário</h1>
          <p className="text-gray-500 text-sm">Seu resumo financeiro</p>
        </div>
        <div className="bg-surfaceVariant p-2 rounded-full">
          <Wallet className="text-primary" size={24} />
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-primary text-white rounded-3xl p-6 shadow-xl shadow-primary/30">
        <p className="text-primary-100 text-sm font-medium opacity-90">Saldo Atual</p>
        <h2 className="text-4xl font-bold mt-1 mb-6">{formatCurrency(summary.balance)}</h2>
        
        <div className="flex gap-4">
          <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-green-300 mb-1">
              <ArrowUpCircle size={16} />
              <span className="text-xs font-bold uppercase">Receitas</span>
            </div>
            <p className="font-semibold">{formatCurrency(summary.totalIncome)}</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-red-300 mb-1">
              <ArrowDownCircle size={16} />
              <span className="text-xs font-bold uppercase">Despesas</span>
            </div>
            <p className="font-semibold">{formatCurrency(summary.totalExpense)}</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="font-bold text-gray-800 mb-4 text-lg">Últimos Lançamentos</h3>
        {transactions.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-400">Nenhum lançamento ainda.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 5).map(t => {
              const cat = categories.find(c => c.id === t.categoryId);
              return (
                <div key={t.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full" style={{ backgroundColor: cat?.color + '20', color: cat?.color }}>
                      {getIconComponent(cat?.icon || 'alert')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{cat?.name || 'Geral'}</p>
                      <p className="text-xs text-gray-400">{new Date(t.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${t.type === 'income' ? 'text-income' : 'text-expense'}`}>
                    {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
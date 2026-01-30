import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Sparkles, Loader2 } from 'lucide-react';
import { getFinancialAdvice } from '../services/geminiService';
import ReactMarkdown from 'react-markdown'; // Assuming we can use basic text rendering if lib not avail, but let's use simple replacement

const Reports: React.FC = () => {
  const { transactions, categories } = useFinance();
  const [activeTab, setActiveTab] = useState<'categories' | 'monthly'>('categories');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Prepare Data for Pie Chart (Expenses by Category)
  const expenseData = categories.map(cat => {
    const value = transactions
      .filter(t => t.type === 'expense' && t.categoryId === cat.id)
      .reduce((acc, t) => acc + t.amount, 0);
    return { name: cat.name, value, color: cat.color };
  }).filter(d => d.value > 0);

  // Prepare Data for Bar Chart (Last 6 months) - simplified for demo
  const monthlyData = [
    { name: 'Jan', receita: 4000, despesa: 2400 },
    { name: 'Fev', receita: 3000, despesa: 1398 },
    { name: 'Mar', receita: 2000, despesa: 9800 },
    { name: 'Abr', receita: 2780, despesa: 3908 },
    { name: 'Mai', receita: 1890, despesa: 4800 },
    { name: 'Jun', receita: 2390, despesa: 3800 },
  ];

  const handleAiAnalysis = async () => {
    setIsLoadingAi(true);
    const advice = await getFinancialAdvice(transactions, categories);
    setAiAdvice(advice);
    setIsLoadingAi(false);
  };

  return (
    <div className="p-4 pt-8 pb-24 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>

      {/* Tabs */}
      <div className="flex bg-gray-200 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'categories' ? 'bg-white shadow text-primary' : 'text-gray-500'}`}
        >
          Categorias
        </button>
        <button
          onClick={() => setActiveTab('monthly')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'monthly' ? 'bg-white shadow text-primary' : 'text-gray-500'}`}
        >
          Mensal
        </button>
      </div>

      {/* Charts */}
      <div className="bg-white p-4 rounded-3xl shadow-sm h-80 flex flex-col items-center justify-center">
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-center">Adicione transações para ver gráficos.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'categories' ? (
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
              </PieChart>
            ) : (
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="receita" fill="#2E7D32" radius={[4, 4, 0, 0]} />
                <Bar dataKey="despesa" fill="#B3261E" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

      {/* AI Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-primary" size={24} />
          <h2 className="font-bold text-indigo-900">Análise Inteligente (Beta)</h2>
        </div>
        
        {!aiAdvice ? (
          <div className="text-center">
            <p className="text-sm text-indigo-700 mb-4">
              Receba dicas personalizadas baseadas nos seus gastos deste mês.
            </p>
            <button
              onClick={handleAiAnalysis}
              disabled={isLoadingAi || transactions.length === 0}
              className="bg-primary text-white px-6 py-2 rounded-full font-medium text-sm flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              {isLoadingAi ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
              Gerar Análise
            </button>
          </div>
        ) : (
          <div className="prose prose-sm text-indigo-800 bg-white/50 p-4 rounded-xl">
             <div className="whitespace-pre-wrap">{aiAdvice}</div>
             <button 
                onClick={() => setAiAdvice(null)}
                className="text-xs text-indigo-400 mt-4 underline"
             >
                Limpar
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
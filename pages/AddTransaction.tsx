import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { TransactionType } from '../types';
import { getIconComponent } from '../constants';

const AddTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { addTransaction, categories } = useFinance();
  
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !categoryId) return;

    addTransaction({
      amount: parseFloat(amount),
      description,
      categoryId,
      date: new Date(date).toISOString(),
      type
    });

    navigate('/');
  };

  return (
    <div className="p-4 pt-6 min-h-screen bg-gray-50">
      <h1 className="text-xl font-bold text-center mb-6">Novo Lançamento</h1>

      {/* Type Toggle */}
      <div className="flex bg-gray-200 p-1 rounded-full mb-6">
        <button
          onClick={() => setType('expense')}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${type === 'expense' ? 'bg-expense text-white shadow-md' : 'text-gray-600'}`}
        >
          Despesa
        </button>
        <button
          onClick={() => setType('income')}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${type === 'income' ? 'bg-income text-white shadow-md' : 'text-gray-600'}`}
        >
          Receita
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <label className="text-xs font-bold text-gray-400 uppercase">Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0,00"
            className={`w-full text-4xl font-bold outline-none mt-2 ${type === 'expense' ? 'text-expense' : 'text-income'}`}
            required
            autoFocus
          />
        </div>

        {/* Date */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <label className="text-xs font-bold text-gray-400 uppercase">Data</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full text-lg mt-1 outline-none text-gray-800"
            required
          />
        </div>

        {/* Category Grid */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Categoria</label>
          <div className="grid grid-cols-4 gap-3">
            {categories.map(cat => (
              <div 
                key={cat.id}
                onClick={() => setCategoryId(cat.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all border-2 cursor-pointer
                  ${categoryId === cat.id ? 'border-primary bg-primary/5' : 'border-transparent bg-white shadow-sm'}`}
              >
                <div style={{ color: cat.color }}>{getIconComponent(cat.icon)}</div>
                <span className="text-[10px] font-medium text-gray-600 truncate w-full text-center">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <label className="text-xs font-bold text-gray-400 uppercase">Observação (Opcional)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Jantar fora"
            className="w-full text-lg mt-1 outline-none text-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
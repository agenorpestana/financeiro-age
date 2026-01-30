import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { ShieldCheck } from 'lucide-react';

const ConsentModal: React.FC = () => {
  const { settings, updateSettings } = useFinance();

  if (settings.hasConsented) return null;

  const handleAccept = () => {
    updateSettings({ ...settings, hasConsented: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl p-6 shadow-xl max-w-sm w-full animate-fade-in">
        <div className="flex items-center gap-3 mb-4 text-primary">
          <ShieldCheck size={32} />
          <h2 className="text-xl font-bold text-gray-800">Sua Privacidade</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Para usar o <strong>Meu Financeiro Simples</strong>, precisamos armazenar seus dados localmente no seu dispositivo. 
          Nenhuma informação financeira é enviada para nossos servidores sem sua permissão explícita.
        </p>
        <p className="text-xs text-gray-500 mb-6">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleAccept}
            className="w-full bg-primary text-white py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
          >
            Aceitar e Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentModal;
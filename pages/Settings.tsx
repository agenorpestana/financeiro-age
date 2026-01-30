import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Trash2, Shield, Smartphone, Crown, LogIn, LogOut, Cloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const Settings: React.FC = () => {
  const { deleteAllData, user, syncData } = useFinance();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleDelete = () => {
    deleteAllData();
    setShowDeleteConfirm(false);
    alert('Todos os dados locais foram excluídos.');
    navigate('/');
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert('Login realizado! Seus dados serão sincronizados.');
    } catch (error) {
      alert('Erro ao fazer login: ' + error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    await syncData();
    setIsSyncing(false);
    alert('Sincronização concluída.');
  };

  return (
    <div className="p-4 pt-8 pb-24 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Ajustes</h1>

      {/* Cloud / Auth Section */}
      <div className="bg-surfaceVariant rounded-2xl p-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white p-2 rounded-full">
            <Cloud size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Sincronização Nuvem</h3>
            <p className="text-xs text-gray-500">
              {user ? `Logado como ${user.email}` : 'Faça login para salvar seus dados'}
            </p>
          </div>
        </div>
        
        {user ? (
          <div className="flex gap-2">
            <button 
              onClick={handleSync}
              className="flex-1 bg-white text-primary py-2 rounded-xl text-sm font-bold shadow-sm flex items-center justify-center gap-2"
            >
              {isSyncing ? 'Sincronizando...' : 'Sincronizar Agora'}
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 bg-gray-300 text-gray-700 py-2 rounded-xl text-sm font-bold shadow-sm"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="w-full bg-primary text-white py-3 rounded-xl text-sm font-bold shadow-md flex items-center justify-center gap-2"
          >
            <LogIn size={18} /> Entrar com Google
          </button>
        )}
      </div>

      {/* Pro Banner */}
      <div className="bg-gray-900 text-white p-5 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2"><Crown size={18} className="text-yellow-400" /> Versão PRO</h3>
          <p className="text-xs text-gray-400">Remova anúncios e desbloqueie relatórios</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold" onClick={() => alert('Em breve: Integração com Google Play Billing')}>
          R$ 9,90
        </button>
      </div>

      {/* General Settings */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-gray-400 uppercase ml-2">Geral</h2>
        
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <button 
            onClick={() => navigate('/legal')}
            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 border-b border-gray-100"
          >
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Shield size={20} /></div>
            <div className="text-left flex-1">
              <span className="block font-medium text-gray-700">Privacidade & Termos</span>
              <span className="block text-xs text-gray-400">LGPD e regras de uso</span>
            </div>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-gray-400 uppercase ml-2">Dados Locais</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
           <button 
             onClick={() => setShowDeleteConfirm(true)}
             className="w-full bg-red-50 text-red-600 font-bold py-3 rounded-xl border border-red-100 flex items-center justify-center gap-2"
           >
             <Trash2 size={18} /> Limpar Dispositivo
           </button>
           <p className="text-[10px] text-gray-400 text-center mt-2">
             Remove apenas os dados deste aparelho. Dados na nuvem permanecem seguros.
           </p>
        </div>
      </div>

      {/* Modal Confirm */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Tem certeza?</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Isso apagará permanentemente os dados <strong>deste dispositivo</strong>.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl"
              >
                Cancelar
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-600 text-white font-medium rounded-xl"
              >
                Sim, Limpar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
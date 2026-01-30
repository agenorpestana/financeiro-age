import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Legal: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 pt-6 bg-white min-h-screen pb-24">
      <div className="flex items-center gap-4 mb-6 sticky top-0 bg-white py-2">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Documentos Legais</h1>
      </div>

      <div className="prose prose-sm text-gray-600">
        <h2 className="text-lg font-bold text-gray-900">Política de Privacidade</h2>
        <p className="text-xs text-gray-400 mb-4">Última atualização: 25 de Maio de 2024</p>
        
        <p>
          O aplicativo <strong>Meu Financeiro Simples</strong> preza pela sua privacidade. 
          Esta política descreve como tratamos seus dados em conformidade com a LGPD e as Políticas de Dados do Usuário do Google Play.
        </p>

        <h3 className="font-bold text-gray-800 mt-4">1. Coleta e Uso de Dados</h3>
        <ul className="list-disc pl-5">
          <li><strong>Dados Financeiros:</strong> Receitas, despesas e categorias são armazenadas <strong>localmente</strong> no seu dispositivo usando a tecnologia LocalStorage/SQLite. Não temos acesso a esses dados em nossos servidores.</li>
          <li><strong>Dados Pessoais:</strong> Não coletamos nome, email ou CPF na versão gratuita/offline.</li>
        </ul>

        <h3 className="font-bold text-gray-800 mt-4">2. Compartilhamento</h3>
        <p>Não compartilhamos, vendemos ou transferimos seus dados financeiros para terceiros ou anunciantes.</p>

        <h3 className="font-bold text-gray-800 mt-4">3. Exclusão de Dados</h3>
        <p>Você pode excluir todos os seus dados a qualquer momento acessando: <em>Ajustes {'>'} Excluir Meus Dados</em>.</p>

        <hr className="my-8 border-gray-200"/>

        <h2 className="text-lg font-bold text-gray-900">Termos de Uso</h2>
        
        <h3 className="font-bold text-gray-800 mt-4">1. Objetivo</h3>
        <p>Este aplicativo é uma ferramenta de auxílio para controle pessoal. Ele <strong>não substitui</strong> consultoria financeira profissional, contábil ou jurídica.</p>

        <h3 className="font-bold text-gray-800 mt-4">2. Isenção de Responsabilidade</h3>
        <p>Os desenvolvedores não se responsabilizam por decisões financeiras tomadas com base nas informações exibidas no app. O usuário é o único responsável pela inserção correta dos dados.</p>
      </div>
    </div>
  );
};

export default Legal;
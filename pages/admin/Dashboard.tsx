import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Settings, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Painel Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Menu Manager Card */}
        <Link to="/admin/cardapio" className="group block">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-babyBlue/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
             
             <div className="relative z-10">
                <div className="bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center text-orange-400 mb-6">
                    <Utensils size={28} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciar Cardápio</h2>
                <p className="text-gray-500 mb-6">Adicione, edite ou remova itens do cardápio. Atualize preços e fotos.</p>
                <span className="flex items-center text-orange-400 font-medium group-hover:gap-2 transition-all">
                    Acessar <ArrowRight size={18} className="ml-1" />
                </span>
             </div>
          </div>
        </Link>

        {/* Settings Manager Card */}
        <Link to="/admin/configuracoes" className="group block">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
             
             <div className="relative z-10">
                <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
                    <Settings size={28} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Configurações Gerais</h2>
                <p className="text-gray-500 mb-6">Altere textos da página inicial, contatos, horários e localização.</p>
                <span className="flex items-center text-blue-400 font-medium group-hover:gap-2 transition-all">
                    Acessar <ArrowRight size={18} className="ml-1" />
                </span>
             </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
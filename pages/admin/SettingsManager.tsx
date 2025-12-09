import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Save } from 'lucide-react';

const SettingsManager: React.FC = () => {
  const { settings, updateSettings } = useData();
  const [formData, setFormData] = useState(settings);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSuccessMsg('Configurações salvas com sucesso!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Estilos comuns reutilizáveis
  const inputClassName = "w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-slate-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-babyBlueDark focus:ring-4 focus:ring-babyBlue/20 outline-none transition-all duration-200";
  const labelClassName = "block text-sm font-bold text-gray-700 mb-2 ml-1";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Configurações Gerais</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section: Home */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-babyBlueDark rounded-full"></span>
            Página Inicial
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className={labelClassName}>Título Principal</label>
              <input
                type="text"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div>
              <label className={labelClassName}>Subtítulo</label>
              <input
                type="text"
                name="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        {/* Section: Contact */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-babyBlueDark rounded-full"></span>
            Contatos & Localização
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClassName}>WhatsApp (apenas números)</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div>
              <label className={labelClassName}>Instagram (@usuario)</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClassName}>Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClassName}>Horário de Funcionamento</label>
              <input
                type="text"
                name="openingHours"
                value={formData.openingHours}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClassName}>Link Google Maps Embed (src)</label>
              <input
                type="text"
                name="mapsUrl"
                value={formData.mapsUrl}
                onChange={handleChange}
                className={`${inputClassName} text-xs font-mono`}
              />
              <p className="text-xs text-gray-400 mt-2 ml-1">Cole apenas a URL que está dentro do atributo src="" do código embed.</p>
            </div>
          </div>
        </div>

        <div className="sticky bottom-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <span className={`text-green-600 font-bold transition-opacity duration-300 ${successMsg ? 'opacity-100' : 'opacity-0'}`}>
                {successMsg}
            </span>
            <button
            type="submit"
            className="bg-babyBlueDark text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-sky-500 hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-1"
            >
            <Save size={20} /> Salvar Alterações
            </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsManager;
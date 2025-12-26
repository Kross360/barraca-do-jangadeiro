
import React, { useState } from 'react';
import { MenuItem, AppSettings, Category } from '../types';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon } from 'lucide-react';

interface AdminPanelProps {
  menuItems: MenuItem[];
  settings: AppSettings;
  onUpdateMenu: (items: MenuItem[]) => void;
  onUpdateSettings: (settings: AppSettings) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  menuItems, settings, onUpdateMenu, onUpdateSettings, onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'settings'>('menu');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  const [settingsForm, setSettingsForm] = useState<AppSettings>(settings);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      onUpdateMenu(menuItems.filter(item => item.id !== id));
    }
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (menuItems.find(i => i.id === editingItem.id)) {
      onUpdateMenu(menuItems.map(i => i.id === editingItem.id ? editingItem : i));
    } else {
      onUpdateMenu([...menuItems, editingItem]);
    }
    setEditingItem(null);
  };

  const handleCreateNew = () => {
    setEditingItem({
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      category: 'comidas',
      available: true,
      image: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-20 px-4 md:px-8 pb-10 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Painel Administrativo</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">Gerencie a Barraca do Jangadeiro</p>
          </div>
          <button onClick={onLogout} className="text-red-500 hover:text-red-600 text-sm font-medium">
            Sair
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('menu')}
            className={`pb-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'menu' 
              ? 'border-b-2 border-jangadeiro-blue text-jangadeiro-blue' 
              : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
            }`}
          >
            Gerenciar Cardápio
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'settings' 
              ? 'border-b-2 border-jangadeiro-blue text-jangadeiro-blue' 
              : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
            }`}
          >
            Configurações Gerais
          </button>
        </div>

        {activeTab === 'menu' ? (
          <div>
            <button 
              onClick={handleCreateNew}
              className="mb-6 flex items-center gap-2 bg-jangadeiro-blue text-white px-4 py-2 rounded-lg hover:bg-jangadeiro-dark transition-colors shadow-sm"
            >
              <Plus size={18} /> Novo Item
            </button>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                    <tr>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Item</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Categoria</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Preço</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {menuItems.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 overflow-hidden border border-gray-200 dark:border-slate-700">
                              {item.image ? (
                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-full h-full p-2 text-gray-300 dark:text-slate-600" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 dark:text-slate-200">{item.name}</div>
                              <div className="text-xs text-gray-500 dark:text-slate-400 truncate max-w-[200px]">{item.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                            item.category === 'bebidas' 
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                              : 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                          }`}>
                            {item.category}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-slate-300">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => setEditingItem(item)} className="p-2 text-gray-400 dark:text-slate-500 hover:text-jangadeiro-blue transition-colors">
                              <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 dark:text-slate-500 hover:text-red-500 transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-slate-100">Editar Informações do Site</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Título Principal</label>
                <input 
                  type="text" 
                  value={settingsForm.heroTitle}
                  onChange={e => setSettingsForm({...settingsForm, heroTitle: e.target.value})}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Subtítulo</label>
                <input 
                  type="text" 
                  value={settingsForm.heroSubtitle}
                  onChange={e => setSettingsForm({...settingsForm, heroSubtitle: e.target.value})}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">WhatsApp (Número puro)</label>
                  <input 
                    type="text" 
                    value={settingsForm.whatsapp}
                    onChange={e => setSettingsForm({...settingsForm, whatsapp: e.target.value})}
                    placeholder="5585999999999"
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">WhatsApp (Exibição)</label>
                  <input 
                    type="text" 
                    value={settingsForm.whatsappDisplay}
                    onChange={e => setSettingsForm({...settingsForm, whatsappDisplay: e.target.value})}
                    placeholder="(85) 99999-9999"
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Instagram (@)</label>
                <input 
                  type="text" 
                  value={settingsForm.instagram}
                  onChange={e => setSettingsForm({...settingsForm, instagram: e.target.value})}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Horário de Funcionamento</label>
                <input 
                  type="text" 
                  value={settingsForm.businessHours}
                  onChange={e => setSettingsForm({...settingsForm, businessHours: e.target.value})}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Endereço Completo</label>
                <input 
                  type="text" 
                  value={settingsForm.address}
                  onChange={e => setSettingsForm({...settingsForm, address: e.target.value})}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all"
                />
              </div>
              <button 
                onClick={() => onUpdateSettings(settingsForm)}
                className="w-full bg-jangadeiro-blue text-white py-3 rounded-lg hover:bg-jangadeiro-dark transition-colors font-bold flex justify-center items-center gap-2 shadow-md"
              >
                <Save size={18} /> Salvar Alterações
              </button>
            </div>
          </div>
        )}

        {/* Modal for Edit/Create Item */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg p-6 animate-fade-in border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">
                  {menuItems.find(i => i.id === editingItem.id) ? 'Editar Item' : 'Novo Item'}
                </h3>
                <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSaveItem} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-slate-300 font-semibold mb-1">Nome</label>
                  <input 
                    required
                    type="text" 
                    value={editingItem.name}
                    onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-slate-300 font-semibold mb-1">Descrição</label>
                  <textarea 
                    rows={2}
                    value={editingItem.description}
                    onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-slate-300 font-semibold mb-1">Preço (R$)</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      value={editingItem.price}
                      onChange={e => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-slate-300 font-semibold mb-1">Categoria</label>
                    <select 
                      value={editingItem.category}
                      onChange={e => setEditingItem({...editingItem, category: e.target.value as Category})}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all"
                    >
                      <option value="bebidas">Bebidas</option>
                      <option value="comidas">Comidas</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-slate-300 font-semibold mb-1">URL da Imagem</label>
                  <input 
                    type="url" 
                    value={editingItem.image || ''}
                    onChange={e => setEditingItem({...editingItem, image: e.target.value})}
                    placeholder="https://..."
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all"
                  />
                </div>
                <button type="submit" className="w-full bg-jangadeiro-blue text-white py-3 rounded-lg font-bold hover:bg-jangadeiro-dark transition-colors shadow-lg mt-2">
                  Salvar Item
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

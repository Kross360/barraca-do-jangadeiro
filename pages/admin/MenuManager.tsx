import React, { useState, useRef } from 'react';
import { useData } from '../../contexts/DataContext';
import { MenuItem, Category } from '../../types';
import { Plus, Edit2, Trash2, Upload, Link as LinkIcon, Image as ImageIcon, X } from 'lucide-react';

const categories: Category[] = ['Bebidas', 'Comidas', 'Petiscos', 'Pratos Regionais'];

const MenuManager: React.FC = () => {
  const { menu, addMenuItem, updateMenuItem, deleteMenuItem } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  // Controle do tipo de input de imagem
  const [imageInputType, setImageInputType] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'Bebidas',
    image: ''
  });

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image || ''
      });
      // Se já tem imagem e parece ser URL, define tab como URL, senão Upload
      if (item.image && item.image.startsWith('http')) {
        setImageInputType('url');
      } else {
        setImageInputType('upload');
      }
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'Bebidas',
        image: ''
      });
      setImageInputType('upload');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || formData.price <= 0) return;

    if (editingItem) {
      updateMenuItem(editingItem.id, formData);
    } else {
      addMenuItem(formData);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      deleteMenuItem(id);
    }
  };

  // Função para processar a imagem do upload (Converter para Base64 + Resize)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        
        img.onload = () => {
          // Criar um canvas para redimensionar a imagem (evitar string base64 gigante)
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800; // Largura máxima razoável para web
          const scaleSize = MAX_WIDTH / img.width;
          
          // Se a imagem for menor que o limite, usa o tamanho original
          const width = (scaleSize < 1) ? MAX_WIDTH : img.width;
          const height = (scaleSize < 1) ? img.height * scaleSize : img.height;

          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Converter para JPEG com qualidade 0.7 para economizar espaço
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setFormData({ ...formData, image: dataUrl });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Estilos comuns para inputs
  const inputClassName = "w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-slate-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-babyBlueDark focus:ring-4 focus:ring-babyBlue/20 outline-none transition-all duration-200";
  const labelClassName = "block text-sm font-bold text-gray-700 mb-2 ml-1";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Cardápio</h1>
        <button 
          onClick={() => openModal()}
          className="bg-babyBlueDark hover:bg-sky-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={20} /> Novo Item
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Item</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menu.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 shadow-sm rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                        {item.image ? (
                          <img className="h-full w-full object-cover" src={item.image} alt="" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                            <ImageIcon size={16} />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-bold text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-800 border border-blue-100">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                    R$ {item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => openModal(item)} 
                      className="text-babyBlueDark hover:text-sky-600 mr-4 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={closeModal}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-gray-200">
              <div className="bg-white px-6 pt-6 pb-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                      {editingItem ? 'Editar Item' : 'Novo Item'}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className={labelClassName}>Nome do Item</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className={inputClassName}
                          placeholder="Ex: Isca de Peixe"
                        />
                      </div>
                      
                      <div>
                        <label className={labelClassName}>Descrição</label>
                        <textarea
                          rows={2}
                          value={formData.description}
                          onChange={e => setFormData({...formData, description: e.target.value})}
                          className={inputClassName}
                          placeholder="Ingredientes e detalhes..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className={labelClassName}>Preço (R$)</label>
                            <input
                              type="number"
                              step="0.01"
                              required
                              min="0"
                              value={formData.price}
                              onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                              className={inputClassName}
                            />
                         </div>
                         <div>
                            <label className={labelClassName}>Categoria</label>
                            <select
                              value={formData.category}
                              onChange={e => setFormData({...formData, category: e.target.value as Category})}
                              className={inputClassName}
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                         </div>
                      </div>

                      {/* Seção de Imagem */}
                      <div>
                        <label className={labelClassName}>Imagem do Item</label>
                        
                        {/* Tabs */}
                        <div className="flex p-1 bg-gray-100 rounded-xl mb-4">
                          <button
                            type="button"
                            onClick={() => setImageInputType('upload')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${imageInputType === 'upload' ? 'bg-white text-babyBlueDark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            <Upload size={16} /> Upload
                          </button>
                          <button
                            type="button"
                            onClick={() => setImageInputType('url')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${imageInputType === 'url' ? 'bg-white text-babyBlueDark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            <LinkIcon size={16} /> URL Link
                          </button>
                        </div>

                        {/* Input Area */}
                        {imageInputType === 'upload' ? (
                          <div 
                            className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <input 
                              type="file" 
                              ref={fileInputRef}
                              className="hidden" 
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                            <div className="bg-babyBlue/20 p-3 rounded-full text-babyBlueDark mb-2">
                              <Upload size={24} />
                            </div>
                            <span className="text-sm font-bold text-gray-600">Clique para selecionar</span>
                            <span className="text-xs text-gray-400 mt-1">JPG, PNG (Max 5MB)</span>
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={formData.image}
                            onChange={e => setFormData({...formData, image: e.target.value})}
                            className={inputClassName}
                            placeholder="https://exemplo.com/foto.jpg"
                          />
                        )}

                        {/* Preview */}
                        {formData.image && (
                          <div className="mt-4 relative group w-full h-40 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                             <img 
                               src={formData.image} 
                               alt="Preview" 
                               className="w-full h-full object-cover"
                             />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => setFormData({...formData, image: ''})}
                                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                >
                                  <Trash2 size={20} />
                                </button>
                             </div>
                             <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                                Preview
                             </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 sm:flex sm:flex-row-reverse gap-3 border-t pt-6">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-md px-6 py-3 bg-babyBlueDark text-base font-bold text-white hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-babyBlue/20 sm:w-auto sm:text-sm transition-all hover:-translate-y-0.5"
                        >
                          Salvar Item
                        </button>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="mt-3 w-full inline-flex justify-center rounded-xl border-2 border-gray-200 shadow-sm px-6 py-3 bg-white text-base font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:mt-0 sm:w-auto sm:text-sm transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManager;
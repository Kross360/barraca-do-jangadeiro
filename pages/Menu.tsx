import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Category } from '../types';

const categories: Category[] = ['Bebidas', 'Comidas', 'Petiscos', 'Pratos Regionais'];

const Menu: React.FC = () => {
  const { menu } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');

  const filteredItems = useMemo(() => {
    return menu.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menu, searchTerm, selectedCategory]);

  return (
    <div className="bg-gray-50 min-h-screen py-10 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-slide-up">Nosso Cardápio</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Explore nossas delícias, preparadas com carinho para tornar seu dia na praia ainda mais saboroso.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-20 z-30 bg-gray-50/95 p-4 rounded-xl shadow-sm backdrop-blur-sm border border-gray-100">
          
          {/* Categories Scrollable (Mobile) */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedCategory('Todos')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === 'Todos'
                    ? 'bg-babyBlue text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Todos
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-babyBlue text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-babyBlue focus:border-transparent transition-shadow sm:text-sm"
            />
          </div>
        </div>

        {/* Grid Items */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                <div className="aspect-w-16 aspect-h-9 w-full h-48 overflow-hidden bg-gray-100 relative">
                  {item.image ? (
                     <img 
                     src={item.image} 
                     alt={item.name} 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     loading="lazy"
                   />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      Sem imagem
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm backdrop-blur-sm">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-babyBlueDark uppercase tracking-wide">{item.category}</span>
                  <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2 leading-tight">{item.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">Nenhum item encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
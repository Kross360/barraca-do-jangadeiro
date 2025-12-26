
import React, { useState, useMemo } from 'react';
import { MenuItem, Category } from '../types';
import { Search } from 'lucide-react';

interface MenuGridProps {
  items: MenuItem[];
}

const MenuGrid: React.FC<MenuGridProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'todos'>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch && item.available;
    });
  }, [items, activeCategory, searchTerm]);

  return (
    <section id="cardapio" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12 animate-slide-up">
        <h2 className="text-3xl font-light text-gray-800 dark:text-slate-100 mb-2 transition-colors">Nosso Cardápio</h2>
        <div className="w-16 h-1 bg-jangadeiro-blue mx-auto rounded-full"></div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">
        <div className="flex gap-2">
          {['todos', 'bebidas', 'comidas'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                activeCategory === cat
                  ? 'bg-jangadeiro-blue text-white shadow-md transform scale-105'
                  : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Buscar prato ou bebida..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-jangadeiro-blue dark:focus:border-jangadeiro-blue focus:ring-4 focus:ring-jangadeiro-blue/20 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium transition-all text-sm placeholder:text-gray-500 dark:placeholder:text-slate-500 shadow-sm focus:bg-white dark:focus:bg-slate-700"
          />
          <Search className="absolute left-3.5 top-3 text-slate-500 dark:text-slate-400" size={18} />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 group animate-fade-in">
            <div className="h-48 overflow-hidden bg-gray-100 dark:bg-slate-800 relative">
              <img 
                src={item.image || `https://picsum.photos/seed/${item.id}/400/300`} 
                alt={item.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-slate-100">{item.name}</h3>
                <span className="text-jangadeiro-blue font-bold">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                </span>
              </div>
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400 dark:text-slate-500">
            Nenhum item encontrado.
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuGrid;

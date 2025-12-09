import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, SiteSettings } from '../types';
import { INITIAL_MENU, INITIAL_SETTINGS } from '../constants';
import { supabase } from '../lib/supabase';

interface DataContextType {
  menu: MenuItem[];
  settings: SiteSettings;
  loading: boolean;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Fetch Data from Supabase
  const fetchData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Menu Items
      const { data: menuData, error: menuError } = await supabase
        .from('menu_items')
        .select('*')
        .order('created_at', { ascending: true });

      if (menuError) throw menuError;

      if (menuData) {
        // Map Supabase columns (snake_case) to App types (camelCase)
        const mappedMenu: MenuItem[] = menuData.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          price: parseFloat(item.price),
          category: item.category,
          image: item.image || undefined
        }));
        setMenu(mappedMenu);
      }

      // 2. Fetch Settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('settings')
        .select('*')
        .single(); // Get the first row

      if (settingsData) {
        setSettings({
          heroTitle: settingsData.hero_title || INITIAL_SETTINGS.heroTitle,
          heroSubtitle: settingsData.hero_subtitle || INITIAL_SETTINGS.heroSubtitle,
          whatsapp: settingsData.whatsapp || INITIAL_SETTINGS.whatsapp,
          instagram: settingsData.instagram || INITIAL_SETTINGS.instagram,
          address: settingsData.address || INITIAL_SETTINGS.address,
          mapsUrl: settingsData.maps_url || INITIAL_SETTINGS.mapsUrl,
          openingHours: settingsData.opening_hours || INITIAL_SETTINGS.openingHours,
        });
      }
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Fallback: se der erro (ex: tabelas não criadas), usa dados iniciais da memória para não quebrar a tela
      if (menu.length === 0) setMenu(INITIAL_MENU);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    // Optimistic Update (Interface reage instantaneamente)
    const tempId = Date.now().toString();
    const newItem = { ...item, id: tempId };
    setMenu(prev => [...prev, newItem]);

    try {
      const { data, error } = await supabase.from('menu_items').insert([{
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image
      }]).select();

      if (error) throw error;

      if (data) {
        // Atualiza o ID temporário para o ID real do banco
        setMenu(prev => prev.map(i => i.id === tempId ? { ...i, id: data[0].id.toString() } : i));
      }
    } catch (err) {
      console.error("Erro ao adicionar item:", err);
      // Revert optimistic update
      setMenu(prev => prev.filter(i => i.id !== tempId));
      alert("Erro ao salvar no banco de dados.");
    }
  };

  const updateMenuItem = async (id: string, updatedItem: Partial<MenuItem>) => {
    setMenu(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));

    try {
      // Map back to snake_case for DB
      const dbItem: any = {};
      if (updatedItem.name) dbItem.name = updatedItem.name;
      if (updatedItem.description) dbItem.description = updatedItem.description;
      if (updatedItem.price) dbItem.price = updatedItem.price;
      if (updatedItem.category) dbItem.category = updatedItem.category;
      if (updatedItem.image !== undefined) dbItem.image = updatedItem.image;

      const { error } = await supabase
        .from('menu_items')
        .update(dbItem)
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
      alert("Erro ao atualizar no banco de dados.");
      fetchData(); // Revert changes by fetching source of truth
    }
  };

  const deleteMenuItem = async (id: string) => {
    setMenu(prev => prev.filter(item => item.id !== id));

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error("Erro ao deletar item:", err);
      alert("Erro ao deletar no banco de dados.");
      fetchData();
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));

    try {
      // Mapeia para snake_case
      const dbSettings = {
        hero_title: newSettings.heroTitle,
        hero_subtitle: newSettings.heroSubtitle,
        whatsapp: newSettings.whatsapp,
        instagram: newSettings.instagram,
        address: newSettings.address,
        maps_url: newSettings.mapsUrl,
        opening_hours: newSettings.openingHours,
      };

      // Remove undefined keys
      Object.keys(dbSettings).forEach(key => 
        (dbSettings as any)[key] === undefined && delete (dbSettings as any)[key]
      );

      // Upsert na linha com ID 1
      const { error } = await supabase
        .from('settings')
        .update(dbSettings)
        .eq('id', 1); // Sempre atualiza a linha 1

      // Se der erro porque a linha 1 não existe, tenta inserir (fallback raro se o script SQL não rodou insert inicial)
      if (error) { 
         await supabase.from('settings').upsert({ id: 1, ...dbSettings });
      }

    } catch (err) {
      console.error("Erro ao salvar configurações:", err);
      alert("Erro ao salvar no banco de dados.");
    }
  };

  return (
    <DataContext.Provider value={{ menu, settings, addMenuItem, updateMenuItem, deleteMenuItem, updateSettings, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
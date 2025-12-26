
import { MenuItem, AppSettings } from '../types';

const MENU_KEY = 'jangadeiro_menu';
const SETTINGS_KEY = 'jangadeiro_settings';

const DEFAULT_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Coca-Cola 500ml',
    description: 'Gelada e refrescante.',
    price: 8.00,
    category: 'bebidas',
    available: true,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Suco Natural',
    description: 'Laranja, Limão ou Abacaxi.',
    price: 12.00,
    category: 'bebidas',
    available: true,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Caipirinha',
    description: 'Limão, açúcar e cachaça da casa.',
    price: 15.00,
    category: 'bebidas',
    available: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'Caldo de Caranguejo',
    description: 'Tradicional caldo cremoso com patinhas.',
    price: 22.00,
    category: 'comidas',
    available: true,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Peixe Frito Inteiro',
    description: 'Acompanha baião, macaxeira e salada.',
    price: 85.00,
    category: 'comidas',
    available: true,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop'
  },
  {
    id: '6',
    name: 'Camarão ao Alho e Óleo',
    description: 'Porção generosa de camarão rosa.',
    price: 65.00,
    category: 'comidas',
    available: true,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop'
  }
];

const DEFAULT_SETTINGS: AppSettings = {
  heroTitle: 'Barraca do Jangadeiro',
  heroSubtitle: 'Conforto, sabor e vista para o mar.',
  whatsapp: '5585999999999',
  whatsappDisplay: '(85) 99999-9999',
  instagram: 'barracadojangadeiro',
  address: 'Av. Zezé Diogo, 1234 - Praia do Futuro, Fortaleza - CE',
  businessHours: 'Todos os dias: 08:00 às 18:00',
  locationLat: -3.7388,
  locationLng: -38.4633
};

export const getMenu = (): MenuItem[] => {
  const stored = localStorage.getItem(MENU_KEY);
  if (!stored) {
    localStorage.setItem(MENU_KEY, JSON.stringify(DEFAULT_MENU));
    return DEFAULT_MENU;
  }
  return JSON.parse(stored);
};

export const saveMenu = (menu: MenuItem[]) => {
  localStorage.setItem(MENU_KEY, JSON.stringify(menu));
};

export const getSettings = (): AppSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  }
  return JSON.parse(stored);
};

export const saveSettings = (settings: AppSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

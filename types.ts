export type Category = 'bebidas' | 'comidas';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image?: string;
  available: boolean;
}

export interface AppSettings {
  heroTitle: string;
  heroSubtitle: string;
  whatsapp: string;
  instagram: string;
  address: string;
  locationLat: number; // For Maps Grounding context
  locationLng: number; // For Maps Grounding context
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: { uri: string; title: string }[];
}


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
  whatsappDisplay: string; // Versão formatada para exibição (ex: (85) 99999-9999)
  instagram: string;
  address: string;
  businessHours: string; // Ex: Segunda a Sexta: 08h - 18h
  locationLat: number; 
  locationLng: number; 
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: { uri: string; title: string }[];
}

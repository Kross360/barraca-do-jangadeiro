export type Category = 'Bebidas' | 'Comidas' | 'Petiscos' | 'Pratos Regionais';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image?: string;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  whatsapp: string;
  instagram: string;
  address: string;
  mapsUrl: string;
  openingHours: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
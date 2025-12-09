import { MenuItem, SiteSettings } from './types';

// CÓDIGO DE SEGURANÇA PARA NOVOS CADASTROS
// Altere este valor para algo que só você saiba antes de fazer o deploy final
export const ADMIN_REGISTRATION_CODE = 'JANGADEIRO2025';

export const INITIAL_SETTINGS: SiteSettings = {
  heroTitle: "Bem-vindo à Barraca do Jangadeiro",
  heroSubtitle: "Conforto, sabor e vista para o mar.",
  whatsapp: "5585999999999",
  instagram: "barracadojangadeiro",
  address: "Av. Beira Mar, 1234 - Praia do Futuro, Fortaleza - CE",
  mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.354522858693!2d-38.4882!3d-3.7375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNDQnMTUuMCJTIDM4wrAyOScxNy41Ilc!5e0!3m2!1sen!2sbr!4v1600000000000!5m2!1sen!2sbr",
  openingHours: "Seg - Dom: 08:00 às 18:00"
};

export const INITIAL_MENU: MenuItem[] = [
  // Bebidas
  {
    id: '1',
    name: 'Coca-Cola 500ml',
    description: 'Refrigerante gelado',
    price: 8.00,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: '2',
    name: 'Suco Natural',
    description: 'Laranja, Limão ou Abacaxi',
    price: 12.00,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: '3',
    name: 'Água Mineral',
    description: 'Sem gás 500ml',
    price: 5.00,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: '4',
    name: 'Caipirinha',
    description: 'Limão com cachaça especial',
    price: 18.00,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=300&h=200'
  },
  // Comidas
  {
    id: '5',
    name: 'Caldo de Caranguejo',
    description: 'Acompanha torradinhas',
    price: 22.00,
    category: 'Comidas',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: '6',
    name: 'Caldo de Lagosta',
    description: 'Cremoso e temperado',
    price: 28.00,
    category: 'Comidas',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: '7',
    name: 'Isca de Peixe',
    description: 'Peixe empanado com molho tártaro',
    price: 45.00,
    category: 'Petiscos',
    image: 'https://images.unsplash.com/photo-1599304766858-867eb6722d43?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: '8',
    name: 'Peixada Cearense',
    description: 'Peixe cozido com legumes, pirão e arroz',
    price: 89.00,
    category: 'Pratos Regionais',
    image: 'https://images.unsplash.com/photo-1582218084420-569a9e31d772?auto=format&fit=crop&q=80&w=300&h=200'
  }
];
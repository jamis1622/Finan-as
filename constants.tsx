
import { Category } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  'Moradia',
  'Lazer',
  'Suprimentos',
  'Filhos',
  'Transporte',
  'Cuidados Pessoais',
  'Cartão de Crédito',
  'Contribuições',
  'Reserva de Emergência',
  'Outros'
];

export const FIXED_CATEGORY_COLORS: Record<string, string> = {
  'Moradia': '#6366f1', // Indigo
  'Lazer': '#ec4899', // Pink
  'Suprimentos': '#f59e0b', // Amber
  'Filhos': '#8b5cf6', // Violet
  'Transporte': '#10b981', // Emerald
  'Cuidados Pessoais': '#06b6d4', // Cyan
  'Cartão de Crédito': '#ef4444', // Red
  'Contribuições': '#84cc16', // Lime
  'Reserva de Emergência': '#14b8a6', // Teal
  'Outros': '#64748b' // Slate
};

export const getCategoryColor = (category: string): string => {
  if (FIXED_CATEGORY_COLORS[category]) return FIXED_CATEGORY_COLORS[category];
  
  // Generate a consistent color based on the string name
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
};

export const INITIAL_USERS = [
  { 
    id: 'user1', 
    name: 'Jamis', 
    avatar: 'https://ui-avatars.com/api/?name=J&background=6366f1&color=fff&bold=true&rounded=true' 
  },
  { 
    id: 'user2', 
    name: 'Raquel', 
    avatar: 'https://ui-avatars.com/api/?name=R&background=ec4899&color=fff&bold=true&rounded=true' 
  }
];

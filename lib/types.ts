export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'planter' | 'sculpture' | 'tile' | 'furniture' | 'other';
  dimensions?: string;
  weight?: string;
  inStock: boolean;
  createdAt: Date;
}

export interface ArtisanProfile {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  coverImage?: string;
  location?: string;
  specialties: string[];
  yearsExperience?: number;
  socialLinks?: {
    farcaster?: string;
    instagram?: string;
    website?: string;
  };
}

export interface StoryPrompt {
  id: string;
  question: string;
  category: 'origin' | 'process' | 'inspiration' | 'values';
  placeholder: string;
}

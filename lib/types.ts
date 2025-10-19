export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'planters' | 'sculptures' | 'tiles' | 'furniture' | 'other';
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

export interface BrandStory {
  headline: string;
  story: string;
  mission: string;
  process: string[];
  values: string[];
}
